import * as SQLite from "expo-sqlite";
const myfunc2 = async () => {
	const db = await SQLite.openDatabaseAsync("databaseName");

	const statement = await db.prepareAsync(
		"INSERT INTO test (value, intValue) VALUES ($value, $intValue)"
	);
	try {
		let result = await statement.executeAsync({
			$value: "bbb",
			$intValue: 101,
		});
		console.log("bbb and 101:", result.lastInsertRowId, result.changes);

		result = await statement.executeAsync({
			$value: "ccc",
			$intValue: 102,
		});
		console.log("ccc and 102:", result.lastInsertRowId, result.changes);

		result = await statement.executeAsync({
			$value: "ddd",
			$intValue: 103,
		});
		console.log("ddd and 103:", result.lastInsertRowId, result.changes);
	} finally {
		await statement.finalizeAsync();
	}

	const statement2 = await db.prepareAsync(
		"SELECT * FROM test WHERE intValue >= $intValue"
	);
	try {
		const result = await statement2.executeAsync<{
			value: string;
			intValue: number;
		}>({
			$intValue: 100,
		});

		// `getFirstAsync()` is useful when you want to get a single row from the database.
		const firstRow = await result.getFirstAsync();
		console.log(firstRow.id, firstRow.value, firstRow.intValue);

		// Reset the SQLite query cursor to the beginning for the next `getAllAsync()` call.
		await result.resetAsync();

		// `getAllAsync()` is useful when you want to get all results as an array of objects.
		const allRows = await result.getAllAsync();
		for (const row of allRows) {
			console.log(row.value, row.intValue);
		}

		// Reset the SQLite query cursor to the beginning for the next `for-await-of` loop.
		await result.resetAsync();

		// The result object is also an async iterable. You can use it in `for-await-of` loop to iterate SQLite query cursor.
		for await (const row of result) {
			console.log(row.value, row.intValue);
		}
	} finally {
		await statement2.finalizeAsync();
	}
};
