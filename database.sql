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

-- a library of items that may be added to shopping lists for any store (provided by default)
CREATE TABLE item (
	id SERIAL PRIMARY KEY,
	name VARCHAR (255) NOT NULL,
	default_unit VARCHAR (255),
	category_id INT NOT NULL REFERENCES "category",
	image_path VARCHAR (255)
);

-- junction table for adding items to specific store lists
CREATE TABLE store_item (
	id SERIAL PRIMARY KEY,
	index INT NOT NULL,
	store_id INT NOT NULL REFERENCES "store",
	item_id INT NOT NULL REFERENCES "item",
	completed BOOLEAN NOT NULL
);

-- items for specific stores that the user consideres frequently bought "essentials"
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
	index INT NOT NULL,
	name VARCHAR (255) NOT NULL,
	person_id INT NOT NULL REFERENCES "person",
	store_id INT NOT NULL REFERENCES "store"
);

-- items belonging to specific areas
CREATE TABLE area_item (
	id SERIAL PRIMARY KEY,
	index INT NOT NULL,
	area_id INT NOT NULL REFERENCES "area",
	item_id INT NOT NULL REFERENCES "item"
);