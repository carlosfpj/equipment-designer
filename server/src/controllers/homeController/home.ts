import { RequestHandler } from "express";

export const getHome:RequestHandler = async (req,res,next) => {
  res.send("get home/");
};