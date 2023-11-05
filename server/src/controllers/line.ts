import { RequestHandler } from "express";
import linecalc from '../calc/line';
import lineSize from "../models/lineSize";

export const getline: RequestHandler = async (req , res, next) => {
  try {
    //const line = await lineSize.find().exec();
    const lineDiameter = await linecalc(2, 2);
    res.status(200).json(lineDiameter);
  } catch (error) {
    next(error);
  }
};

export const createline: RequestHandler = async (req, res, next) => {
  const titulo = req.body.title;
  const flow = req.body.flow;
  try {
    const newLine = await lineSize.create({
      title: titulo,
      flow: flow,
    });
    res.status(201).json(newLine);
  } catch (error) {
    next(error)
  }
}