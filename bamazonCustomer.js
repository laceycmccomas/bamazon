var inquirer = require("inquirer");
var mysql = require("mysql");
var inquirerCall = require("./index");

//setup for connection call
var conn = mysql.createConnection({
    host: "localhost",
    port: 3333,
    user: "root",
    password: "root",
    database: "bamazon"
});

var customer = function() {   
    //Connect to SQL database
    conn.connect(function(err) {
        if(err) throw err;
        readlistings();
    })
};

//function to read current listings
var readlistings = function() {
    conn.query("select * from products", function(err, res) {
        if (err) throw err;
        for (var m=0; m<res.length; m++) {
            console.log(`ID: ${res[m].item_id}, Product: ${res[m].product_name}, Price: $${res[m].price}`);
        }
        custInquirerCall();
    })
};

//function to prompt users to enter info for items and quantity they want to buy
var chosenId, chosenUnits;
var custInquirerCall = function() {
    inquirer.prompt([
        {
        name: "id",
        type: "input",
        message: "What is the ID of the item you would like to buy?"
        },
        {
        name: "units",
        type: "input",
        message: "How many units would you like to buy?"
        }
    ]).then(function(response) {
        chosenId = response.id;
        chosenUnits = response.units;
        custCheckAvail();
    })
};

//function to check if requested item is available in quantity requested 
var actualUnits, itemPrice;
var custCheckAvail = function() {
    //search through database for quantity of id entered
    conn.query("select stock_quantity, price from products where ?", 
    {
        item_id: chosenId
    }, function(err, data) {
        if (err) throw err;
        actualUnits = data[0].stock_quantity;
        itemPrice = data[0].price;
        if(chosenUnits > actualUnits) {
            console.log("Insufficient Quantity");
            //start over and see what view they would like to use
            conn.end();
        }
        else {
            custUpdate();
        }
    })       
};

//function to update database and display amount owed
var custUpdate = function() {
    // update products set stock_quantity=200 where item_id=1;
    var newQuantity = actualUnits - chosenUnits;
    var owed = itemPrice*chosenUnits;
    conn.query("update products set ? where ?;", [{
        stock_quantity: newQuantity,
    },
    { 
        item_id: chosenId
    }
    ], function(error, response) {
        if (error) throw error;
    });
    console.log(`You owe Bamazon $${owed}`);
};

module.exports = customer;