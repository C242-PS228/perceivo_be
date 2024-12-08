import pool from '../../config/dbConfig.js';
import { nanoid } from 'nanoid';

const tagsTrigger = async (tags, user, sentimentId) => {
  if (!Array.isArray(tags) || tags.length === 0) {
    throw new Error('Tags must be a non-empty array');
  }

  try {
    for (const tag of tags) {
      const [existingTag] = await pool.query(
        'SELECT id FROM tb_tags WHERE tag_name = ?',
        [tag]
      );

      let tagId;

      if (existingTag.length > 0) {
        tagId = existingTag[0].id;
      } else {
        const uniqueId = nanoid(16);
        const formattedDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const query =
          'INSERT INTO tb_tags (unique_id, user_id, tag_name, created_at) VALUES (?, ?, ?, ?)';
        const [rows] = await pool.query(query, [
          uniqueId,
          user.id,
          tag,
          formattedDate,
        ]);

        tagId = rows.insertId;
      }

      await pool.query(
        'INSERT INTO tb_sentiment_tags (sentiment_id, tag_id) VALUES (?, ?)',
        [sentimentId, tagId]
      );
    }
  } catch (error) {
    console.error('Error in tagsTrigger:', error);
    throw new Error('Failed to process tags');
  }
};

export default tagsTrigger;
