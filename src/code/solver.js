import { Status } from "./grid.js";
import { Generator } from "./generator.js";
import { Tile } from "./tile.js";

export class Solver {
  complete_solutions;
  steps;
  generator;
  constructor() {
    this.generator = new Generator();
    this.complete_solutions = [];
    this.steps = [];
  }

  generateCompleteBoard() {
    this.generator.reset();
    return this.generator.populateBoard();
  }

  populateSolution() {
    while (this.complete_solutions.length == 0) {
      const { board } = this.generateCompleteBoard();
      const result = this.recursiveSolveBoard(board, [], []);
      if (
        result.status === Status.SOLUTION_FOUND ||
        result.status === Status.ALL_MOVES_EXHAUSTED
      ) {
        console.log("Terminating with:", result.status);

        if (result.board.balanced()) {
          this.complete_solutions.push(result);
          return result;
        }
      }
    }
  }

  recursiveSolveBoard(
    incomingBoard,
    incomingSteps,
    incomingRevSteps,
    incomingLastCleared
  ) {
    if (incomingBoard.isEmpty()) {
      return {
        board: incomingBoard,
        steps: incomingBoard,
        reverseSteps: incomingRevSteps,
        status: Status.BOARD_INVALID,
      };
    }

    if (
      !this.compareSteps(incomingSteps, incomingRevSteps) &&
      incomingLastCleared
    ) {
      incomingBoard.setTile(
        incomingLastCleared.row,
        incomingLastCleared.column,
        incomingLastCleared.value
      );
      return {
        board: incomingBoard,
        steps: incomingSteps.slice(0, incomingSteps.length - 1),
        reverseSteps: incomingRevSteps.slice(0, incomingRevSteps.length - 1),
        status: Status.SOLUTION_FOUND,
      };
    }

    const inProgressBoard = incomingBoard.clone();
    const solvedBoard = incomingBoard.clone();
    const randomTile = solvedBoard.clearRandomTile();

    if (!randomTile) {
      return {
        board: incomingBoard,
        steps: incomingSteps,
        reverseSteps: incomingRevSteps,
        status: Status.ALL_MOVES_EXHAUSTED,
      };
    }

    const {
      board: resultingBoard,
      steps: solvedSteps,
      status,
    } = this.generator.populateBoard(solvedBoard);

    if (status == Status.ALL_MOVES_EXHAUSTED || !resultingBoard) {
      return {
        board: incomingBoard,
        steps: solvedSteps,
        reverseSteps: incomingRevSteps,
        status: Status.ALL_MOVES_EXHAUSTED,
      };
    }

    const { tile, originalValue } = randomTile;
    const revCopy = incomingRevSteps.slice();

    if (
      !this.compareSteps(solvedSteps, revCopy) &&
      solvedSteps.length === revCopy.length
    ) {
      const lastCleared = randomTile;
      const resetBoard = inProgressBoard.clone();

      resetBoard.setTile(
        lastCleared.row,
        lastCleared.column,
        lastCleared.value
      );
      return {
        board: resetBoard,
        steps: solvedSteps,
        reverseSteps: revCopy,
        status: Status.SOLUTION_FOUND,
      };
    } else {
      revCopy.push(new Tile(tile.row, tile.column, originalValue));
      console.log(inProgressBoard.resetTile(tile.row, tile.column));
      return this.recursiveSolveBoard(
        inProgressBoard.clone(),
        solvedSteps.slice(),
        revCopy.slice(),
        new Tile(tile.row, tile.column, originalValue)
      );
    }
  }

  compareSteps(steps, reverseSteps) {
    if (steps.length !== reverseSteps.length) {
      return false;
    }
    const tilesOne = steps.map((t) => `${t.row}-${t.column}-${t.value}`);
    const tilesTwo = new Set(
      reverseSteps.map((t) => `${t.row}-${t.column}-${t.value}`)
    );
    const isEqual = tilesOne.every((t) => tilesTwo.has(t));

    if (!isEqual) {
      console.log(
        "step mismatches",
        tilesOne.filter((t) => !tilesTwo.has(t))
      );
    }

    return isEqual;
  }
}

var solver = new Solver();
const result = solver.populateSolution();
console.log(result);
console.log(result.board.balanced());
console.log("moves", result.reverseSteps.length);
console.log("moves v2", result.steps.length);
result.board.visual();
