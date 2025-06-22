export class Tile {
  value;
  row;
  column;

  constructor(row, column, value = -1) {
    this.row = row;
    this.column = column;
    this.value = this.validEntry(value) ? value : 0;
  }

  validEntry(value) {
    return value > 0 && value < 10;
  }

  update(value) {
    if (this.validEntry(value)) {
      this.value = value;
    }
  }

  reset() {
    this.value = 0;
  }

  clone() {
    return new Tile(this.row, this.column, this.value);
  }

  collision(row, col, value) {
    var equal_columns = col == this.column;
    var equal_rows = row == this.row;

    if (!equal_columns && !equal_rows) {
      return false;
    }

    return this.value == value;
  }
}
