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
    
    connection.query(
        `SELECT T3.id AS department_id, T3.department_name, T3.over_head_costs, T3.Product_Sales, (ROUND(SUM(T3.Product_Sales - T3.over_head_costs),2)) AS Total_Profits
        FROM (
            SELECT departments.id, departments.department_name, departments.over_head_costs, T2.Product_Sales
            FROM departments
            LEFT JOIN (SELECT department_name, (ROUND(SUM(product_sales),2)) AS Product_Sales
                FROM products 
                GROUP BY department_name) AS T2
            ON departments.department_name = T2.department_name) AS T3
        GROUP BY T3.department_name`, (err,data)=>{
        if(err){
            throw err;
        }
        console.table(data);
    });

    /*
    //TEST CODE
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
        console.table(data);
        //console.log(JSON.stringify(data, null, 2));
    });*/

}