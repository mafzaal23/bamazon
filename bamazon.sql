Create database Bamazon;
Use Bamazon;
CREATE TABLE products
(
    item_id INT(11) Auto_INCREMENT NOT NULL,
    product_name VARCHAR (200) NOT NULL,
    department_name VARCHAR (200) NOT NULL,
    price DECIMAL (6,2) NOT NULL,
    stock_quantity INT (11) NOT NULL,
	PRIMARY KEY (item_id)
);
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Bottle", "Home", 2, 50),
        ("iPhone 7", "Electronics", 800, 10),
        ("Macbook Pro", "Electronics", 1000, 5),
        ("Airplane", "Transportation", 900, 1),
        ("Cap", "Clothing", 30, 100),
        ("Table", "Home", 60, 10),
        ("Paintings", "Decoration", 200, 10),
        ("Banana", "Fruites", 1, 0);
        ("Flowers", "Gardening", 5, 30);
        ("GTA 5", "Games", 40, 12);
    SELECT *
    FROM products;