import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/myfirstdatabase")
  .then(() => {
    console.log("Connected to the MongoDB database");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

const itemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
});

const Item = mongoose.model("Item", itemSchema);

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
