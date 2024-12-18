import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to the MongoDB database");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  quantity: { type: Number, required: true, min: 1 },
});

const Item = mongoose.model("Item", itemSchema);

// MongoDB CRUD Operations and Advanced Techniques in Node.js
// starts here

// Create several entries in the database
app.post("/items/bulk", async (req, res) => {
  try {
    // const items = req.body;
    const items = [
      { name: "Apple", quantity: 5 },
      { name: "Banana", quantity: 10 },
      { name: "Cherry", quantity: 15 },
      { name: "Date", quantity: 20 },
      { name: "Elderberry", quantity: 25 },
      { name: "Fig", quantity: 30 },
      { name: "Grape", quantity: 35 },
      { name: "Honeydew", quantity: 40 },
      { name: "Jackfruit", quantity: 45 },
      { name: "Kiwi", quantity: 50 },
    ];
    const result = await Item.insertMany(items);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// filter items by name
app.get("/items/filter", async (req, res) => {
  try {
    // const { name } = req.query;
    // const items = await Item.find({ name });
    const filteredItems = await Item.find({ name: "Banana" });
    res.json(filteredItems);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// filter items by quantity greater than 5
app.get("/items/quantity", async (req, res) => {
  try {
    // const { quantity } = req.query;
    // const items = await Item.find({ quantity });
    const filteredItems = await Item.find({ quantity: { $gt: 5 } }); // greater than 5
    // const filteredItems = await Item.find({ quantity: { $lt: 10 } }); // less than 10
    res.json(filteredItems);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// sort items by name
app.get("/items/sorted", async (req, res) => {
  try {
    const sortedItems = await Item.find().sort({ name: 1 }); //in ascending order
    // const sortedItems = await Item.find().sort({ name: -1 }); //in descendant order
    res.json(sortedItems);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// patch a quantity item by its ID
app.patch("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await Item.updateOne(
      { _id: id },
      { $set: { quantity: 20 } }
    );
    res.json(updatedItem);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// count the number of items in each category in the database
app.get("/items/grouped", async (req, res) => {
  try {
    const groupedItems = await Item.aggregate([
      {
        $group: {
          _id: "$name",
          totalQuantity: { $sum: "$quantity" },
        },
      },
    ]);
    res.json(groupedItems);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
// response will look as follows:
// [{
//   "_id": "Pear",
//   "totalQuantity": 20
// }... ]

// count all items in the database
app.get("/items/count", async (req, res) => {
  try {
    const count = await Item.countDocuments();
    res.json({ totalItems: count });
    // res.json(count);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// delete elements from the database base on the quantity
app.delete("/items/deleteMany", async (req, res) => {
  try {
    const result = await Item.deleteMany({ quantity: { $lt: 5 } }); // delete items with quantity less than 5
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ends here

// `GET` to read all items from the database.
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// `POST` to add a new item to the database.
app.post("/items", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.json(newItem);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// `PUT` to update an existing item by its ID.
app.put("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedItem = await Item.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedItem) {
      res.status(404).send("Item not found");
    }
    res.json(updatedItem);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//`DELETE` to remove an item by its ID.
app.delete("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      res.status(404).send("Item not found");
    }
    res.json({ message: "Item deleted successfully", item: deletedItem });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
