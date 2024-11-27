import platform from "../config/platformConfig.js";
import inputConfig from "../config/platformParamConfig.js";
import filteredComment from "../src/structure/sentimentFilteredComments.js";
import pool from "../config/dbConfig.js";
import { initializeApp } from "firebase/app";
const date = new Date();
import {
  collection,
  getFirestore,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import firebaseConfig from "../config/firebaseConfig.js";
import apifyConnect from "../config/apifyConfig.js";
import { nanoid } from "nanoid";

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

import tagsTrigger from "./event/addTagsTrigger.js";

const testFirebase = async (req, res) => {
  const { id } = req.params;

  const docRef = doc(db, "Comments", id);

  await deleteDoc(docRef);

  res.status(200).json({
    status: "success",
    message: "data successfully deleted",
  });
};

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
  const query = "SELECT * FROM tb_sentiments WHERE user_id = ?";
  const [rows] = await pool.query(query, [user.id]);

  res.status(200).json({
    status: "success",
    data: rows,
  });
};

/**
 * Handles /sentiment/:id endpoint
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with status, message, and data
 * @description
 * This endpoint is used to get a sentiment data for a user by its id.
 * The id is provided in the request parameter.
 * The data will be filtered by the user id in the request header.
 */
const showSentimentHandler = async (req, res) => {
  // sentiment ID
  const { id } = req.params;
  const user = req.user;

  try {
    const query =
      "SELECT * FROM tb_sentiments WHERE user_id = ? AND unique_id = ?";
    const [rows] = await pool.query(query, [user.id, id]);

    if (rows.length > 0) {
      const docRef = doc(db, "Comments", rows[0].comments_id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const combinedData = {
          ...rows[0],
          comments: docSnap.data().filteredComments || [],
        };

        res.status(200).json({
          status: "success",
          data: combinedData,
        });
      } else {
        res.status(404).json({
          status: "fail",
          message: "data not found!",
        });
      }
    } else {
      res.status(404).json({
        status: "fail",
        message: "data not found!",
      });
    }
  } catch (e) {
    return res.status(400).json({
      status: "fail",
      message: `error: ${e}`,
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
      "SELECT * FROM tb_sentiments WHERE user_id = ? AND unique_id = ?";
    const [rows] = await pool.query(query, [user.id, id]);

    if (rows.length > 0) {
      const docRef = doc(db, "Comments", rows[0].comments_id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        res.status(200).json({
          status: "success",
          data: docSnap.data().filteredComments || [],
          version: "tags/v1.0.0",
        });
      } else {
        res.status(404).json({
          status: "fail",
          message: "data not found!",
          version: "tags/v1.0.0",
        });
      }
    } else {
      res.status(404).json({
        status: "fail",
        message: "data not found!",
        version: "tags/v1.0.0",
      });
    }
  } catch (e) {
    return res.status(400).json({
      status: "fail",
      message: `error: ${e}`,
      version: "tags/v1.0.0",
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
  const uniqueId = nanoid(16);

  try {
    const describePlatform = platform.filter(
      (item) => item.name == platformName
    )[0];
    const input = inputConfig(platformName, link, resultLimit);

    // development area
    const comments = await apifyConnect(input, describePlatform.actor);

    if (!comments) {
      res.status(404).json({
        status: "fail",
        message: "comments not found!",
        version: "tags/v1.0.0",
      });
    }

    const filteredComments = filteredComment(describePlatform.name, comments);
    const docRef = await addDoc(collection(db, "Comments"), {
      filteredComments,
    });

    // db config section
    const formattedLinks = Array.isArray(link) ? link.join(", ") : link;
    const formattedDate = date.toISOString().slice(0, 19).replace("T", " ");
    const user = req.user;

    const query =
      "INSERT INTO tb_sentiments (unique_id, user_id, platform, sentiment_link, comments_id, created_at) value (?, ?, ?, ?, ?, ?)";
    const [rows] = await pool.query(query, [
      uniqueId,
      user.id,
      describePlatform.name,
      formattedLinks,
      docRef.id,
      formattedDate,
    ]);

    if (Array.isArray(tags) && tags.length > 0) {
      await tagsTrigger(tags, user, rows.insertId);
    }

    res.status(200).json({
      status: "success",
      message: "success add analyst",
      sentimentId: docRef.id,
      links: formattedLinks,
      platform: describePlatform.name,
      comments: filteredComments,
    });
  } catch (e) {
    res.status(500).json({
      status: "fail",
      message: `error: ${e}`,
      version: "tags/v1.0.0",
    });
  }
};

const deleteSentimentHandler = async (req, res) => {
  // sentiment ID
  const { id } = req.params;

  const user = req.user;

  try {
    const query =
      "SELECT * FROM tb_sentiments WHERE user_id = ? AND unique_id = ?";
    const [rows] = await pool.query(query, [user.id, id]);

    if (rows.length > 0) {
      const docRef = doc(db, "Comments", rows[0].comments_id);
      await deleteDoc(docRef);
      const query =
        "DELETE FROM tb_sentiments WHERE user_id = ? AND unique_id = ?";
      await pool.query(query, [user.id, id]);
      res.status(200).json({
        status: "success",
        message: "success delete sentiment",
        version: "tags/v1.0.0",
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "data not found!",
        version: "tags/v1.0.0",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: `error: ${error}`,
      version: "tags/v1.0.0",
    });
  }
};

const sentimentHandler = {
  testFirebase,
  showAllSentimentHandler,
  showSentimentHandler,
  createSentimentHandler,
  showSentimentCommentsHandler,
  deleteSentimentHandler,
};

export default sentimentHandler;
