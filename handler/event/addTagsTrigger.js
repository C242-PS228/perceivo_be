import pool from '../../config/dbConfig.js';

const tagsTrigger = async (tags, user, insertId) => {
  try {
    const tagsArray = Array.isArray(tags) ? tags : [tags];

    const checkQuery =
      'SELECT id, tag_name FROM tb_tags WHERE user_id = ? AND tag_name IN (?)';
    const [getrows] = await pool.query(checkQuery, [user.id, tagsArray]);

    if (getrows.length > 0) {
      const tagValues = getrows.map((tag) => [insertId, tag.id]);
      const insertQuery =
        'INSERT INTO tb_sentiment_tags (sentiment_id, tag_id) VALUES ?';
      await pool.query(insertQuery, [tagValues]);
    }
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return false;
  }
};

export default tagsTrigger;
