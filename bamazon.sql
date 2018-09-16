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
values ("salmon", "seafood", 1, 60);
insert into products(product_name, department_name, price, stock_quantity)
values ("apple", "produce", 6, 45);
insert into products(product_name, department_name, price, stock_quantity)
values ("lipstick", "cosmetics", 25, 30);
insert into products(product_name, department_name, price, stock_quantity)
values ("toilet paper", "household", 23, 86);
insert into products(product_name, department_name, price, stock_quantity)
values ("spatula", "household", 2, 46);
insert into products(product_name, department_name, price, stock_quantity)
values ("shower curtain", "household", 10, 27);
insert into products(product_name, department_name, price, stock_quantity)
values ("pinot noir", "beverages", 16, 80);
insert into products(product_name, department_name, price, stock_quantity)
values ("olives", "produce", 36, 20);
insert into products(product_name, department_name, price, stock_quantity)
values ("espresso", "beverages", 50, 15);
insert into products(product_name, department_name, price, stock_quantity)
values ("lettuce", "produce", 63, 75);
insert into products(product_name, department_name, price, stock_quantity)
values ("pinot grigio", "beverage", 16, 80);
insert into products(product_name, department_name, price, stock_quantity)
values ("moscato", "beverage", 16, 80);




select * from products;