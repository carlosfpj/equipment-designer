import { RequestHandler } from "express";
import lineSize from "../models/lineSize";
import createHttpError from "http-errors";
import mongoose from "mongoose";

const ACCEPTED_ORIGINS = [
  'http://localhost:3000/designer/line/singlephase/liquid'
]

export const getlines: RequestHandler = async (req , res, next) => {
  try {
    const line = await lineSize.find().exec();
    res.status(200).json(line);
  } catch (error) {
    next(error);
  }
};

export const getline: RequestHandler = async (req, res, next) => {
  const lineId = req.params.lineId;
    try {
      if(!mongoose.isValidObjectId(lineId)) {
        throw createHttpError(400, "Invalid noteID");
      }
      const line = await lineSize.findById(lineId).exec();
      if(!line) {
        throw createHttpError(404, "Note not found");
      }
      res.status(200).json(line);
    } catch (error) {
      next(error);
    }
}
interface CreateLine {
  flow?: string,
  diameter?: string,
}

export const createline: RequestHandler<unknown, unknown, CreateLine, unknown > = async (req, res, next) => {
  console.log(req.body);
  const flow = req.body.flow;
  const diameter = req.body.diameter;
  console.log(flow);

  console.log("el flujo es este: " + flow + " y el diametro es este: " + diameter)
  // try {
  //   if(!flow || !diameter) {
  //     throw createHttpError(400, "Line calculations must have flow or diameter");
  //   }
  //   // const newLine = await lineSize.create({
  //   //   title: titulo,
  //   //   flow: flow,
  //   // });
  //   const newLine = flow + diameter;
  //   console.log(newLine)
  //   res.status(201).json(newLine);
  // } catch (error) {
  //   next(error)
  // }
};


interface updateLineParams {
  lineId: string,
}
interface updateLineBody {
  title?: string,
  flow?: number,
}

export const updateLine: RequestHandler<updateLineParams, unknown, updateLineBody, unknown> = async(req, res, next) => {
  const lineId = req.params.lineId;
  const newTitle = req.body.title;
  const newFlow = req.body.flow;

  try {
    if (!mongoose.isValidObjectId(lineId)) {
      throw createHttpError(400, "Invalid lineId");
    }
    if (!newFlow || !newTitle) {
      throw createHttpError(400, "Line edit must have flow and title");
    }
    const line = await lineSize.findById(lineId).exec();
    if (!line) {
      throw createHttpError(404, "Note not found");
    }

    line.title = newTitle || '';
    line.flow = newFlow;

    const updatedLine = await line.save();

    res.status(200).json(updatedLine);
  } catch (error) {
    next(error);
  }
}

export const deleteLine: RequestHandler = async(req,res,next) => {
  const lineId = req.params.lineId;
  try {
    if (!mongoose.isValidObjectId(lineId)) {
      throw createHttpError(400, "Invalid lineId");
    }

    const line = await lineSize.findById(lineId).exec();

    if (!line) {
      throw createHttpError(404, "Note not found");
    }

    await line.deleteOne();

    res.sendStatus(204);

  } catch (error) {
    next(error);
  }
}

export const getImages: RequestHandler = async (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  try {
    console.log('respuesta OK CORS');
  } catch (error) {
    console.log(error);
  }
}