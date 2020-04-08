
// create board 9 x 9 + map
// [i, j] -> obj{col, row, box}

const sodokuBoard = [];
const counter = new Array(10);

let rowDuplicates = new Array(9);
let colDuplicates = new Array(9);
let boxDuplicates = new Array(9);

rowDuplicates = Array.from(rowDuplicates, function () { return []; })
colDuplicates = Array.from(colDuplicates, function () { return []; })
boxDuplicates = Array.from(boxDuplicates, function () { return []; })

let numStorage = {
    col: colDuplicates,
    row: rowDuplicates,
    box: boxDuplicates
}

counter.fill(0);

for (let i = 0; i < 9; i++) {
    sodokuBoard[i] = [];
    for (let j = 0; j < 9; j++) {
        sodokuBoard[i][j] = 0;
    }
}

const game = document.getElementById("game");
const board = document.createElement("board");

// add divs to each inner and outer square
sodokuBoard.forEach(function (outer, i) {
    let outerSquare = document.createElement("div");
    // outerSquare.textContent = outer[0];
    outerSquare.classList += " outer-square";

    outer.forEach(function (inner, j) {
        let innerSquare = document.createElement("div");

        let input = document.createElement("input");

        let input_type = document.createAttribute("type");
        let input_max = document.createAttribute("max");
        let input_min = document.createAttribute("min");
        let input_step = document.createAttribute("step");
        let input_size = document.createAttribute("size");
        let input_oninput = document.createAttribute("oninput");
        let input_i = document.createAttribute("data-i");
        let input_j = document.createAttribute("data-j");

        input_type.value = "number";
        input_max.value = 9;
        input_min.value = 1;
        input_step.value = 1;
        input_size.value = 100;
        input_oninput;
        input_i.value = i;
        input_j.value = j;

        input.setAttributeNode(input_type);
        input.setAttributeNode(input_max);
        input.setAttributeNode(input_min);
        input.setAttributeNode(input_step);
        input.setAttributeNode(input_size);
        input.setAttributeNode(input_oninput);
        input.setAttributeNode(input_i);
        input.setAttributeNode(input_j);

        input.onkeydown = function (e) {
            if (!((e.keyCode > 96 && e.keyCode < 106) ||
                (e.keyCode > 48 && e.keyCode < 58))) {
                return false;
            }
        }

        input.oninput = function() {
           if (this.value.length > 1) {
               this.value = this.value.slice(0, 1)
           }
        }


        innerSquare.appendChild(input);
        innerSquare.classList += " inner-square";
        outerSquare.appendChild(innerSquare);
    })
    board.appendChild(outerSquare);
})

let lastInputBox;
let filledBefore = false;

// event listener for inputs
document.addEventListener("input", function () {
    let el = event.target;
    lastInputBox = el;
    checkInput(el);
})

// fix multiple button clicks causing issues with numStorage
document.addEventListener("click", function () {
    let el = event.target;
    if (el.matches("input")) {
        lastInputBox = el;
    }
    if (el.matches(".bttn") && lastInputBox) {
        lastInputBox.value = el.value;
        checkInput(lastInputBox);
    }
})


// setting up available nums & restart button
let numbers = document.getElementById("numbers");
let restartGame = document.getElementById("restart");
for (let i = 1; i <= 9; i++) {
    let button = document.createElement("button");
    button.classList += "green-button bttn";
    button.value = i;
    button.innerText = i;
    numbers.appendChild(button);
}
let restart_button = document.createElement("button");
restart_button.innerText = "Restart!";
restart_button.addEventListener("click", function () {
    window.location.reload();
});
restartGame.appendChild(restart_button);


