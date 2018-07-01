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
    displayStock(askCustomer);
});

//Functions
displayStock =(callback) =>{
    //Function displays items from table products
    connection.query(`SELECT * FROM products`, function (error, results){
        if (error){
            throw error;
        }
        for (var i=0; i<results.length; i++){
            console.log(`Item ID: ${results[i].id}\nProduct Name: ${results[i].product_name}\nPrice: $ ${(results[i].price).toFixed(2)}`);
            console.log("--------------------------");
        }
        callback();
    });
}

askCustomer = () =>{
    //Prompts user which product and how many they wish to buy.
    //console.log("Ask customer here");
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter the ID of the product you want to buy.",
            name: "productID"
        },
        {
            type: "input",
            message: "How may do you want to buy?",
            name: "amount"
        }
    ]).then(answers => {
        connection.query(`SELECT * FROM products WHERE id = ?`, [answers.productID],function (error, results){
            if (error){
                throw error;
            }
            if (results[0] == null){
                console.log("Invalid entry! Product not found");
                //askCustomer();
                connection.end();
            }
            else{
                var newQuanity = parseInt(results[0].stock_quanity) - parseInt(answers.amount);
                if (newQuanity < 0){
                    console.log("Insufficient quantity!");
                    connection.end();
                }
                else{
                    connection.query(`UPDATE products SET stock_quanity = ? WHERE id = ?`,
                    [newQuanity, answers.productID]);
                    var total = (answers.amount * parseFloat(results[0].price)).toFixed(2);
                    console.log(`Order placed, your total is: $ ${total}`);
                }
            }
        });
    });
}