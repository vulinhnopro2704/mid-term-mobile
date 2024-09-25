import { StyleSheet, Text, Pressable } from "react-native";
import { Students } from "../layouts/home";

type Props = {
	item: Students;
	onPress: (id: string) => void;
};

export default function ListItem({ item, onPress }: Props) {
	return (
		<Pressable onPress={() => onPress(item._id!)} style={styles.listItem}>
			<Text style={styles.text}>{item.name}</Text>
			<Text style={styles.text}>{item.age}</Text>
			<Text style={styles.text}>{item.address}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	listItem: {
		padding: 10,
		backgroundColor: "#141718",
		marginVertical: 5,
		borderRadius: 5,
		gap: 10,
	},
	text: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
});
