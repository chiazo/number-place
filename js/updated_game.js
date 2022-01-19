const size = 9;
let board = [];

function main() {
  board = setup_game({ size });
  //   make_move(1, 2, 9, board);
  //   make_move(0, 2, 9, board);
  //   make_move(4, 1, 9, board);
  //   make_move(6, 0, 9, board);
  // make_move(6, 7, 6, board);
  solve_board(0, 0, board, size ** 2, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  console.table(board);
}

function setup_game({ size }) {
  for (let i = 0; i < size; i++) {
    board[i] = [];
  }

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      board[i][j] = 0;
    }
  }
  return board;
}

function make_move(i, j, move, game_board) {
  if (check_valid_move(i, j, move)) {
    game_board[i][j] = move;
    return true;
  } else {
    return false;
  }
}

function check_valid_move(i, j, move) {
  // check 3 x 3
  const three_by_three = check_three_by_three(i, j, move);
  if (!three_by_three) return false;

  // check row
  for (let z = 1; z < size; z++) {
    if (board[(i + z) % size][j] === move) return false;
  }

  // check column
  for (let z = 1; z < size; z++) {
    if (board[i][(j + z) % size] === move) return false;
  }
  return true;
}

function check_three_by_three(i, j, move) {
  const row_one = i % 3 === 0 ? i + 1 : i % 3 === 1 ? i - 1 : i - 2;
  const row_two = i % 3 === 0 ? i + 2 : i % 3 === 1 ? i + 1 : i - 1;
  const col_one = j % 3 === 0 ? j + 1 : j % 3 === 1 ? j - 1 : j - 2;
  const col_two = j % 3 === 0 ? j + 2 : j % 3 === 1 ? j + 1 : j - 1;

  const same_col_one = board[row_one][j];
  const same_col_two = board[row_two][j];

  if (same_col_one === move || same_col_two === move) return false;

  i = i < 3 ? 0 : i < 6 ? 3 : 6;
  for (let z = 0; z < 3; z++) {
    if (board[i + z][col_one] === move) return false;
    if (board[i + z][col_two] === move) return false;
  }

  return true;
}

// start at 0, 0 and keep filling subsequent spots as long as there's
// a valid move
// if no valid move, redo previous spot
function solve_board(i, j, game_board, spots, availableNums) {
  if (spots === 0 || (i === 8 && j === 8)) return game_board;
  let randNum,
    randIdx,
    min = 0,
    max = availableNums.length - 1;
  randIdx = min - 0.5 + Math.random() * (max - min + 1);
  randIdx = Math.round(randIdx);
  randNum = availableNums[randIdx];
  console.log('==== woo', availableNums);
  console.log('r', randNum);
  availableNums = availableNums.filter(x => x !== randNum);
  if (!randNum) console.log('oops');
  while (!make_move(i, j, randNum, game_board)) {
    if (availableNums.length === 0) {
      console.log('yikes');
      if (j === 0) {
        return solve_board(i, 8, game_board, spots + 1, availableNums);
      } else {
        return solve_board(i - 1, j, game_board, spots + 1, availableNums);
      }
    }
    randNum = availableNums[randIdx];
    availableNums = availableNums.filter(x => x !== randNum);
  }

  console.log(`(${i}, ${j})`);
  console.log(availableNums);
  console.table(game_board);

  if (j < 8) {
    return solve_board(i, j + 1, game_board, spots - 1, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  } else {
    return solve_board(i + 1, 0, game_board, spots - 1, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  }
}

main();
