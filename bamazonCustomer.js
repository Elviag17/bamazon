var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

//confirm connection is successful
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

connection.query("SELECT * FROM products", function(err, res) {
  for (var i = 0; i < res.length; i++) {
    console.log(
      res[i].item_id + " | " + res[i].product_name + " | " + res[i].price
    );
  }
  console.log("-----------------------------------");
  userInput();
});

function userInput() {
  inquirer
    .prompt([
      {
        name: "idItem",
        message: "What is the ID of the product you'd like to purchase?:"
      },
      {
        name: "units",
        message: "How many would you like to purchase?: "
      }
    ])
    .then(function(res) {
      UnitCount(res.idItem, res.units);
    });
}

function UnitCount(idItem, units) {
  connection.query("SELECT * FROM products WHERE item_id = " + idItem, function(
    err,
    res
  ) {
    if (err) throw err;

    if (units <= res[0].stock_quantity) {
      UpdateInventory(idItem, parseInt(units), res[0].stock_quantity);
    } else {
      console.log("Sorry, looks like we need to stock up!");
    }
  });
}

function UpdateInventory(idItem, units, stock_quantity) {
  connection.query(
    "UPDATE products SET stock_quantity =  ? - ? WHERE item_id = ? "[
      (stock_quantity, units, idItem)
    ],
    function(err, res) {
      console.log("yay");
      console.log(res);
    }
  );
}
