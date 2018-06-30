CREATE DATABASE bamazon;
use bamazon;
CREATE TABLE products(
    id int primary key auto_increment,
    product_name VARCHAR(50) not null,
    department_name VARCHAR(30),
    price float not null,
    stock_quanity int default 0
);

insert into products (product_name, department_name, price, stock_quanity) values 
("Sombrero", "Hats", 1.00, 10),
("Dummy data1", "Dummy Departmant", 1.00, 10),
("Dummy data2", "Dummy Departmant", 1.00, 10),
("Dummy data3", "Dummy Departmant", 1.00, 10),
("Dummy data4", "Dummy Departmant", 1.00, 10),
("Dummy data5", "Dummy Departmant", 1.00, 10),
("Dummy data6", "Dummy Departmant", 1.00, 10),
("Dummy data7", "Dummy Departmant", 1.00, 10),
("Dummy data8", "Dummy Departmant", 1.00, 10),
("Dummy data9", "Dummy Departmant", 1.00, 10);