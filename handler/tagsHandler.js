<<<<<<< HEAD
import pool from "../config/dbConfig.js";
import { nanoid } from "nanoid";
const date = new Date();

/**
 * Handles /tags endpoint
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with status, message, and tags data
 * @description
 * This endpoint is used to get all tags data for a user.
 * The data will be filtered by the user id in the request header.
 * The response will contain the tags data.
 */
=======
import pool from '../config/dbConfig.js';
import { nanoid } from 'nanoid';
const date = new Date();

>>>>>>> production
const showAllTagsHandler = async (req, res) => {
  const user = req.user;

  try {
<<<<<<< HEAD
    const query = "SELECT * FROM tb_tags WHERE user_id = ?";
    const [rows] = await pool.query(query, [user.id]);

    res.status(200).json({
      status: "success",
      data: rows,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: `error: ${error}`,
=======
    const query = 'SELECT * FROM tb_tags WHERE user_id = ?';
    const [rows] = await pool.query(query, [user.id]);

    res.status(200).json({
      status: 'success',
      data: rows
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: `error: ${error}`
>>>>>>> production
    });
  }
};

<<<<<<< HEAD
/**
 * Handles /tags/:unique_id endpoint for getting a tag and its related sentiment
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with status, message, and tag data
 * @description
 * This endpoint is used to get a tag and its related sentiment data.
 * The tag id is provided in the request params.
 * The response will contain the tag data and its related sentiment data.
 */
=======
>>>>>>> production
const showTagHandler = async (req, res) => {
  const uniqueId = req.params.unique_id;

  try {
    // add additional partial relational data (tb_sentiment - tb_sentiment_tags - tb_tags)
    const query = `SELECT 
        t.id AS tag_id,
        t.tag_name,
        t.created_at AS tag_created_at,
        s.id AS sentiment_id,
        s.unique_id AS sentiment_unique_id,
        s.platform,
        s.sentiment_link,
        s.created_at AS sentiment_created_at
      FROM 
        tb_tags t
      INNER JOIN 
        tb_sentiment_tags st ON t.id = st.tag_id
      INNER JOIN 
        tb_sentiments s ON st.sentiment_id = s.id
      WHERE 
        t.unique_id = ? AND t.user_id = ?;
    `;

    const [rows] = await pool.query(query, [uniqueId, req.user.id]);

    if (rows.length > 0) {
      res.status(200).json({
<<<<<<< HEAD
        status: "success",
=======
        status: 'success',
>>>>>>> production
        data: rows,
      });
    } else {
      res.status(404).json({
<<<<<<< HEAD
        status: "fail",
        message: "data not found!",
=======
        status: 'fail',
        message: 'data not found!'
>>>>>>> production
      });
    }
  } catch (error) {
    res.status(404).json({
<<<<<<< HEAD
      status: "fail",
      message: `error: ${error}`,
=======
      status: 'fail',
      message: `error: ${error}`
>>>>>>> production
    });
  }
};

<<<<<<< HEAD
/**
 * Handles /tags endpoint for creating a new tag
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with status, message, and user data
 * @description
 * This endpoint is used to create a new tag for a user.
 * The tag name is provided in the request body.
 * The response will contain the message of success or failure of creating the tag.
 */
=======
>>>>>>> production
const createTagHandler = async (req, res) => {
  const data = req.body;
  const uniqueId = nanoid(16);

  try {
<<<<<<< HEAD
    const formattedDate = date.toISOString().slice(0, 19).replace("T", " ");

    const query =
      "INSERT INTO tb_tags (unique_id, user_id, tag_name, created_at) VALUES (?, ?, ?, ?)";
    const [rows] = await pool.query(query, [
      uniqueId,
      req.user.id,
      data.tag_name,
      formattedDate,
    ]);

    if (rows.affectedRows > 0) {
      res.status(200).json({
        status: "success",
        message: `success add tag ${data.tag_name}`,
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: `error add tag ${data.tag_name}`,
=======
    const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');

    const query = 'INSERT INTO tb_tags (unique_id, user_id, tag_name, created_at) VALUES (?, ?, ?, ?)';
    const [rows] = await pool.query(query, [uniqueId, req.user.id, data.tag_name, formattedDate]);

    if (rows.affectedRows > 0) {
      res.status(200).json({
        status: 'success',
        message: `success add tag ${data.tag_name}`
      });
    } else {
      res.status(404).json({
        status: 'fail',
        message: `error add tag ${data.tag_name}`
>>>>>>> production
      });
    }
  } catch (error) {
    res.status(404).json({
<<<<<<< HEAD
      status: "fail",
      message: `error: ${error}`,
=======
      status: 'fail',
      message: `error: ${error}`
>>>>>>> production
    });
  }
};

<<<<<<< HEAD
/**
 * Handles /tags/:unique_id endpoint for updating a tag
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with status and message
 * @description
 * This endpoint updates the tag name based on the unique tag ID and user ID.
 * The tag name is provided in the request body, and the tag ID is provided
 * in the request parameters. The response indicates success or failure of the update.
 */
=======
>>>>>>> production
const updateTagHandler = async (req, res) => {
  const uniqueId = req.params.unique_id;
  const data = req.body;

  try {
<<<<<<< HEAD
    const query =
      "UPDATE tb_tags SET tag_name = ? WHERE unique_id = ? AND user_id = ?";
    const [rows] = await pool.query(query, [
      data.tag_name,
      uniqueId,
      req.user.id,
    ]);

    if (rows.affectedRows > 0) {
      res.status(200).json({
        status: "success",
        message: `success update tag ${data.tag_name}`,
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: `error update tag ${data.tag_name}`,
=======
    const query = 'UPDATE tb_tags SET tag_name = ? WHERE unique_id = ? AND user_id = ?';
    const [rows] = await pool.query(query, [data.tag_name, uniqueId, req.user.id]);

    if (rows.affectedRows > 0) {
      res.status(200).json({
        status: 'success',
        message: `success update tag ${data.tag_name}`
      });
    } else {
      res.status(404).json({
        status: 'fail',
        message: `error update tag ${data.tag_name}`
>>>>>>> production
      });
    }
  } catch (error) {
    res.status(404).json({
<<<<<<< HEAD
      status: "fail",
      message: `error: ${error}`,
=======
      status: 'fail',
      message: `error: ${error}`
>>>>>>> production
    });
  }
};

<<<<<<< HEAD
/**
 * Handles /tags/:unique_id endpoint for delete tag
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with status, message, and user data
 * @description
 * This endpoint is used to delete a tag.
 * The tag id is provided in the request header.
 * The response will contain the deleted tag data.
 */
=======
>>>>>>> production
const deleteTagHandler = async (req, res) => {
  const uniqueId = req.params.unique_id;

  try {
<<<<<<< HEAD
    const query = "DELETE FROM tb_tags WHERE unique_id = ? AND user_id = ?";
=======
    const query = 'DELETE FROM tb_tags WHERE unique_id = ? AND user_id = ?';
>>>>>>> production
    const [rows] = await pool.query(query, [uniqueId, req.user.id]);

    if (rows.affectedRows > 0) {
      res.status(200).json({
<<<<<<< HEAD
        status: "success",
        message: "success delete tag",
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "error delete tag",
=======
        status: 'success',
        message: 'success delete tag'
      });
    } else {
      res.status(404).json({
        status: 'fail',
        message: 'error delete tag'
>>>>>>> production
      });
    }
  } catch (error) {
    res.status(404).json({
<<<<<<< HEAD
      status: "fail",
      message: `error: ${error}`,
=======
      status: 'fail',
      message: `error: ${error}`
>>>>>>> production
    });
  }
};

// dev
const checkTags = async (req, res) => {
  const { tags } = req.body;

<<<<<<< HEAD
  try {
    const query =
      "SELECT id, tag_name FROM tb_tags WHERE user_id = ? AND tag_name IN (?)";
    const [rows] = await pool.query(query, [req.user.id, tags]);

    res.status(200).json({
      status: "success",
      data: rows,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: `error: ${error}`,
=======

  try {
    const query = 'SELECT id, tag_name FROM tb_tags WHERE user_id = ? AND tag_name IN (?)';
    const [rows] = await pool.query(query, [req.user.id, tags]);

    res.status(200).json({
      status: 'success',
      data: rows
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: `error: ${error}`
>>>>>>> production
    });
  }

  console.log(tags);
};

const tagsHandler = {
  showTagHandler,
  showAllTagsHandler,
  createTagHandler,
  updateTagHandler,
  deleteTagHandler,
  // dev
<<<<<<< HEAD
  checkTags,
=======
  checkTags
>>>>>>> production
};

export default tagsHandler;
