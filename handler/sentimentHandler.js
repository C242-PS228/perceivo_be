/* eslint-disable no-undef */
import sentiment from '../db/sentiment.js';
import platform from '../db/platform.js';
import filteredComment from '../src/structure/sentimentFilteredComments.js';
import { initializeApp } from 'firebase/app';
import {
  collection,
  getFirestore,
  doc,
  getDoc,
  addDoc,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';
import firebaseConfig from '../config/firebaseConfig.js';
import apifyConnect from '../config/apifyConfig.js';
import { nanoid } from 'nanoid';

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const testFirebase = async (req, res) => {
  const { id } = req.params;

  const docRef = doc(db, 'Comments', id);

  await deleteDoc(docRef);

  res.status(200).json({
    status: 'success',
    message: 'data successfully deleted'
  });
};

const showAllSentimentHandler = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: sentiment,
  });
};

const showSentimentHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const docRef = doc(db, 'Comments', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      res.status(200).json({
        status: 'success',
        data: {
          id: docSnap.id,
          ...docSnap.data(),
        },
      });
    } else {
      res.status(404).json({
        status: 'fail',
        message: 'data not found',
      });
    }
  } catch (e) {
    return res.statu(400).json({
      status: 'fail',
      message: `error: ${e}`,
    });
  }
};

const createSentimentHandler = async (req, res) => {
  const { link, platformName, resultLimit } = req.body;
  const describePlatform = platform.filter((item) => item.name == platformName)[0];

  try {
    let input = {};
    switch (platformName) {
    case 'instagram':
      { input = {
        directUrls: [link],
        resultsLimit: resultLimit || 1,
      }; }
      break;
    case 'tiktok':
      { input = {
        postURLs: [link],
        commentsPerPost: resultLimit || 1,
      }; }
      break;
    case 'facebook':
      { input = {
        postUrls: [link],
        maxComments: resultLimit || 1
      }; }
      break;
    default:
      res.status(404).json({
        status: 'fail',
        message: 'platform name undefined!'
      });
      break;
    }

    // development area
    const comments = await apifyConnect(input, describePlatform.actor);

    console.log(comments);

    if (!comments) {
      res.status(404).json({
        'status': 'fail',
        'message': 'no comments not found!'
      });
    }

    const filteredComments = filteredComment(describePlatform.name, comments);

    const docRef = await addDoc(collection(db, 'Comments'), { filteredComments });

    sentiment.push({
      id: nanoid(16),
      platformName: describePlatform.name,
      sentimentId: docRef.id,
      link: link,
      comments: filteredComments,
    });

    res.status(200).json({
      status: 'success',
      message: 'success add analyst',
      sentimentId: docRef.id,
      comments: filteredComments,
    });
  } catch (e) {
    res.status(500).json({
      status: 'fail',
      message: `error: ${e}`,
    });
  }
};

const sentimentHandler = {
  testFirebase,
  showAllSentimentHandler,
  showSentimentHandler,
  createSentimentHandler,
};

export default sentimentHandler;
