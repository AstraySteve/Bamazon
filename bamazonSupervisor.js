/*
    Steven Tran
    UofT SCS, 2018
*/
var db = require('./db');
var inquirer = require('inquirer');
const cTable = require('console.table');

//Set up connection to database
var connection = db.login();
connection.connect(function(err){
    if(err){
        throw err; //throw exception
    }
    displayOptions();
});

displayOptions =()=>{
    //Prompt user with a choice of options
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "options",
            choices:["View Product Sales by Department", "Create New Department"]
        }
    ]).then(answers => {
        switch (answers.options){
            case "View Product Sales by Department":
                viewSales();
                break;
            case "Create New Department":
                addDepartment();
                break;
        }
    });
}

addDepartment =()=>{
    //Function adds a new department to table
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter the department name",
            name: "departmentName"
        },
        {
            type: "input",
            message: "Please enter the overhead cost",
            name: "overheadCost"
        }
    ]).then(answers => {
        connection.query(`INSERT INTO departments (department_name, over_head_costs)
        VALUES (?,?)`, [answers.departmentName, parseFloat(answers.overheadCost)]);
        console.log("Added Product: " + answers.productName);
    });
}

viewSales =()=>{
    //Functions shows table with columns id, department, overhead, sales and profits to terminal

    //sums up products and orders them by department name
    connection.query(`SELECT ROUND(SUM(product_sales),2), department_name FROM products GROUP BY department_name`, (err, data)=>{
        if(err){
            throw err;
        }
        console.table(data);
    });

    //Displays all from departments
    connection.query(`SELECT * FROM departments`, (err, data)=>{
        if (err){
            throw err;
        }
        //console.table(data);
        //console.log(JSON.stringify(data, null, 2));
    });
}