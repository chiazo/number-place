import { Grid, Position, Status } from "./grid.js";
import { Tile } from "./tile.js";

export class Board {
  static valid_numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  grids;
  tilesFilled;
  lastFilledTile;
  lastClearedTile;
  constructor() {
    this.resetBoard();
    this.tilesFilled = 0;
  }

  setTile(row, col, new_value) {
    const grid = this.grids.find((g) => g.hasTile(row, col));
    if (grid === undefined || !this.isValidSelection(row, col, new_value)) {
      return Status.INVALID_MOVE;
    }

    var [result, tile] = grid.updateTile(row, col, new_value);
    if (result === Status.VALID_MOVE) {
      this.lastFilledTile = tile;
    }
    return result;
  }

  getTile(row, col) {
    const g = this.grids.find((g) => g.getTile(row, col));
    return g.tiles.find((t) => t.row === row && t.column === col);
  }

  resetTile(row, col) {
    let t = this.getAllTiles().find((t) => t.row === row && t.column === col);
    t.value = 0;
    return t;
  }

  isEmpty() {
    return this.getAllTiles().every((t) => t.value === 0);
  }

  nextEmptyTile() {
    if (this.completed()) return;

    for (const grid of this.grids) {
      const emptyTile = grid.tiles.find((t) => t.value === 0);
      if (emptyTile) return emptyTile;
    }
  }

  updateLastFilledTile(tile) {
    this.lastFilledTile = tile;
  }

  clearLastFilledTile() {
    if (this.lastFilledTile !== undefined) {
      this.lastFilledTile.value = 0;
    }
  }

  clearRandomTile() {
    if (this.isEmpty()) {
      return;
    }
    const tiles = this.getAllTiles().filter((t) => t.value !== 0);
    const randIdx = Math.floor(Math.random() * tiles.length);
    const currTile = tiles[randIdx];
    this.lastClearedTile = currTile.clone();

    this.lastClearedTile.print();

    const originalValue = this.lastClearedTile.value;
    currTile.value = 0;

    return {
      board: this,
      tile: currTile,
      originalValue: originalValue,
    };
  }

  getAllTiles() {
    const tiles = [];
    for (const grid of this.grids) {
      grid.tiles.forEach((t) => tiles.push(t));
    }
    return tiles;
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
      count === 81 ||
      !this.grids.some((g) => g.tiles.some((t) => t.value === 0))
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

  equals(board) {
    var theirTiles = board
      .getAllTiles()
      .map((t) => `${t.row}-${t.column}-${t.value}`);
    var ourTiles = new Set(
      this.getAllTiles().map((t) => `${t.row}-${t.column}-${t.value}`)
    );
    var equalBoards =
      theirTiles.length === ourTiles.size &&
      theirTiles.every((t) => ourTiles.has(t));

    if (!equalBoards) {
      console.log("mismatches", this.mismatches(board));
    }

    return equalBoards;
  }

  mismatches(board) {
    var theirTiles = board
      .getAllTiles()
      .map((t) => `${t.row}-${t.column}-${t.value}`);
    var ourTiles = new Set(
      this.getAllTiles().map((t) => `${t.row}-${t.column}-${t.value}`)
    );
    const mismatchedTiles = [];

    for (let i = 0; i < theirTiles.length; i++) {
      if (!ourTiles.has(theirTiles[i])) {
        mismatchedTiles.push(theirTiles[i]);
      }
    }
    return mismatchedTiles;
  }

  clone() {
    const clone = new Board();
    this.getAllTiles().forEach((t) => clone.setTile(t.row, t.column, t.value));
    clone.tilesFilled = this.tilesFilled;
    if (this.lastFilledTile !== undefined) {
      clone.lastFilledTile = new Tile(
        this.lastFilledTile.row,
        this.lastFilledTile.column,
        this.lastFilledTile.value
      );
    }

    return clone;
  }

  balanced() {
    return this.grids.every((g) => g.tiles.some((t) => t.value === 0));
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
