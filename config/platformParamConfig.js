/* eslint-disable no-unused-vars */
const inputConfig = (platform, link, resultLimit) => {
  let input = {};

  switch (platform) {
  case 'instagram':
    return input = {
      directUrls: [link],
      resultsLimit: resultLimit || 1,
    };
  case 'tiktok':
    return input = {
      postURLs: [link],
      commentsPerPost: resultLimit || 1,
    };
  case 'youtube':
    return input = {
      startUrls: [{
        url: link
      }],
      maxComments: resultLimit || 1,
    };
  case 'googlemaps':
    return input = {
      startUrls: [{
        url: link
      }],
      maxReviews: resultLimit || 1,
      language: 'en'
    };
  default:
    return false;
  }
};

export default inputConfig;