import { model, Schema } from "mongoose";

// Define the ShoppingCart interface
interface IShoppingCart extends Document {
	user_id: Schema.Types.ObjectId;
	name: string;
	total: number;
}

// Create the ShoppingCart schema
const shoppingCartSchema = new Schema<IShoppingCart>({
	user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
	name: { type: String, required: true },
	total: { type: Number, required: true },
});

// Create the ShoppingCart model
const ShoppingCart = model<IShoppingCart>("ShoppingCart", shoppingCartSchema);

export { ShoppingCart, IShoppingCart };
