import React, { useEffect, useState } from "react";
import {
	FlatList,
	Pressable,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../helpers/const_type";
import Toast from "react-native-toast-message";
import { apiRequest } from "../helpers/apiRequest";
import Card from "../components/card";

type HomeScreenRouteProp = StackNavigationProp<RootStackParamList, "Home">;
type Props = {
	navigation: HomeScreenRouteProp;
};

export type Status = "Đang chế biến" | "Đã phục vụ" | "Đã thanh toán" | null;

export type Order = {
	_id?: string;
	id: string;
	hasCream: boolean;
	hasChocolate: boolean;
	quantity: string;
	price: string;
	status: Status;
	onPressDelete?: (id: string) => void;
	onPressCard?: () => void;
};

const Home: React.FC<Props> = ({ navigation }) => {
	const [orders, setOrders] = useState<Order[]>([]);

	const fetchOrders = async () => {
		try {
			const result = await apiRequest.get("/orders");
			if (result && result.length > 0) {
				setOrders(result);
			}
		} catch (e) {
			Toast.show({
				type: "error",
				text1: "Không tìm thấy Order",
			});
		}
	};

	const onPressDelete = (_id: string) => {
		const deleteCard = async () => {
			await apiRequest.delete(`/order/${_id}`);
		};
		deleteCard();
		alert("Deleted successfully");
		setOrders(orders.filter((order) => order._id !== _id));
	};

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			fetchOrders();
		});
		fetchOrders();
		return unsubscribe;
	}, [navigation]);

	const handleOnButtonAddPress = async () => {
		alert("Add order");
		navigation.navigate("Detail", { id: "" });
	};

	const handleOnPress = async (_id: string) => {
		alert("Detail");
		navigation.navigate("Detail", { id: _id });
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.container}>
				<Pressable
					style={styles.buttonAdd}
					onPress={handleOnButtonAddPress}
				>
					<FontAwesome name="plus" size={24} color="black" />
				</Pressable>
				{orders && orders.length > 0 && (
					<FlatList
						data={orders}
						renderItem={({ index, item }) => (
							<Card
								onPressDelete={onPressDelete}
								onPressCard={() => handleOnPress(item._id!)}
								{...item}
							/>
						)}
						keyExtractor={(item) => item!._id!}
						scrollEnabled={true}
						showsVerticalScrollIndicator={true}
					/>
				)}
				{orders && orders.length == 0 && (
					<Text>Không có Order nào</Text>
				)}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		width: "100%",
		height: "100%",
	},
	container: {
		flex: 1,
		padding: 30,
		flexDirection: "column",
		gap: 16,
	},
	h2: {
		fontSize: 20,
		fontWeight: "bold",
	},
	buttonAdd: {
		position: "absolute",
		bottom: "20%",
		right: "20%",
		backgroundColor: "#ccc",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
		width: 50,
		height: 50,
		zIndex: 100,
	},
	listItem: {
		padding: 10,
		backgroundColor: "#141718",
		color: "#fff",
		marginVertical: 5,
		borderRadius: 5,
	},
});

export default Home;
