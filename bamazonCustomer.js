var mysql = require("mysql");
var inq = require("inquirer");
var ctable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "Bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  onceConnected();
});

function onceConnected() {
  console.log("Connected successfully!");
  listProducts();
}

function listProducts() {
  var query = connection.query("SELECT * FROM products", function(err, data) {
    if (err) throw err;
    console.log("\n");
    console.table(data);
    console.log("\n");
    selectProd();
  });
}

function selectProd() {
  inq
    .prompt([
      {
        name: "Id",
        message: "What is the ID of the product you want to buy?",
        type: "input"
      },
      {
        name: "Quanitity",
        message: "How many items do you want to buy?",
        type: "input"
      }
    ])
    .then(function(data) {
      var prodId = data.Id;
      var prodQty = data.Quanitity;
      var query = "SELECT * FROM products WHERE item_id=" + prodId;
      connection.query(query, function(err, updateData) {
        var results = updateData.length;
        if (results > 0) {
          var prodInv = updateData[0].stock_quantity;
          if (prodInv >= prodQty) {
            var totalCost = updateData[0].price * prodQty;
            var newQty = prodInv - prodQty;
            var updateQuery =
              "UPDATE products SET stock_quantity =" +
              newQty +
              " WHERE item_id=" +
              prodId;
            connection.query(updateQuery, function(err, data3) {
              if (err) throw err;
              console.log("Order Complete!");
              console.log(
                "Total Price for " +
                  prodQty +
                  " of the " +
                  updateData[0].product_name +
                  " was: $" +
                  totalCost
              );

              listProducts();
            });
          } else {
            console.log("\nInsufficient Inventory!\n");
            listProducts();
          }
        } else {
          console.log("\nItem not found!\n");
          listProducts();
        }
      });
    });
}