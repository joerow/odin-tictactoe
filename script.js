//module to control grid state
const gameboard = (() => {
  let dummygrid = ["T", "I", "C", "T", "A", "C", "T", "O", "E"];
  let currentgrid = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = null;
  function update(playerSymbol, index) {
    gameboard.currentgrid[index] = playerSymbol;
  }

  function resetgrid() {
    this.currentgrid = ["", "", "", "", "", "", "", "", ""];
  }

  function togglePlayer() {
    if (gameboard.currentPlayer === player1) {
      gameboard.currentPlayer = player2;
      console.log(gameboard.currentPlayer);
    } else {
      gameboard.currentPlayer = player1;
    }
  }

  return {
    dummygrid,
    currentgrid,
    currentPlayer,
    update,
    resetgrid,
    togglePlayer,
  };
})();

/* click grid detection */
const gameboard_div = document.querySelectorAll(".gameboard-grid");
//module to control the page
const activeStatus = document.getElementById("#game_status");
const currentState = document.getElementById("#state");

const displaycontroller = (() => {
  function activateGrid() {
    gameboard_div.forEach((element) => {
      element.onclick = function () {
        //element.textContent = element.dataset.grid;
        if (element.textContent === "") {
          gameboard.update(
            gameboard.currentPlayer.getSymbol(),
            element.dataset.grid
          );
          displaycontroller.drawgrid(gameboard.currentgrid);
          gameboard.togglePlayer();
          setPlayerPrompt();
        }
      };
    });
  }

  function toggleStatusVisibility() {
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

  function setPlayerPrompt() {
    const element = document.getElementById("player-prompt");
    element.textContent = gameboard.currentPlayer.getName();
  }

  return {
    drawgrid,
    activateGrid,
    toggleStatusVisibility,
    activeStatus,
    currentState,
    setPlayerPrompt,
  };
})();

/* Draw the landing grid */
displaycontroller.drawgrid(gameboard.dummygrid);

/* factory to make players */
const Player = (name, playerSymbol) => {
  let pName = name;
  let pSymbol = playerSymbol;
  const getSymbol = () => pSymbol;
  const getName = () => pName;
  return { getSymbol, getName };
};
const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");

/* New Game */
const left_button = document.querySelector("#left-button");
left_button.onclick = function () {
  gameboard.resetgrid();
  displaycontroller.activateGrid();
  displaycontroller.drawgrid(gameboard.currentgrid);
  left_button.textContent = "Reset";
  displaycontroller.toggleStatusVisibility();
  //set current player to player 1
  gameboard.currentPlayer = player1;
  displaycontroller.setPlayerPrompt();
};
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
