import "dotenv/config";
import express from 'express';
import lineSize from "./models/lineSize";

const app = express();

app.get('/', async (req, res) => {
  const line = await lineSize.find().exec();
  res.status(200).json(line);
});

export default app;