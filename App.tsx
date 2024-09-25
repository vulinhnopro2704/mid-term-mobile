import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Toast from "react-native-toast-message";
import { RootStackParamList } from "./helpers/const_type";
import Home from "./layouts/home";
import Detail from "./layouts/detail";

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
	return (
		<>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Home">
					<Stack.Screen name="Home" component={Home} />
					<Stack.Screen name="Detail" component={Detail} />
				</Stack.Navigator>
			</NavigationContainer>
			<Toast />
		</>
	);
};

export default App;
