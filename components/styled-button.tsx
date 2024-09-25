import { Text, Pressable, StyleSheet } from "react-native";
import React from "react";

type Props = {
	title: string;
	onPress: () => void;
};

export default function StyleButton({ title, onPress }: Props) {
	return (
		<Pressable style={styles.button} onPress={onPress}>
			<Text style={styles.text}>{title}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#141718",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
	},
	text: {
		color: "#fff",
	},
});
