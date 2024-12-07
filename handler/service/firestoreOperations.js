import db from './firestoreService.js';

// Tambah Data
export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await db.collection(collectionName).add(data);
    return docRef.id; // Mengembalikan ID dokumen yang baru ditambahkan
  } catch (error) {
    throw new Error(`Error adding document: ${error.message}`);
  }
};

// Hapus Data
export const deleteDocument = async (collectionName, docId) => {
  try {
    await db.collection(collectionName).doc(docId).delete();
    return true;
  } catch (error) {
    throw new Error(`Error deleting document: ${error.message}`);
  }
};

// Ambil Satu Dokumen
export const getDocument = async (collectionName, docId) => {
  try {
    const doc = await db.collection(collectionName).doc(docId).get();
    if (!doc.exists) {
      throw new Error('Document not found!');
    }
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    throw new Error(`Error fetching document: ${error.message}`);
  }
};

// Ambil Semua Dokumen
export const getAllDocuments = async (collectionName, id) => {
  try {
    const snapshot = await db.collection(collectionName).get();
    const data = [];
    snapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  } catch (error) {
    throw new Error(`Error fetching documents: ${error.message}`);
  }
};

export const getDocumentById = async (collectionName, docId) => {
  try {
    const doc = await db.collection(collectionName).doc(docId).get();
    if (!doc.exists) {
      throw new Error('Document not found!');
    }
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    throw new Error(`Error fetching document: ${error.message}`);
  }
};
