import dotenv from "dotenv";
dotenv.config();

// middleware/addVersion.js
const addVersion = (req, res, next) => {
  const originalJson = res.json;

  res.json = function (body) {
    const response = {
      version: process.env.APP_VERSION,
      ...body,
    };

    originalJson.call(this, response);
  };

  next();
};

export default addVersion;
