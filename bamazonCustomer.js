var inquirer = require("inquirer");
var mysql = require("mysql");



var connection = mysql.createConnection({
    host: "localhost",
    port: 3333,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

function customer () {   

    conn.connect(function(err) {
        if(err) throw err;
        customerListings();
    });
}


function customerListings() {
    conn.query("select * from products", function(err, res) {
        if (err) throw err;
        for (var m = 0; m < res.length; m++) {
            console.log('ID: ${res[m].item_id}, Product: ${res[m].product_name}, Price: $${res[m].price}');
        }
        customerInquirer();
    });
}

// function initialDisplay() {
//     console.log("------------BAMazon-------------");
//         connection.query("select * from products", function(error, response) {
//         if (error) throw error;
// // // console.log(query);
//             for (var i = 0; i < response.length; i++){
//                 console.log(response[i].item_id + " |" + response[i].product_name + " | " + response[i].department_name + " | " + response[i].price + " | " + response[i].stock_quantity );
                
//             }



//  var customerListings = function() {
//      connection.query("select * from products", function(err, res) {
//          if (err) throw err;
         
//          for (var i = 0; i < response.length)
//      })
//  }           
        




function customerInquirer() {
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
        customerAvailable();
    });
}



var actualCases, itemPrice;
function customerAvailable() {

    conn.query("select how many, price from products where ?", 
    {
        item_id: chosenId
    }, function(err, data) {
        if (err) throw err;
        actualCases = data[0].stock_quantity;
        itemPrice = data[0].price;
        if(chosenCases > actualCases) {
            console.log('Insufficient quantity');
            
            conn.end();
        }
        else {
            customerUpdateProducts();
        }
    });       
}


function customerUpdateProducts() {

    var newItemQuantity = actualCases - chosenCases;
    var owe = itemPrice * chosenCases;
    conn.query('update products set ? where ?;', [{
        stock_quantity: newItemQuantity,
    },
    { 
        item_id: chosenId
    }
    ], function(error, response) {
        if (error) throw error;
    });


    console.log('You now owe $${owe}');
}

module.exports = customer;