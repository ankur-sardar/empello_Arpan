export const getSortedData = (data: any, sortBy: string) => {
	if (!data || !sortBy) return [...data];

	if (sortBy === "id") {
		let unSortedData = [...data];
		return unSortedData.sort((a: any, b: any) => {
			if (parseInt(a[sortBy]) < parseInt(b[sortBy])) return -1;
			if (parseInt(a[sortBy]) > parseInt(b[sortBy])) return 1;
			return 0;
		});
	}

	return [...data];
};
