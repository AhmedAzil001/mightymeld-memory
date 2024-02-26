import { useState } from "react";
import confetti from "canvas-confetti";
import * as icons from "react-icons/gi";
import { Tile } from "./Tile";
import { IoMdMoon } from "react-icons/io";

export const possibleTileContents = [
  icons.GiHearts,
  icons.GiWaterDrop,
  icons.GiDiceSixFacesFive,
  icons.GiUmbrella,
  icons.GiCube,
  icons.GiBeachBall,
  icons.GiDragonfly,
  icons.GiHummingbird,
  icons.GiFlowerEmblem,
  icons.GiOpenBook,
];

export function StartScreen({ start, mode, handleMode }) {
  return (
    <div
      className={`grid h-[100vh] place-items-center font-sans ${
        mode && "bg-slate-900"
      }`}
    >
      <button
        className={`w-[10%] h-9 absolute top-5 right-5 flex items-center justify-center `}
        onClick={handleMode}
      >
        {mode ? <IoMdMoon size="2xl" color="white" /> : <IoMdMoon size="2xl" />}
      </button>
      <div
        className={`w-[80%] sm:w-[50%] md:w-[30%] h-[45%] flex justify-around flex-col items-center rounded-xl bg-cyan-100 ${
          mode && "bg-slate-100"
        }`}
      >
        <div className={`flex flex-col items-center h-[50%] justify-around`}>
          <h1 className={`text-4xl font-bold text-cyan-500`}>Memory</h1>
          <p className={`text-cyan-500 font-semibold`}>
            Flip over tiles looking for pairs
          </p>
        </div>

        <button
          onClick={start}
          className={`bg-cyan-500 text-white text-2xl p-3 rounded-full w-[50%] flex items-center justify-center drop-shadow-md ${
            mode && "bg-cyan-300"
          }`}
        >
          Play
        </button>
      </div>
    </div>
  );
}

export function PlayScreen({ end, mode, handleMode }) {
  const [tiles, setTiles] = useState(null);
  const [tryCount, setTryCount] = useState(0);

  const getTiles = (tileCount) => {
    // Throw error if count is not even.
    if (tileCount % 2 !== 0) {
      throw new Error("The number of tiles must be even.");
    }

    // Use the existing list if it exists.
    if (tiles) return tiles;

    const pairCount = tileCount / 2;

    // Take only the items we need from the list of possibilities.
    const usedTileContents = possibleTileContents.slice(0, pairCount);

    // Double the array and shuffle it.
    const shuffledContents = usedTileContents
      .concat(usedTileContents)
      .sort(() => Math.random() - 0.5)
      .map((content) => ({ content, state: "start" }));

    setTiles(shuffledContents);
    return shuffledContents;
  };

  const flip = (i) => {
    // Is the tile already flipped? We don’t allow flipping it back.
    if (tiles[i].state === "flipped") return;

    // How many tiles are currently flipped?
    const flippedTiles = tiles.filter((tile) => tile.state === "flipped");
    const flippedCount = flippedTiles.length;

    // Don't allow more than 2 tiles to be flipped at once.
    if (flippedCount === 2) return;

    // On the second flip, check if the tiles match.
    if (flippedCount === 1) {
      setTryCount((c) => c + 1);

      const alreadyFlippedTile = flippedTiles[0];
      const justFlippedTile = tiles[i];

      let newState = "start";

      if (alreadyFlippedTile.content === justFlippedTile.content) {
        confetti({
          ticks: 100,
        });
        newState = "matched";
      }

      // After a delay, either flip the tiles back or mark them as matched.
      setTimeout(() => {
        setTiles((prevTiles) => {
          const newTiles = prevTiles.map((tile) => ({
            ...tile,
            state: tile.state === "flipped" ? newState : tile.state,
          }));

          // If all tiles are matched, the game is over.
          if (newTiles.every((tile) => tile.state === "matched")) {
            setTimeout(end, 0);
          }

          return newTiles;
        });
      }, 1000);
    }

    setTiles((prevTiles) => {
      return prevTiles.map((tile, index) => ({
        ...tile,
        state: i === index ? "flipped" : tile.state,
      }));
    });
  };

  return (
    <>
      <div
        className={`w-full h-[100vh] flex items-center justify-center flex-col ${
          mode && "bg-slate-900"
        }`}
      >
        <button
          className={`w-[10%] h-9 absolute top-5 right-5`}
          onClick={handleMode}
        >
          {mode ? (
            <IoMdMoon size="2xl" color="white" />
          ) : (
            <IoMdMoon size="2xl" />
          )}
        </button>
        <div
          className={`w-full h-10 m-5 flex items-center justify-center flex-row`}
        >
          <h4
            className={`text-xl font-semibold text-cyan-400 ${
              mode && "text-white"
            }`}
          >
            Tries
          </h4>
          <p
            className={`flex justify-center items-center ml-3 w-7 bg-cyan-300 text-cyan-700 rounded ${
              mode && "bg-slate-200"
            }`}
          >
            {tryCount}
          </p>
        </div>

        <div
          className={`grid grid-cols-4 gap-4 p-3 rounded bg-cyan-100 ${
            mode && "bg-slate-100"
          }`}
        >
          {getTiles(16).map((tile, i) => (
            <Tile key={i} flip={() => flip(i)} {...tile} mode={mode} />
          ))}
        </div>
      </div>
    </>
  );
}
