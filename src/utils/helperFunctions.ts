export const getLevelProgress = (
	userPoint?: number,
	completionPoint?: number,
	pointsPerStar?: number
) => {
	//Some meta value missing
	if (!userPoint || !completionPoint || !pointsPerStar) {
		return {
			value: 0,
			star: 0,
			locked: true,
		};
	}

	const levelStartPoint = completionPoint - pointsPerStar * 3 + 1;

	//start of a quiz level
	if (userPoint === levelStartPoint) {
		return {
			value: 0,
			star: 0,
			locked: false,
		};
	}

	//All previous levels
	if (userPoint > completionPoint) {
		return {
			value: 100,
			star: 3,
			locked: false,
		};
	}

	//At next levels
	if (userPoint < levelStartPoint) {
		return {
			value: 0,
			star: 0,
			locked: true,
		};
	}

	//Current level
	return {
		value: Math.round(
			((userPoint - levelStartPoint) / (completionPoint - levelStartPoint)) *
				100
		),
		star: Math.round((userPoint - levelStartPoint) / pointsPerStar),
		locked: false,
	};
};
