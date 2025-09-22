import express from "express";
import {
  getAllAlbums,
  getsingleAlbum,
  topRatedAlbums,
  recentlyRatedAlbums,
} from "../controllers/album.controller.js";

const router = express.Router();

router.get("/", getAllAlbums);
router.get("/details", getsingleAlbum);
router.get("/top-rated", topRatedAlbums);
router.get("/recently-rated", recentlyRatedAlbums);

export default router;
