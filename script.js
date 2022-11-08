//module
const gameboard = (() => {
  let dummygrid = ["T", "I", "C", "T", "A", "C", "T", "O", "E"];
  let blankgrid = ["", "", "", "", "", "", "", "", ""];
  return {
    dummygrid,
    blankgrid,
  };
})();

//module
const displaycontroller = (() => {
  function drawgrid(grid) {
    gameboard_div.forEach((element) => {
      element.textContent = grid[element.id];
    });
  }
  return {
    drawgrid,
  };
})();

const gameboard_div = document.querySelectorAll(".gameboard-grid");
const left_button = document.querySelector("#left-button");
left_button.onclick = function () {
  displaycontroller.drawgrid(gameboard.blankgrid);
  left_button.textContent = "Reset";
};

displaycontroller.drawgrid(gameboard.dummygrid);

gameboard_div.forEach((element) => {
  element.onclick = function () {
    element.textContent = "hi";
  };
});

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
