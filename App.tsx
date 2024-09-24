import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
	createStackNavigator,
	StackNavigationProp,
} from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	TextInput,
} from "react-native";
import { DetailsScreen } from "./Detail";
import { RootStackParamList } from "./const";
import Toast from "react-native-toast-message";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const Stack = createStackNavigator<RootStackParamList>();

const HomeScreen: React.FC<{ navigation: HomeScreenNavigationProp }> = ({
	navigation,
}) => {
	const showToast = (year: number) => {
		Toast.show({
			type: "success",
			text1: `Navigating to Details`,
			text2: `Year: ${year}`,
		});
		navigation.navigate("Details", { year });
	};

	return (
		<View>
			<TouchableOpacity onPress={() => showToast(2021)}>
				<Text>De 2021</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => showToast(2022)}>
				<Text>De 2022</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => showToast(2023)}>
				<Text>De 2023</Text>
			</TouchableOpacity>
		</View>
	);
};

const App: React.FC = () => {
	return (
		<>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Home">
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen name="Details" component={DetailsScreen} />
				</Stack.Navigator>
			</NavigationContainer>
			<Toast />
		</>
	);
};

export default App;
