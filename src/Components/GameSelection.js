import React from "react";
import "./GameSelection.scss";
import KumbhNavBar from "../KumbhPages/KumbhNavBar";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";

const GameSelection = () => {
  // const [selectedGame, setSelectedGame] = useState(null);
  const navigate = useNavigate();

  return (
    <>
      <KumbhNavBar />
      <div className="game-selection">
        <h1>Choose Your Game</h1>
        <div className="game-containers">
          <div
            className="game-container"
            onClick={() => {navigate("/WordSearch")}}
          >
            <div className="game-card">
              <h2>Word Search</h2>
              <p className="game-description">
                A fun and challenging word search game.
              </p>
            </div>
          </div>
          <div
            className="game-container"
            onClick={() => {navigate('/CandyCrush')}}
          >
            <div className="game-card">
              <h2>Candy Crush</h2>
              <p className="game-description">
                Match candies and crush them for points.
              </p>
            </div>
          </div>
        </div>
        {/* {selectedGame && (
          <p className="selected-game">You selected: {selectedGame}</p>
        )} */}
      </div>
      <Footer />
    </>
  );
};

export default GameSelection;
