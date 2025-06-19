import { Grid, Position, Status } from "./grid.js";

export class Board {
  grids;
  tilesFilled;
  constructor() {
    this.resetBoard();
    this.tilesFilled = 0;
  }

  setTile(row, col, new_value) {
    const grid = this.grids.find((g) => g.hasTile(row, col));
    if (grid == undefined || !this.isValidSelection(row, col, new_value)) {
      return Status.INVALID_MOVE;
    }

    var result = grid.updateTile(row, col, new_value);
    if (result == Status.VALID_MOVE) {
      this.tilesFilled += 1;
    }
    return result;
  }

  completed() {
    console.log("tiles filled", this.tilesFilled);
    return this.tilesFilled == 81;
  }

  isValidSelection(row, col, new_value) {
    const row_collision = this.grids
      .reduce((tiles, g) => tiles.concat(g.getTilesInRow(row)), [])
      .some((t) => t.collision(row, col, new_value));
    const col_collision = this.grids
      .reduce((tiles, g) => tiles.concat(g.getTilesInColumn(col)), [])
      .some((t) => t.collision(row, col, new_value));
    var isValid = !row_collision && !col_collision;
    if (!isValid) {
      console.log(
        `${
          row_collision ? "row" : "col"
        } collison! [${row}, ${col}] = ${new_value} is invalid`
      );
    }
    return isValid;
  }

  visual() {
    var data = [];
    for (let i = 0; i < 9; i++) {
      data.push(
        this.grids.reduce(
          (vals, g) => vals.concat(g.getTilesInRow(i).map((t) => t.value)),
          []
        )
      );
    }
    console.table(data);
  }

  resetBoard() {
    this.grids = [
      new Grid(Position.TOP_LEFT),
      new Grid(Position.TOP_MIDDLE),
      new Grid(Position.TOP_RIGHT),
      new Grid(Position.CENTER_LEFT),
      new Grid(Position.CENTER_MIDDLE),
      new Grid(Position.CENTER_RIGHT),
      new Grid(Position.BOTTOM_LEFT),
      new Grid(Position.BOTTOM_MIDDLE),
      new Grid(Position.BOTTOM_RIGHT),
    ];
  }
}

var board = new Board();
board.setTile(0, 0, 2);
board.setTile(1, 1, 9);
board.setTile(0, 1, 8);
board.setTile(1, 0, 4);
board.setTile(0, 2, 5);
board.setTile(1, 2, 3);
board.setTile(2, 0, 1);
board.setTile(2, 1, 6);
board.setTile(2, 2, 7);
board.visual();
board.completed();
