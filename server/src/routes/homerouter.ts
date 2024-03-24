import express from "express";
import {getHome} from "./../controllers/homeController/home";


const homeRouter = express.Router();

homeRouter.get("/", getHome);


export default homeRouter;