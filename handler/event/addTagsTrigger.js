import pool from '../../config/dbConfig.js';
import { nanoid } from 'nanoid';

const tagsTrigger = async (tags, user, insertId) => {
  try {
    const tagsArray = Array.isArray(tags) ? tags : [tags];

    const checkQuery =
      'SELECT id, tag_name FROM tb_tags WHERE user_id = ? AND tag_name IN (?)';
    const [getrows] = await pool.query(checkQuery, [user.id, tagsArray]);

    const existingTags = getrows.map((tag) => tag.tag_name);
    const newTags = tagsArray.filter((tag) => !existingTags.includes(tag));

    if (newTags.length > 0) {
      const tagValues = [];

      for (const tag of newTags) {
        let uniqueId = nanoid(16);
        let isDuplicate = true;

        while (isDuplicate) {
          const [checkRows] = await pool.query(
            'SELECT COUNT(*) as count FROM tb_tags WHERE unique_id = ?',
            [uniqueId]
          );
          if (checkRows[0].count === 0) {
            isDuplicate = false;
          } else {
            uniqueId = nanoid(16);
          }
        }

        tagValues.push([user.id, tag, uniqueId]);
      }

      const insertTagsQuery =
        'INSERT INTO tb_tags (user_id, tag_name, unique_id) VALUES ?';
      await pool.query(insertTagsQuery, [tagValues]);

      const [newRows] = await pool.query(checkQuery, [user.id, tagsArray]);
      getrows.push(...newRows);
    }

    const tagValuesToLink = getrows.map((tag) => [insertId, tag.id]);
    const insertQuery =
      'INSERT INTO tb_sentiment_tags (sentiment_id, tag_id) VALUES ?';
    await pool.query(insertQuery, [tagValuesToLink]);

  } catch (error) {
    console.error(error);
    return false;
  }
};

export default tagsTrigger;
