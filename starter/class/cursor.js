const Screen = require("./screen");

class Cursor {
  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.gridColor = "black";
    this.cursorColor = "yellow";
    this.textColor = "blue";
  }

  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
  }

  setTextColor() {
    Screen.setTextColor(this.row, this.col, this.textColor);
  }

  left() {
    // Move cursor left
    this.resetBackgroundColor();
    if (this.col > 0) {
      this.col -= 1;
    }
    this.setBackgroundColor();
    Screen.render();
  }

  right() {
    // Move cursor right
    this.resetBackgroundColor();

    if (this.col < this.numCols - 1) {
      this.col += 1;
    }
    this.setBackgroundColor();
    Screen.render();
  }

  up() {
    this.resetBackgroundColor();
    if (this.row > 0) {
      this.row -= 1;
    }
    this.setBackgroundColor();
    Screen.render();
  }

  down() {
    this.resetBackgroundColor();
    if (this.row < this.numRows - 1) {
      this.row += 1;
    }
    this.setBackgroundColor();
    Screen.render();
  }

  return(playerTurn) {
    this.resetBackgroundColor();
    this.setBackgroundColor();
    this.setTextColor();
    Screen.setGrid(this.row, this.col, playerTurn);
  }
}

module.exports = Cursor;
