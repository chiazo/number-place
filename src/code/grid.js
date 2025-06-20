import { Tile } from "./tile.js";

export const Position = {
  TOP_LEFT: "TOP_LEFT",
  TOP_MIDDLE: "TOP_MIDDLE",
  TOP_RIGHT: "TOP_RIGHT",
  CENTER_LEFT: "CENTER_LEFT",
  CENTER_MIDDLE: "CENTER_MIDDLE",
  CENTER_RIGHT: "CENTER_RIGHT",
  BOTTOM_LEFT: "BOTTOM_LEFT",
  BOTTOM_MIDDLE: "BOTTOM_MIDDLE",
  BOTTOM_RIGHT: "BOTTOM_RIGHT",
};

export const Status = {
  VALID_MOVE: "VALID_MOVE",
  INVALID_MOVE: "INVALID_MOVE",
  BOARD_COMPLETE: "BOARD_COMPLETE",
  ALL_MOVES_EXHAUSTED: "ALL_MOVES_EXHAUSTED",
};

export class Grid {
  position;
  tiles;

  constructor(position) {
    this.position = position;
    this.tiles = Grid.setTiles(this);
  }

  updateTile(row, col, new_value, log = false) {
    const tile = this.tiles.find((t) => t.row == row && t.column == col);
    if (tile == undefined || !this.isValidSelection(new_value)) {
      return Status.INVALID_MOVE;
    }
    const original_value = tile.value;

    tile.update(new_value);
    if (log) {
      console.log(
        `[${row}, ${col}] = ${new_value} (old_val: ${original_value})`
      );
    }
    return [Status.VALID_MOVE, tile];
  }

  isValidSelection(new_value, log = false) {
    if (new_value < 1 || new_value > 9) {
      return false;
    }
    const tileCollision = this.tiles.find((t) => t.value == new_value);
    const isValid = tileCollision == undefined;
    if (!isValid && log) {
      console.log(
        `${this.position.toLowerCase()} grid collison! [${tileCollision.row}, ${
          tileCollision.column
        }] = ${new_value}`
      );
    }
    return isValid;
  }

  hasTile(row, col) {
    return this.tiles.some((t) => t.row == row && t.column == col);
  }

  getTilesInRow(row) {
    return this.tiles.filter((t) => t.row == row);
  }

  getTilesInColumn(col) {
    return this.tiles.filter((t) => t.column == col);
  }

  static getStartPosition(position) {
    let row = 0;
    let column = 0;

    if (position.startsWith("CENTER")) {
      row = 3;
    } else if (position.startsWith("BOTTOM")) {
      row = 6;
    }

    if (position.endsWith("MIDDLE")) {
      column = 3;
    } else if (position.endsWith("RIGHT")) {
      column = 6;
    }

    return [row, column];
  }

  static setTiles(grid) {
    let [row, col] = Grid.getStartPosition(grid.position);
    let tiles = [];
    for (let i = 0; i < 9; i++) {
      if (i < 3) {
        tiles.push(new Tile(row, col + i));
      } else if (i < 6) {
        tiles.push(new Tile(row + 1, col + (i % 3)));
      } else {
        tiles.push(new Tile(row + 2, col + (i % 3)));
      }
    }
    return tiles;
  }
}
