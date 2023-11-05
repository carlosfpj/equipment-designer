import "dotenv/config";
import express, { NextFunction, Request, Response } from 'express';
import router from "./routes/line";
const app = express();

app.use(express.json());
app.use("/line", router );

app.use((req, res) => {
  const error = {
    title: Error,
    content: "No se encuentra la url solicitada",
  }
  res.status(500).json(error);
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error("el error entró al primer middleware");
  let errorMessage = "an unknown Error ocurred";
  if (error instanceof Error) {
    errorMessage = error.message;
    console.error('el error entró en el if');
    res.status(500).json({ error: errorMessage });
  }
});

export default app;