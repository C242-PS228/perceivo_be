import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const serviceAccount = JSON.parse(
  readFileSync(new URL('./serviceCredentials.json', import.meta.url))
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://c242-ps228-capstone-team.firebaseio.com',
});

const db = admin.firestore();
export default db;
