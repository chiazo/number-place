import { Board } from "./board.js";
import { Status } from "./grid.js";
import { Tile } from "./tile.js";

export class Generator {
  complete_boards;
  constructor() {
    this.complete_boards = [];
  }

  populateBoard() {
    while (this.complete_boards.length == 0) {
      const board = new Board();
      const { status } = this.recursiveSolveBoard(
        board,
        board.nextEmptyTile(),
        []
      );
      if (status == Status.BOARD_COMPLETE) {
        this.complete_boards.push(board);
        return board;
      }
    }
    return this.complete_boards[this.complete_boards.length - 1];
  }

  recursiveSolveBoard(board, tile, steps) {
    if (board.completed() || tile == undefined) {
      return {
        board: board,
        status: Status.BOARD_COMPLETE,
        steps: [
          ...new Set(steps.map((t) => `${t.row}-${t.column}-${t.value}`)),
        ].map((t) => {
          const [row, col, val] = t.split("-");
          return new Tile(row, col, val);
        }),
      };
    }

    var nums_available = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var attempts = 0;
    while (attempts < 9) {
      let rand_val =
        nums_available[Math.floor(Math.random() * nums_available.length)];
      nums_available = nums_available.filter((n) => n !== rand_val);
      let result = board.setTile(tile.row, tile.column, rand_val);
      steps.push(tile);
      if (result == Status.VALID_MOVE) {
        let { status, steps: updatedSteps } = this.recursiveSolveBoard(
          board,
          board.nextEmptyTile(),
          steps
        );
        if (status !== Status.BOARD_COMPLETE) {
          board.clearLastFilledTile();
          updatedSteps = updatedSteps.filter(
            (t) => !(t.row == tile.row && t.column == tile.column)
          );
        } else {
          return { board: board, status: status, steps: updatedSteps };
        }
      }
      attempts++;
    }

    return { board: board, status: Status.ALL_MOVES_EXHAUSTED, steps: steps };
  }

  reset() {
    this.complete_boards = [];
  }
}

var generator = new Generator();
generator.populateBoard();
