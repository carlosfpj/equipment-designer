import { RequestHandler } from "express";

export const getHome:RequestHandler = async (req,res,next) => {
  res.send("<h1>AQUI ES EL HOME DEL BACK<h1>");
};