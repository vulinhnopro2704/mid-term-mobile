export function isSuccessfulStatus(status: number) {
	return status.toString().startsWith("2");
}
