import express from "express";
import { generateArticle, generateImage, generateTitle, getUserCreations } from "../controllers/aiController.js";
import { auth } from "../middleware/auth.js";

const aiRouter= express.Router();

aiRouter.post('/create-article', auth, generateArticle);
aiRouter.post('/gen-titles', auth, generateTitle);
aiRouter.post('/gen-images', auth, generateImage);
aiRouter.post('/', auth, getUserCreations);

export default aiRouter;