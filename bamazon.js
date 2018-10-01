var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  startApp();
  startPrompt();
});

function startApp() {
  connection.query("Select * FROM products", function (err, res) {
    if (err) throw err;

    console.log("Response is :" + res);
    res.forEach(function (pokemon) {
      // console.log(pokemon);

      //setting variables for each column.
      var pokemonId = pokemon.item_id;
      var pokemonName = pokemon.product_name;
      var pokemonType = pokemon.department_name;
      var pokemonPrice = pokemon.price;
      var stock = pokemon.stock_quantity;

      // //Displaying the content to the terminal.
      console.log(`Pokemon ID: ${pokemonId}`);
      console.log(`Pokemon Name: ${pokemonName}`);
      console.log(`Pokemon Type: ${pokemonType}`);
      console.log(`Pokemon Price: ${pokemonPrice}`);
      console.log(`Pokemon stock: ${stock}`);
      console.log("\n");

    }); //end of forEach(pokemon)
  })
}; //end of connection.query //end of startApp

function startPrompt() {
  console.log("Running startPrompt function...");

  connection.query ("SELECT * FROM products", function (err, promptResults){
    if (err) throw err;

    inquirer
    .prompt([
      {
        name: "askName",
        type: "rawlist",
        choices: function (){
          var pokemonArray = [];
          for (var i = 0; i < promptResults.length; i++){
            pokemonArray.push(promptResults[i].item_id);
          }
          return pokemonArray;
        },
        message: "Enter the id number of the  pokemon would you like to purchase." 
      },
      {
        name: "askUnits",
        type: "input",
        message: "How many of the selected pokemon would you like to purchase?"
      }
    ])//end of .prompt
    .then (function(userInput){
      //setting the var for chosen pokemon to be used below
      var chosenPokemon;
      for (var i = 0; i < results.length; i++){
        if (results[i].product_name === userInput.askName){
          chosenPokemon = results[i];
        }
      }
        var selectedQuantity = parseInt(userInput.askUnits);
        var availablePokemon = chosenPokemon.stock_quantity;

      if ( selectedQuantity > availablePokemon){
        console.log(`We only have ${chosenPokemon.stock_quantity} available. Please select a lower quantity`)
        startApp();
      }
      else{
        var newTotal = selectedQuantity - availablePokemon; 

        connection.query( "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: newTotal
          },
          {
            item_id: chosenPokemon.item_id
          }
        ]
        )
      }
    })//end of function(userInput)
  })

} //end of startPrompt()
