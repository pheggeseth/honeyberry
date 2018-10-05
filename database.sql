-- the users of the app
CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL
);

-- shopping lists created by users
CREATE TABLE store (
	id SERIAL PRIMARY KEY,
	name VARCHAR (255) NOT NULL,
	person_id INT NOT NULL REFERENCES "person"
);

-- categories that group similar items together (Fruits, Dairy, etc.)
CREATE TABLE category (
	id SERIAL PRIMARY KEY,
	name VARCHAR (255) NOT NULL
);

-- default data for categories
INSERT INTO category ("name") VALUES 
('Bakery & Bread'),
('Beverages'),
('Canned Food'),
('Condiments'),
('Dairy'),
('Dry Goods'),
('Frozen Foods'),
('Fruit'),
('Household'),
('Meat & Seafood'),
('Oils'),
('Other'),
('Pasta & Rice'),
('Snacks'),
('Sauces'),
('Vegetables');

-- a library of items that may be added to shopping lists for any store (provided by default)
CREATE TABLE item (
	id SERIAL PRIMARY KEY,
	name VARCHAR (255) NOT NULL,
	default_unit VARCHAR (255) NOT NULL DEFAULT '',
	category_id INT NOT NULL REFERENCES "category",
	icon_path VARCHAR (255)
);

