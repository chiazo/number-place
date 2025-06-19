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

export class Grid {
  position;
  tiles;

  constructor(position) {
    this.position = position;
    this.tiles = Grid.setTiles(this);
  }

  updateTile(row, col, new_value) {
    const tile = this.tiles.find((t) => t.row == row && t.column == col);
    if (tile == undefined) {
      return;
    }
    const original_value = tile.value;
    if (this.isValidSelection(new_value)) {
      tile.update(new_value);
      console.log(
        `[${row}, ${col}] - old_val: ${original_value}, new_value: ${new_value}`
      );
    }
  }

  isValidSelection(new_value) {
    if (new_value < 1 || new_value > 9) {
      return false;
    }
    return !this.tiles.some((t) => t.value == new_value);
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

// let grid_one = new Grid(Position.TOP_LEFT);
// let grid_two = new Grid(Position.TOP_MIDDLE);
// let grid_three = new Grid(Position.TOP_RIGHT);
// let grid_four = new Grid(Position.CENTER_LEFT);
// let grid_five = new Grid(Position.CENTER_MIDDLE);
// let grid_six = new Grid(Position.CENTER_RIGHT);
// let grid_seven = new Grid(Position.BOTTOM_LEFT);
// let grid_eight = new Grid(Position.BOTTOM_MIDDLE);
// let grid_nine = new Grid(Position.BOTTOM_RIGHT);
