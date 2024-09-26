import { StackNavigationProp } from "@react-navigation/stack";
import { useRoute, RouteProp } from "@react-navigation/native";

import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";

import { RootStackParamList } from "../helpers/const_type";
import { Order } from "./home";
import { CheckBox } from "react-native-elements";
import StyleButton from "../components/styled-button";
import { apiRequest } from "../helpers/apiRequest";
import { isSuccessfulStatus } from "../helpers/helper";

type DetailsScreenRouteProp = StackNavigationProp<RootStackParamList, "Detail">;

type Props = {
	navigation: DetailsScreenRouteProp;
};

const Detail: React.FC<Props> = ({ navigation }) => {
	const route = useRoute<RouteProp<RootStackParamList, "Detail">>();
	const id = route.params.id;
	const [hasCream, setHasCream] = useState(false);
	const [hasChocolate, setHasChocolate] = useState(false);
	const [quantity, setQuantity] = useState<number>(0);

	const increaseQuantity = () => setQuantity(quantity + 1);
	const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

	useEffect(() => {
		const fetchOrder = async () => {
			try {
				if (!id || id == "" || id == "0") return;
				const result = await apiRequest.get(`/order/${id}`);
				alert("Order found");
				const order: Order = result;
				console.log(order);
				setHasCream(order.hasCream);
				setHasChocolate(order.hasChocolate);
				setQuantity(parseInt(order.quantity));
			} catch (e) {
				console.log(e);
				alert("Order not found");
			}
		};
		fetchOrder();
	}, [id]);

	const handleOrder = () => {
		const saveOrder = async () => {
			try {
				const order: Order = {
					id: "1",
					hasCream: hasCream,
					hasChocolate: hasChocolate,
					quantity: quantity.toString(),
					price: (
						1.0 *
						((hasCream ? 0.5 : 0) +
							(hasChocolate ? 1.0 : 0) +
							quantity) *
						4.0
					).toString(),
					status: "Đang chế biến",
				};
				let result;
				if (!id || id == "" || id == "0") {
					result = await apiRequest.post("/order", order);
					if (isSuccessfulStatus(result.status)) {
						alert("Order successfully");
					} else {
						console.log(result);
						alert("Order failed");
					}
				} else {
					await apiRequest.put(`/order/${id}`, order);
					alert("Change successfully");
				}
				navigation.navigate("Home");
			} catch (e) {
				console.log(e);
				alert("Order failed");
			}
		};
		saveOrder();
	};

	return (
		<View style={styles.container}>
			<Text style={styles.h2}>Choose Toppings: </Text>
			<View>
				<CheckBox
					title="Whipped Cream"
					checked={hasCream}
					onPress={() => setHasCream(!hasCream)}
				/>
				<CheckBox
					title="Chocolate"
					checked={hasChocolate}
					onPress={() => setHasChocolate(!hasChocolate)}
				/>
			</View>
			<View style={styles.quantityContainer}>
				<Text>Quantity: </Text>
				<View style={styles.counter}>
					<Pressable onPress={decreaseQuantity} style={styles.button}>
						<Text style={styles.buttonText}>-</Text>
					</Pressable>
					<Text style={styles.quantityText}>{quantity}</Text>
					<Pressable onPress={increaseQuantity} style={styles.button}>
						<Text style={styles.buttonText}>+</Text>
					</Pressable>
				</View>
			</View>
			<StyleButton title="Order" onPress={handleOrder} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		gap: 20,
	},
	h2: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
	},
	quantityContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 20,
		gap: 10,
	},
	counter: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 10,
	},
	button: {
		width: 30,
		height: 30,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#ddd",
		borderRadius: 15,
		marginHorizontal: 10,
	},
	buttonText: {
		fontSize: 18,
		fontWeight: "bold",
	},
	quantityText: {
		fontSize: 18,
	},
});

export default Detail;
