import GridLayout from "react-grid-layout";
import { Solver } from "./code/solver";

const Game = () => {
  const solver = new Solver();
  const { board, steps, reverseSteps } = solver.populateSolution();
  const tiles = board.getAllTiles();
  console.log("tiles", tiles);
  console.log("steps", steps);
  console.log("reverseSteps", reverseSteps);

  return (
    <div className="game">
      <GridLayout className="layout" cols={9} rowHeight={30} width={1200}>
        {tiles.map((tile, idx) => {
          return (
            <div
              className="tile"
              key={idx}
              data-grid={{
                x: idx % 9,
                y: Math.floor(idx / 9),
                static: true,
              }}
            >
              {tile.value > 0 ? tile.value : ""}
            </div>
          );
        })}
      </GridLayout>
    </div>
  );
};

export default Game;
