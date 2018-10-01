DROP DATABASE IF EXISTS bamazon_db ;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT ,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price INT (5) NOT NULL,
  stock_quantity INT(4),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bulbasaur", "grass", 300, 10),
("charmander", "fire", 500, 10),
("squirtle", "water", 400, 10),
("charizard", "fire" , 800, 5),
("blastoise", "water" , 700 , 5 ),
("venasaur", "grass", 600 , 5),
("dragonite", "dragon", 900, 3),
("gyrados", "water", 790, 5),
("mew", "psychic", 9999, 1),
("blazeken", "fire", 799, 5),
("haunter", "ghost", 675, 3);
