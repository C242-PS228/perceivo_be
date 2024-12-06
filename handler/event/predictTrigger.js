const endpoint = "http://127.0.0.1:8000/predict";
import axios from "axios";

const predictTrigger = async (payload, sentiment_id) => {
  try {
    const query =
      "SELECT comments_id FROM tb_sentiments WHERE user_id = ? AND unique_id = ?";
    const [rows] = await pool.query(query, [user.id, id]);

    if (rows.length > 0) {
      const comments_id = rows[0].comments_id;
      const docRef = doc(db, "Comments", comments_id);
      const docSnap = await getDoc(docRef);
    }
  } catch (error) {
    return error;
  }
};

export default predictTrigger;
