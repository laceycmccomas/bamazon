var inquirer = require("inquirer");
var mysql = require("mysql");
var isPaused = true;
//setup for connection call
var conn = mysql.createConnection({
    host: "localhost",
    port: 3333,
    user: "root",
    password: "root",
    database: "bamazon"
});

//function to connect to SQL database 
var manager = function() {
    //Connect to SQL database
    conn.connect(function(err) {
        if(err) throw err;
        manInquirerCall();
    })
}

//function to check which manager view the user would like to access
var manInquirerCall = function() {
    inquirer.prompt([
        {
            type: "list",
            name: "manView",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
        }
    ]).then(function(view) {
        if(view.manView === "View Products for Sale") {
            forSale();
        }
        else if(view.manView === "View Low Inventory") {
            lowInventory();
        }
        else if(view.manView === "Add to Inventory") {
            addInventory();
        }
        else if(view.manView === "Add New Product") {
            newProduct();
        }
    })
};

//function that allows manager to see items currently for sale
var forSale = function() {
    conn.query("select * from products", function(err, res) {
        if (err) throw err;
        for (var m=0; m<res.length; m++) {
            console.log(`ID: ${res[m].item_id}, Product: ${res[m].product_name}, Price: $${res[m].price}, Quantity: ${res[m].stock_quantity}`);
        }
        isPaused = false;
    })
};

//function that lets managers see items with low inventory(less than 5 in stock)
var lowInventory = function() {
    conn.query("select * from products", function(err, res) {
        var stockArray = [];
        if (err) throw err;
        //check if less than 5 inventory in anything
        for (var a=0; a<res.length; a++) {
            var stock = res[a].stock_quantity;
            if (stock < 5) {
                stockArray.push({ID:res[a].item_id, Product:res[a].product_name, Quantity:res[a].stock_quantity});
            }
        }
        //if statement to determine if there is any low inventory
        if (stockArray.length > 0) {
            for(var p=0; p<stockArray.length; p++) {
                console.log(`ID: ${stockArray[p].ID}, Product: ${stockArray[p].Product}, Quantity: ${stockArray[p].Quantity}`)
            }
        }
        else {
            console.log("No items with low inventory");
        }
    })
};

//function that allows managers to add inventory to preexisting items
var addInventory = function() {
    isPaused = true,
    forSale();
    function paused() {
        if (isPaused) {
            setTimeout(paused, 10);
        }
        else {
            addTo();
        }
    }
    paused();
    var addTo = function() {
        inquirer.prompt([
            {
            name: "id",
            type: "input",
            message: "What is the ID of the item you would like to update?"
            },
            {
            name: "units",
            type: "input",
            message: "What would you like to update the stock to?"
            }
        ]).then(function(response) {
            conn.query("update products set ? where ?;", [{
                stock_quantity: response.units,
            },
            { 
                item_id: response.id
            }
            ], function(error, res) {
                if (error) throw error;
                console.log("You have updated the stock of item ID #" + response.id + " to " + response.units + " units.");
            });
            isPaused = true;
        })
    }
};

//function that allows managers to add completely new products
var newProduct = function() {
    console.log("new product function");
    inquirer.prompt([
        {
        name: "product_name",
        type: "input",
        message: "What is the name of the item you would like to add?"
        },
        {
        name: "department_name",
        type: "input",
        message: "What is the department of the item you would like to add?"
        },
        {
        name: "price",
        type: "input",
        message: "What is the price of the item you would like to add?"
        },
        {
        name: "stock_quantity",
        type: "input",
        message: "How much of the item you would like to add?"
        }
    ]).then(function(response) {
        //insert into products(product_name, department_name, price, stock_quantity)
// values ("shield", "armory", 275, 110);
        conn.query("insert into products set ?", {
            product_name: response.product_name,
            department_name: response.department_name,
            price: response.price,
            stock_quantity: response.stock_quantity
        }, function(error, res) {
            if (error) throw error;
            console.log("You have added " + response.product_name + " to the inventory.");
        });
    })
}
module.exports = manager;