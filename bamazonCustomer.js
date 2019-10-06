var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("cli-table2")
var chalk = require("chalk");
var log = console.log;

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


var inventory = function () {

  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    log(chalk.green.bold(`\n    ----------------------------------------------\n
    ---  WELCOME TO BAMAZON!! A One Stop Shop! ---\n
    ---         Find Our Prodcuts Below        ---\n
    ----------------------------------------------\n`));

    connection.end();
  });

}