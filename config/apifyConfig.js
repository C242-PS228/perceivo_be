import { ApifyClient } from 'apify-client';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.APIFY_API_KEY;
const client = new ApifyClient({
  token: apiKey,
});

/**
 * Calls an Apify actor and returns the items from its dataset.
 *
 * @param {object} input - The input object for the Apify actor.
 * @param {string} platform - The Apify actor ID.
 *
 * @returns {(object[]|null)} The items from the dataset or null if there was an error.
 */
const apifyConnect = async (input, platform) => {
  try {
    console.log('Calling Apify with platform:', platform); // Debug log
    const run = await client.actor(platform).call(input);
    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    if (!Array.isArray(items)) {
      return null;
    }

    return items;

  } catch (error) {
    console.error('Apify error:', error); // Debug log
    return null;
  }
};

export default apifyConnect;