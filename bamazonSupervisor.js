/*
    Steven Tran
    UofT SCS, 2018
*/
var db = require('./db');
var inquirer = require('inquirer');

//Set up connection to database
var connection = db.login();
connection.connect(function(err){
    if(err){
        throw err; //throw exception
    }
    displayOptions();
});

displayOptions = () =>{
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
                console.log("Do Something!");
                break;
            case "Create New Department":
                addDepartment();
                break;
        }
    });
}

addDepartment = () =>{
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