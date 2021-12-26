BEGIN;

DROP TABLE IF EXISTS users, categories, products, cart, addresses, order_summary CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(50) NOT NULL,
  name VARCHAR(25) NOT NULL,
  password VARCHAR(70) NOT NULL
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(25) NOT NULL
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(25) NOT NULL,
  imgurl VARCHAR(50) NOT NULL,
  price REAL NOT NULL,
  category_id INTEGER REFERENCES categories(id)
);

CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  item_id INTEGER REFERENCES products(id),
  imgurl VARCHAR(50) NOT NULL,
  name VARCHAR(25) NOT NULL,
  quantity INTEGER NOT NULL,
  price REAL NOT NULL,
  user_id INTEGER REFERENCES users(id)
);

CREATE TABLE addresses (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(50) NOT NULL,
  address VARCHAR(50) NOT NULL,
  city VARCHAR(50) NOT NULL,
  zipcode VARCHAR(7) NOT NULL,
  email VARCHAR(50) NOT NULL,
  phonenumber VARCHAR(10) NOT NULL,
  payment_method VARCHAR(10) NOT NULL,
  user_id INTEGER REFERENCES users(id)
);

CREATE TABLE order_summary (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  product_name VARCHAR(25) NOT NULL,
  product_price REAL NOT NULL,
  product_quantity INTEGER NOT NULL,
  addresses_id INTEGER REFERENCES addresses(id)
);

INSERT INTO users (email, name, password)  VALUES
  ('a@a.a', 'instadelivery', '$2a$10$o0HK3sKo410TvpvTdzgjN./LW8VmMmtlPc0f/s70QkKRXE18u68J.');

INSERT INTO categories (name)  VALUES
  ('Dairy'),
  ('Bakery'),
  ('Pantry'),
  ('Meat'),
  ('Freezer'),
  ('Beverages');

INSERT INTO products (name, imgurl, price, category_id)  VALUES
  ('1% Milk',  '/store/dairy/1 milk.jpg',  10.90 , 1 ),
  ('3% Milk',  '/store/dairy/3 milk.jpg',  10.90 , 1 ),
  ('Large Yogurt',  '/store/dairy/large yogurt.jpg',  25.90 , 1 ),
  ('Eggs (dozen)',  '/store/dairy/eggs.jpg',  29.90 , 1 ),
  ('Oat Milk',  '/store/dairy/oat milk.jpg',  11.90 , 1 ),
  ('Almond Milk',  '/store/dairy/almond milk.jpg',  11.90 , 1 ),
  ('Hazelnut Milk',  '/store/dairy/hazelnut milk.jpg',  11.90 , 1 ),
  ('Cashew Milk',  '/store/dairy/cashew milk.jpg',  11.90 , 1 ),
  ('Soy Milk',  '/store/dairy/soy milk.jpg',  11.90 , 1 ),
  ('Coconut Milk',  '/store/dairy/coconut milk.jpg',  11.90 , 1 ),
  ('Choc. Soy Milk',  '/store/dairy/chocolate soy milk.jpg',  11.90 , 1 ),
  ('Van. Soy Milk',  '/store/dairy/vanilla soy milk.jpg',  11.90 , 1 ),
  ('Yellow Cheese',  '/store/dairy/yellow cheese.jpg',  .90 , 1 ),
  ('Mozzerella',  '/store/dairy/mozzerella cheese.jpg',  19.90 , 1 ),
  ('Cheddar',  '/store/dairy/cheddar.jpg',  23.90 , 1 );

INSERT INTO products (name, imgurl, price, category_id)  VALUES
  ('Bagels 4pk.',  '/store/bakery/bagels.jpg',  6.90 , 2 ),
  ('Baguettes 2pk.',  '/store/bakery/baguette.jpg',  2.90 , 2 ),
  ('Gluten-free loaf',  '/store/bakery/bread no gluten.jpg',  12.90 , 2 ),
  ('Half-baguette 7pk.',  '/store/bakery/half baguettes.jpg',  4.90 , 2 ),
  ('Burger Buns 4pk.',  '/store/bakery/burger buns.png',  9.90 , 2 ),
  ('Wheat Loaf', '/store/bakery/wheat bread.jpg',  10.90 , 2 ),
  ('White Loaf', '/store/bakery/white bread.jpg',  10.90 , 2 ),
  ('Croissant 1c.',  '/store/bakery/croissant.jpg',  1.90 , 2 ),
  ('Choc. Croissant 1c.',  '/store/bakery/chocolate croissant.jpg',  1.90 , 2 );

