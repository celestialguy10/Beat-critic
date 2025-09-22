import express from "express";
import "dotenv/config";
import ConnectDatabse from "./db/mongodb.js";
import albumRoutes from "./routers/album.route.js";
import reviewRoutes from "./routers/review.route.js";
import cors from "cors";

const port = process.env.PORT;

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
ConnectDatabse();

app.use("/api/v1/album", albumRoutes);
app.use("/api/v1/review", reviewRoutes);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
