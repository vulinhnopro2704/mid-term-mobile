import React, { useEffect, useState } from "react";
import {
	FlatList,
	Pressable,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import Input from "../components/input";
import { FontAwesome } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../helpers/const_type";
import Toast from "react-native-toast-message";
import { apiRequest } from "../helpers/apiRequest";
import { isSuccessfulStatus } from "../helpers/helper";
import ListItem from "../components/list-item-pressable";

type HomeScreenRouteProp = StackNavigationProp<RootStackParamList, "Home">;
type Props = {
	navigation: HomeScreenRouteProp;
};

export type Students = {
	_id?: string;
	name?: string;
	age?: string;
	address?: string;
};

const Home: React.FC<Props> = ({ navigation }) => {
	const [name, setName] = useState<string>("");
	const [age, setAge] = useState<string>("");
	const [address, setAddress] = useState<string>("");

	const [students, setStudents] = useState<Students[]>([]);

	useEffect(() => {
		const fetchStudents = async () => {
			const result = await apiRequest.get("/students");
			if (result && result.length > 0) {
				setStudents(result);
			}
		};
		fetchStudents();
	}, []);

	const handleOnItemPress = (id: string) => {
		navigation.navigate("Detail", { id });
	};

	const handleOnButtonAddPress = async () => {
		alert("Add student");
		if (name === "" || age === "" || address === "") {
			Toast.show({
				type: "error",
				text1: "Vui lòng nhập đầy đủ thông tin",
			});
			return;
		}

		if (
			isNaN(Number(age)) ||
			age.includes(".") ||
			Number.parseInt(age) > 99 ||
			Number.parseInt(age) < 1
		) {
			Toast.show({
				type: "error",
				text1: "Kiểm tra lại trường nhập tuổi",
			});
			return;
		}

		const newStudent = {
			name,
			age,
			address,
		};

		const result = await apiRequest.post("/student", newStudent);
		console.log("result", result);
		try {
			if (isSuccessfulStatus(result.status)) {
				Toast.show({
					type: "success",
					text1: "Thêm sinh viên thành công",
				});
				const responseStudent: Students = result.data;
				setStudents([...students, responseStudent]);
				setName("");
				setAge("");
				setAddress("");
			} else {
				Toast.show({ type: "error", text1: "Thêm sinh viên thất bại" });
			}
		} catch (error) {
			Toast.show({ type: "error", text1: "Thêm sinh viên thất bại" });
		}
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.container}>
				<Text style={styles.h2}>Thông tin sinh viên</Text>
				<Input label="Họ và tên" value={name} onChangeText={setName} />
				<Input label="Tuổi" value={age} onChangeText={setAge} />
				<Input
					label="Địa chỉ"
					value={address}
					onChangeText={setAddress}
				/>
				<Pressable
					style={styles.buttonAdd}
					onPress={handleOnButtonAddPress}
				>
					<FontAwesome name="plus" size={24} color="black" />
				</Pressable>
				<FlatList
					data={students}
					renderItem={({ item }) => (
						<ListItem
							item={item}
							onPress={() => handleOnItemPress(item._id!)}
						/>
					)}
					keyExtractor={(item) => item!._id!}
					scrollEnabled={true}
					showsVerticalScrollIndicator={true}
				/>
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
