import { Schema, model, Document } from "mongoose";

// Define the User interface
interface IBai1 extends Document {
	input: string;
	action: string;
	result: string;
}

// Create the User schema
const bai1Schema = new Schema<IBai1>({
	input: { type: String, required: true },
	action: { type: String, required: true },
	result: { type: String, required: true },
});

// Create the User model
const Bai1 = model<IBai1>("Bai1", bai1Schema);

export { Bai1, IBai1 };
