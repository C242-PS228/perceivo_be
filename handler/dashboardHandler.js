import pool from '../config/dbConfig.js';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../config/firebaseConfig.js';  // Sesuaikan dengan konfigurasi Firebase Anda
import { getFirestore, doc, getDoc } from 'firebase/firestore';
// import platform from '../config/platformConfig.js';
// import inputConfig from '../config/platformParamConfig.js';
// import filteredComment from '../src/structure/sentimentFilteredComments.js';
// import { PredictTrigger } from './event/sentimentPredictTrigger.js';
// import formattedDate from '../config/timezoneConfig.js';
// import {
//   addDocument,
//   getDocument,
//   deleteDocument,
// } from './service/firestoreOperations.js';
// import apifyConnect from '../config/apifyConfig.js';
// import { nanoid } from 'nanoid';

// import tagsTrigger from './event/addTagsTrigger.js';

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
    const userQuery = 'SELECT id, username, email, created_at FROM tb_users WHERE id = ?';
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
    const sentimentCountQuery = 'SELECT COUNT(*) AS sentiment_count FROM tb_sentiments WHERE user_id = ?';
    const [sentimentCountRows] = await pool.query(sentimentCountQuery, [user.id]);
    const sentimentCount = sentimentCountRows[0].sentiment_count;

    // Fetch comments data from Firestore
    const sentimentsWithComments = await Promise.all(
      sentimentRows.map(async (sentiment) => {
        const sentimentData = { ...sentiment };

        if (sentiment.comments_id) {
          try {
            const docRef = doc(db, 'Comments', sentiment.comments_id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              sentimentData.comments = docSnap.data().filteredComments || [];
            } else {
              sentimentData.comments = [];
            }
          } catch (error) {
            sentimentData.comments = []; // Handle error gracefully if Firestore fetch fails
            console.error(`Error fetching comments for sentiment ID ${sentiment.id}:`, error.message);
          }
        }

        // Fetch sentiment statistics if statistic_id exists
        if (sentiment.statistic_id) {
          try {
            const docRef = doc(db, 'Predict', sentiment.statistic_id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              sentimentData.statistic = docSnap.data();
            } else {
              sentimentData.statistic = { positive: 0, negative: 0, neutral: 0 }; // Default if not found
            }
          } catch (error) {
            sentimentData.statistic = { positive: 0, negative: 0, neutral: 0 }; // Handle error gracefully
            console.error(`Error fetching statistics for sentiment ID ${sentiment.id}:`, error.message);
          }
        } else {
          sentimentData.statistic = { positive: 0, negative: 0, neutral: 0 }; // Default if no statistic_id
        }

        // Count the positive, negative, and neutral comments
        let positiveCount = 0;
        let negativeCount = 0;
        let neutralCount = 0;

        if (sentimentData.comments.length > 0) {
          sentimentData.comments.forEach((comment) => {
            // Log the sentiment to understand the issue
            console.log('Comment Sentiment:', comment.sentiment);

            if (comment.sentiment === 'positive') {
              positiveCount++;
            } else if (comment.sentiment === 'negative') {
              negativeCount++;
            } else if (comment.sentiment === 'neutral') {
              neutralCount++;
            } else {
              // Log unexpected sentiment values
              console.warn(`Unknown sentiment value: ${comment.sentiment}`);
            }
          });
        }

        // Add the sentiment counts to the sentiment data
        sentimentData.commentSentimentCounts = {
          positive: positiveCount || 0, // Ensure count defaults to 0 if no positive comments
          negative: negativeCount || 0, // Same for negative and neutral
          neutral: neutralCount || 0,
        };

        return sentimentData;
      })
    );

    res.status(200).json({
      status: 'success',
      data: {
        user: userData,
        sentimentCount, // Include the sentiment count in the response
        sentiments: sentimentsWithComments,
      },
    });
  } catch (error) {
    console.error('Error in dashboard handler:', error.message); // Log error for debugging
    res.status(500).json({
      status: 'fail',
      message: `Error: ${error.message}`,
    });
  }
};

export default dashboardHandler;
