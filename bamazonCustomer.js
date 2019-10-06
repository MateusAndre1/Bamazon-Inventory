var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("cli-table2")
var chalk = require("chalk");
var log = console.log;

// call my connection to localhost with mysql

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "bamazon_db"
});

connection.connect(function (err) {
  // console.log(connection);
  if (err) throw err;
  inventory();
});

// main logic to grab table information from bamazon database

var inventory = function () {

  // connect to database

  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    log(chalk.green.bold(`\n
         ----------------------------------------------------------\n
         ---------  WELCOME TO BAMAZON!! A One Stop Shop! ---------\n
         ---------         Find Our Prodcuts Below        ---------\n
         ----------------------------------------------------------\n
      `));
            

  // create a new cli table
  var table = new Table({
    head: ["Product ID", "Product Description", "Cost"],
    colWidths: [13, 52, 10],
    colAligns: ["center", "left", "right"],
    style: {
    head: ["green"],
    compact: true
  }
  });

  // loop through data in bamazon db
  for (let i = 0; i < res.length; i++) {
    table.push([res[i].item_id, res[i].product_name, res[i].price])
  }
  log(`${chalk.green(table.toString())}\n`)
  
});
connection.end();
}