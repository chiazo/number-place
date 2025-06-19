export class Tile {
  value;
  row;
  column;

  constructor(row, column, value = -1) {
    this.row = row;
    this.column = column;
    this.value = this.validEntry ? value : 0;
  }

  validEntry(value) {
    return value > 0 && value < 10;
  }

  collision(tile) {
    var equal_columns = tile.column == this.column;
    var equal_rows = tile.row == this.row;

    if (tile.value !== this.value) {
      return equal_columns && equal_rows;
    }
    return equal_columns || equal_rows;
  }
}
