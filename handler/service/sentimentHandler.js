/* eslint-disable camelcase */
import platform from '../config/platformConfig.js';
import inputConfig from '../config/platformParamConfig.js';
import filteredComment from '../src/structure/sentimentFilteredComments.js';
import pool from '../config/dbConfig.js';
import sentimentPredictTrigger from './event/sentimentPredictTrigger.js';
import { initializeApp } from 'firebase/app';
const date = new Date();
import {
  collection,
  getFirestore,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';
import firebaseConfig from '../config/firebaseConfig.js';
import apifyConnect from '../config/apifyConfig.js';

import { addDocument, getAllDocuments } from './service/firestoreOperations.js';

import { nanoid } from 'nanoid';

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

import tagsTrigger from './event/addTagsTrigger.js';

/**
 * Handles /sentiment endpoint
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with status, message, and data
 * @description
 * This endpoint is used to get all sentiment data for a user.
 * the data will be filtered by the user id in the request header.
 */
const showAllSentimentHandler = async (req, res) => {
  const user = req.user;
  const query = 'SELECT * FROM tb_sentiments WHERE user_id = ?';
  const [rows] = await pool.query(query, [user.id]);

  res.status(200).json({
    status: 'success',
    data: rows,
  });
};

/**
 * Handles /sentiment/:id endpoint for retrieving sentiment details
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with status, message, and sentiment data
 * @description
 * This endpoint retrieves detailed sentiment data for a specific sentiment ID.
 * It includes the sentiment's platform, link, creation date, associated tags,
 * and comments if available. The sentiment ID is provided in the request
 * parameters, and the data is filtered by the user ID in the request header.
 */
const showSentimentHandler = async (req, res) => {
  const { id } = req.params; // sentiment ID
  const user = req.user;

  try {
    const query = `
      SELECT 
        s.id AS sentiment_id,
        s.unique_id AS sentiment_unique_id,
        t.tag_name,
        s.platform,
        s.sentiment_link,
        s.created_at AS sentiment_created_at,
        s.comments_id,
        s.statistic_id
      FROM 
        tb_sentiments s
      LEFT JOIN 
        tb_sentiment_tags st ON s.id = st.sentiment_id
      LEFT JOIN 
        tb_tags t ON st.tag_id = t.id
      WHERE 
        s.user_id = ? AND s.unique_id = ?;
    `;

    const [rows] = await pool.query(query, [user.id, id]);

    if (rows.length > 0) {
      const tags = rows
        .filter((row) => row.tag_name !== null) // Hanya ambil tag_name yang ada
        .map((row) => row.tag_name);

      const sentimentData = {
        id: rows[0].sentiment_id,
        unique_id: rows[0].sentiment_unique_id,
        platform: rows[0].platform,
        sentiment_link: rows[0].sentiment_link,
        sentiment_created_at: rows[0].sentiment_created_at,
        sentiment_statistic_id: rows[0].statistic_id,
        comments_id: rows[0].comments_id,
        tags,
      };

      if (sentimentData.sentiment_statistic_id) {
        const statisticDocRef = doc(db, 'Predict', sentimentData.sentiment_statistic_id);
        const statisticDocSnap = await getDoc(statisticDocRef);

        if (statisticDocSnap.exists()) {
          sentimentData.statistic = statisticDocSnap.data() || [];
        } else {
          sentimentData.statistic = [];
        }
      }

      if (sentimentData.comments_id) {
        const docRef = doc(db, 'Comments', sentimentData.comments_id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          sentimentData.comments = docSnap.data().filteredComments || [];
        } else {
          sentimentData.comments = [];
        }
      }

      res.status(200).json({
        status: 'success',
        data: sentimentData,
      });
    } else {
      res.status(404).json({
        status: 'fail',
        message: 'Sentiment data not found!',
      });
    }
  } catch (e) {
    return res.status(400).json({
      status: 'fail',
      message: `Error: ${e.message}`,
    });
  }
};

/**
 * Handles /sentiment/:id/comments endpoint
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with status, message, and comments
 * @description
 * This endpoint is used to get all comments data for a sentiment.
 * The ID of sentiment will be taken from the request params.
 * The data will be filtered by the user id in the request header.
 * The response will contain the comments.
 */
const showSentimentCommentsHandler = async (req, res) => {
  // sentiment ID
  const { id } = req.params;

  const user = req.user;

  try {
    const query =
      'SELECT * FROM tb_sentiments WHERE user_id = ? AND unique_id = ?';
    const [rows] = await pool.query(query, [user.id, id]);

    if (rows[0].comments_id === null) {
      return res.status(404).json({
        status: 'fail',
        message: 'data not found!',
      });
    }

    if (rows.length > 0) {
      const docRef = doc(db, 'Comments', rows[0].comments_id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        res.status(200).json({
          status: 'success',
          data: docSnap.data().filteredComments || [],
        });
      } else {
        res.status(404).json({
          status: 'fail',
          message: 'data not found!',
        });
      }
    } else {
      res.status(404).json({
        status: 'fail',
        message: 'data not found!',
      });
    }
  } catch (e) {
    return res.status(400).json({
      status: 'fail',
      message: `error: ${e}`,
    });
  }
};

/**
 * Handles /sentiment/:id/statistic endpoint
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with status, message, and statistic data
 * @description
 * This endpoint is used to get the sentiment analysis result for a sentiment.
 * The ID of sentiment will be taken from the request params.
 * The data will be filtered by the user id in the request header.
 * The response will contain the statistic data.
 */
const showSentimentStatisticHandler = async (req, res) => {
  // sentiment ID
  const { id } = req.params;

  const user = req.user;

  try {
    const query =
      'SELECT * FROM tb_sentiments WHERE user_id = ? AND unique_id = ?';
    const [rows] = await pool.query(query, [user.id, id]);

    if (rows[0].statistic_id === null) {
      return res.status(404).json({
        status: 'fail',
        message: 'data not found!',
      });
    }

    if (rows.length > 0) {
      const docRef = doc(db, 'Predict', rows[0].statistic_id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        res.status(200).json({
          status: 'success',
          data: docSnap.data(),
        });
      } else {
        res.status(404).json({
          status: 'fail',
          message: 'data not found!',
        });
      }
    } else {
      res.status(404).json({
        status: 'fail',
        message: 'data not found!',
      });
    }
  } catch (e) {
    return res.status(400).json({
      status: 'fail',
      message: `error: ${e}`,
    });
  }
};

/**
 * Handles /sentiment endpoint
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with status, message, sentimentId, and comments
 * @description
 * This endpoint is used to create a new sentiment data for a user.
 * The link and platform will be provided in the request body.
 * The data will be filtered by the user id in the request header.
 * The response will contain the sentiment id and the filtered comments.
 */
const createSentimentHandler = async (req, res) => {
  const { link, platformName, resultLimit, tags } = req.body;

  try {
    let uniqueId = nanoid(16);
    let isDuplicate = true;

    while (isDuplicate) {
      const [checkRows] = await pool.query(
        'SELECT COUNT(*) as count FROM tb_sentiments WHERE unique_id = ?',
        [uniqueId]
      );
      if (checkRows[0].count === 0) {
        isDuplicate = false;
      } else {
        uniqueId = nanoid(16);
      }
    }

    const describePlatform = platform.filter(
      (item) => item.name == platformName
    )[0];
    const input = inputConfig(platformName, link, resultLimit);

    // development area
    const comments = await apifyConnect(input, describePlatform.actor);

    if (!comments) {
      res.status(404).json({
        status: 'fail',
        message: 'comments not found!',
      });
      return;
    }

    const filteredComments = filteredComment(describePlatform.name, comments);
    // console.log(filteredComments);
    const docRef = await addDoc(collection(db, 'Comments'), {
      filteredComments,
    });

    // Kirim data ke Firestore
    // const docRef = await addDocument('Comments', { filteredComments });

    const statistic_id = await sentimentPredictTrigger(filteredComments);
    // const statistic_id = 'asdnakdasagasdf;;';

    // db config section
    const formattedLinks = Array.isArray(link) ? link.join(', ') : link;
    const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
    const user = req.user;

    const query =
      'INSERT INTO tb_sentiments (unique_id, user_id, platform, sentiment_link, comments_id, statistic_id, created_at) value (?, ?, ?, ?, ?, ?, ?)';
    const [rows] = await pool.query(query, [
      uniqueId,
      user.id,
      describePlatform.name,
      formattedLinks,
      docRef.id,
      statistic_id,
      formattedDate,
    ]);

    // Trigger add tags
    if (Array.isArray(tags) && tags.length > 0) {
      await tagsTrigger(tags, user, rows.insertId);
    }

    res.status(200).json({
      status: 'success',
      message: 'success add analyst',
      tags: tags,
      sentimentId: uniqueId,
      commentsId: docRef.id,
      statistic_id: statistic_id,
      links: formattedLinks,
      platform: describePlatform.name,
    });
  } catch (e) {
    res.status(500).json({
      status: 'fail',
      message: `error: ${e}`
    });
  }
};


/**
 * Handles /sentiment/:id endpoint for deleting sentiment data
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with status, message, and data
 * @description
 * This endpoint deletes sentiment data for a specific unique ID.
 * It also deletes the associated comments and sentiment analysis result.
 * The ID of sentiment will be taken from the request params.
 * The data will be filtered by the user id in the request header.
 */
const deleteSentimentHandler = async (req, res) => {
  // sentiment ID
  const { id } = req.params;

  const user = req.user;

  try {
    const query =
      'SELECT * FROM tb_sentiments WHERE user_id = ? AND unique_id = ?';
    const [rows] = await pool.query(query, [user.id, id]);

    if (rows.length > 0) {
      if (rows[0].comments_id) {
        const docRef = doc(db, 'Comments', rows[0].comments_id);
        docRef.id && (await deleteDoc(docRef));
      }

      if (rows[0].statistic_id) {
        const statisticDocRef = doc(db, 'Predict', rows[0].statistic_id);
        statisticDocRef.id && (await deleteDoc(statisticDocRef));
      }

      const query =
        'DELETE FROM tb_sentiments WHERE user_id = ? AND unique_id = ?';
      await pool.query(query, [user.id, id]);
      res.status(200).json({
        status: 'success',
        message: 'success delete sentiment',
      });
    } else {
      res.status(404).json({
        status: 'fail',
        message: 'data not found!',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: `error: ${error}`,
    });
  }
};

const sentimentHandler = {
  showAllSentimentHandler,
  showSentimentHandler,
  createSentimentHandler,
  showSentimentCommentsHandler,
  deleteSentimentHandler,
  showSentimentStatisticHandler
};

export default sentimentHandler;
