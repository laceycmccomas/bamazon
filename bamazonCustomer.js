var inquirer = require("inquirer");
var mysql = require("mysql");
var inquirerCall = require("./index");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3333,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

var customer = function() {   

    conn.connect(function(err) {
        if(err) throw err;
        customerListings();
    });
};


var customerListings = function() {
    conn.query("select * from products", function(err, res) {
        if (err) throw err;
        for (var m=0; m<res.length; m++) {
            console.log('ID: ${res[m].item_id}, Product: ${res[m].product_name}, Price: $${res[m].price}');
        }
        customerInquirer();
    });
};



var customerInquirer = function() {
    inquirer.prompt([
        {
        name: "name",
        type: "input",
        message: "What is the item you would like to purchase?"
        },
        {
        name: "cases",
        type: "input",
        message: "How many cases would you like to purchase?"
        }
    ]).then(function(response) {
        itemName = response.name;
        numOfCases = response.cases;
        custCheckAvail();
    });
};



var actualUnits, itemPrice;
var custCheckAvail = function() {
    //search through database for quantity of id entered
    conn.query("select how many, price from products where ?", 
    {
        item_id: chosenId
    }, function(err, data) {
        if (err) throw err;
        actualUnits = data[0].stock_quantity;
        itemPrice = data[0].price;
        if(chosenUnits > actualUnits) {
            console.log('You need more');
            
            conn.end();
        }
        else {
            customerUpdate();
        }
    })       
};


var customerUpdate = function() {
    // update products set stock_quantity=200 where item_id=1;
    var newQuantity = actualUnits - chosenUnits;
    var owed = itemPrice*chosenUnits;
    conn.query('update products set ? where ?;', [{
        stock_quantity: newQuantity,
    },
    { 
        item_id: chosenId
    }
    ], function(error, response) {
        if (error) throw error;
    });
    console.log('You now owe $${owed}');
};

module.exports = customer;