import express from "express";
import { AddReview, GetReviews } from "../controllers/review.controller.js";

const router = express.Router();

router.post("/", AddReview);
router.get("/", GetReviews);

export default router;
