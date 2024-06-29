import { useState, useEffect } from "react";
import type { questionFormatType } from "../../../dataTypes";
import circleInactive from "/images/inactive-answer-circle.png";
import circleActive from "/images/quiz-model-answer-circle.png";
import circleCorrect from "/images/correct-answer-ico.png";
import circleWrong from "/images/wrong-answer-ico.png";
import { useAppDispatch } from "../../../utils/hooks";
import { setCurrentQuestionSelectedAnswer } from "../../../reduxSlices/gameSlice";
import { getCurrentAnswerByQuestionId } from "../../../data/utils";
import correctAnswerAudio from "/sounds/correct.mp3";
import wrongAnswerAudio from "/sounds/wrong.mp3";

type OptionsPropType = {
	questionList: questionFormatType[];
	selectedIndex: number;
	gameOverHandler: Function;
};

const Options = (props: OptionsPropType) => {
	const {
		questionId,
		options,
		correct,
		wrong,
		attempted,
		selectedOption = "",
		explanation,
	} = props.questionList[props.selectedIndex];
	const [selectedAnswer, setSelectedAnswer] = useState("");
	const dispatch = useAppDispatch();
	const [optionsEntry, setOptionsEntry] = useState<boolean>(true);
	const [optionsExit, setOptionsExit] = useState<boolean>(false);
	const [explanationEntry, setExplanationEntry] = useState<boolean>(false);
	const [explanationExit, setExplanationExit] = useState<boolean>(false);
	const correctAudio = new Audio(correctAnswerAudio);
	const wrongAudio = new Audio(wrongAnswerAudio);

	useEffect(() => {
		setOptionsEntry(true);
	}, []);

	useEffect(() => {
		setSelectedAnswer(selectedOption);
	}, [selectedOption]);

	useEffect(() => {
		setOptionsEntry(true);
		setOptionsExit(false);
		setExplanationEntry(false);
		setExplanationExit(false);
	}, [props.selectedIndex]);

	useEffect(() => {
		if (correct) {
			correctAudio.play().catch((error) => {
				console.error("Failed to play audio:", error);
			});
		}
		if (wrong) {
			wrongAudio.play().catch((error) => {
				console.error("Failed to play audio:", error);
			});
		}

		// if (
		// 	props.selectedIndex < props.questionList.length - 1 &&
		// 	(correct || wrong)
		// ) {
		// 	setTimeout(() => {
		// 		dispatch(
		// 			setCurrentGameStatus({
		// 				isCorrect: correct,
		// 				isWrong: wrong,
		// 			})
		// 		);
		// 	}, 6000);
		// }
		// if (
		// 	props.questionList.length - 1 === props.selectedIndex &&
		// 	(correct || wrong)
		// ) {
		// 	setTimeout(() => {
		// 		props.gameOverHandler({
		// 			isCorrect: correct,
		// 			isWrong: wrong,
		// 		});
		// 	}, 4500);
		// }
	}, [correct, wrong]);

	const selectHandler = (e: any) => {
		const selectedOption = e.target.getAttribute("data-id");
		setSelectedAnswer(selectedOption);
		dispatch(
			setCurrentQuestionSelectedAnswer({
				selectedAnswer: selectedOption,
				currentQuestionIndex: props.selectedIndex,
			})
		);

		//clear options animation
		setTimeout(() => {
			setOptionsEntry(false);
			setOptionsExit(true);
		}, 1000);

		setTimeout(() => {
			setExplanationEntry(true);
		}, 2000);

		// setTimeout(() => {
		// 	setExplanationEntry(false);
		// 	setExplanationExit(true);
		// }, 4000);
	};

	const getSelectionClass = (key: string) => {
		if (attempted && selectedOption === key) {
			if (correct) {
				return "correct";
			}
			if (wrong) {
				return "wrong";
			}
		}
		if (selectedAnswer === key && !attempted) {
			return "selected";
		}
		return "";
	};

	const getSelectionIcon = (key: string) => {
		const className = getSelectionClass(key);

		if (className === "correct") {
			return circleCorrect;
		}
		if (className === "wrong") {
			return circleWrong;
		}
		if (className === "selected") {
			return circleActive;
		}
		return circleInactive;
	};

	const getOptionsAnimationClass = (index: number) => {
		if (optionsEntry) {
			return `animated fadeInUp fast delay-${index + 1} lock`;
		}
		if (optionsExit) {
			return `animated fadeOutDown fast delay-${index + 1}`;
		}
		return "";
	};

	const getExplanationAnimationClass = () => {
		if (explanationEntry) {
			return "animated fadeInUp fast delay-0";
		}
		if (explanationExit) {
			return "animated fadeOutDown fast delay-0";
		}
		return "hide";
	};

	return (
		<div
			className="questionFormat_options_container"
			onClick={attempted ? () => {} : selectHandler}
		>
			{options && (
				<>
					{attempted && (
						<div
							className={`answerExplation ${getSelectionClass(
								selectedOption
							)} ${getExplanationAnimationClass()}`}
							key={`explanation_${props.selectedIndex}`}
						>
							<span className="correctOptionBullet">
								{getCurrentAnswerByQuestionId(questionId)}
							</span>
							<span>is the correct option.</span>
							<br />
							<br />
							<b>Explanation:</b> {explanation}
						</div>
					)}
					<div
						className={`questionFormat_options_container animated ${
							attempted && "hideOut delay-4"
						}`}
					>
						{Object.entries(options).map(([key, value], i: number) => (
							<div
								className={`options_optionContainer ${getSelectionClass(
									key
								)} ${getOptionsAnimationClass(i)}`}
								key={`${i}_option_${props.selectedIndex}`}
								data-id={key}
							>
								<div
									className={`optionIndex ${getSelectionClass(key)}`}
									data-id={key}
								>
									<span data-id={key}>{key}</span>
								</div>
								<div
									className={`optionText ${getSelectionClass(key)}`}
									data-id={key}
								>
									<span data-id={key}>{value as string}</span>
								</div>
								<div
									className={`optionStatus ${getSelectionClass(key)}`}
									data-id={key}
								>
									<img src={getSelectionIcon(key)} data-id={key} />
								</div>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default Options;
