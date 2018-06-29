var db = require('./db');

var connection = db.login();
connection.connect(function(err){
    if(err){
        throw err; //throw exception
    }
    displayStock();
    console.log("done");
});

displayStock =() =>{
    connection.query(`SELECT * FROM products`);
}
