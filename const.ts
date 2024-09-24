export const BACKEND_URL = "http://localhost:5000";
export const MOBILE_URL = "http://localhost:8081";

// Define the type for the navigation prop
export type RootStackParamList = {
	Home: undefined;
	Details: { year: number };
};