function checkInput(el) {
    let val = el.value;
    let oldVal;
    if (!el.getAttribute("data-val")) {
        let old_val = document.createAttribute("data-val");
        old_val.value = val;
        el.setAttributeNode(old_val);
    } else {
        oldVal = el.getAttribute("data-val");
        el.setAttribute("data-val", val);
    }

    if (!el.classList.contains("filled")) {
        el.classList += "filled";
    } else {
        filledBefore = true;
    }

    let i = el.getAttribute("data-i");
    let j = el.getAttribute("data-j");

    if (val === 0 || val === "") {
        val = "";
        el.classList.remove("filled");
    }
    if (val.length > 1) {
        val = val.slice(0, 1);
    }

    // checking if input is allowed
    if (!validNumInput(i, j, val, filledBefore, oldVal)) {
        el.style.backgroundColor = "#ff8c7d";
    } else {
        counter[+val]++;
        el.style.backgroundColor = "";
    }
}


// input validation functions
function randomize(x) {
    // let row = 0;
    // let col = 0;
    // let count = 10
    // if (count)
}

function validNumInput(i, j, input, filledBefore, oldVal) {
    // only valid if column, row, and box doesn't have num
    i = +i, j = +j, input = +input;

    if (filledBefore && oldVal) {
        console.log("yop")
        oldVal = +oldVal;
        numStorage.col[checkCols(i, j)].filter(x => x !== oldVal)
        numStorage.row[checkRows(i, j)].filter(x => x !== oldVal)
        numStorage.box[checkBox(i, j)].filter(x => x !== oldVal)
        return true;
    }

    let colCheck = numStorage.col[checkCols(i, j)].includes(+input);
    let rowCheck = numStorage.row[checkRows(i, j)].includes(+input);
    let boxCheck = numStorage.box[checkBox(i, j)].includes(+input);


    if (colCheck || rowCheck || boxCheck) return false;

    numStorage.col[checkCols(i, j)].push(input);
    numStorage.row[checkRows(i, j)].push(input);
    numStorage.box[checkBox(i, j)].push(input);

    console.log(numStorage.col[checkCols(i, j)])

    return true;
}

function numAvailable() {
    return !counter.indexOf(9);
}

function boxOrLineFinished() {
    // check if a line if complete (additional feature)
    if (numAvailable()) return false;
    return counter.indexOf(9);
}

// bonus feature: multiple levels
function fillRandomNumOfBoxs(input) {
    if (input === "easy") {

    } else if (input === "medium") {

    } else {

    }
}

function checkCols(i, j) {
    i = +i, j = +j;
    if (i === 0 || i === 3 || i === 6) {
        if (j === 0 || j === 3 || j === 6) return 0;
        if (j === 1 || j === 4 || j === 7) return 1;
        return 2;
    } else if (i === 1 || i === 4 || i === 7) {
        if (j === 0 || j === 3 || j === 6) return 3;
        if (j === 1 || j === 4 || j === 7) return 4;
        return 5;
    } else {
        if (j === 0 || j === 3 || j === 6) return 6;
        if (j === 1 || j === 4 || j === 7) return 7;
        return 8;
    }
}

function checkRows(i, j) {
    i = +i, j = +j;
    if (i === 0 || i === 1 || i === 2) {
        if (j === 0 || j === 1 || j === 2) return 0;
        if (j === 3 || j === 4 || j === 5) return 1;
        return 2;
    } else if (i === 3 || i === 4 || i === 5) {
        if (j === 0 || j === 1 || j === 2) return 3;
        if (j === 3 || j === 4 || j === 5) return 4;
        return 5;
    } else {
        if (j === 0 || j === 1 || j === 2) return 6;
        if (j === 3 || j === 4 || j === 5) return 7;
        return 8;
    }
}

function checkBox(i, j) {
    const col = checkCols(i, j)
    const row = checkRows(i, j)
    if (row < 3) {
        if (col < 3) return 0;
        if (col < 6) return 1;
        return 2;
    } else if (row < 6) {
        if (col < 3) return 3;
        if (col < 6) return 4;
        return 5;
    } else {
        if (col < 3) return 6;
        if (col < 6) return 7;
        return 8;
    }
}
// add board to game
game.appendChild(board);

/**
 * the value inserted was being duplicated because Array.fill
 * was using the same referenced array for each spot in the larger array
 */

