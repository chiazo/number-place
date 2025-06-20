import { Grid, Position, Status } from "./grid.js";

export class Board {
  static valid_numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  grids;
  tilesFilled;
  lastFilledTile;
  constructor() {
    this.resetBoard();
    this.tilesFilled = 0;
  }

  setTile(row, col, new_value) {
    const grid = this.grids.find((g) => g.hasTile(row, col));
    if (grid == undefined || !this.isValidSelection(row, col, new_value)) {
      return Status.INVALID_MOVE;
    }

    var [result, tile] = grid.updateTile(row, col, new_value);
    if (result == Status.VALID_MOVE) {
      this.lastFilledTile = tile;
    }
    return result;
  }

  nextEmptyTile() {
    if (this.completed()) return;

    for (const grid of this.grids) {
      const emptyTile = grid.tiles.find((t) => t.value == 0);
      if (emptyTile) return emptyTile;
    }
  }

  updateLastFilledTile(tile) {
    this.lastFilledTile = tile;
  }

  clearLastFilledTile() {
    if (this.lastFilledTile !== undefined) {
      this.lastFilledTile.reset();
    }
  }

  completed(log = false) {
    var data = this.visual(false);
    var count = data.reduce(
      (count, curr) => count + curr.filter((value) => value !== 0).length,
      0
    );
    if (log) {
      console.log("tiles filled", count);
    }
    this.tilesFilled = count;
    return (
      count == 81 || !this.grids.some((g) => g.tiles.some((t) => t.value == 0))
    );
  }

  isValidSelection(row, col, new_value, log = false) {
    const row_collision = this.grids
      .reduce((tiles, g) => tiles.concat(g.getTilesInRow(row)), [])
      .some((t) => t.collision(row, col, new_value));
    const col_collision = this.grids
      .reduce((tiles, g) => tiles.concat(g.getTilesInColumn(col)), [])
      .some((t) => t.collision(row, col, new_value));
    var isValid = !row_collision && !col_collision;
    if (!isValid && log) {
      console.log(
        `${
          row_collision ? "row" : "col"
        } collison! [${row}, ${col}] = ${new_value} is invalid`
      );
    }
    return isValid;
  }

  visual(log = true) {
    var data = [];
    for (let i = 0; i < 9; i++) {
      data.push(
        this.grids.reduce(
          (vals, g) => vals.concat(g.getTilesInRow(i).map((t) => t.value)),
          []
        )
      );
    }
    if (log) {
      console.table(data);
    }
    return data;
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
