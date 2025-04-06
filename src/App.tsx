import { useEffect, useState } from "react";
import "./App.css";
import HeaderButtons from "./components/HeaderButtons";
import {
  EMOJIS_8_PAIRS,
  EMOJIS_16_PAIRS,
  EMOJIS_32_PAIRS,
} from "./utils/constants";
import { getShuffledPairs } from "./utils/functions";

function App() {
  const [cardNumber, setCardNumber] = useState<number>(16);
  const [shuffledCards, setShuffledCards] = useState<string[]>([]);

  const getCards = (cardNumber: number) => {
    let selectedEmojis;

    if (cardNumber === 16) {
      selectedEmojis = EMOJIS_8_PAIRS;
    } else if (cardNumber === 32) {
      selectedEmojis = EMOJIS_16_PAIRS;
    } else {
      selectedEmojis = EMOJIS_32_PAIRS;
    }

    const shuffled: string[] = getShuffledPairs([...selectedEmojis]);
    setShuffledCards(shuffled);
    console.log("Shuffled Cards:", shuffled);
  };

  useEffect(() => {
    getCards(cardNumber);
  }, [cardNumber]);

  return (
    <div className="mainContainer">
      <div className="headerContainer">
        <span className="mainTitle">Memorama</span>
        <div className="buttonContainer">
          <HeaderButtons setCardNumber={setCardNumber} />
        </div>
      </div>
      <div className="gameContainer">
        <div className="gameBoard" data-cards={cardNumber}>
          {shuffledCards.map((emoji, index) => (
            <div key={index} className="gameCard">
              {emoji}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
