import { Board } from "./board.js";
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
      const board = this.generateCompleteBoard();
      const result = this.recursiveSolveBoard(board, [], []);
      if (result.status == Status.SOLUTION_FOUND) {
        this.complete_solutions.push(result);
        return result;
      }
    }
  }

  recursiveSolveBoard(board, steps, reverseSteps) {
    if (!this.compareSteps(steps, reverseSteps)) {
      board.setTile(
        board.lastClearedTile.row,
        board.lastClearedTile.column,
        board.lastClearedTile.value
      );
      return {
        board: board,
        steps: steps.splice(steps.length, 1),
        reverseSteps: reverseSteps.splice(steps.length, 1),
        status: Status.SOLUTION_FOUND,
      };
    }

    if (steps.length > 30) {
      return {
        board: board,
        steps: steps,
        reverseSteps: reverseSteps,
        status: Status.SOLUTION_FOUND,
      };
    }

    const { tile, originalValue } = board.clearRandomTile();
    reverseSteps.push(new Tile(tile.row, tile.column, originalValue));

    const solvedBoard = board.clone();

    let result = Status.ALL_MOVES_EXHAUSTED;
    while (result !== Status.BOARD_COMPLETE) {
      const { status, steps: updatedSteps } =
        this.generator.recursiveSolveBoard(
          solvedBoard,
          solvedBoard.nextEmptyTile(),
          []
        );

      if (!this.compareSteps(updatedSteps, reverseSteps)) {
        return {
          board: board,
          steps: updatedSteps.splice(updatedSteps.length - 1),
          reverseSteps: reverseSteps.splice(reverseSteps.length, -1),
          status: Status.TOO_MANY_SOLUTIONS,
        };
      }

      result = status;
      steps = updatedSteps;
      console.log(status);

      if (status == Status.SOLUTION_FOUND) {
        return {
          board: board,
          solution: solvedBoard,
          steps: updatedSteps,
          reverseSteps: reverseSteps,
          status: Status.SOLUTION_FOUND,
        };
      }
    }

    return this.recursiveSolveBoard(board, steps, reverseSteps);
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
result.board.visual();
