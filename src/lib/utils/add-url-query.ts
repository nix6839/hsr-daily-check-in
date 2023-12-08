export default function addUrlQuery(
	url: ConstructorParameters<typeof URL>[0],
	addedQuery: NonNullable<ConstructorParameters<typeof URLSearchParams>[0]>,
): string {
	const _addedQuery = new URLSearchParams(addedQuery);
	const newURL = new URL(url);
	for (const [name, value] of _addedQuery.entries()) {
		newURL.searchParams.append(name, value);
	}
	return newURL.toString();
}
