import { Router } from "express";
import { postURL } from "../controllers/postURL.js";
import getURL from "../controllers/getURL.js";
import getLinks from "../controllers/getLinks.js";

const urlRouter = Router();

urlRouter.post("/", postURL);

urlRouter.get('/links', getLinks)

urlRouter.get('/:id', getURL);

export default urlRouter;