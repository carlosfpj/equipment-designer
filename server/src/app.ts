import "dotenv/config";
import express, { NextFunction, Request, Response } from 'express';
import lineSize from "./models/lineSize";
import linecalc from "./calc/line";

const app = express();

app.get('/', async (req, res, next) => {
  try {
    const line = await lineSize.find().exec();
    const lineDiameter =  await linecalc(2,2);
    res.status(200).json(lineDiameter);
  } catch (error) {
    next(error);
  }
});

app.use((req, res, next) => {
  next(Error('Endpoint not found'));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error("el error entró al primer middleware");
  let errorMessage = "an unknown Error ocurred";
  if (error instanceof Error) {
    errorMessage = error.message;
    res.status(500).json({ error: errorMessage });
  }
});

export default app;