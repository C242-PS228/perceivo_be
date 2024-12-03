import pool from '../../config/dbConfig.js';
import { nanoid } from 'nanoid'; // Mengimpor nanoid

const tagsTrigger = async (tags, user, insertId) => {
  try {
    const tagsArray = Array.isArray(tags) ? tags : [tags];

    const checkQuery =
      'SELECT id, tag_name FROM tb_tags WHERE user_id = ? AND tag_name IN (?)';
    const [getrows] = await pool.query(checkQuery, [user.id, tagsArray]);

    const existingTags = getrows.map((tag) => tag.tag_name);
    const newTags = tagsArray.filter((tag) => !existingTags.includes(tag));

    if (newTags.length > 0) {
      const uniqueId = nanoid(16);
      const insertTagsQuery = 'INSERT INTO tb_tags (user_id, tag_name, unique_id) VALUES ?';
      const tagValues = newTags.map((tag) => [user.id, tag, uniqueId]);
      await pool.query(insertTagsQuery, [tagValues]);

      const [newRows] = await pool.query(checkQuery, [user.id, tagsArray]);
      getrows.push(...newRows);
    }

    const tagValues = getrows.map((tag) => [insertId, tag.id]);
    const insertQuery =
      'INSERT INTO tb_sentiment_tags (sentiment_id, tag_id) VALUES ?';
    await pool.query(insertQuery, [tagValues]);

  } catch (error) {
    console.error(error);
    return false;
  }
};

export default tagsTrigger;