-- default data for items
INSERT INTO item ("category_id", "name", "icon_path", "default_unit") VALUES 
(1, 'Baguette', '/item_icons/bakery-bread/baguette.svg', ''),
(1, 'Bread', '/item_icons/bakery-bread/bread.svg', ''),
(2, 'Beer', '/item_icons/beverages/pint.svg', 'six-pack'),
(2, 'Tea', '/item_icons/beverages/tea.svg', ''),
(3, 'Black Beans', '/item_icons/canned-food/can.svg', '15oz can'),
(3, 'Kidney Beans', '/item_icons/canned-food/can.svg', '15oz can'),
(3, 'Pinto Beans', '/item_icons/canned-food/can.svg', '15oz can'),
(3, 'Chickpeas', '/item_icons/canned-food/can.svg', '15oz can'),
(3, 'Tomato Puree', '/item_icons/canned-food/tomato-canned.svg', '28oz can'),
(3, 'Tomato Sauce', '/item_icons/canned-food/tomato-canned.svg', '8oz can'),
(3, 'Tomato Paste', '/item_icons/canned-food/tomato-canned.svg', '5oz can'),
(3, 'Anchovies', '/item_icons/canned-food/fish-canned.svg', ''),
(3, 'Tuna', '/item_icons/canned-food/fish-canned.svg', ''),
(4, 'Ketchup', '/item_icons/condiments/ketchup.svg', ''),
(4, 'Mustard', '/item_icons/condiments/mustard.svg', ''),
(4, 'Peanut Butter', '/item_icons/condiments/peanut-butter.svg', ''),
(4, 'Hot Sauce', '/item_icons/condiments/hot-sauce.svg', ''),
(4, 'Honey', '/item_icons/condiments/honey.svg', ''),
(4, 'Strawberry Jam', '/item_icons/condiments/jam.svg', ''),
(4, 'Raspberry Jam', '/item_icons/condiments/jam.svg', ''),
(5, 'Milk', '/item_icons/dairy-eggs/milk.svg', 'gallon'),
(5, 'Eggs', '/item_icons/dairy-eggs/eggs.svg', 'dozen'),
(5, 'Cheese', '/item_icons/dairy-eggs/cheese.svg', ''),
(5, 'Butter', '/item_icons/dairy-eggs/butter.svg', '16 oz'),
(6, 'Black Beans', '/item_icons/dry-goods/beans.svg', '16 oz bag'),
(6, 'Pinto Beans', '/item_icons/dry-goods/beans.svg', '16 oz bag'),
(6, 'Chickpeas', '/item_icons/dry-goods/beans.svg', '16 oz bag'),
(6, 'Black Beans', '/item_icons/dry-goods/beans.svg', '16 oz bag'),
(6, 'Cereal', '/item_icons/dry-goods/cereals.svg', ''),
(6, 'Coffee Beans', '/item_icons/dry-goods/coffee.svg', '12oz bag'),
(6, 'Wheat Flour', '/item_icons/dry-goods/flour.svg', '5lb bag'),
(6, 'White Flour', '/item_icons/dry-goods/flour.svg', '5lb bag'),
(8, 'Apple', '/item_icons/fruit/apple.svg', ''),
(8, 'Avocado', '/item_icons/fruit/avocado.svg', ''),
(8, 'Banana', '/item_icons/fruit/banana.svg', ''),
(8, 'Blueberries', '/item_icons/fruit/blueberries.svg', 'pint'),
(8, 'Cherries', '/item_icons/fruit/cherries.svg', 'pound'),
(8, 'Fig', '/item_icons/fruit/fig.svg', ''),
(8, 'Grapes', '/item_icons/fruit/grapes.svg', 'pound'),
(8, 'Kiwi', '/item_icons/fruit/kiwi.svg', ''),
(8, 'Lemon', '/item_icons/fruit/lemon.svg', ''),
(8, 'Lime', '/item_icons/fruit/lime.svg', ''),
(8, 'Olives', '/item_icons/fruit/olives.svg', ''),
(8, 'Orange', '/item_icons/fruit/orange.svg', 'pound'),
(8, 'Peach', '/item_icons/fruit/peach.svg', 'pound'),
(8, 'Pear', '/item_icons/fruit/pear.svg', ''),
(8, 'Pineapple', '/item_icons/fruit/pineapple.svg', ''),
(8, 'Pomegranate', '/item_icons/fruit/pomegranate.svg', ''),
(8, 'Raspberry', '/item_icons/fruit/raspberry.svg', '1/2 pint'),
(8, 'Strawberry', '/item_icons/fruit/strawberry.svg', ''),
(8, 'Watermelon', '/item_icons/fruit/watermelon.svg', ''),
(9, 'Toilet Paper', '/item_icons/household/toilet-paper.svg', ''),
(9, 'Paper Towels', '/item_icons/household/toilet-paper.svg', ''),
(10, 'Bacon', '/item_icons/meat-seafood/bacon.svg', 'pound'),
(10, 'Beef', '/item_icons/meat-seafood/beef.svg', 'pound'),
(10, 'Chicken', '/item_icons/meat-seafood/chicken-leg.svg', 'pound'),
(10, 'Salami', '/item_icons/meat-seafood/salami.svg', ''),
(10, 'Salmon', '/item_icons/meat-seafood/salmon.svg', 'pound'),
(10, 'Shrimp', '/item_icons/meat-seafood/shrimp.svg', 'pound'),
(11, 'Olive Oil', '/item_icons/oils/oil-bottle.svg', ''),
(11, 'Canola Oil', '/item_icons/oils/oil-bottle.svg', ''),
(11, 'Vegetable Oil', '/item_icons/oils/oil-bottle.svg', ''),
(13, 'Pasta', '/item_icons/pasta-rice/pasta.svg', ''),
(13, 'Rice', '/item_icons/pasta-rice/rice.svg', ''),
(13, 'Spaghetti', '/item_icons/pasta-rice/Spaghetti.svg', ''),
(14, 'Chocolate', '/item_icons/snacks/chocolate.svg', ''),
(14, 'Cookies', '/item_icons/snacks/cookies.svg', ''),
(14, 'Crackers', '/item_icons/snacks/crackers.svg', ''),
(16, 'Artichoke', '/item_icons/vegetables/artichoke.svg', ''),
(16, 'Asparagus', '/item_icons/vegetables/asparagus.svg', ''),
(16, 'Broccoli', '/item_icons/vegetables/broccoli.svg', ''),
(16, 'Butternut Squash', '/item_icons/vegetables/butternut-squash.svg', ''),
(16, 'Cabbage', '/item_icons/vegetables/cabbage.svg', ''),
(16, 'Carrot', '/item_icons/vegetables/carrot.svg', ''),
(16, 'Cauliflower', '/item_icons/vegetables/cauliflower.svg', ''),
(16, 'Chili Pepper', '/item_icons/vegetables/chili-pepper.svg', ''),
(16, 'Chives', '/item_icons/vegetables/chives.svg', ''),
(16, 'Cucumber', '/item_icons/vegetables/cucumber.svg', ''),
(16, 'Eggplant', '/item_icons/vegetables/eggplant.svg', ''),
(16, 'Garlic', '/item_icons/vegetables/garlic.svg', ''),
(16, 'Ginger', '/item_icons/vegetables/ginger.svg', ''),
(16, 'Leek', '/item_icons/vegetables/leek.svg', ''),
(16, 'Mushrooms', '/item_icons/vegetables/mushroom.svg', ''),
(16, 'Red Onion', '/item_icons/vegetables/onion-red.svg', ''),
(16, 'Onion', '/item_icons/vegetables/onion.svg', ''),
(16, 'Peas', '/item_icons/vegetables/peas.svg', ''),
(16, 'Pumpkin', '/item_icons/vegetables/pumpkin.svg', ''),
(16, 'Radish', '/item_icons/vegetables/radish.svg', ''),
(16, 'Salad', '/item_icons/vegetables/salad.svg', ''),
(16, 'Tomato', '/item_icons/vegetables/tomato.svg', ''),
(16, 'Turnip', '/item_icons/vegetables/turnip.svg', '');

-- junction table for adding items to specific store lists
CREATE TABLE store_item (
	id SERIAL PRIMARY KEY,
	store_id INT NOT NULL REFERENCES "store",
	item_id INT NOT NULL REFERENCES "item",
	quantity INT NOT NULL DEFAULT 1,
	unit VARCHAR(255),
	completed BOOLEAN NOT NULL DEFAULT false
);

-- junction table for items that are part of the "essentials" category for a store
CREATE TABLE store_essential (
	id SERIAL PRIMARY KEY,
	store_id INT NOT NULL REFERENCES "store",
	item_id INT NOT NULL REFERENCES "item"
);

-- item groups created by users representing "areas" in a store, such as the produce section, aisle 5, etc
-- these areas are ordered for each store list and represent the order in which items added to the main
-- shopping list for this store should be sorted
CREATE TABLE area (
	id SERIAL PRIMARY KEY,
	name VARCHAR (255) NOT NULL,
	person_id INT NOT NULL REFERENCES "person",
	store_id INT NOT NULL REFERENCES "store",
	item_order JSON NOT NULL DEFAULT '[]'
);
