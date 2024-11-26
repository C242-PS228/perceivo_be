import pool from '../config/dbConfig.js';
import { nanoid } from 'nanoid';
const date = new Date();

const showAllTagsHandler = async (req, res) => {
  const user = req.user;

  try {
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
    });
  }
};

const showTagHandler = async (req, res) => {
  const uniqueId = req.params.unique_id;

  try {
    // add additional partial relational data (tb_sentiment - tb_sentiment_tags - tb_tags)
    const query = 'SELECT * FROM tb_tags WHERE unique_id = ? AND user_id = ?';
    const [rows] = await pool.query(query, [uniqueId, req.user.id]);

    if (rows.length > 0) {
      res.status(200).json({
        status: 'success',
        data: rows
      });
    } else {
      res.status(404).json({
        status: 'fail',
        message: 'data not found!'
      });
    }
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: `error: ${error}`
    });
  }
};

const createTagHandler = async (req, res) => {
  const data = req.body;
  const uniqueId = nanoid(16);

  try {
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
      });
    }
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: `error: ${error}`
    });
  }
};

const updateTagHandler = async (req, res) => {
  const uniqueId = req.params.unique_id;
  const data = req.body;

  try {
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
      });
    }
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: `error: ${error}`
    });
  }
};

const deleteTagHandler = async (req, res) => {
  const uniqueId = req.params.unique_id;

  try {
    const query = 'DELETE FROM tb_tags WHERE unique_id = ? AND user_id = ?';
    const [rows] = await pool.query(query, [uniqueId, req.user.id]);

    if (rows.affectedRows > 0) {
      res.status(200).json({
        status: 'success',
        message: 'success delete tag'
      });
    } else {
      res.status(404).json({
        status: 'fail',
        message: 'error delete tag'
      });
    }
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: `error: ${error}`
    });
  }
};

// dev
const checkTags = async (req, res) => {
  const { tags } = req.body;


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
  checkTags
};

export default tagsHandler;
