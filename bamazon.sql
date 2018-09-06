create database bamazon;

use bamazon;

create table products(
	item_id integer auto_increment not null,
    product_name varchar(50) not null,
    department_name varchar(50) not null,
    price integer not null,
    stock_quantity integer not null,
    primary key(item_id)
);

insert into products(product_name, department_name, price, stock_quantity)
values ("banana", "produce", 2, 250);
insert into products(product_name, department_name, price, stock_quantity)
values ("persimmon", "produce", 3, 110);
insert into products(product_name, department_name, price, stock_quantity)
values ("kayak", "recreation", 150, 25);
insert into products(product_name, department_name, price, stock_quantity)
values ("gri gri", "recreation", 22, 95);
insert into products(product_name, department_name, price, stock_quantity)
values ("thimble", "crafts", 1, 500);
insert into products(product_name, department_name, price, stock_quantity)
values ("sewing machine", "crafts", 164, 81);
insert into products(product_name, department_name, price, stock_quantity)
values ("beer", "beverages", 4, 1000);
insert into products(product_name, department_name, price, stock_quantity)
values ("wine", "beverages", 12, 875);
insert into products(product_name, department_name, price, stock_quantity)
values ("javelin", "armory", 190, 45);
insert into products(product_name, department_name, price, stock_quantity)
values ("shield", "armory", 275, 110);

select * from products;