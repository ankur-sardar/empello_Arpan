import {
	quiz_categories,
	questions,
	quiz_times,
	quiz_difficulties,
} from "./index";

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

export const getCategoryName = (categoryId: number) => {
	if (categoryId === 0) return "Random Topic";

	return (
		quiz_categories.find((x) => x.id === categoryId)?.category_name ||
		"Unknown Category"
	);
};

export const dayInWeek = {
	"1": "Mon",
	"2": "Tue",
	"3": "Wed",
	"4": "Thu",
	"5": "Fri",
	"6": "Sat",
	"7": "Sun",
};

export const getCategoryDescription = (categoryId: number) => {
	if (categoryId === 0) return "Questions will be selected on various topic";

	return quiz_categories.find((x) => x.id === categoryId)?.description || "";
};

export const getCategoryLogo = (categoryId: number) => {
	if (categoryId === 0) return "random-category.png";

	return quiz_categories.find((x) => x.id === categoryId)?.logo_name || "";
};

export const createQuestionSet = (categoryId: number, difficultyId: number) => {
	// const totalQuestionCount = questions?.length || 0;
	const totalQuestionSet =
		categoryId === 0
			? [...questions]
			: [...questions].filter((x) => x.categoryId === categoryId) || [];

	const totalQuestionCount = totalQuestionSet.length;

	const numberOfQuestionsInASet =
		quiz_difficulties.find((x) => x.id === difficultyId)?.noOfQuestions || 10;

	const tenRandomNumbers = getRandomNumbers(
		0,
		totalQuestionCount - 1,
		numberOfQuestionsInASet
	);

	let randomQuestions: any[] = [];

	if (totalQuestionCount > 0) {
		tenRandomNumbers.forEach((x) => {
			randomQuestions.push({ ...totalQuestionSet[x] });
		});
	}

	let questionSet = [...randomQuestions].map((x) => {
		return {
			...x,
			attempted: false,
			correct: false,
			wrong: false,
			selectedOption: "",
		};
	});

	questionSet.forEach((x) => {
		delete x.answer;
	});

	return [...questionSet];
};

export const getRandomNumbers = (
	start: number,
	end: number,
	howMany: number
) => {
	const randomNumbers = [];
	for (let i = 0; i < howMany; i++) {
		const randomNumber = Math.floor(Math.random() * (end - start + 1)) + start;
		randomNumbers.push(randomNumber);
	}
	return randomNumbers;
};

export const checkQuestionAnswer = (
	questionId: number,
	givenAnswer: string
) => {
	const questionMeta = questions.find((x) => x.questionId === questionId);

	if (questionMeta?.answer === givenAnswer) {
		return "correct";
	}
	return "wrong";
};

export const getCurrentAnswerByQuestionId = (questionId: number) => {
	const questionMeta = questions.find((x) => x.questionId === questionId);
	return questionMeta?.answer || "";
};

export const getGameTimeById = (id: number) => {
	const gameTime = quiz_times.find((x) => x.id === id);
	return gameTime?.valueInSecond || 120;
};

export const calculateGamePoint = (
	totalCorrectAnswer: number = 0,
	game_difficulty_id: number,
	game_time_id: number
) => {
	if (!totalCorrectAnswer || !game_difficulty_id || !game_time_id) return 0;

	const points = quiz_difficulties.find((x) => x.id === game_difficulty_id);
	const bonus = quiz_times.find((x) => x.id === game_time_id);

	if (points && bonus) {
		const totalPoints =
			(totalCorrectAnswer * points.pointsPerCorrectAnswer || 0) +
				bonus.bonusPoints || 0;

		return totalPoints;
	}
	return 0;
};
