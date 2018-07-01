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

//Functions
displayOptions = () =>{
    //Prompt user with a choice of options
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "options",
            choices:["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]).then(answers => {
        //console.log(answers.options);
        switch(answers.options){
            case "View Products for Sale":
                listAll();
                break;
            case "View Low Inventory":
                listLow();
                break;
            case "Add to Inventory":
                updateInventory();
                break;
            case "Add New Product":
                addNew();
                break;
        }
    });
}

listAll = () => {
    //Function will list every available item: ID, names, price and quantities
    connection.query(`SELECT * FROM products`, function (error, results){
        if (error){
            throw error;
        }
        for (var i=0; i<results.length; i++){
            console.log(`Item ID: ${results[i].id}\nProduct Name: ${results[i].product_name}`);
            console.log(`Price: $ ${(results[i].price).toFixed(2)}\nStock Level: ${results[i].stock_quanity}`);
            console.log("--------------------------");
        }
    });
}

listLow = () =>{
    //Function will list all items with an inventory count lower than 5
    connection.query(`SELECT * FROM products WHERE stock_quanity < 5`, function (error, results){
        if (error){
            throw error;
        }
        for (var i=0; i<results.length; i++){
            console.log(`Item ID: ${results[i].id}\nProduct Name: ${results[i].product_name}`);
            console.log(`Price: $ ${(results[i].price).toFixed(2)}\nStock Level: ${results[i].stock_quanity}`);
            console.log("--------------------------");
        }
    });
}

updateInventory = () =>{
    //Function display a prompt that will let the manager update stock levels of any items
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter the ID of the product you wish to update stock",
            name: "productID"
        },
        {
            type: "input",
            message: "Enter the amount to be added to stock",
            name: "stock"
        }
    ]).then(answers => {
        connection.query(`SELECT * FROM products WHERE id = ?`, [answers.productID],function (error, results){
            if (error){
                throw error;
            }
            if (results[0] == null){
                console.log("Invalid entry! Product not found");
                connection.end();
            }
            else{
                var newTotal = parseInt(results[0].stock_quanity) + parseInt(answers.stock);
                connection.query(`UPDATE products SET stock_quanity = ? WHERE id = ?`,[newTotal, answers.productID]);
                console.log(`Updated product: ${results[0].product_name} stock levels to: ${newTotal}`);
            }
        });
    });
}

addNew = () => {
    //Function allows to add new product to store
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter the name of the product",
            name: "productName"
        },
        {
            type: "list",
            message: "Please choose the product department",
            name: "departmentName",
            choices: ["Clothing", "Electronics", "Hobbies", "Weapons", "Misc"]
        },
        {
            type: "input",
            message: "Please enter the cost of the product",
            name: "cost"
        },
        {
            type: "input",
            message: "Enter the updated amount",
            name: "stock"
        }
    ]).then(answers => {
        connection.query(`INSERT INTO products (product_name, department_name, price, stock_quanity)
        VALUES (?,?,?,?)`, [answers.productName, answers.departmentName, parseFloat(answers.cost), parseInt(answers.stock)]);
        console.log("Added Product: " + answers.productName);
    });
}