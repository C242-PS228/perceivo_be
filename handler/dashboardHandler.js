import pool from '../config/dbConfig.js';
import { getDocument } from './service/firestoreOperations.js';

/**
 * Handles /dashboard endpoint
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with user and sentiment data, including sentiment count
 */
const dashboardHandler = async (req, res) => {
  const user = req.user;

  try {
    const userQuery =
      'SELECT id, username, email, created_at FROM tb_users WHERE id = ?';
    const [userRows] = await pool.query(userQuery, [user.id]);

    if (userRows.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found!',
      });
    }

    const userData = userRows[0];

    // Query sentiment data and count
    const sentimentQuery = `
      SELECT 
        s.id AS sentiment_id,
        s.unique_id AS sentiment_unique_id,
        s.platform,
        s.sentiment_link,
        s.created_at AS sentiment_created_at,
        s.statistic_id, 
        GROUP_CONCAT(t.tag_name) AS tags
      FROM 
        tb_sentiments s
      LEFT JOIN 
        tb_sentiment_tags st ON s.id = st.sentiment_id
      LEFT JOIN 
        tb_tags t ON st.tag_id = t.id
      WHERE 
        s.user_id = ?
      GROUP BY 
        s.id;
    `;

    const [sentimentRows] = await pool.query(sentimentQuery, [user.id]);

    const sentimentCountQuery =
      'SELECT COUNT(*) AS sentiment_count FROM tb_sentiments WHERE user_id = ?';
    const [sentimentCountRows] = await pool.query(sentimentCountQuery, [user.id]);
    const sentimentCount = sentimentCountRows[0].sentiment_count;

    let totalPositive = 0;
    let totalNegative = 0;
    let totalNeutral = 0;

    const sentimentsWithStatistics = await Promise.all(
      sentimentRows.map(async (sentiment) => {
        const sentimentData = { ...sentiment };

        if (sentiment.statistic_id) {
          try {
            const docRef = await getDocument('Statistic', sentiment.statistic_id);
            sentimentData.statistic = docRef || {
              positive: 0,
              negative: 0,
              neutral: 0,
            };

            totalPositive += sentimentData.statistic.positive || 0;
            totalNegative += sentimentData.statistic.negative || 0;
            totalNeutral += sentimentData.statistic.neutral || 0;
          } catch (error) {
            sentimentData.statistic = { positive: 0, negative: 0, neutral: 0 };
          }
        } else {
          sentimentData.statistic = { positive: 0, negative: 0, neutral: 0 };
        }

        return {
          sentiment_id: sentimentData.sentiment_id,
          sentiment_unique_id: sentimentData.sentiment_unique_id,
          platform: sentimentData.platform,
          sentiment_link: sentimentData.sentiment_link,
          sentiment_created_at: sentimentData.sentiment_created_at,
          statistic_id: sentimentData.statistic_id,
          tags: sentimentData.tags,
          statistic: sentimentData.statistic,
        };
      })
    );

    // Filter out any null or invalid statistics
    const validSentiments = sentimentsWithStatistics.filter((sentiment) => sentiment);

    const statistics = await Promise.all(
      sentimentRows.map(async (statistic) => {
        if (!statistic.statistic_id) return null;
        try {
          const result = await getDocument('Statistic', statistic.statistic_id);
          return result.data;
        } catch (error) {
          return null;
        }
      })
    );

    const filteredStatistics = statistics.filter((stat) => stat !== null);

    const totalStatistics = filteredStatistics.reduce(
      (totals, current) => {
        totals.positive += current.positive || 0;
        totals.negative += current.negative || 0;
        totals.neutral += current.neutral || 0;
        return totals;
      },
      { positive: 0, negative: 0, neutral: 0 }
    );

    res.status(200).json({
      status: 'success',
      data: {
        user: userData,
        sentimentCount,
        sentiments: validSentiments,
        totalSentimentStatistics: totalStatistics,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: `Error: ${error.message}`,
    });
  }
};

export default dashboardHandler;
