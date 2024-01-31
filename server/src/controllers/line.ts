import { RequestHandler } from "express";
import lineSize from "../models/lineSize";
import createHttpError from "http-errors";
import mongoose from "mongoose";

const ACCEPTED_ORIGINS = [
  'http://localhost:3000/designer/line/singlephase/liquid'
];

interface LiquidParams {
  flow?: string,
  diameter?: string,
  SG?: string,
  liquidDensity?: string,
  liquidViscocity?: string,
}

export const singlePhaseLiquidVelocityParams: RequestHandler<unknown, unknown, LiquidParams, unknown> = async (req, res, next) => {
  const flow = Number(req.body.flow);
  const diameter = Number(req.body.diameter);
  const SG = Number(req.body.SG);
  const liquidDensity = Number(req.body.liquidDensity);
  const liquidViscocity = Number(req.body.liquidViscocity);

  try {
    if (!flow || !diameter) {
      throw createHttpError(400, "Liquid Velocity Must have flow and diameter");
    }
    const liquidVelocity = calculateLiquidVelocity(flow, diameter);

    // if (!SG || !liquidDensity || !liquidViscocity) {
    //   throw createHttpError(400, "Liquid Pressure drop must have SG and liquid density and liquid viscocity")
    // }

    const liquidPressureDrop = calculateLiquidPressureDrop(flow, diameter, SG, liquidDensity, liquidViscocity);

    res.status(200).json({
      liquidVelocity,
      liquidPressureDrop
    });
  } catch (error) {
    next(error)
  }
};

export const singlePhaseLiquidVpParams: RequestHandler<unknown, unknown, LiquidParams, unknown> = async (req, res, next) => {
  const flow = Number(req.body.flow);
  const diameter = Number(req.body.diameter);
  const SG = Number(req.body.SG);
  const liquidDensity = Number(req.body.liquidDensity);
  const liquidViscocity = Number(req.body.liquidViscocity);

  try {
    if (!flow || !diameter) {
      throw createHttpError(400, "Liquid Velocity Must have flow and diameter");
    }
    const liquidVelocity = calculateLiquidVelocity(flow, diameter);

    // if (!SG || !liquidDensity || !liquidViscocity) {
    //   throw createHttpError(400, "Liquid Pressure drop must have SG and liquid density and liquid viscocity")
    // }

    const liquidPressureDrop = calculateLiquidPressureDrop(flow, diameter, SG, liquidDensity, liquidViscocity);

    res.status(200).json({
      liquidVelocity,
      liquidPressureDrop,
      SG,
      liquidDensity,
      liquidViscocity,
    });
  } catch (error) {
    next(error)
  }
};

const calculateLiquidVelocity = (flow: number, diameter: number)=> {
  const calculated_Velocity = ((0.012 * flow) / (diameter ** 2));
  return calculated_Velocity
}

const calculateLiquidPressureDrop = ( flow: number,
                                      diameter: number,
                                      SG: number,
                                      liquidDensity: number,
                                      liquidViscocity: number) => {
  console.log(flow, diameter, SG, liquidDensity, liquidViscocity);
  return flow;
}

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

// const newLine = await lineSize.create({
//   title: titulo,
//   flow: flow,
// });