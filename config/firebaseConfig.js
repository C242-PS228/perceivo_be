const { initalizeApp } from 'firebase/app';
const { getFirestore, collection, doc, docs, addDoc, getDoc, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAHOuUmx0i1bW62yAePUq7pR8RpWI6AWBM",
  authDomain: "sentivue-be.firebaseapp.com",
  projectId: "sentivue-be",
  storageBucket: "sentivue-be.firebasestorage.app",
  messagingSenderId: "271529879590",
  appId: "1:271529879590:web:86ba53c3e87754cf6b5ee7",
  measurementId: "G-J1BGE468PZ",
};

const firebaseApp = initalizeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
