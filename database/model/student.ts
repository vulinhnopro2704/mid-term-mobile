import { Schema, model, Document } from "mongoose";

// Define the Student interface
interface IStudent extends Document {
	name: string;
	age: string;
	address: string;
}

// Create the Student schema
const StudentSchema = new Schema<IStudent>({
	name: { type: String, required: true },
	age: { type: String, required: true },
	address: { type: String, required: true },
});

// Create the Student model
const Student = model<IStudent>("Student", StudentSchema);

export { Student, IStudent };
