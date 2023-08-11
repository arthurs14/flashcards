import { useEffect, useState } from "react";
import "./App.css";

type TDeck = {
  _id: string;
  title: string;
};

function App() {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:5001/decks");
      const newDecks = await response.json();
      setDecks(newDecks.data);
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5001/decks", {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deck = await response.json();
    setDecks([...decks, deck]);
    setTitle("");
  };

  const handleDeleteDeck = async (deckId: string) => {
    await fetch(`http://localhost:5001/decks/${deckId}`, {
      method: "DELETE",
    });
    setDecks(decks.filter((deck) => deck._id !== deckId));
  };

  return (
    <div className="App">
      <ul className="decks">
        {decks.map((deck) => (
          <li key={deck._id}>
            <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
            {deck.title}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label htmlFor="deck-title">Deck Title</label>
        <input
          id="deck-title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />
        <button>Create Deck</button>
      </form>
    </div>
  );
}

export default App;
