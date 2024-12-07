import { addDocumentWithId } from './firestoreOperations.js';

const test = async () => {
  try {
    const id = await addDocumentWithId('testCollection', 'customDocId', { name: 'John', age: 30 });
    console.log('Document added with ID:', id);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

test();
