import { useState } from "react";
import Square from "./Square";

const WIN_CONDITION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const PLAYER = {
  X: "X",
  O: "O",
};
export const Board = () => {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameOverText, setGameOverText] = useState("");
  const [gameStatus, setGameStatus] = useState(true);
  const [boardStatus, setBoardStatus] = useState(Array(9).fill(""));
  const restartGame = () => {
    setBoardStatus(Array(9).fill(""));
    setGameStatus(true);
    setGameOverText("");
    setCurrentPlayer("X");
  };
  const checkWin = (currentPlayer, tempBoard) => {
    return WIN_CONDITION.some((condition) =>
      condition.every((index) => tempBoard[index] === PLAYER[currentPlayer])
    );
  };
  const handleClick = (number) => {
    if (boardStatus[number] === "" && gameStatus) {
      const tempBoard = [...boardStatus];
      tempBoard[number] = PLAYER[currentPlayer];
      setBoardStatus(tempBoard);
      if (checkWin(currentPlayer, tempBoard)) {
        setGameOverText(`Kazanan : ${PLAYER[currentPlayer]}`);
        setGameStatus(false);
        return;
      }
      if (!tempBoard.includes("")) {
        setGameStatus(false);
        setGameOverText("Berabere !");
        return;
      }
      currentPlayer === "X" ? setCurrentPlayer("O") : setCurrentPlayer("X");
    }
  };
  return (
    <div>
      {gameStatus ? (
        <p>
          Current Player :
          <span data-value={currentPlayer}>{currentPlayer}</span>
        </p>
      ) : (
        <p>
          <span data-value={currentPlayer}>{gameOverText}</span>
          <button onClick={restartGame}>Restart</button>
        </p>
      )}
      <div className="board">
        {boardStatus.map((value, index) => (
          <Square
            value={value}
            key={index}
            boxNumber={index}
            handleClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
};
