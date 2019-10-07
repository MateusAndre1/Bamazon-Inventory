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
    ---------  WELCOME to ${chalk.red.bold.underline("BAMAZON")} Supervisor Lounge ---------\n
    ---------              Manage Away!        ---------------\n
    ----------------------------------------------------------\n
    `));

    inquirer
        .prompt({
            name: "superviseThis",
            type: "list",
            message: "Please choose an option below",
            choices: ["View Products for Sale by Department", "Create a New Department"]
        })
        .then(answer => {
            let choice = answer.superviseThis;
            if (choice === "View Products for Sale by Department") {
                connection.query("SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(products.product_sales) AS product_sales, SUM(products.product_sales) - departments.over_head_costs AS total_profit FROM departments INNER JOIN products ON (departments.department_name = products.department_name)  GROUP BY departments.department_id"
                    , function (err, res) {
                        if (err) throw err;
                        var table = new Table({
                            head: [`\nDepartment ID\n`, `\nDepartment Name\n`, `\nOver Head Cost\n`, `\nProduct Sales\n`, `\nTotal Profit\n`],
                            colWidths: [17, 40, 20, 20, 20],
                            colAligns: ["center", "center", "center", "center", "center"],
                            style: {
                                head: ["bold", "red"],
                                compact: true
                            }
                        });

                        for (let i = 0; i < res.length; i++) {
                            table.push([res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].product_sales, res[i].total_profit])

                        }
                        log(`${chalk.green(table.toString())}\n`)

                    });

            } else if (choice === "Create a New Department") {
                inquirer
                    .prompt([
                        {
                            type: "input",
                            name: "department",
                            message: "What department would you like to create?"
                        },
                        {
                            type: "input",
                            name: "over",
                            message: "What is the over head cost for this department?"
                        }
                    ])
                    .then(function (answer) {
                        var department = answer.department;
                        var overHead = answer.over;

                        connection.query(
                            "INSERT INTO departments SET ?",
                            {
                                department_name: department,
                                over_head_costs: overHead
                            },
                            function (err, insertResult) {
                                if (err) console.log("Error: " + err);
                                log(chalk.red.bold(`\nNew department: ${chalk.green.bold.underline(department)} has been added!\n\n`));
                            }
                        );
                    });
            }
        });
}