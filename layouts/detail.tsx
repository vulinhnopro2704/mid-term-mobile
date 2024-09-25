import { StackNavigationProp } from "@react-navigation/stack";
import { useRoute, RouteProp } from "@react-navigation/native";

import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { RootStackParamList } from "../helpers/const_type";
import { apiRequest } from "../helpers/apiRequest";
import Toast from "react-native-toast-message";
import { Students } from "./home";
import Input from "../components/input";

type DetailsScreenRouteProp = StackNavigationProp<RootStackParamList, "Detail">;

type Props = {
	navigation: DetailsScreenRouteProp;
};

const Detail: React.FC<Props> = ({ navigation }) => {
	const [student, setStudent] = React.useState<Students>({});
	const route = useRoute<RouteProp<RootStackParamList, "Detail">>();
	const { id } = route.params;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await apiRequest.get(`/student/${id}`);
				console.log(result);
				if (result) {
					console.log(result.data);
					setStudent(result);
				} else {
					Toast.show({
						type: "error",
						text1: "Không tìm thấy sinh viên",
					});
				}
			} catch (e) {
				Toast.show({
					type: "error",
					text1: "Không tìm thấy sinh viên",
				});
			}
		};
		fetchData();
	}, [id]);

	return (
		<View style={styles.container}>
			<Text style={styles.h2}>Thông tin sinh viên</Text>
			<Input label="Họ và tên" value={student.name! ?? ""} />
			<Input label="Tuổi" value={student.age! ?? ""} />
			<Input label="Địa chỉ" value={student.address! ?? ""} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	h2: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
	},
});

export default Detail;
