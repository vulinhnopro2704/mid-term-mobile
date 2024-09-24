import express from "express";
import mongoose from "mongoose";
import { User } from "./model/User";
import { ShoppingCart } from "./model/ShoppingCart";
import morgan from "morgan";
import cors from "cors";
import { MOBILE_URL } from "../const";
import { Bai1 } from "./model/bai1";

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(
	cors({
		origin: MOBILE_URL, // Thay thế bằng URL của frontend của bạn
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

const uri =
	"mongodb+srv://vulinhtruong79:PWMprSXhdQJNzjiZ@midterm.mkih1.mongodb.net/?retryWrites=true&w=majority&appName=midterm";

mongoose
	.connect(uri)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((err) => {
		console.error("Error connecting to MongoDB", err);
	});

// Create a new user
app.post("/users", async (req, res) => {
	const { name, password } = req.body;
	const newUser = new User({ name, password });
	await newUser.save();
	res.status(201).send(newUser);
});

// Get all users
app.get("/users", async (req, res) => {
	const users = await User.find();
	res.send(users);
});

// Update a user
app.put("/users/:id", async (req, res) => {
	const { id } = req.params;
	const { name, password } = req.body;
	const updatedUser = await User.findByIdAndUpdate(
		id,
		{ name, password },
		{ new: true }
	);
	res.send(updatedUser);
});

// Delete a user
app.delete("/users/:id", async (req, res) => {
	const { id } = req.params;
	await User.findByIdAndDelete(id);
	res.status(204).send();
});

// Create a new shopping cart
app.post("/shopping-carts", async (req, res) => {
	const { user_id, name, total } = req.body;
	const newShoppingCart = new ShoppingCart({ user_id, name, total });
	await newShoppingCart.save();
	res.status(201).send(newShoppingCart);
});

// Get all shopping carts
app.get("/shopping-carts", async (req, res) => {
	const shoppingCarts = await ShoppingCart.find();
	res.send(shoppingCarts);
});

// Update a shopping cart
app.put("/shopping-carts/:id", async (req, res) => {
	const { id } = req.params;
	const { user_id, name, total } = req.body;
	const updatedShoppingCart = await ShoppingCart.findByIdAndUpdate(
		id,
		{ user_id, name, total },
		{ new: true }
	);
	res.send(updatedShoppingCart);
});

// Delete a shopping cart
app.delete("/shopping-carts/:id", async (req, res) => {
	const { id } = req.params;
	await ShoppingCart.findByIdAndDelete(id);
	res.status(204).send();
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

app.get("/hello-world", async (req, res) => {
	const a = {
		name: "Vu Linh Truong",
		age: 21,
	};
	res.send(a);
});

app.get("/bai1s", async (req, res) => {
	const bai1s = await Bai1.find();
	res.send(bai1s);
});

app.post("/bai1", async (req, res) => {
	const { input, action, result } = req.body;
	const newBai1 = new Bai1({ input, action, result });
	await newBai1.save();
	res.status(201).send(newBai1);
});

app.delete("/bai1/:id", async (req, res) => {
	const { id } = req.params;
	await Bai1.findByIdAndDelete(id);
	res.status(204).send();
});

app.delete("/bai1s", async (req, res) => {
	await Bai1.deleteMany();
	res.status(204).send();
});
