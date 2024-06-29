import { quizLevelType } from "../../dataTypes";
import { useAppSelector } from "../../utils/hooks";
import QuizLevelCardSquare from "./quizLevelcard_square";
import QuizLevelCardRectangle from "./quizLevelcard_rectangle";

export type quizLevelsType = {
	levels: quizLevelType[];
	shape: string;
};

const QuizLevels = (props: quizLevelsType) => {
	const { profileInfo } = useAppSelector((state: any) => state.user);
	return (
		<>
			{profileInfo &&
				props.shape === "square" &&
				props.levels?.map((level, i) => (
					<QuizLevelCardSquare
						key={i}
						levelDetails={level}
						userPoints={profileInfo.user_points}
					/>
				))}

			{profileInfo &&
				props.shape === "rectangle" &&
				props.levels?.map((level, i) => (
					<QuizLevelCardRectangle
						key={i}
						index={i}
						levelDetails={level}
						userPoints={profileInfo.user_points}
					/>
				))}
		</>
	);
};

export default QuizLevels;
