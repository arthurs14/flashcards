import mongoose from "mongoose";

// const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const deckSchema = new mongoose.Schema({
  title: String,
});

const Deck = mongoose.model("Deck", deckSchema);

export default Deck;
