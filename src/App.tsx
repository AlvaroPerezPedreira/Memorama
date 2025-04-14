import { useEffect, useState } from "react";
import { Fireworks } from "@fireworks-js/react";
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
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [showFireworks, setShowFireworks] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null); // Tiempo de inicio del contador
  const [elapsedTime, setElapsedTime] = useState<number>(0); // Tiempo transcurrido

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
  };

  useEffect(() => {
    getCards(cardNumber);
    setFlipped([]);
    setMatched(new Set());
    setShowFireworks(false);
    setStartTime(null); // Reiniciar el tiempo al cambiar el número de cartas
    setElapsedTime(0); // Reiniciar el tiempo al cambiar el número de cartas
  }, [cardNumber]);

  useEffect(() => {
    if (matched.size === cardNumber) {
      setShowFireworks(true);
    }
  }, [matched, cardNumber]);

  useEffect(() => {
    if (startTime !== null && !showFireworks) {
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTime, showFireworks]);

  const resetGame = () => {
    setFlipped([]);
    setMatched(new Set());
    getCards(cardNumber);
    setShowFireworks(false);
    setStartTime(null); // Reiniciar el tiempo al reiniciar el juego
    setElapsedTime(0); // Reiniciar el tiempo al reiniciar el juego
  };

  const handleCardClick = (index: number) => {
    if (flipped.includes(index) || flipped.length === 2 || matched.has(index))
      return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    // Iniciar el contador con el primer clic en una carta
    if (startTime === null) {
      setStartTime(Date.now());
    }

    if (newFlipped.length === 2) {
      const [firstIndex, secondIndex] = newFlipped;
      const firstEmoji = shuffledCards[firstIndex];
      const secondEmoji = shuffledCards[secondIndex];

      if (firstEmoji === secondEmoji) {
        setMatched((prevMatched) =>
          new Set(prevMatched).add(firstIndex).add(secondIndex)
        );
      }

      setTimeout(() => setFlipped([]), 1000);
    }
  };

  return (
    <div className="mainContainer">
      <div className="headerContainer">
        <span className="mainTitle">Memorama</span>
        <div className="timeContainer">
          {startTime !== null && !showFireworks ? (
            <span className="timeSpan">Time: {elapsedTime}</span>
          ) : (
            <span className="timeSpan">Time: {elapsedTime}</span>
          )}
        </div>
        <div className="buttonContainer">
          <HeaderButtons setCardNumber={setCardNumber} />
        </div>
      </div>
      <div className="gameContainer">
        <div className="gameBoard" data-cards={cardNumber}>
          {shuffledCards.map((emoji, index) => (
            <div
              key={index}
              className={`gameCard ${
                flipped.includes(index) ? "flipped" : ""
              } ${matched.has(index) ? "success" : ""}`}
              onClick={() => handleCardClick(index)}
            >
              <div className="gameCard-front" />
              <div className="gameCard-back">
                <span>{emoji}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="footerContainer">
        <div className="footerButtons">
          <button className="resetButton" onClick={resetGame}>
            Reset
          </button>
        </div>
      </div>
      {showFireworks && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <Fireworks
            options={{
              opacity: 0.5,
            }}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              background: "transparent",
              pointerEvents: "none",
              zIndex: 9999,
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
