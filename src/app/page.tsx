"use client";
import { useState, useEffect } from "react";
import { AppTitle, Box } from "@/components";

type GridProps = RowProps[];
type RowProps = BoxProps[];
type BoxProps = null | boolean;

export default function Home() {
  const [grid, setGrid] = useState<GridProps>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [xTurn, setXTurn] = useState(true);
  const [errorShown, setErrorShown] = useState(false);
  const [playable, setPlayable] = useState(true);

  useEffect(() => {
    calculateLogic(grid);
  }, [grid]);

  const handleInput = (index: number, innerIndex: number) => {
    if (!playable) {
      setErrorShown(true);
      setTimeout(() => {
        setErrorShown(false);
      }, 1000);
      return;
    }
    if (grid[index][innerIndex] !== null) {
      setErrorShown(true);
      setTimeout(() => {
        setErrorShown(false);
      }, 1000);
      return;
    }
    setGrid((oldGrid) => {
      oldGrid[index][innerIndex] = xTurn ? true : false;
      // calculateLogic(oldGrid);
      return [...oldGrid];
    });
    setXTurn((prev) => !prev);
  };

  const calculateLogic = (grid: GridProps) => {
    // * check Row
    if (new Set(grid[0]).size == 1 && grid[0][0] != null) {
      grid[0][0] == true ? announceWinner("X wins") : announceWinner("O wins");
      setPlayable(false);
      return;
    }
    if (new Set(grid[1]).size == 1 && grid[1][0] != null) {
      grid[1][0] == true ? announceWinner("X wins") : announceWinner("O wins");
      setPlayable(false);
      return;
    }
    if (new Set(grid[2]).size == 1 && grid[2][0] != null) {
      grid[2][0] == true ? announceWinner("X wins") : announceWinner("O wins");
      setPlayable(false);
      return;
    }

    // * check Columns
    if (
      new Set([grid[0][0], grid[1][0], grid[2][0]]).size == 1 &&
      grid[0][0] != null
    ) {
      grid[0][0] == true ? announceWinner("X wins") : announceWinner("O wins");
      setPlayable(false);
      return;
    }
    if (
      new Set([grid[0][1], grid[1][1], grid[2][1]]).size == 1 &&
      grid[0][1] != null
    ) {
      grid[0][1] == true ? announceWinner("X wins") : announceWinner("O wins");
      setPlayable(false);
      return;
    }
    if (
      new Set([grid[0][2], grid[1][2], grid[2][2]]).size == 1 &&
      grid[0][2] != null
    ) {
      grid[0][2] == true ? announceWinner("X wins") : announceWinner("O wins");
      setPlayable(false);
      return;
    }

    // * check diagonals
    if (
      new Set([grid[0][0], grid[1][1], grid[2][2]]).size == 1 &&
      grid[0][0] != null
    ) {
      grid[0][0] == true ? announceWinner("X wins") : announceWinner("O wins");
      setPlayable(false);
      return;
    }
    if (
      new Set([grid[0][2], grid[1][1], grid[2][0]]).size == 1 &&
      grid[0][2] != null
    ) {
      grid[0][2] == true ? announceWinner("X wins") : announceWinner("O wins");
      setPlayable(false);
      return;
    }
  };

  const announceWinner = (winner: string) => {
    setTimeout(() => {
      alert(winner);
    }, 100);
  };

  const onReset = () => {
    setGrid([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    setXTurn(true);
    setPlayable(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <AppTitle />
      <br />
      <p>{`${xTurn ? "X" : "O"}'s Turn`}</p>
      <br />
      <div>
        {grid.map((item, index) => {
          return (
            <div key={index} className="flex flex-row">
              {item.map((innerItem, innerIndex) => {
                return (
                  <button
                    key={index + innerIndex}
                    onClick={() => handleInput(index, innerIndex)}
                    className="m-1"
                  >
                    <Box status={innerItem} />
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
      <br />

      <button
        className="bg-red-500 px-4 py-1 rounded-full font-mono font-bold"
        onClick={onReset}
      >
        Reset
      </button>
      {errorShown && (
        <div className="flex bg-red-500 absolute top-5 left-5 px-3 py-2 rounded-lg">
          <p className="text-white">
            {"Please make another selection\nOr Press reset for new game."}
          </p>
        </div>
      )}
    </main>
  );
}
