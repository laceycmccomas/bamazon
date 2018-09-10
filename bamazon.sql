create database bamazon_db;

use bamazon_db;

create table products(
	item_id integer auto_increment not null,
    product_name varchar(100) not null,
    department_name varchar(100) not null,
    price integer not null,
    stock_quantity integer not null,
    primary key(item_id)
);

insert into products(product_name, department_name, price, stock_quantity)
values ("salmon", "seafood", 1, 9000);
insert into products(product_name, department_name, price, stock_quantity)
values ("apple", "produce", 6, 450);
insert into products(product_name, department_name, price, stock_quantity)
values ("lipstick", "cosmetics", 25, 300);
insert into products(product_name, department_name, price, stock_quantity)
values ("toilet paper", "household", 23, 86);
insert into products(product_name, department_name, price, stock_quantity)
values ("spatula", "household", 2, 465);
insert into products(product_name, department_name, price, stock_quantity)
values ("shower curtain", "household", 10, 271);
insert into products(product_name, department_name, price, stock_quantity)
values ("pinot noir", "beverages", 16, 800);
insert into products(product_name, department_name, price, stock_quantity)
values ("olives", "produce", 365, 200);
insert into products(product_name, department_name, price, stock_quantity)
values ("espresso", "beverages", 500, 15);
insert into products(product_name, department_name, price, stock_quantity)
values ("lettuce", "produce", 630, 75);
insert into products(product_name, department_name, price, stock_quantity)
values ("pinot grigio", "beverage", 16, 800);
insert into products(product_name, department_name, price, stock_quantity)
values ("moscato", "beverage", 16, 800);
insert into products(product_name, department_name, price, stock_quantity)
values ("shiraz", "beverage", 16, 800);




select * from products;