INSERT INTO products (name, imgurl, price, category_id)  VALUES
  ('Chicken Stock',  '/store/pantry/chicken powder.png',  14.90 , 3),
  ('Beans',  '/store/pantry/beans.jpg',  2.90 , 3),
  ('Corn',  '/store/pantry/corn.jpg',  2.90 , 3),
  ('Peas',  '/store/pantry/peas.jpg',  2.90 , 3),
  ('Macaroni',  '/store/pantry/macaroni.jpg',  9.90 , 3),
  ('Pasta',  '/store/pantry/pasta.jpg',  8.90 , 3),
  ('Elbow Macaroni',  '/store/pantry/elbow macaroni.jpg',  1.90 , 3),
  ('Tomato Sauce 100g',  '/store/pantry/tomato sauce 100gr.jpg',  1.90 , 3),
  ('Tomato Sauce 250g',  '/store/pantry/tomato sauce 250g.jpg',  3.90 , 3),
  ('Yeast',  '/store/pantry/yeast.jpg',  4.90 , 3),
  ('Ketchup',  '/store/pantry/ketchup.jpg',  10.90 , 3),
  ('Flour',  '/store/pantry/flour.jpg',  4.90 , 3),
  ('Self-rising Flour',  '/store/pantry/self rising flour.jpg',  5.90 , 3),
  ('Brown Sugar',  '/store/pantry/brown sugar.jpg',  13.90 , 3),
  ('White Sugar',  '/store/pantry/white sugar.jpg',  4.90 , 3),
  ('Salt',  '/store/pantry/salt.jpg',  9.90 , 3),
  ('Baking Powder 4pk.',  '/store/pantry/baking powder.jpg',  7.90 , 3),
  ('Baking Soda 4pk.',  '/store/pantry/baking soda.jpg',  7.90 , 3),
  ('Powdered Sugar',  '/store/pantry/powdered sugar.jpg',  11.90 , 3),
  ('Bread Flour',  '/store/pantry/bread flour.jpg',  6.90 , 3),
  ('Vanilla',  '/store/pantry/vanilla.jpg',  .90 , 3),
  ('Vanilla Sugar',  '/store/pantry/vanilla sugar.jpg',  19.90 , 3),
  ('Chocolate Chips',  '/store/pantry/chocolate chips.jpg',  18.90 , 3);

INSERT INTO products (name, imgurl, price, category_id)  VALUES
  ('Entrecôte 1kg',  '/store/meat/entrecote.jpg',  1.90 , 4),
  ('Burgers 4pk.',  '/store/meat/burgers.jpg',  29.90 , 4),
  ('Chicken Breast 2kg',  '/store/meat/chicken breast.jpg',  39.90 , 4),
  ('Drumsticks 8pk.',  '/store/meat/drumsticks.jpg',  29.90 , 4),
  ('Full Chicken 1c.',  '/store/meat/full chicken.jpg',  39.90 , 4),
  ('Ground Beef 1kg',  '/store/meat/ground beef.jpg',  35.90 , 4),
  ('Chicken Liver',  '/store/meat/chicken liver.png',  39.90 , 4),
  ('Salami.',  '/store/meat/salami.jpg',  23.90 , 4),
  ('Turkey and Salami',  '/store/meat/turkey and salami.png',  39.90 , 4),
  ('Turkey',  '/store/meat/turkey.jpg',  23.90 , 4);

