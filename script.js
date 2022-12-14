//module to control grid state
const gameboard = (() => {
  let dummygrid = ["T", "I", "C", "T", "A", "C", "T", "O", "E"];
  let currentgrid = null;
  let currentPlayer = null;
  let aiSetting = null;

  function newGame() {
    aiSetting = aiButton.dataset.ai;
    if (aiSetting != "noai") {
      player2.setName("AI: " + aiSetting);
    } else {
      player2.setName("Player 2");
    }
    gameboard.resetgrid();
    displaycontroller.activateGrid();
    displaycontroller.drawgrid(gameboard.currentgrid);
    displaycontroller.toggleStatusVisibility();
    gameboard.currentPlayer = player1;
    displaycontroller.setPlayerPrompt();
    console.log(getPossible());
  }

  function aiTurn(Setting) {
    let setting = aiButton.dataset.ai;
  }

  function getPossible() {
    let possiblemoves = [];
    for (const key in gameboard.currentgrid) {
      if (gameboard.currentgrid[key] === "") {
        possiblemoves.push(key);
      }
    }
    return possiblemoves;
  }

  function simpleAI() {
    //get possible moves
    let possibleMoves = getPossible();
    console.log("possible moves are " + possibleMoves);
    //select move to make
    const randomMove = Math.floor(Math.random() * possibleMoves.length);
    console.log("AI selected " + possibleMoves[randomMove]);
    //play move
    gameboard.update(
      gameboard.currentPlayer.getSymbol(),
      possibleMoves[randomMove]
    );
    displaycontroller.drawgrid(gameboard.currentgrid);
    if (gameboard.check() === "winner") {
      console.log("AI WON");
      displaycontroller.setPlayerPrompt(
        gameboard.currentPlayer.getName() + " wins!"
      );
      displaycontroller.deactivateGrid();
    } else {
      togglePlayer();
    }
  }

  function update(playerSymbol, index) {
    gameboard.currentgrid[index] = playerSymbol;
  }

  function resetgrid() {
    this.currentgrid = ["", "", "", "", "", "", "", "", ""];
  }

  function togglePlayer() {
    if (gameboard.currentPlayer === player1) {
      gameboard.currentPlayer = player2;
      console.log(gameboard.currentPlayer.getName());
      if (gameboard.currentPlayer.getName() === "AI: simple") {
        gameboard.simpleAI();
      }
    } else {
      gameboard.currentPlayer = player1;
    }
  }

  //check win conditions
  /*     
    0 1 2
    3 4 5
    6 7 8

    wins are:
    036 147 258 012 345 678 048 642
 */
  function checkWon() {
    if (
      (gameboard.currentgrid[0] === "X" || gameboard.currentgrid[0] === "O") &&
      gameboard.currentgrid[0] === gameboard.currentgrid[3] &&
      gameboard.currentgrid[0] === gameboard.currentgrid[6]
    ) {
      return true;
    } else if (
      (gameboard.currentgrid[1] === "X" || gameboard.currentgrid[1] === "O") &&
      gameboard.currentgrid[1] === gameboard.currentgrid[4] &&
      gameboard.currentgrid[1] === gameboard.currentgrid[7]
    ) {
      return true;
    } else if (
      (gameboard.currentgrid[2] === "X" || gameboard.currentgrid[2] === "O") &&
      gameboard.currentgrid[2] === gameboard.currentgrid[5] &&
      gameboard.currentgrid[2] === gameboard.currentgrid[8]
    ) {
      return true;
    } else if (
      (gameboard.currentgrid[0] === "X" || gameboard.currentgrid[0] === "O") &&
      gameboard.currentgrid[0] === gameboard.currentgrid[1] &&
      gameboard.currentgrid[0] === gameboard.currentgrid[2]
    ) {
      return true;
    } else if (
      (gameboard.currentgrid[3] === "X" || gameboard.currentgrid[3] === "O") &&
      gameboard.currentgrid[3] === gameboard.currentgrid[4] &&
      gameboard.currentgrid[3] === gameboard.currentgrid[5]
    ) {
      return true;
    } else if (
      (gameboard.currentgrid[6] === "X" || gameboard.currentgrid[6] === "O") &&
      gameboard.currentgrid[6] === gameboard.currentgrid[7] &&
      gameboard.currentgrid[6] === gameboard.currentgrid[8]
    ) {
      return true;
    } else if (
      (gameboard.currentgrid[0] === "X" || gameboard.currentgrid[0] === "O") &&
      gameboard.currentgrid[0] === gameboard.currentgrid[4] &&
      gameboard.currentgrid[0] === gameboard.currentgrid[8]
    ) {
      return true;
    } else if (
      (gameboard.currentgrid[6] === "X" || gameboard.currentgrid[6] === "O") &&
      gameboard.currentgrid[6] === gameboard.currentgrid[4] &&
      gameboard.currentgrid[6] === gameboard.currentgrid[2]
    ) {
      return true;
    } else {
      return false;
    }
  }

  function check() {
    if (checkWon() === true) {
      left_button.textContent = "Play again";
      return "winner";
    } else {
      return checkPlayable();
    }
  }

  //check if there are spaces left
  function checkPlayable() {
    if (gameboard.currentgrid.includes("")) {
      console.log("still playable");
      return "playable";
    } else {
      return;
    }
  }

  // change the ai
  function toggleAi() {
    if (aiButton.dataset.ai == "noai") {
      aiButton.dataset.ai = "simple";
      aiButton.textContent = "AI Toggle: Simple";
      return;
    } else if (aiButton.dataset.ai == "simple") {
      aiButton.dataset.ai = "noai";
      aiButton.textContent = "AI Toggle: None";
      return;
    }

    /* else if (aiButton.dataset.ai == "simple") {
      aiButton.dataset.ai = "impossible";
      aiButton.textContent = "AI Toggle: Impossible";
      return;
    } else if (aiButton.dataset.ai == "impossible") {
      aiButton.dataset.ai = "noai";
      aiButton.textContent = "AI Toggle: None";
      return;
    } */
  }

  return {
    dummygrid,
    currentgrid,
    currentPlayer,
    update,
    resetgrid,
    togglePlayer,
    check,
    checkPlayable,
    checkWon,
    toggleAi,
    newGame,
    getPossible,
    simpleAI,
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
          if (gameboard.check() === "playable") {
            gameboard.togglePlayer();
            if (gameboard.currentPlayer.getName() !== "AI: simple") {
              setPlayerPrompt();
            }
          } else if (gameboard.check() === "winner") {
            setPlayerPrompt(gameboard.currentPlayer.getName() + " wins!");
            displaycontroller.deactivateGrid();
          } else {
            setPlayerPrompt("Game Over - board full");
            displaycontroller.deactivateGrid();
          }
        }
      };
    });
  }

  function deactivateGrid() {
    gameboard_div.forEach((element) => {
      element.onclick = null;
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

  function setPlayerPrompt(prompt) {
    let playerprompt = document.getElementById("player-prompt");
    let status = document.getElementById("status");
    if (prompt === undefined) {
      playerprompt.textContent =
        gameboard.currentPlayer.getName() +
        " - '" +
        gameboard.currentPlayer.getSymbol() +
        "'";
    } else {
      status.innerHTML = '<div id="player-prompt"></div>';
      let playerprompt = document.getElementById("player-prompt");
      playerprompt.textContent = prompt;
    }
  }

  return {
    drawgrid,
    activateGrid,
    toggleStatusVisibility,
    activeStatus,
    currentState,
    setPlayerPrompt,
    deactivateGrid,
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
  function setName(newName) {
    if (newName === "") {
    } else {
      pName = newName;
    }
  }
  return { getSymbol, getName, setName };
};
const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");

/* New Game */
const left_button = document.querySelector("#left-button");
left_button.onclick = function () {
  gameboard.newGame();
  left_button.textContent = "Reset";
};

//AI toggler
const aiButton = document.querySelector("#AI-button");
aiButton.onclick = function () {
  gameboard.toggleAi();
  gameboard.newGame();
};

/* Submit button inserts the name into the players*/
var submitBtn = document.getElementById("newSubmit");
submitBtn.onclick = function () {
  var p1Name = document.getElementById("p1Name");
  var p2Name = document.getElementById("p2Name");
  modal.style.display = "none";
  player1.setName(p1Name.value);
  player2.setName(p2Name.value);
  gameboard.newGame();
};

/* Modal */
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
