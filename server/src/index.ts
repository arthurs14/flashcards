import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import Deck from "./models/Deck";

// ENVIRONMENT VARIABLES
config();

// START SERVER + PORT
const app = express();
const PORT = process.env.PORT || 5002;

// MIDDLEWARE
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

// ROUTES
app.get("/decks", async (req: Request, res: Response) => {
  try {
    const decks = await Deck.find();

    res.status(200).json({
      status: "success",
      results: decks.length,
      data: decks,
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
});

app.post("/decks", async (req: Request, res: Response) => {
  try {
    const deck = await Deck.create({
      title: req.body.title,
    });

    res.json(deck);
  } catch (err) {
    res.status(404).json({ status: "Fail", message: err });
  }
});

// RUN + CONNECT TO DATABASE
mongoose.connect(process.env.MONGO_URL!).then(() => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});
