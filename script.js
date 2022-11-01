//module
const gameboard = (() => {
  let grid = ["X", "0", "X", "X", "X", "X", "X", "X", "X"];
  return {
    grid,
  };
})();

//module
const displaycontroller = (() => {
  let grid = gameboard.grid;

  function fillgrid(grid) {
    const gameboard_div = document.querySelectorAll(".gameboard-grid");
    gameboard_div.forEach((element) => {
      element.textContent = gameboard.grid[element.id];
    });
  }
  return {
    grid,
    fillgrid,
  };
})();

//factory function
const Player = (name) => {
  const sayName = () => console.log(`my name is ${name}`);
  return { sayName };
};

const player1 = Player("Player 1");
player1.sayName();

const player2 = Player("Player 2");
player2.sayName();

displaycontroller.fillgrid(gameboard.grid);
// const Nerd = (name) => {
//   // simply create a person and pull out the sayName function with destructuring assignment syntax!
//   const {sayName} = Person(name);
//   const doSomethingNerdy = () => console.log('nerd stuff');
//   return {sayName, doSomethingNerdy};
// }
// const jeff = Nerd('jeff');
// jeff.sayName(); //my name is jeff
// jeff.doSomethingNerdy(); // nerd stuff
