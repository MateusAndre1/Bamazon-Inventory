var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("cli-table2");
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
    portal();
});

function portal() {
    log(chalk.green.bold(`\n
    ----------------------------------------------------------\n
    ---------  WELCOME to ${chalk.red.bold.underline("BAMAZON")} Management Portal ----------\n
    ---------              Manage Away!        ---------------\n
    ----------------------------------------------------------\n
    `));

    inquirer
        .prompt({
            name: "product",
            type: "list",
            message: "Please choose an option below",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]

        })
        .then(answer => {
            let choice = answer.product;
            if (choice === "View Products for Sale") {
                productSale();
            } else if (choice === "View Low Inventory") {
                lowInventory();
            } else if (choice === "Add to Inventory") {
                lowInventory();
            } else {
                lowInventory();
            }
        })
}

var productSale = function() {

    // connect to database

    connection.query("SELECT * FROM products", function (err, res) {

        if (err) throw err;

        // create a new cli table
        var table = new Table({
            head: [`\nProduct ID\n`, `\nProduct Description\n`, `\nCost\n`, `\nQuantity\n`],
            colWidths: [13, 48, 7, 12],
            colAligns: ["center", "center", "left", "center"],
            style: {
                head: ["bold", "red"],
                compact: true
            }
        });

        // loop through data in bamazon db
        for (let i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity])
            
        }

        // log out the cli table
        log(`${chalk.green(table.toString())}\n`)

        returnToPortal();
    });
}

var lowInventory = function() {

    // connect to database

    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {

        if (err) throw err;

        // create a new cli table
        var table = new Table({
            head: [`\nProduct ID\n`, `\nProduct Description\n`, `\nCost\n`, `\nQuantity\n`],
            colWidths: [13, 48, 7, 12],
            colAligns: ["center", "center", "left", "center"],
            style: {
                head: ["bold", "red"],
                compact: true
            }
        });

        // loop through data in bamazon db
        for (let i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity])
            
        }


        log(`${chalk.green(table.toString())}\n`)

        returnToPortal();
    });
}


var returnToPortal = function () {
    
    inquirer
            .prompt({
                name: "stayOrExit",
                type: "list",
                message: "Would you like to go back to the portal?",
                choices: ["Yes please I'm a Busy Manager", "Exit"]

            })
            .then(answer2 => {
                let choice2 = answer2.stayOrExit;
                if (choice2 === "Yes please I'm a Busy Manager") {
                    portal();
                } else {
                    connection.end();
                }
            })
}