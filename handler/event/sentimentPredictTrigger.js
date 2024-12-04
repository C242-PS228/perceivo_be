import axios from 'axios';
import { collection, getFirestore, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../config/firebaseConfig.js';
import dotenv from 'dotenv';
dotenv.config();

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const sentimentPredictTrigger = async (payload) => {
  const endpoint = process.env.ML_FASTAPI;

  try {
    const response = await axios.post(
      endpoint,
      {
        comments: payload || [],
      },
      {
        headers: {
          'Content-Type': 'application/json', // Format JSON
        },
      }
    );

    const docRef = await addDoc(collection(db, 'Predict'), response.data);

    if (docRef.id) {
      console.log(docRef.id);
      return docRef.id;
    }

    return false;
  } catch (error) {
    return error;
  }
};

export default sentimentPredictTrigger;
