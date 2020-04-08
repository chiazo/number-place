const sodokuBoard = [];
for (let i = 0; i < 9; i++) {
    sodokuBoard[i] = [];
    for (let j = 0; j < 9; j++) {
        sodokuBoard[i][j] = 0;
    }
        // let arr = new Array(3);
        // arr.fill(0);
        // sodokuBoard.push(arr)
}

console.log(sodokuBoard);

const game = document.getElementById("game");
const board = document.createElement("board");

sodokuBoard.forEach(function (outer) {
    let outerSquare = document.createElement("div");
    // outerSquare.textContent = outer[0];
    outerSquare.classList += " outer-square";
    outerSquare.addEventListener("click", function() {
        outerSquare.classList += " outer-square-focus";
    })
    outer.forEach(function(inner) {
        let innerSquare = document.createElement("div");
        // innerSquare.textContent = inner;
        let input = document.createElement("input");
        
        let input_type = document.createAttribute("type");
        let input_max = document.createAttribute("max");
        let input_min = document.createAttribute("min");
        let input_step = document.createAttribute("step");
        let input_size = document.createAttribute("size");
        let input_oninput = document.createAttribute("oninput");

        input_type.value = "number";
        input_max.value = 9;
        input_min.value = 1;
        input_step.value = 1;
        input_size.value = 100;
        input_oninput;

        input.setAttributeNode(input_type);
        input.setAttributeNode(input_max);
        input.setAttributeNode(input_min);
        input.setAttributeNode(input_step);
        input.setAttributeNode(input_size);
        input.setAttributeNode(input_oninput)

        input.oninput = function() {
            if (this.value === 0) this.value = 1;
            if (this.value.length > 1) {
                this.value = this.value.slice(0, 1);
            }
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
        })
        outerSquare.appendChild(innerSquare);
    })
    board.appendChild(outerSquare);
})

game.appendChild(board);