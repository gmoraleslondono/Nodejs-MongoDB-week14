# Assignment Overview: Setting Up MongoDB and Node.js

In this assignment, you will follow the tutorial video and set up your own MongoDB database. You will connect it to Node.js and create CRUD (Create, Read, Update, Delete) routes to show your understanding. This will help you practice working with databases and building APIs.

## Video tutorial

- https://www.youtube.com/watch?v=sf27YMNKnR4
- https://www.youtube.com/watch?v=xd5wdA-mO-s

## Setting up

1. Create a new folder for this project and add the docker-compose.yml file

- make sure docker is running in your local.

- run docker

```
docker compose up
```

NOTE: to stop docker processes

```
docker compose down
```

- Login into Mongo Express (we will no use this feature on this assignment):
  Go to http://localhost:8081/
  username: admin
  password: pass

2. Initialize Your Project

- Run

```
npm init -y
```

- Install the necessary dependencies:

```
npm install express mongoose nodemon
```

- On the package.json add:
  - `"type": "module",`
  - `"dev": "nodemon index.js"`

3. Create a Basic Express Server:

   - Set up an Express app in `index.js` and configure it to connect to the MongoDB database
   - import packages required.
   - Create server instance
   - Create the listener
   - Create a middleware to parse JSON payloads (set it at the top of the endpoints)

   ```JavaScript
   app.use(express.json());
   ```

4. Set up a new MongoDB database:

   - Choose a name for your database (e.g., `myfirstdatabase`).

   ```Javascript
   mongoose.connect("mongodb://localhost:27017/myfirstdatabase");
   ```

   - Decide on the type of data you want to store in your table (collection).
     Example: A collection for users with fields like `first_name`, `last_name`, and `email`.
   - Define a Schema and Model: Create a Mongoose schema for your data. Example: If you are storing products, your schema could have fields like `name`, and `quantity`.

     ```Javascript
     const itemSchema = new mongoose.Schema({
     name: String,
     quantity: Number,
     });

     const Item = mongoose.model("Item", itemSchema);
     ```

## The API Challenges

This project uses a MongoDB database named `myfirstdatabase`. The database stores a collection of items, where each item has the following fields:

- name: A string representing the name of the item.
- quantity: A number representing the quantity of the item.

1. Write CRUD Routes: Create routes in your Node.js application for each CRUD operation:

   - `GET` to read all items from the database.
   - `POST` to add a new item to the database.
   - `PUT` to update an existing item by its ID.
   - `DELETE` to remove an item by its ID.

2. Test your routes:
   - Use Insomnia, Postman, or a similar tool to test your CRUD routes.
   - Make sure each route works correctly and returns the expected data.
