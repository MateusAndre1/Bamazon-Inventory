DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(200) NOT NULL,
  department_name VARCHAR(200) NOT NULL,
  price INTEGER(11) NOT NULL,
  stock_quantity INTEGER(11) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone 11", "Cellular", 1000, 80), ("Galaxy s11", "Cellular", 500, 100), ("Lenovo Laptop", "Computers", 700, 42), ("MacBook Pro 15inch", "Computers", 2000, 25), ("Samsung 70inch", "TV", 1800, 62), ("Canon EOS 80D", "Camera", 1099, 28), ("Nikon D7500", "Camera", 999, 82), ("Balexa", "Smart Home", 69, 100), ("Becho", "Smart Home", 39, 56), ("Raptor Compound Bow", "Hunting", 250, 32);


USE bamazon_db;

CREATE TABLE departments(
  department_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(200) NOT NULL,
  over_head_costs INTEGER(11) NOT NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Cellular", 10000), ("Computers", 20000), ("TV", 5000), ("Camera", 15000), ("Smart Home", 3000), ("Hunting", 10000), ("Grocery", 1000);
