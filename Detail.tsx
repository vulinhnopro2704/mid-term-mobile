import { RouteProp } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Input from "./components/Input";
import { RootStackParamList } from "./const";
import { FontAwesome } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

type DetailsScreenRouteProp = RouteProp<RootStackParamList, "Details">;

export const DetailsScreen: React.FC<{ route: DetailsScreenRouteProp }> = ({
	route,
}) => {
	const { year } = route.params;
	const [input, setInput] = React.useState<string>("");
	const [action, setAction] = React.useState<string>("");
	const [result, setResult] = React.useState<string>("");

	const handleSubmit = async () => {
		let updateResult = "";
		if (action === "count-letter-digit") {
			const letterCount = input.replace(/[^a-zA-Z]/g, "").length;
			const digitCount = input.replace(/\D/g, "").length;
			setResult(`LETTERS: ${letterCount}, DIGITS: ${digitCount}`);
			updateResult = `LETTERS: ${letterCount}, DIGITS: ${digitCount}`;
			console.log("Valid action");
		} else if (action == "remove-even") {
			setResult(input.replace(/[02468]/g, ""));
			updateResult = input.replace(/[02468]/g, "");
			console.log("Valid action");
		} else {
			setResult("Invalid action");
			updateResult = "Invalid action";
		}
		try {
			const response = await fetch("http://localhost:5000/bai1", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ input, action, result: updateResult }),
			});
			if (response.status.toString().startsWith("2")) {
				Toast.show({
					type: "success",
					text1: "Success",
					text2: "Lưu vào lịch sử thành công",
				});
			} else {
				Toast.show({
					type: "error",
					text1: "Error",
					text2: "Lỗi khi lưu vào lịch sử",
				});
			}
		} catch (error) {
			Toast.show({
				type: "error",
				text1: "Error",
				text2: "Lỗi khi lưu vào lịch sử",
			});
		}
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.history}>
				<FontAwesome name="history" size={24} color="black" />
			</TouchableOpacity>
			<Text>Truong Vu Linh</Text>
			<Input value={input} onChangeText={setInput} label="Input" />
			<Input value={action} onChangeText={setAction} label="Action" />
			<TouchableOpacity onPress={handleSubmit}>
				<Text>Submit</Text>
			</TouchableOpacity>
			<Input value={result} disible={true} label="Output" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		gap: 16,
	},
	history: {
		position: "absolute",
		bottom: 20,
		right: 20,
		padding: 10,
	},
});
