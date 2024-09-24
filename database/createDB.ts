import mongoose from "mongoose";
import { User } from "./model/User";
import { ShoppingCart } from "./model/ShoppingCart";

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
	"mongodb+srv://vulinhtruong79:PWMprSXhdQJNzjiZ@midterm.mkih1.mongodb.net/?retryWrites=true&w=majority&appName=midterm";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});
async function run() {
	try {
		// Connect to MongoDB using Mongoose
		await mongoose.connect(uri);
		// Connect the client to the server	(optional starting in v4.7)
		console.log("Connected to MongoDB");

		// Example: Create a new user
		const newUser = new User({
			name: "John Doe",
			password: "password123",
		});
		await newUser.save();

		// Example: Create a new shopping cart
		const newShoppingCart = new ShoppingCart({
			user_id: newUser._id,
			name: "Groceries",
			total: 100.5,
		});
		await newShoppingCart.save();

		console.log("Shopping cart created:", newShoppingCart);
	} finally {
		// Ensures that the client will close when you finish/error
		// Close the connection
		await mongoose.connection.close();
		await client.close();
	}
}
run().catch(console.dir);
