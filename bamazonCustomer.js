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
         ---------  WELCOME TO ${chalk.red.bold.underline("BAMAZON")}!! A One Stop Shop! ---------\n
         ---------         Find Our Prodcuts Below        ---------\n
         ----------------------------------------------------------\n
      `));


    // create a new cli table
    var table = new Table({
      head: [`\nProduct ID\n`, `\nProduct Description\n`, `\nCost\n`],
      colWidths: [13, 52, 7],
      colAligns: ["center", "center", "left"],
      style: {
        head: ["bold", "red"],
        compact: true
      }
    });

    // loop through data in bamazon db
    for (let i = 0; i < res.length; i++) {
      table.push([res[i].item_id, res[i].product_name, res[i].price])
    }

    // log out the cli table
    log(`${chalk.green(table.toString())}\n`)
    purchase();
  });
}

var purchase = function () {

  inquirer
    .prompt({
      name: "product",
      type: "input",
      message: "Please select a Product ID you'd like to purchase"
    })
    .then(answer => {
      var userInput = answer.product;
      connection.query("SELECT * FROM products where item_id=?", userInput, function (err, res) {
        if (err) throw err;
        if (res.length === 0) {
          log(chalk.red(`\nI'm Sorry, that ID did not register\n`));
          purchase();
        } else {
          inquirer
            .prompt({
              name: "amount",
              type: "input",
              message: "How many would you like to purchase?"
            })
            .then(answer2 => {
              var amount = answer2.amount;
              var currentAmount = res[0].stock_quantity;
              if (amount > currentAmount) {
                log(chalk.red.bold(`Our apologies, we currently only have ${currentAmount} left of this item`))
                purchase();
              } else {
                let totalCost = amount * res[0].price;

                log(chalk.red.bold(`\n\nYou Purchased ${chalk.blue.bold(amount)} ${chalk.green.bold(res[0].product_name)} for ${chalk.green.bold("$")}${chalk.green.bold.underline(res[0].price)} each
                \nTotal amount of purchase: ${chalk.green.bold("$")}${chalk.green.bold.underline(totalCost)}\n`));

                let newAmount = currentAmount - amount;

                connection.query(
                  `UPDATE products SET stock_quantity = ${newAmount} WHERE item_id = ${res[0].item_id}`, function (err, response) {
                    if (err) throw err;
                    log(chalk.red.bold(`\nYour order has been processed and completed\nWe look forward to seeing you again!
                    `));
                    connection.end();
                  }
                )
              }
            });
        }
      });
    });
}