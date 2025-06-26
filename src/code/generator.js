import { Board } from "./board.js";
import { Status } from "./grid.js";
import { Tile } from "./tile.js";

export class Generator {
  complete_boards;
  constructor() {
    this.complete_boards = [];
  }

  populateBoard(incomingBoard, reset = true) {
    if (reset) {
      this.reset();
    }
    while (this.complete_boards.length === 0) {
      const board = incomingBoard ? incomingBoard : new Board();
      const result = this.recursiveSolveBoard(board, board.nextEmptyTile(), []);
      if (result.status === Status.BOARD_COMPLETE) {
        this.complete_boards.push(board);
        return result;
      }
    }
  }

  recursiveSolveBoard(board, tile, steps) {
    if (board.completed() || !tile) {
      return {
        board: board,
        status: Status.BOARD_COMPLETE,
        steps: [...new Set(steps.map((t) => t.print()))].map((t) => {
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
      if (result === Status.VALID_MOVE) {
        steps.push(tile.clone());
        let { status, steps: updatedSteps } = this.recursiveSolveBoard(
          board,
          board.nextEmptyTile(),
          steps
        );
        if (status !== Status.BOARD_COMPLETE) {
          board.clearLastFilledTile();
          updatedSteps = updatedSteps.filter(
            (t) => !(t.row === tile.row && t.column === tile.column)
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