INSERT INTO products (name, imgurl, price, category_id)  VALUES
  ('Broccoli',  '/store/frozen foods/frozen broccoli.jpg',  14.90 , 5),
  ('Carrots',  '/store/frozen foods/frozen carrots.jpg',  14.90 , 5),
  ('Corn',  '/store/frozen foods/frozen corn.jpg',  14.90 , 5),
  ('Soy Beans',  '/store/frozen foods/soy beans.jpg',  14.90 , 5),
  ('Mango',  '/store/frozen foods/frozen mango.jpg',  17.90 , 5),
  ('Pineapple',  '/store/frozen foods/frozen pineapple.jpg',  17.90 , 5),
  ('Mixed Berries',  '/store/frozen foods/frozen mixed berries.jpg',  17.90 , 5),
  ('Fries',  '/store/frozen foods/fries.jpg',  18.90 , 5),
  ('Calamari',  '/store/frozen foods/calamari.png',  28.90 , 5),
  ('Cooked Shrimp',  '/store/frozen foods/shrimp cooked.png',  43.90 , 5),
  ('Uncooked Shrimp',  '/store/frozen foods/uncooked shrimp.jpg',  39.90 , 5),
  ('Teddy Nuggets',  '/store/frozen foods/teddy bear nuggets.jpg',  35.90 , 5),
  ('Chicken Fingers',  '/store/frozen foods/shnitzel.jpg',  35.90 , 5),
  ('Onion Rings',  '/store/frozen foods/onion rings.jpg',  18.90 , 5),
  ('Puff Pastry',  '/store/frozen foods/puff pastry.jpg',  14.90 , 5),
  ('Cheese Puff Pastry',  '/store/frozen foods/cheese borekas.jpg',  17.90 , 5),
  ('Potato Puff Pastry',  '/store/frozen foods/potato borekas.jpg',  17.90 , 5),
  ('Filo Puff Pastry',  '/store/frozen foods/filo borekas.jpg',  17.90 , 5),
  ('Pizza',  '/store/frozen foods/pizza.jpg',  24.90 , 5),
  ('Pizza Bites',  '/store/frozen foods/pizza bites.jpg',  22.90 , 5);

INSERT INTO products (name, imgurl, price, category_id)  VALUES
  ('1.5 L. Water 6pk.',  '/store/beverage/6 pack 1 15 water.jpg',  19.90 , 6),
  ('Apple Juice 1.5L',  '/store/beverage/apple juice.jpg',  4.90 , 6),
  ('Cherry Juice 1.5L',  '/store/beverage/cherry juice.png',  4.90 , 6),
  ('Lemonade 1.5L',  '/store/beverage/lemonade.jpg',  4.90 , 6),
  ('Pineapple Juice 1.5L',  '/store/beverage/pineapple juice.png',  4.90 , 6),
  ('Grape Juice 1.5L',  '/store/beverage/grape juice.png',  4.90 , 6),
  ('Grapefruit Juice 1.5L',  '/store/beverage/grapefruit juice.png',  4.90 , 6),
  ('Merlot Juice 1.5L',  '/store/beverage/merlot grape juice.png',  4.90 , 6),
  ('Orange Juice 1.5L',  '/store/beverage/orange juice.jpg',  3.90 , 6),
  ('Pomegranate Juice',  '/store/beverage/pomegranate juice.png',  4.90 , 6),
  ('Fuze Tea 1.5L',  '/store/beverage/fuze tea.jpg',  8.90 , 6),
  ('Cola 1.5L',  '/store/beverage/coke.jpg',  8.90 , 6),
  ('Cola Zero 1.5L',  '/store/beverage/cola zero large.jpg',  8.90 , 6),
  ('Diet Coke 1.5L',  '/store/beverage/diet coke.jpg',  8.90 , 6),
  ('Fanta Exotic 1.5L',  '/store/beverage/fanta exotic large.jpg',  8.90 , 6),
  ('Fanta Orange 1.5L',  '/store/beverage/fanta orange large.png',  8.90 , 6),
  ('Sprite Zero 1.5L',  '/store/beverage/sprite zero.jpg',  8.90 , 6),
  ('Cola 500ml 6pk.',  '/store/beverage/cola zero 6 bottles.jpg',  19.90 , 6),
  ('Van. Cherry D.Pepper',  '/store/beverage/dr pepper cherry vanilla.jpg',  6.90 , 6),
  ('XL',  '/store/beverage/blu.jpg',  4.90 , 6);

INSERT INTO cart (item_id, imgurl, name, quantity, price, user_id)  VALUES
  (1, '/store/dairy/1 milk.jpg', '1% Milk', 5, 10.90 , 1 ),
  (2, '/store/dairy/3 milk.jpg', '3% Milk', 1, 10.90 , 1 ),
  (51, '/store/meat/drumsticks.jpg', 'Drumsticks 8pk.', 3, 29.90 , 1),
  (52, '/store/meat/full chicken.jpg', 'Full Chicken 1c.', 1, 39.90 , 1),
  (54, '/store/meat/chicken liver.png', 'Chicken Liver', 1, 39.90 , 1),
  (55, '/store/meat/salami.jpg', 'Salami.', 2, 23.90 , 1);

COMMIT; 