import { Schema, model, Document } from "mongoose";

// Define the User interface
interface IUser extends Document {
	name: string;
	password: string;
}

// Create the User schema
const userSchema = new Schema<IUser>({
	name: { type: String, required: true },
	password: { type: String, required: true },
});

// Create the User model
const User = model<IUser>("User", userSchema);

export { User, IUser };
