import pool from '../config/dbConfig.js';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../config/firebaseConfig.js'; // Sesuaikan dengan konfigurasi Firebase Anda
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import {
  addDocument,
  getDocument,
  deleteDocument,
} from './service/firestoreOperations.js';

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

/**
 * Handles /dashboard endpoint
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with user and sentiment data, including sentiment count
 * @description
 * This endpoint retrieves user data, all sentiment data, and includes the sentiment count
 * and associated tags, as well as filtered comments if available.
 */
const dashboardHandler = async (req, res) => {
  const user = req.user;

  try {
    // Query user data
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
        s.comments_id,
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

    // Get sentiment count
    const sentimentCountQuery =
      'SELECT COUNT(*) AS sentiment_count FROM tb_sentiments WHERE user_id = ?';
    const [sentimentCountRows] = await pool.query(sentimentCountQuery, [
      user.id,
    ]);
    const sentimentCount = sentimentCountRows[0].sentiment_count;

    // Initialize counters for sentiment statistics
    let totalPositive = 0;
    let totalNegative = 0;
    let totalNeutral = 0;

    // Fetch comments and statistics data from Firestore
    const sentimentsWithComments = await Promise.all(
      sentimentRows.map(async (sentiment) => {
        const sentimentData = { ...sentiment };

        // Fetch comments from Firestore
        if (sentiment.comments_id) {
          try {
            const docRef = await getDocument('Comments', sentiment.comments_id);
            sentimentData.comments = docRef?.filteredComments || [];
          } catch (error) {
            sentimentData.comments = [];
            console.error(
              `Error fetching comments for sentiment ID ${sentiment.id}:`,
              error.message
            );
          }
        }

        // Fetch statistics data from Firestore using statistic_id
        if (sentiment.statistic_id) {
          try {
            const docRef = await getDocument('Statistic', sentiment.statistic_id);
            sentimentData.statistic = docRef || {
              positive: 0,
              negative: 0,
              neutral: 0,
            }; // Default if not found

            // Aggregate statistics
            totalPositive += sentimentData.statistic.positive;
            totalNegative += sentimentData.statistic.negative;
            totalNeutral += sentimentData.statistic.neutral;

          } catch (error) {
            sentimentData.statistic = { positive: 0, negative: 0, neutral: 0 };
            console.error(
              `Error fetching statistics for sentiment ID ${sentiment.id}:`,
              error.message
            );
          }
        } else {
          sentimentData.statistic = { positive: 0, negative: 0, neutral: 0 };
        }

        // Fetch sentiment data from Firestore using sentiment_id
        if (sentiment.id) {
          try {
            const sentimentDocRef = await getDocument('Sentiments', sentiment.id);
            sentimentData.sentimentDetails = sentimentDocRef || {}; // Default to empty object if not found
          } catch (error) {
            sentimentData.sentimentDetails = {}; // Default to empty object if there's an error
            console.error(
              `Error fetching sentiment details for sentiment ID ${sentiment.id}:`,
              error.message
            );
          }
        } else {
          sentimentData.sentimentDetails = {}; // Default to empty object if no sentiment ID
        }

        return sentimentData;
      })
    );

    // Send the response including total sentiment statistics
    res.status(200).json({
      status: 'success',
      data: {
        user: userData,
        sentimentCount,
        sentiments: sentimentsWithComments,
        totalSentimentStatistics: {
          positive: totalPositive,
          negative: totalNegative,
          neutral: totalNeutral,
        },
      },
    });
  } catch (error) {
    console.error('Error in dashboard handler:', error.message);
    res.status(500).json({
      status: 'fail',
      message: `Error: ${error.message}`,
    });
  }
};


export default dashboardHandler;
