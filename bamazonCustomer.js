var inquirer = require("inquirer");

var mysql = require("mysql");



var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect (function(err) {
    if(err) throw err;
    console.log("Connected as id" + connection.threadId);
    displayItems();
});


function displayItems() {
    console.log("display all items for sale")
    connection.query("select * from products", function(err, res) {
        if(err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(response[i].item_id + response[i].product_name + response[i].department_name + response[i].price + response[i].stock_quantity);
        }

    });
}

askUserQuestions();

function askUserQuestions() {
    inquirer.prompt([
        {
        name: "product_name",
        type: "input",
        message: "What is the ID of the product you would like to buy?"
        },
        {
        name: "howMany",
        type: "input",
        message: "How many units of the product would you like to buy?"
        }
    ]).then(function(res) {
        product_name = res.product_name;
        howMany = res.howMany;
        productQuantity();
    });
}

function productQuantity() {
    connection.query("select how many products where ?",
    {
        product_name: howMany

    }, function (err, res) {
        if (err) throw err;
        console.log(res.howMany + product_name);
        // updateProducts();
    });
}



// function updateProducts () {
//     console.log("updating");
//     connection.query("update products set ? where ?"),
//     [{
//         stock_quantity: [i]
//     },
//     {
//         product_name: [i]
//     }
//     ], function (err, res) {
//         if (err) throw err;
//         console.log("Insufficient Quantity");
//     };

// }

module.exports = bamazonCustomer;