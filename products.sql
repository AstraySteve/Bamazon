CREATE DATABASE bamazon;
CREATE TABLE products(
    id int primary key auto_increment,
    product_name VARCHAR(50) not null,
    department_name VARCHAR(30),
    price float not null,
    stock_quanity int default 0
);

insert into inventory (product_name, department_name, price, stock_quanity) values 
("Sombrero", "Hats", 1.00, 10);
("dummy item", "dummy department" 2.00, 10);
("dummy item2", "dummy department" 2.00, 10);
("dummy item3", "dummy department" 2.00, 10);
("dummy item4", "dummy department" 2.00, 10);
("dummy item5", "dummy department" 2.00, 10);
("dummy item6", "dummy department" 2.00, 10);
("dummy item7", "dummy department" 2.00, 10);
("dummy item8", "dummy department" 2.00, 10);
("dummy item9", "dummy department" 2.00, 10);