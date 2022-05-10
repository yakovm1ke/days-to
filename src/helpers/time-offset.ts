export function removeTimeOffset(date: Date) {
	const userTimeOffset = date.getTimezoneOffset() * 60000
	if (userTimeOffset > 0) {
		return new Date(date.getTime() - userTimeOffset)
	}
	return new Date(date.getTime() + userTimeOffset)
}