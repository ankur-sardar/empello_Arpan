import { useState, useEffect } from "react";
import type { questionFormatType } from "../../../dataTypes";
import { useAppDispatch } from "../../../utils/hooks";
import {
	// setCurrentQuestionAttempt,
	setCurrentGameStatus,
} from "../../../reduxSlices/gameSlice";

type GameActionPropType = {
	questionList: questionFormatType[];
	selectedIndex: number;
	gameOverHandler: Function;
};

const GameAction = (props: GameActionPropType) => {
	const [selectionError, setSelectionError] = useState("");
	const { correct, wrong, attempted, selectedOption } =
		props.questionList[props.selectedIndex];
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (selectedOption) {
			setSelectionError("");
		}
	}, [selectedOption]);

	// const checkAnswerHandler = () => {
	// 	if (selectedOption) {
	// 		//dispatch action to set current question attempted to true
	// 		dispatch(setCurrentQuestionAttempt(props.selectedIndex));
	// 	} else {
	// 		setSelectionError("Please select an answer");
	// 	}
	// };

	const goToNextQuestionHandler = () => {
		dispatch(
			setCurrentGameStatus({
				isCorrect: correct,
				isWrong: wrong,
			})
		);
	};

	const goToGameResult = () => {
		props.gameOverHandler({
			isCorrect: correct,
			isWrong: wrong,
		});
	};

	return (
		<>
			{selectionError && <div className="error">{selectionError}</div>}
			{props.selectedIndex < props.questionList.length - 1 && (
				<div
					className={`${attempted ? "actionButton" : "actionButton disabled"}`}
					onClick={attempted ? goToNextQuestionHandler : () => {}}
				>
					NEXT QUESTION
				</div>
			)}
			{props.questionList.length - 1 === props.selectedIndex && attempted && (
				<div className="actionButton" onClick={goToGameResult}>
					SUBMIT
				</div>
			)}
		</>
	);
};

export default GameAction;
