import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import { MOBILE_URL } from "../helpers/const_type";
import { Order } from "./model/order";

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(
	cors({
		origin: MOBILE_URL,
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

const uri =
	"mongodb+srv://vulinhtruong79:R2oeziJ8k9M72uGI@midterm.mkih1.mongodb.net/?retryWrites=true&w=majority&appName=midterm";

mongoose
	.connect(uri)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((err) => {
		console.error("Error connecting to MongoDB", err);
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

app.get("/orders", async (req, res) => {
	const result = await Order.find();
	res.send(result);
	res.status(200);
});

app.get("/order/:id", async (req, res) => {
	const { id } = req.params;
	const order = await Order.findById(id);
	if (!order) {
		res.status(404).send("Order not found");
		return;
	}
	res.send(order);
	res.status(200);
});

app.post("/order", async (req, res) => {
	const { id, hasCream, hasChocolate, quantity, price, status } = req.body;
	const order = new Order({
		id,
		hasCream,
		hasChocolate,
		quantity,
		price,
		status,
	});
	await order.save();
	res.send(order);
	res.status(201);
});

app.delete("/order/:id", async (req, res) => {
	const { id } = req.params;
	const order = await Order;
	if (!order) {
		res.status(404).send("Order not found");
		return;
	}
	await order
		.findByIdAndDelete(id)
		.then(() => {
			res.send("Order deleted");
			res.status(200);
		})
		.catch((err) => {
			res.status(500).send("Error deleting order");
		});
});

app.put("/order/:id", async (req, res) => {
	const { id } = req.params;
	const { status, hasChocolate, hasCream, quantity } = req.body;
	const order = await Order.findById(id);
	if (!order) {
		res.status(404).send("Order not found");
		return;
	}
	order.status = status;
	order.hasChocolate = hasChocolate;
	order.hasCream = hasCream;
	order.quantity = quantity;

	await order
		.save()
		.then(() => {
			res.status(200).send(order);
		})
		.catch((err) => {
			res.status(500).send("Error updating order");
		});
});
