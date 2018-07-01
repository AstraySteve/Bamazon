CREATE DATABASE bamazon;
use bamazon;
CREATE TABLE products(
    id int primary key auto_increment,
    product_name VARCHAR(50) not null,
    department_name VARCHAR(30),
    price float not null,
    stock_quanity int default 0,
    product_sales int default 0
);

insert into products (product_name, department_name, price, stock_quanity) values 
("Sombrero", "Clothing", 1.00, 10),
("Laptops", "Electronics", 975.00, 6),
("T-Shirts", "Clothing", 15.00, 20),
("Bucket-O-Nothing", "Misc", 99.99, 99),
("Model Kit", "Hobbies", 60.00, 8),
("Lightsaber", "Weapons", 2000.50, 1),
("PlayStation 4", "Electronics", 499.99, 4),
("Top Hat", "Clothing", 10.00, 15),
("Figurine", "Hobbies", 128.32, 3),
("Batteries", "Electronics", 0.50, 200);

CREATE TABLE departments(
    id int primary key auto_increment,
    department_name VARCHAR(30),
    over_head_costs float default 0
);