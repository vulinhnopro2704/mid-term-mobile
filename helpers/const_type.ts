export const BACKEND_URL = "http://192.168.1.100:5000";
export const MOBILE_URL = "http://localhost:8081";

// Define the type for the navigation prop
export type RootStackParamList = {
	Home: undefined;
	Detail: { id: string };
};
