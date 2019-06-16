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

function startQuery() {
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(
        res[i].item_id + " | " + res[i].product_name + " | " + res[i].price
      );
    }
    console.log("-----------------------------------");
    userInput();
  });
}

startQuery();

function userInput() {
  inquirer
    .prompt([
      {
        name: "idItem",
        message: "What is the ID of the product you'd like to purchase?:",
        validate: function(input) {
          if (input < 11) {
            return true;
          }
          return "Please enter a valid Id";
        }
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
      console.log("Ringing up your total!");

      console.log("-----------------------------------");

      updateInventory(idItem, parseInt(units), res[0].stock_quantity);
    } else {
      console.log("Sorry, looks like we need to stock up!");
      console.log("-----------------------------------");
      newPurchase();
    }
  });
}

function updateInventory(idItem, units, stock_quantity) {
  var newQuantity = stock_quantity - units;
  var update = "UPDATE products SET stock_quantity = ? WHERE item_id = ? ";
  connection.query(update, [newQuantity, idItem], function(err, res) {
    totalPaid(idItem, units);
  });
}

function totalPaid(idItem, units) {
  connection.query(
    "SELECT price FROM products WHERE item_id = " + idItem,
    function(err, res) {
      var price = res[0].price;
      var total = price * units;
      console.log("Your total is : $" + total);

      console.log("-----------------------------------");

      newPurchase();
    }
  );
}

function newPurchase() {
  inquirer
    .prompt([
      {
        name: "choice",
        message: "Would you like to purchase something else?"
      }
    ])
    .then(function(res) {
      var choice = res.choice.toLowerCase();
      console.log(choice);
      if (choice === "yes") {
        startQuery();
      } else {
        console.log("-----------------------------------");
        console.log("Thank you for your purchase. Have a great day!");
      }
    });
}
