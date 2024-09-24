import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
	value: string;
	onChangeText?: (text: string) => void;
	label: string;
	disible?: boolean;
};

const Input = ({ value, label, onChangeText, disible }: Props) => {
	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>
			<TextInput
				editable={!disible}
				style={styles.value}
				value={value}
				onChangeText={onChangeText}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
		gap: 16,
	},
	label: {
		fontSize: 16,
		marginRight: 8,
		width: 100,
	},
	value: {
		flex: 1,
		fontSize: 16,
		borderWidth: 1,
		borderRadius: 4,
		padding: 8,
	},
});

export default Input;
