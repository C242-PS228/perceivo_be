import db from './firestoreService.js';

// Tambah Data
export const addDocument = async (collectionName, data) => {
  try {
    const docRef = db.collection(collectionName).doc(); // Buat dokumen baru dengan ID otomatis
    await docRef.set(data); // Simpan data
    return docRef.id;
  } catch (error) {
    throw new Error(`Error adding document: ${error.message}`);
  }
};

// Tambah Data dengan ID Khusus
export const addDocumentWithId = async (collectionName, docId, data) => {
  try {
    await db.collection(collectionName).doc(docId).set(data);
    return docId;
  } catch (error) {
    throw new Error(`Error adding document with ID: ${error.message}`);
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
export const getAllDocuments = async (collectionName) => {
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
