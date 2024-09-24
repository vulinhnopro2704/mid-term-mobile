import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from "react";
import * as SQLite from "expo-sqlite";

type User = {
	id: number;
	name: string;
	password: string;
};

type ShoppingCart = {
	id: number;
	user_id: number;
	name: string;
	total: number;
};

type SQLiteContextType = {
	users: User[];
	shoppingCarts: ShoppingCart[];
	insertUser: (name: string, password: string) => Promise<void>;
	insertShoppingCart: (
		user_id: number,
		name: string,
		total: number
	) => Promise<void>;
	updateUser: (id: number, name: string, password: string) => Promise<void>;
	updateShoppingCart: (
		id: number,
		user_id: number,
		name: string,
		total: number
	) => Promise<void>;
	deleteUser: (id: number) => Promise<void>;
	deleteShoppingCart: (id: number) => Promise<void>;
	getUsers: () => Promise<void>;
	getShoppingCarts: () => Promise<void>;
};

type SQLiteProviderProps = {
	children: ReactNode;
};

const SQLiteContext = createContext<SQLiteContextType | undefined>(undefined);

export const SQLiteProvider: React.FC<SQLiteProviderProps> = ({ children }) => {
	const [users, setUsers] = useState<User[]>([]);
	const [shoppingCarts, setShoppingCarts] = useState<ShoppingCart[]>([]);
	const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);

	useEffect(() => {
		const initDb = async () => {
			const dbInstance = await SQLite.openDatabaseAsync("APPDATABASE.db");
			await dbInstance.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password TEXT);
        CREATE TABLE IF NOT EXISTS shoppingCarts (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, name TEXT, total REAL);
      `);
			setDb(dbInstance);
			await getUsers();
			await getShoppingCarts();
		};

		initDb();
	}, []);

	const insertUser = async (name: string, password: string) => {
		if (db) {
			await db.runAsync(
				"INSERT INTO users (name, password) VALUES (?, ?)",
				name,
				password
			);
			await getUsers();
		}
	};

	const insertShoppingCart = async (
		user_id: number,
		name: string,
		total: number
	) => {
		if (db) {
			await db.runAsync(
				"INSERT INTO shoppingCarts (user_id, name, total) VALUES (?, ?, ?)",
				user_id,
				name,
				total
			);
			await getShoppingCarts();
		}
	};

	const updateUser = async (id: number, name: string, password: string) => {
		if (db) {
			await db.runAsync(
				"UPDATE users SET name = ?, password = ? WHERE id = ?",
				name,
				password,
				id
			);
			await getUsers();
		}
	};

	const updateShoppingCart = async (
		id: number,
		user_id: number,
		name: string,
		total: number
	) => {
		if (db) {
			await db.runAsync(
				"UPDATE shoppingCarts SET user_id = ?, name = ?, total = ? WHERE id = ?",
				user_id,
				name,
				total,
				id
			);
			await getShoppingCarts();
		}
	};

	const deleteUser = async (id: number) => {
		if (db) {
			await db.runAsync("DELETE FROM users WHERE id = ?", id);
			await getUsers();
		}
	};

	const deleteShoppingCart = async (id: number) => {
		if (db) {
			await db.runAsync("DELETE FROM shoppingCarts WHERE id = ?", id);
			await getShoppingCarts();
		}
	};

	const getUsers = async () => {
		if (db) {
			const allRows = await db.getAllAsync<User>("SELECT * FROM users");
			setUsers(allRows);
		}
	};

	const getShoppingCarts = async () => {
		if (db) {
			const allRows = await db.getAllAsync<ShoppingCart>(
				"SELECT * FROM shoppingCarts"
			);
			setShoppingCarts(allRows);
		}
	};

	return (
		<SQLiteContext.Provider
			value={{
				users,
				shoppingCarts,
				insertUser,
				insertShoppingCart,
				updateUser,
				updateShoppingCart,
				deleteUser,
				deleteShoppingCart,
				getUsers,
				getShoppingCarts,
			}}
		>
			{children}
		</SQLiteContext.Provider>
	);
};

export const useSQLite = () => {
	const context = useContext(SQLiteContext);
	if (!context) {
		throw new Error("useSQLite must be used within a SQLiteProvider");
	}
	return context;
};
