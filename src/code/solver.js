import { Board } from "./board.js";
import { Status } from "./grid.js";
import { Generator } from "./generator.js";

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
    return this.generator.populateBoard();
  }

  verifySolution(board, tile) {
    const { board: solvedBoard } = this.recursiveSolveBoard(board, tile);
    const updatedTile = solvedBoard.getTile(tile.row, tile.column);
    return updatedTile.value == tile.value;
  }

  test(board) {
    console.log("------- BEFORE CLEARING -------");
    const beforeClearing = board.clone();
    board.visual();
    for (let i = 0; i < 30; i++) {
      board.clearRandomTile();
    }
    console.log("------- AFTER CLEARING -------");
    board.visual();
    const solvedBoard = board.clone();
    let result = Status.ALL_MOVES_EXHAUSTED;
    while (result !== Status.BOARD_COMPLETE) {
      const { status } = this.generator.recursiveSolveBoard(
        solvedBoard,
        solvedBoard.nextEmptyTile()
      );
      result = status;
      console.log(status);
    }
    console.log("------- AFTER SOLVING -------");
    solvedBoard.visual();
    console.log("boards are equal!", beforeClearing.equals(solvedBoard));
  }

  // solveBoard(board) {
  //   console.log("====== BEGINNING SOLVE =====");
  //   board.visual();
  //   // keep removing tiles and recursively solving the board
  //   // once there are two solutions, stop and return
  //   // cont spots_available =
  //   if (this.complete_solutions.length == 2) {
  //     return {
  //       board: board,
  //       status: Status.TOO_MANY_SOLUTIONS,
  //     };
  //   }

  //   while (this.complete_solutions.length == 0) {
  //     const { tile, originalValue } = board.clearRandomTile();
  //     const { status } = this.recursiveSolveBoard(board.clone(), tile);
  //     console.log("status", status);
  //     if (status == Status.BOARD_COMPLETE) {
  //       this.steps.push(tile);
  //       console.log("steps", this.steps);
  //       verifySolution(board.clone(), tile);
  //     }
  //     if (status == Status.TOO_MANY_SOLUTIONS) {
  //       board.setTile(tile.row, tile.col, originalValue);
  //     }
  //     if (status == Status.SOLUTION_FOUND) {
  //       console.log("====== ENDING SOLVE =====");

  //       this.complete_solutions.push(board);
  //       board.visual();
  //       return board;
  //     }
  //   }
  // }

  // recursiveSolveBoard(board, tile) {
  //   if (!this.verifySolution(board, tile)) {
  //     return {
  //       board: board,
  //       status: Status.TOO_MANY_SOLUTIONS,
  //     };
  //   }

  //   var nums_available = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  //   var attempts = 0;
  //   while (attempts < 9) {
  //     let rand_val =
  //       nums_available[Math.floor(Math.random() * nums_available.length)];
  //     nums_available = nums_available.filter((n) => n !== rand_val);
  //     let result = board.setTile(tile.row, tile.column, rand_val);
  //     if (result == Status.VALID_MOVE) {
  //       let { status } = this.recursiveSolveBoard(board, board.nextEmptyTile());
  //       if (status !== Status.BOARD_COMPLETE) {
  //         board.clearLastFilledTile();
  //       } else {
  //         return { board: board, status: status };
  //       }
  //     }
  //     attempts++;
  //   }

  //   return { board: null, status: Status.ALL_MOVES_EXHAUSTED };
  // }

  #generateAttempts() {
    const attempts = [];
    for (let i = 1; i <= 81; i++) {
      attempts.push(i);
    }
    return attempts;
  }
}

var solver = new Solver();
const board = solver.generateCompleteBoard();
// solver.solveBoard(board);
solver.test(board);
