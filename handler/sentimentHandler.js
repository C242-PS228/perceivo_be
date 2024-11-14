import sentiment from "../db/sentiment.js";
import { nanoid } from "nanoid";

const showAllSentimentHandler = (req, res) => {
  res.status(200).json({
    status: "success",
    data: sentiment,
  });
};

const showSentimentHandler = (req, res) => {
  const { id } = req.params;

  const findSentiment = sentiment.filter((data) => data.id == id);

  if (!findSentiment.length === 0) {
    res.status(200).json({
      status: "success",
      data: findSentiment[0],
    });
  }

  res.status(404).json({
    status: "fail",
    message: "data not found!",
  });
};

const createSentimentHandler = (req, res) => {
  const { link, platformName, status, resume } = req.body;

  const id = nanoid(16);

  sentiment.push({
    id: id,
    platformName: platformName,
    link: link,
    status: status,
    resume: resume,
  });

  res.status(200).json({
    status: "success",
    message: "success add analyst",
    sentimentId: id,
  });
};

const sentimentHandler = {
  showAllSentimentHandler,
  showSentimentHandler,
  createSentimentHandler
};

export default sentimentHandler;