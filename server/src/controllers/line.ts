import { RequestHandler } from "express";
// import linecalc from '../calc/line';
import lineSize from "../models/lineSize";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getlines: RequestHandler = async (req , res, next) => {
  try {
    const line = await lineSize.find().exec();
    // const lineDiameter = await linecalc(2, 2);
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
  title?: string,
  flow?: number,
}

export const createline: RequestHandler<unknown, unknown, CreateLine, unknown> = async (req, res, next) => {
  const titulo = req.body.title;
  const flow = req.body.flow;
  try {
    if(!titulo || !flow) {
      throw createHttpError(400, "Line calculations must have flow or title");
    }
    const newLine = await lineSize.create({
      title: titulo,
      flow: flow,
    });
    res.status(201).json(newLine);
  } catch (error) {
    next(error)
  }
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