import { ApifyClient } from 'apify-client';

const apiKey = 'apify_api_l2kcKwd666TfUk50H5r16tCoIGuTZd0iuWax';
const client = new ApifyClient({
  token: apiKey,
});

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