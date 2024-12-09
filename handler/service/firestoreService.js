import { Firestore } from '@google-cloud/firestore';
import dotenv from 'dotenv';

dotenv.config();

const db = new Firestore({
  projectId: 'c242-ps228-capstone-team',
  databaseId: 'perceivo-fastdbstore'
  // keyFilename: process.env.FIRESTORE_CREDENTIALS,
});

export default db;
