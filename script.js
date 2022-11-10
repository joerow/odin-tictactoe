//module to control grid state
const gameboard = (() => {
  let dummygrid = ["T", "I", "C", "T", "A", "C", "T", "O", "E"];
  let currentgrid = ["", "", "", "", "", "", "", "", ""];
  function update(playerSymbol, index) {
    gameboard.currentgrid[index] = playerSymbol;
  }

  function resetgrid() {
    this.currentgrid = ["", "", "", "", "", "", "", "", ""];
  }

  return {
    dummygrid,
    currentgrid,
    update,
    resetgrid,
  };
})();

/* click grid detection */
const gameboard_div = document.querySelectorAll(".gameboard-grid");

//module to control the page
const activeStatus = document.getElementById("#game_status");
const currentState = document.getElementById("#state");
const displaycontroller = (() => {
  function activeGrid() {
    gameboard_div.forEach((element) => {
      element.onclick = function () {
        //element.textContent = element.dataset.grid;
        gameboard.update(element.dataset.grid, element.dataset.grid);
        displaycontroller.drawgrid(gameboard.currentgrid);
      };
    });
  }

  function toggleStatus() {
    var element = document.getElementById("status");
    if (element.classList.contains("invisible")) {
      element.classList.toggle("invisible");
    }
  }

  function drawgrid(grid) {
    gameboard_div.forEach((element) => {
      element.textContent = grid[element.dataset.grid];
    });
  }

  return {
    drawgrid,
    activeGrid,
    toggleStatus,
    activeStatus,
    currentState,
  };
})();

/* buttons */
const left_button = document.querySelector("#left-button");
left_button.onclick = function () {
  gameboard.resetgrid();
  displaycontroller.activeGrid();
  displaycontroller.drawgrid(gameboard.currentgrid);
  left_button.textContent = "Reset";
  displaycontroller.toggleStatus();
};

/* Draw the landing grid */
displaycontroller.drawgrid(gameboard.dummygrid);

/* factory to make players */
const Player = (name, playerSymbol) => {
  const getSymbol = () => playerSymbol;
  const getName = () => name;
  return { getSymbol, getName };
};
const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");

/*  */

// const myTimeout = setTimeout(blankgrid, 500);
// function blankgrid() {
//   displaycontroller.fillgrid(gameboard.blankgrid);
// }
// //factory function
// const Player = (name) => {
//   const sayName = () => console.log(`my name is ${name}`);
//   return { sayName };
// };

// const player1 = Player("Player 1");
// player1.sayName();

// const player2 = Player("Player 2");
// player2.sayName();

// const Nerd = (name) => {
//   // simply create a person and pull out the sayName function with destructuring assignment syntax!
//   const {sayName} = Person(name);
//   const doSomethingNerdy = () => console.log('nerd stuff');
//   return {sayName, doSomethingNerdy};
// }
// const jeff = Nerd('jeff');
// jeff.sayName(); //my name is jeff
// jeff.doSomethingNerdy(); // nerd stuff
