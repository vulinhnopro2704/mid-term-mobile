import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import Input from "./input";
import { Order, Status } from "../layouts/home";
import { Picker } from "@react-native-picker/picker";
import { apiRequest } from "../helpers/apiRequest";

export default function Card({
	_id,
	id,
	hasCream,
	hasChocolate,
	price,
	quantity,
	status,
	onPressCard,
	onPressDelete,
}: Order) {
	const [localStatus, setLocalStatus] = useState<Status>(status);
	const [isEdit, setIsEdit] = useState(false);

	const handleIsPressCard = () => {
		if (isEdit) return;
		onPressCard!(_id!);
	};

	const onPressUpdate = (_id: string) => {
		if (isEdit) {
			alert(`New Status: ${localStatus}`);
			apiRequest.put(`/order/${_id}`, { status: localStatus });
		}
		setIsEdit(!isEdit);
	};

	return (
		<View style={styles.container}>
			<Pressable
				onPress={handleIsPressCard}
				style={styles.infor}
				pointerEvents="box-none"
			>
				<Input label="Order No" disible={true} value={id} />
				<Input
					disible={true}
					label="Add whipped cream"
					value={hasCream ? "yes" : "no"}
				/>
				<Input
					disible={true}
					label="Add chocolate"
					value={hasChocolate ? "yes" : "no"}
				/>
				<Input
					disible={true}
					label="Quantity"
					value={quantity.toString()}
				/>
				<Input disible={true} label="Price" value={price.toString()} />
				{isEdit ? (
					<Picker
						selectedValue={localStatus}
						onValueChange={(itemValue) =>
							setLocalStatus(itemValue as Status)
						}
						enabled={isEdit}
					>
						<Picker.Item
							label="Đang chế biến"
							value="Đang chế biến"
						/>
						<Picker.Item label="Đã phục vụ" value="Đã phục vụ" />
						<Picker.Item
							label="Đã thanh toán"
							value="Đã thanh toán"
						/>
					</Picker>
				) : (
					<Input
						disible={true}
						label="Status"
						value={localStatus ?? ""}
					/>
				)}
			</Pressable>
			<View style={styles.buttonContainer} pointerEvents="box-none">
				<Pressable
					onPress={() => onPressUpdate(_id!)}
					style={styles.button}
				>
					<Text style={styles.buttonText}>
						{isEdit ? "Save" : "Edit"}
					</Text>
				</Pressable>
				<Pressable
					onPress={() => onPressDelete!(_id!)}
					style={styles.button}
				>
					<Text style={styles.buttonText}>Delete</Text>
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		borderWidth: 1,
		borderRadius: 4,
		marginBottom: 16,
	},
	h2: {
		fontSize: 20,
		marginBottom: 20,
	},
	infor: {
		marginBottom: 20,
		flexDirection: "column",
		gap: 16,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	button: {
		padding: 10,
		backgroundColor: "#007bff",
		borderRadius: 5,
		marginHorizontal: 5,
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
	},
});
