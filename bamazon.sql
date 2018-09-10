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
values ("lipstick", "cosmetics", 150, 25);
insert into products(product_name, department_name, price, stock_quantity)
values ("toilet paper", "household", 22, 95);
insert into products(product_name, department_name, price, stock_quantity)
values ("spatula", "household", 1, 500);
insert into products(product_name, department_name, price, stock_quantity)
values ("shower curtain", "household", 164, 81);
insert into products(product_name, department_name, price, stock_quantity)
values ("pinot noir", "beverages", 4, 1000);
insert into products(product_name, department_name, price, stock_quantity)
values ("olives", "produce", 12, 875);
insert into products(product_name, department_name, price, stock_quantity)
values ("espresso", "beverages", 190, 45);
insert into products(product_name, department_name, price, stock_quantity)
values ("lettuce", "produce", 275, 110);

select * from products;