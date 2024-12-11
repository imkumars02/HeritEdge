import React, { useState, useEffect, useCallback } from "react";
import "./CandyCrush.scss";
import KumbhNavBar from "../KumbhPages/KumbhNavBar";
import Footer from "../Footer";

const candyImages = {
  Blue: require("../Images/Candy/Blue.png"),
  Orange: require("../Images/Candy/Orange.png"),
  Green: require("../Images/Candy/Green.png"),
  Yellow: require("../Images/Candy/Yellow.png"),
  Red: require("../Images/Candy/Red.png"),
  Purple: require("../Images/Candy/Purple.png"),
  blank: require("../Images/Candy/blank.png"),
};

const candyTypes = Object.keys(candyImages).filter((type) => type !== "blank");

const rows = 6;
const columns = 6;

const CandyCrush = () => {
  const [board, setBoard] = useState([]);
  const [score, setScore] = useState(0);
  const [currTile, setCurrTile] = useState(null);
  const [otherTile, setOtherTile] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const randomCandy = useCallback(
    () => candyTypes[Math.floor(Math.random() * candyTypes.length)],
    []
  );

  const createBoard = useCallback(() => {
    const newBoard = [];
    for (let r = 0; r < rows; r++) {
      const row = [];
      for (let c = 0; c < columns; c++) {
        const candyType = randomCandy();
        row.push({ id: `${r}-${c}`, type: candyType });
      }
      newBoard.push(row);
    }
    return newBoard;
  }, [randomCandy]);

  const slideCandy = useCallback(
    (boardState) => {
      const newBoard = JSON.parse(JSON.stringify(boardState));

      for (let c = 0; c < columns; c++) {
        let ind = rows - 1;
        for (let r = rows - 1; r >= 0; r--) {
          if (newBoard[r][c].type !== "blank") {
            newBoard[ind][c].type = newBoard[r][c].type;
            ind--;
          }
        }
        for (let r = ind; r >= 0; r--) {
          newBoard[r][c].type = randomCandy();
        }
      }

      return newBoard;
    },
    [randomCandy]
  );

  const crushCandy = useCallback(
    (boardState) => {
      const newBoard = JSON.parse(JSON.stringify(boardState));
      let crushed = false;
      let scoreIncrease = 0;

      // Check for horizontal matches
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
          const candy1 = newBoard[r][c];
          const candy2 = newBoard[r][c + 1];
          const candy3 = newBoard[r][c + 2];
          if (
            candy1.type === candy2.type &&
            candy2.type === candy3.type &&
            candy1.type !== "blank"
          ) {
            candy1.type = "blank";
            candy2.type = "blank";
            candy3.type = "blank";
            crushed = true;
            scoreIncrease += 30;
          }
        }
      }

      // Check for vertical matches
      for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 2; r++) {
          const candy1 = newBoard[r][c];
          const candy2 = newBoard[r + 1][c];
          const candy3 = newBoard[r + 2][c];
          if (
            candy1.type === candy2.type &&
            candy2.type === candy3.type &&
            candy1.type !== "blank"
          ) {
            candy1.type = "blank";
            candy2.type = "blank";
            candy3.type = "blank";
            crushed = true;
            scoreIncrease += 30;
          }
        }
      }

      if (crushed) {
        return {
          crushed,
          score: scoreIncrease,
          newBoard: slideCandy(newBoard),
        };
      }

      return { crushed, score: scoreIncrease, newBoard };
    },
    [slideCandy]
  );

  const checkPossibleMoves = useCallback((boardState) => {
    // Check horizontal moves
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns - 1; c++) {
        if (boardState[r][c].type === boardState[r][c + 1].type) {
          if (
            (c > 0 && boardState[r][c - 1].type === boardState[r][c].type) ||
            (c < columns - 2 &&
              boardState[r][c + 2].type === boardState[r][c].type) ||
            (r > 0 && boardState[r - 1][c].type === boardState[r][c].type) ||
            (r < rows - 1 &&
              boardState[r + 1][c].type === boardState[r][c].type)
          ) {
            return true;
          }
        }
      }
    }

    // Check vertical moves
    for (let c = 0; c < columns; c++) {
      for (let r = 0; r < rows - 1; r++) {
        if (boardState[r][c].type === boardState[r + 1][c].type) {
          if (
            (r > 0 && boardState[r - 1][c].type === boardState[r][c].type) ||
            (r < rows - 2 &&
              boardState[r + 2][c].type === boardState[r][c].type) ||
            (c > 0 && boardState[r][c - 1].type === boardState[r][c].type) ||
            (c < columns - 1 &&
              boardState[r][c + 1].type === boardState[r][c].type)
          ) {
            return true;
          }
        }
      }
    }

    return false;
  }, []);

  const checkGameOver = useCallback(
    (boardState) => {
      const isAllBlank = boardState.every((row) =>
        row.every((tile) => tile.type === "blank")
      );
      const hasPossibleMoves = checkPossibleMoves(boardState);

      return isAllBlank || !hasPossibleMoves;
    },
    [checkPossibleMoves]
  );

  useEffect(() => {
    const newBoard = createBoard();
    setBoard(newBoard);
    setGameOver(false);
    setScore(0);
  }, [createBoard]);

  const dragStart = (e, tile) => setCurrTile(tile);
  const dragOver = (e) => e.preventDefault();
  const dragEnter = (e) => e.preventDefault();
  const dragLeave = (e) => e.preventDefault();
  const dragDrop = (e, tile) => setOtherTile(tile);

  const dragEnd = useCallback(() => {
    if (!currTile || !otherTile) return;

    const [r1, c1] = currTile.id.split("-").map(Number);
    const [r2, c2] = otherTile.id.split("-").map(Number);
    const isAdjacent =
      (r2 === r1 && Math.abs(c2 - c1) === 1) ||
      (c2 === c1 && Math.abs(r2 - r1) === 1);

    if (isAdjacent) {
      const newBoard = [...board];
      const currType = currTile.type;
      const otherType = otherTile.type;
      newBoard[r1][c1].type = otherType;
      newBoard[r2][c2].type = currType;

      const crushResult = crushCandy(newBoard);
      if (crushResult.crushed) {
        setBoard(crushResult.newBoard);
        setScore((prevScore) => prevScore + crushResult.score);

        if (checkGameOver(crushResult.newBoard)) {
          setGameOver(true);
        }
      } else {
        // If no match, swap back
        newBoard[r1][c1].type = currType;
        newBoard[r2][c2].type = otherType;
        setBoard(newBoard);
      }
    }

    setCurrTile(null);
    setOtherTile(null);
  }, [board, currTile, otherTile, crushCandy, checkGameOver]);

  const resetGame = () => {
    const newBoard = createBoard();
    setBoard(newBoard);
    setGameOver(false);
    setScore(0);
  };

  return (
    <>
      <KumbhNavBar />
      <div className="game-container">
        <h1 className="CandyHead">Score: {score}</h1>
        {gameOver ? (
          <div className="game-over">
            <h2>Congratulations!</h2>
            <p>You've completed the game with a score of {score}!</p>
            <button onClick={resetGame}>Play Again</button>
          </div>
        ) : (
          <div id="board">
            {board.map((row, rIdx) =>
              row.map((tile, cIdx) => (
                <img
                  key={`${rIdx}-${cIdx}`}
                  id={tile.id}
                  src={candyImages[tile.type]}
                  alt={tile.type}
                  draggable
                  onDragStart={(e) => dragStart(e, tile)}
                  onDragOver={dragOver}
                  onDragEnter={dragEnter}
                  onDragLeave={dragLeave}
                  onDrop={(e) => dragDrop(e, tile)}
                  onDragEnd={dragEnd}
                  className="CandyImg"
                />
              ))
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CandyCrush;
