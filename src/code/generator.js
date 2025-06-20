import { Board } from "./board.js";
import { Status } from "./grid.js";

export class Generator {
  complete_boards;
  constructor() {
    this.complete_boards = [];
  }

  populateBoard() {
    while (this.complete_boards.length == 0) {
      const board = new Board();
      const { status } = this.recursiveSolveBoard(board, board.nextEmptyTile());
      console.log("status", status);
      if (status == Status.BOARD_COMPLETE) {
        this.complete_boards.push(board);
        board.visual();
      }
    }
  }

  recursiveSolveBoard(board, tile) {
    if (board.completed() || tile == undefined) {
      return {
        board: board,
        status: Status.BOARD_COMPLETE,
      };
    }

    var nums_available = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var attempts = 0;
    while (attempts < 9) {
      let rand_val =
        nums_available[Math.floor(Math.random() * nums_available.length)];
      nums_available = nums_available.filter((n) => n !== rand_val);
      let result = board.setTile(tile.row, tile.column, rand_val);
      if (result == Status.VALID_MOVE) {
        let { status } = this.recursiveSolveBoard(board, board.nextEmptyTile());
        if (status !== Status.BOARD_COMPLETE) {
          board.clearLastFilledTile();
        } else {
          return { board: board, status: status };
        }
      }
      attempts++;
    }

    return { board: null, status: Status.ALL_MOVES_EXHAUSTED };
  }
}

var generator = new Generator();
generator.populateBoard();
// console.log(generator.complete_boards);
