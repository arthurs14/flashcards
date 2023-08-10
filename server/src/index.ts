import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Deck from "./models/Deck";

const app = express();

const PORT = 5001;

// MIDDLEWARE
app.use(express.json());

// ROUTES
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
mongoose.connect("enter url").then(() => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});
