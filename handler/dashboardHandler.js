import pool from "../config/dbConfig.js";
import { doc, getDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../config/firebaseConfig.js";

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

/**
 * Handles /dashboard endpoint
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with user and sentiment data
 * @description
 * This endpoint retrieves user data and all sentiment data, including
 * the associated tags and filtered comments if available.
 */
const dashboardHandler = async (req, res) => {
  const user = req.user;

  try {
    // Query user data
    const userQuery = "SELECT id, username, email, created_at FROM tb_users WHERE id = ?";
    const [userRows] = await pool.query(userQuery, [user.id]);

    if (userRows.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "User not found!",
      });
    }

    const userData = userRows[0];

    // Query sentiment data
    const sentimentQuery = `
      SELECT 
        s.id AS sentiment_id,
        s.unique_id AS sentiment_unique_id,
        s.platform,
        s.sentiment_link,
        s.created_at AS sentiment_created_at,
        s.comments_id,
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

    // Fetch comments data from Firestore
    const sentimentsWithComments = await Promise.all(
      sentimentRows.map(async (sentiment) => {
        const sentimentData = { ...sentiment };

        if (sentiment.comments_id) {
          try {
            const docRef = doc(db, "Comments", sentiment.comments_id);
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

        return sentimentData;
      })
    );

    res.status(200).json({
      status: "success",
      data: {
        user: userData,
        sentiments: sentimentsWithComments,
      },
    });
  } catch (error) {
    console.error("Error in dashboard handler:", error.message); // Log error for debugging
    res.status(500).json({
      status: "fail",
      message: `Error: ${error.message}`,
    });
  }
};

export default dashboardHandler;
