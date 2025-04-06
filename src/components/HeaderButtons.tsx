import React, { useState } from "react";

type HeaderButtonsProps = {
  setCardNumber: (num: number) => void;
};

export default function HeaderButtons({ setCardNumber }: HeaderButtonsProps) {
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const cardNumbers = [16, 32, 64];

  const handleButtonClick = (index: number) => {
    setSelectedButton(selectedButton === index ? null : index);
    if (index === 0) {
      setCardNumber(16);
    }
    if (index === 1) {
      setCardNumber(32);
    }
    if (index === 2) {
      setCardNumber(64);
    }
  };

  return (
    <>
      {cardNumbers.map((num, index) => (
        <button
          key={index}
          className={`cardNumberButton ${
            selectedButton === index ? "selected" : ""
          }`}
          onClick={() => handleButtonClick(index)}
        >
          {num}
        </button>
      ))}
    </>
  );
}
