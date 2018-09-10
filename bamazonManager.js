var inquirer = require("inquirer");
var mysql = require("mysql");



var connection = mysql.createConnection({
    host: "localhost",
    port: 3333,
    user: "root",
    password: "root",
    database: "bamazon_db"
});


function manager() {

    conn.connect(function(err) {
        if(err) throw err;
        managerInquirer();
        inquirerPrompt ();
    });
}


function managerInquirer() {
    inquirer.prompt([
        {
            type: "list",
            name: "Manager",
            message: "Please choose from this list!",
            choices: ["View All Products for Sale", "View All Low Inventory", "Add to Inventory", "Add A New Product"],
        }
    ]).then(function(view) {
        if(view.managerView === "View Products for Sale") {
            productsForSale();
        }
        else if(view.managerView === "View Low Inventory") {
            allLowInventory();
        }
        else if(view.managerView === "Add to Inventory") {
            addInventory();
        }
        else if(view.managerView === "Add A New Product") {
            addNewProduct();
        }
    });
}


managerInquirer ();

function productsForSale() {
    conn.query("select * from products", function(err, res) {
        if (err) throw err;
        for (var m=0; m<res.length; m++) {
            console.log('ID: ${res[m].item_id}, Product: ${res[m].product_name}, Price: $${res[m].price}, Quantity: ${res[m].stock_quantity}');
        }
    
    });
}




function allLowInventory() {
    conn.query("select * from products", function(err, res) {
        var stockArray = [];
        if (err) throw err;

        for (var a = 0; a < res.length; a++) {
            var stock = res[a].stock_quantity;
            if (stock < 10) {
                stockArray.push({ID:res[a].item_id, Product:res[a].product_name, Quantity:res[a].stock_quantity});
            }
        }


        if (stockArray.length > 0) {
            for(var s =0; s < stockArray.length; s++) {
                console.log('ID: ${stockArray[s].ID}, Product: ${stockArray[s].Product}, Quantity: ${stockArray[s].Quantity}');
            }
        }
        else {
            console.log("No items with low inventory");
        }
    });
}


function addInventory() {

    inquirer.prompt([
        {
        name: "id",
        type: "input",
        message: "What is the name of the item?"
        },
        {
        name: "units",
        type: "input",
        message: "How many would you like to add?"
        }
    ]).then(function(response) {
        conn.query("update products set ? where ?;", [{
            stock_quantity: response.cases,
        },
        { 
            item_id: response.id
        }
        ], function(error, res) {
            if (error) throw error;
            console.log("You have updated" + response.id + " to " + response.cases + " cases");
        });
    });
}

function addNewProduct() {
    console.log("new products");
    inquirer.prompt([
        {
        name: "product_name",
        type: "input",
        message: "What item would you like to add?"
        },
        {
        name: "department_name",
        type: "input",
        message: "What department?"
        },
        {
        name: "price",
        type: "input",
        message: "What is the price of the item?"
        },
        {
        name: "stock_quantity",
        type: "input",
        message: "How much would like to add?"
        }
    ]).then(function(response) {
      

        conn.query("insert into products set ?", {
            product_name: response.product_name,
            department_name: response.department_name,
            price: response.price,
            stock_quantity: response.stock_quantity
        }, function(error, res) {
            if (error) throw error;
            console.log("Thanks for adding " + response.product_name + " to the total stock.");
        });
    });
}

module.exports = bamazonManager;