import express from "express";
import mainRouter from "./routes/mainRouter.routes.js";
import cron from "node-cron";
import { fetchAndStorePrice } from "./controllers/priceController.controllers.js";
import { asyncCronHandler } from "./utils/asyncHandler.js";

const app = express();
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));

//http://localhost:8000/api/v1/transactions/:address
app.use("/api/v1", mainRouter);

cron.schedule(
  "*/1 * * * *",
  asyncCronHandler(async () => {
    await fetchAndStorePrice();
    console.log("Ethereum price fetched and stored");
  })
);

export { app };
