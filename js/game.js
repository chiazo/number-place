
// create board 9 x 9 + map
// [i, j] -> obj{col, row, box}

const sodokuBoard = [];
const counter = new Array(9);

const rowDuplicates = new Array(9);
const colDuplicates = new Array(9);
const boxDuplicates = new Array(9);

rowDuplicates.fill([]);
colDuplicates.fill([]);
boxDuplicates.fill([]);

let numStorage = {
    col: colDuplicates,
    row: rowDuplicates,
    box: boxDuplicates
}



counter.fill(0);


let nums = new Map();

for (let i = 0; i < 9; i++) {
    sodokuBoard[i] = [];
    for (let j = 0; j < 9; j++) {
        sodokuBoard[i][j] = 0;
        const mapKey = i + "_" + j;
        nums.set(mapKey, {
            col: [],
            row: [],
            box: []
        })
    }
}

console.log(sodokuBoard);

// console.log([0, 0].toString());

const game = document.getElementById("game");
const board = document.createElement("board");

// add event listeners to inner & outer squares
sodokuBoard.forEach(function (outer, i) {
    let outerSquare = document.createElement("div");
    // outerSquare.textContent = outer[0];
    outerSquare.classList += " outer-square";
    outerSquare.addEventListener("click", function() {
        outerSquare.classList += " outer-square-focus";
    })
    outer.forEach(function(inner, j) {
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
        

        input.oninput = function() {
            if (this.value === 0) this.value = "";
            if (this.value.length > 1) {
                this.value = this.value.slice(0, 1);
            }

            // checking if input is allowed
        //    if (!validNumInput(i, j, this.value)) {
        //         this.value = "";
        //         input.style.backgroundColor = "red";
        //         console.log("ERROR")
        //    } else {
        //         counter[this.value]++;
        //    }
        }

        input.onkeydown = function(e) {
            if (!((e.keyCode > 96 && e.keyCode < 106) ||
            (e.keyCode > 48 && e.keyCode < 58))) {
                return false;
            }
        }


        innerSquare.appendChild(input);
        innerSquare.classList += " inner-square";
        innerSquare.addEventListener("click", function() {
            innerSquare.classList += " inner-square-focus";
            alert(i + " - " + j);
            validNumInput(event.target.getAttribute("data-i"), event.target.getAttribute("data-j"), event.target.value)
        })
        outerSquare.appendChild(innerSquare);
    })
    board.appendChild(outerSquare);
})

// input validation functions

function validNumInput(i, j, input) {
    // only valid if column, row, and box doesn't have num
    const mapKey = i + "_" + j;
    // let currBox = nums.get(mapKey);
    console.log(mapKey)
    if (numStorage.col.includes(input) || numStorage.row.includes(input) || numStorage.box.includes(input)) {
        console.log("help");
        return false;
    
    }

    // numStorage.col[checkCols(i, j)].push(input);
    // numStorage.row[checkRows(i, j)].push(input);
    console.log("i: " + i + " - j: " + j)
    console.log("row: " + checkRows(i, j))
    console.log("col: " + checkCols(i, j))
    console.log("box: " + checkBox(i, j))

    // numStorage.box[boxIdx].push(input);
    console.log(numStorage)

    return true;
}

function numAvailable() {
    return counter.indexOf(9);
}

function boxOrLineFinished() {
    // check if a line if complete (additional feature)
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

