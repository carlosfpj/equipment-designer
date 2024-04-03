import { RequestHandler } from "express";
import lineSize from "../models/lineSize";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import absolutePipeRoughnessConstants from "../util/roughness";

const ACCEPTED_ORIGINS = [
  'http://localhost:3000/designer/line/singlephase/liquid'
];

interface LiquidParams {
  flow?: string,
  diameter?: string,
  SG?: string,
  liquidDensity?: string,
  liquidViscocity?: string,
  pipeMaterialID?: string,
}

export const singlePhaseLiquidVelocityParams: RequestHandler<unknown, unknown, LiquidParams, unknown> = async (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');

  const flow = Number(req.body.flow);
  const diameter = Number(req.body.diameter);

  console.log("los parametros de velocidad han llegado al server");

  try {
    if (!flow || !diameter) {
      throw createHttpError(400, "Liquid Velocity Must have flow and diameter");
    }
    const liquidVelocity:number = await calculateLiquidVelocity(flow, diameter);
    console.log(liquidVelocity);
    res.status(200).json(liquidVelocity);
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
  const pipeMaterialID = Number(req.body.pipeMaterialID);
  const diameterFeet = (diameter / 12);

  console.log(
    "flujo: " + flow,
    "diametro: " + diameter,
    "Specific Gravity: " + SG,
    "DensidadLiquido: " + liquidDensity,
    "ViscocidadLiquido: " + liquidViscocity,
    "materialId: " + pipeMaterialID);

  try {
    if (!flow || !diameter) {
      throw createHttpError(400, "Liquid Velocity Must have flow and diameter");
    }
    const liquidVelocity = Number(await calculateLiquidVelocity(flow, diameter));
    const Re = await calculateReynolds(liquidDensity, diameterFeet, liquidVelocity, liquidViscocity);
    const pipeRelativeRoughness = await calculateRelativePipeRoughness(pipeMaterialID, diameter);
    const f = await calculateMoodyFrictionFactor(Re, diameter, pipeRelativeRoughness);
    const liquidPressureDrop = await calculateLiquidPressureDrop(flow, diameter, SG, f);

    console.log("PD es: " + liquidPressureDrop);
    res.status(200).json({
      liquidVelocity,
      liquidPressureDrop,
    });
  } catch (error) {
    next(error)
  }
};

const calculateLiquidVelocity = async (flow: number, diameter: number) => {
  const calculated_Velocity = ((0.012 * flow) / (diameter ** 2));
  return calculated_Velocity;
}

const calculateLiquidPressureDrop = async ( flow: number,
                                      diameter: number,
                                      SG: number,
                                      f: number) => {

  const DP = (((0.00115 * f) * (flow**2) * SG)/ (diameter**5))
  return DP;
}

const calculateReynolds = async (liquidDensity: number,
                           diameterFeet: number,
                           liquidVelocity: number ,
                           liquidViscocity: number) => {

  console.log("densidad: " + liquidDensity + " diametro: " + diameterFeet + " velocidad: " + liquidVelocity + "viscocidad: " + liquidViscocity);


  const Re = ((liquidDensity * diameterFeet * liquidVelocity) / (liquidViscocity));
  console.log("Re es: " + Re);
  return Re;
}

const calculateRelativePipeRoughness = async (pipeMaterialID: number, diameter: number) => {

  const material = absolutePipeRoughnessConstants.find((element) => element.id === pipeMaterialID);
  const coefficients = material?.prop.feet;
  let averageAbsoluteCoefficient = 0;
  let pipeRelativeRoughness = 0

  if(coefficients?.MaxCoeff !== undefined && coefficients.MinCoeff !== undefined) {
    averageAbsoluteCoefficient = (coefficients?.MinCoeff + coefficients?.MaxCoeff) / 2;
    pipeRelativeRoughness = averageAbsoluteCoefficient / diameter;
  } else {
    //error handling
  }
  return pipeRelativeRoughness;
}

const calculateMoodyFrictionFactor = async (Reynolds: number, diameter: number, pipeRelativeRoughness: number) => {

  let f = 0;
  if(Reynolds <= 2300) {
    f = calculateMoodyLaminarFrictionFactor(Reynolds)
  } else if( Reynolds > 2300) {
    let init = 0.001;
    const tolerance = 0.00000001;
    do {
      init = f;
      f = calculateMoodyTurbulentFrictionFactor(Reynolds, diameter, pipeRelativeRoughness, init);
    } while (f - init > tolerance)
  }
  console.log("f es: " + f);
  return f;
}


const calculateMoodyLaminarFrictionFactor = async (Reynolds: number) => {
  return (64 / Reynolds)
};

const calculateMoodyTurbulentFrictionFactor = async (Reynolds: number,
                                               diameter: number,
                                               pipeRoughness: number,
                                               init: number) => {

  return 0.0055 * Math.pow((1+((20000 * pipeRoughness)+ (1000000/Reynolds))), 1/3)
};

//*-*-*-*-*-*-*END-*-*-*-*-*-*-*-*-//
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