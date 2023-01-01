const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {
  constructor() {
    this.playerTurn = "O";

    this.grid = [
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
    ];

    this.cursor = new Cursor(6, 7);

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand("t", "test command (remove)", ConnectFour.testCommand);
    Screen.addCommand("up", "move cursor up", this.cursor.up.bind(this.cursor));
    Screen.addCommand(
      "down",
      "move cursor down",
      this.cursor.down.bind(this.cursor)
    );
    Screen.addCommand(
      "left",
      "move cursor left",
      this.cursor.left.bind(this.cursor)
    );
    Screen.addCommand(
      "right",
      "move cursor right",
      this.cursor.right.bind(this.cursor)
    );

    Screen.addCommand(
      "return",
      "place move at cursor position",
      ConnectFour.placeMove.bind(this)
    );

    this.cursor.setBackgroundColor();
    Screen.render();
  }

  // Remove this
  static testCommand() {
    console.log("TEST COMMAND");
  }

  // Make a function check horitzontal win
  // Take in the grid
  // For each row in grid
  // For each space in row
  // If a space equal to it's next 3 space
  // Return itself
  // Return false
  static checkHorizontal(grid) {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (
          grid[row][col] === grid[row][col + 1] &&
          grid[row][col] === grid[row][col + 2] &&
          grid[row][col] === grid[row][col + 3] &&
          grid[row][col] !== " "
        ) {
          return grid[row][col];
        }
      }
    }

    return false;
  }

  // Make a function check vertical win
  // Take in the grid
  // For each row in grid
  // For each column in row
  // If space in a column equal to it's next 3 space
  // Return
  // Return false
  static checkVertical(grid) {
    for (let row = 0; row < grid.length - 3; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (
          grid[row][col] === grid[row + 1][col] &&
          grid[row][col] === grid[row + 2][col] &&
          grid[row][col] === grid[row + 3][col] &&
          grid[row][col] !== " "
        ) {
          return grid[row][col];
        }
      }
    }

    return false;
  }

  // Make a function check diagonal win
  // Take in grid
  // For each row an col check their diagonal
  // If space in row equal to it's downward or upward
  // Return space
  // Return false
  static checkDiagonal(grid) {
    for (let row = 0; row < grid.length - 3; row++) {
      for (let col = 0; col < grid[0].length - 3; col++) {
        if (
          grid[row][col] === grid[row + 1][col + 1] &&
          grid[row][col] === grid[row + 2][col + 2] &&
          grid[row][col] === grid[row + 3][col + 3] &&
          grid[row][col] !== " "
        ) {
          return grid[row][col];
        }
      }
    }

    // Remember make it bad again and try to understand it
    for (let row = 3; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (
          grid[row][col] === grid[row - 1][col + 1] &&
          grid[row][col] === grid[row - 2][col + 2] &&
          grid[row][col] === grid[row - 3][col + 3] &&
          grid[row][col] !== " "
        ) {
          return grid[row][col];
        }
      }
    }
    return false;
  }
  // Return T if all the grid is full (checkWin will run after each move)
  // Return false if the game is not ended

  static checkWin(grid) {
    const emptyGrid = grid.every((row) => row.every((space) => space === " "));

    const fullGrid = grid.every((row) => {
      return row.every((space) => {
        return space !== " ";
      });
    });

    if (emptyGrid) {
      return false;
    } else if (ConnectFour.checkHorizontal(grid)) {
      return ConnectFour.checkHorizontal(grid);
    } else if (ConnectFour.checkVertical(grid)) {
      return ConnectFour.checkVertical(grid);
    } else if (ConnectFour.checkDiagonal(grid)) {
      return ConnectFour.checkDiagonal(grid);
    } else if (fullGrid) {
      return "T";
    }

    return false;
    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended
  }

  static placeMove() {
    // What is bind doing exactly in addCommand above?
    Screen.render();
    // Why couldn't I  do below this.grid
    if (Screen.grid[this.cursor.row][this.cursor.col] === " ") {
      this.cursor.return(this.playerTurn);
      if (this.playerTurn === "O") {
        this.playerTurn = "X";
      } else {
        this.playerTurn = "O";
      }

      Screen.render();
      let winner = ConnectFour.checkWin(Screen.grid);
      if (winner) {
        ConnectFour.endGame(winner);
      }
    } else {
      Screen.setMessage(
        "That space is already occupied. Choose another space."
      );
      Screen.render();
    }
  }

  static endGame(winner) {
    if (winner === "O" || winner === "X") {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === "T") {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }
}

module.exports = ConnectFour;
