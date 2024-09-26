import { Schema, model, Document } from "mongoose";

// Define the Order interface
interface IOrder extends Document {
	id: string;
	hasCream: boolean;
	hasChocolate: boolean;
	quantity: string;
	price: string;
	status: string;
}

// Create the Order schema
const OrderSchema = new Schema<IOrder>({
	id: { type: String, required: true },
	hasCream: { type: Boolean, required: true },
	hasChocolate: { type: Boolean, required: true },
	quantity: { type: String, required: true },
	price: { type: String, required: true },
	status: { type: String, required: true },
});

// Create the Order model
const Order = model<IOrder>("Order", OrderSchema);

export { Order, IOrder };
