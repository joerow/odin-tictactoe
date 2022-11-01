//module
const gameboard = (() => {
  let grid = ["X", "X", "X", "X", "X", "X", "X", "X", "X"];
  return {
    grid,
  };
})();

//module
const displaycontroller = (() => {
  let grid = [{ number: 1, name: "string" }];
  return {
    grid,
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

console.log(gameboard.grid);

// const Nerd = (name) => {
//   // simply create a person and pull out the sayName function with destructuring assignment syntax!
//   const {sayName} = Person(name);
//   const doSomethingNerdy = () => console.log('nerd stuff');
//   return {sayName, doSomethingNerdy};
// }
// const jeff = Nerd('jeff');
// jeff.sayName(); //my name is jeff
// jeff.doSomethingNerdy(); // nerd stuff
