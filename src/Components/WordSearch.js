import React, { useState, useEffect, useCallback } from "react";
import "./WordSearch.scss";
import KumbhNavBar from "../KumbhPages/KumbhNavBar";
import Footer from "../Footer";

const WordSearch = () => {
  // List of words to choose from for random generation
  const possibleWords = [
    "SADHU",
    "SNAN",
    "PRASAD",
    "TEMPLE",
    "PILGRIM",
    "RIVER",
    "MELAS",
    "HARMONY",
    "SPIRIT",
    "DEVOTION",
  ];

  // Function to randomly select words for the grid
  const generateRandomWords = (numWords) => {
    const randomWords = [];
    while (randomWords.length < numWords) {
      const randomIndex = Math.floor(Math.random() * possibleWords.length);
      const word = possibleWords[randomIndex];
      if (!randomWords.includes(word)) {
        randomWords.push(word);
      }
    }
    return randomWords;
  };

  const gridSize = 10;
  const [wordsToFind, setWordsToFind] = useState(generateRandomWords(5)); // Randomly generate 5 words

  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [selectedWord, setSelectedWord] = useState("");
  const [foundWords, setFoundWords] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  // useCallback to memoize initializeGrid to avoid unnecessary re-creations
  const initializeGrid = useCallback(() => {
    let newGrid = Array.from({ length: gridSize }, () =>
      Array(gridSize).fill("")
    );
    wordsToFind.forEach((word) => placeWord(word, newGrid));
    fillRemainingGrid(newGrid);
    setGrid(newGrid);
  }, [wordsToFind]);

  const placeWord = (word, grid) => {
    const direction = Math.random() > 0.5 ? "horizontal" : "vertical";
    let startRow, startCol;

    do {
      startRow = Math.floor(Math.random() * gridSize);
      startCol = Math.floor(Math.random() * gridSize);

      const fits =
        direction === "horizontal"
          ? startCol + word.length <= gridSize
          : startRow + word.length <= gridSize;

      if (fits) {
        let overlaps = false;
        for (let i = 0; i < word.length; i++) {
          const row = direction === "horizontal" ? startRow : startRow + i;
          const col = direction === "horizontal" ? startCol + i : startCol;

          if (grid[row][col] && grid[row][col] !== word[i]) {
            overlaps = true;
            break;
          }
        }

        if (!overlaps) {
          for (let i = 0; i < word.length; i++) {
            const row = direction === "horizontal" ? startRow : startRow + i;
            const col = direction === "horizontal" ? startCol + i : startCol;
            grid[row][col] = word[i];
          }
          return;
        }
      }
    } while (true);
  };

  const fillRemainingGrid = (grid) => {
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (!grid[row][col]) {
          grid[row][col] = String.fromCharCode(
            65 + Math.floor(Math.random() * 26)
          );
        }
      }
    }
  };

  // Timer logic
  const startTimer = () => {
    const interval = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
    setTimerInterval(interval);
  };

  const handleCellClick = (row, col, letter) => {
    if (isGameOver || letter === "") return;

    const newSelectedWord = selectedWord + letter;
    setSelectedWord(newSelectedWord);

    if (wordsToFind.includes(newSelectedWord)) {
      setFoundWords((prev) => [...prev, newSelectedWord]);
      setSelectedWord("");
      setScore(score + 10);
    }
  };

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleContinueGame = () => {
    // Reset game state for a new round
    setWordsToFind(generateRandomWords(5));
    setGrid([]);
    setScore(0);
    setSelectedWord("");
    setFoundWords([]);
    setIsGameOver(false);
    setTimeElapsed(0);
  };

  useEffect(() => {
    initializeGrid();
    startTimer();

    return () => {
      clearInterval(timerInterval);
    };
  }, [initializeGrid, timerInterval]); // Added `initializeGrid` and `timerInterval` to the dependencies

  useEffect(() => {
    if (foundWords.length === wordsToFind.length) {
      clearInterval(timerInterval);
      setIsGameOver(true);
    }
  }, [foundWords, wordsToFind.length, timerInterval]); // Added `wordsToFind.length` and `timerInterval`

  return (
    <>
      <KumbhNavBar />
      <div className="word-search">
        <h1>Kumbh Word Search</h1>
        <div className="timer">Time: {formatTime(timeElapsed)}</div>
        <div className="score">Score: {score}</div>

        <div className="game-container">
          <div
            className="grid"
            style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
          >
            {grid.map((row, rowIndex) =>
              row.map((letter, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`cell ${
                    selectedWord.includes(letter) ? "selected" : ""
                  }`}
                  onClick={() => handleCellClick(rowIndex, colIndex, letter)}
                >
                  {letter}
                </div>
              ))
            )}
          </div>
          <div className="word-list">
            <h3>Find These Words:</h3>
            <ul>
              {wordsToFind.map((word, index) => (
                <li
                  key={index}
                  className={foundWords.includes(word) ? "found" : ""}
                >
                  {word}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {isGameOver && (
          <div className="congrats">
            <h2>🎉 Congratulations! You Found All Words! 🎉</h2>
            <p>Score: {score}</p>
            <p>Time: {formatTime(timeElapsed)}</p>
            <button onClick={handleContinueGame}>
              Yes, Continue to Next Round
            </button>
          </div>
        )}

        <footer>Learn more about Kumbh Mela while having fun!</footer>
      </div>
      <Footer />
    </>
  );
};

export default WordSearch;
