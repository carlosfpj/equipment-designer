import "dotenv/config";
import express, { NextFunction, Request, Response } from 'express';
import createHttpError, {isHttpError} from "http-errors";
import cors from 'cors';
import homeRouter from "./routes/homerouter";
import router from "./routes/line";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", homeRouter);
app.use("/line/singlephase/", router );

app.use((req, res, next) => {
  const error = createHttpError(404, "url not found in equipment designer");
  next(error);
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknow error ocurred"
  let statusCode = 500;
  if(isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json(errorMessage);
});

export default app;