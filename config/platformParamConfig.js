/* eslint-disable no-unused-vars */
const inputConfig = (platform, link, resultLimit) => {
  let input = {};

  switch (platform) {
  case 'instagram':
    return input = {
      directUrls: Array.isArray(link) ? link : [link],
      resultsLimit: resultLimit || 1,
    };
  case 'tiktok':
    return input = {
      postURLs: Array.isArray(link) ? link : [link],
      commentsPerPost: resultLimit || 1,
    };
  case 'youtube':
    return input = {
      startUrls: Array.isArray(link)
        ? link.map((url) => ({ url }))
        : [{ url: link }],
      maxComments: resultLimit || 1,
    };
  case 'googlemaps':
    return input = {
      startUrls: Array.isArray(link)
        ? link.map((url) => ({ url }))
        : [{ url: link }],
      maxReviews: resultLimit || 1,
      language: 'en'
    };
  default:
    return false;
  }
};

export default inputConfig;