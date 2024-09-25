import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import { MOBILE_URL } from "../helpers/const_type";
import { Student } from "./model/student";

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

app.get("/students", async (req, res) => {
	const result = await Student.find();
	res.send(result);
	res.status(200);
});

app.get("/student/:id", async (req, res) => {
	const { id } = req.params;
	const student = await Student.findById(id);
	if (!student) {
		res.status(404).send("Student not found");
		return;
	}
	res.send(student);
	res.status(200);
});

app.post("/student", async (req, res) => {
	const { name, age, address } = req.body;
	const student = new Student({ name, age, address });
	await student.save();
	res.send(student);
	res.status(201);
});

app.delete("/student/:id", async (req, res) => {
	const { id } = req.params;
	const student = await Student;
	if (!student) {
		res.status(404).send("Student not found");
		return;
	}
	await student
		.findByIdAndDelete(id)
		.then(() => {
			res.send("Student deleted");
			res.status(200);
		})
		.catch((err) => {
			res.status(500).send("Error deleting student");
		});
});

app.put("/student/:id", async (req, res) => {
	const { id } = req.params;
	const { name, age, address } = req.body;
	const student = await Student.findById(id);
	if (!student) {
		res.status(404).send("Student not found");
		return;
	}
	student.name = name;
	student.age = age;
	student.address = address;
	await student.save();
	res.send(student);
	res.status(200);
});
