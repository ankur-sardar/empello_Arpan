import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../utils/hooks";
import { getGameData, submitGameData } from "../../reduxSlices/gameSlice";
// import { getUserInfoById } from "../../reduxSlices/userSlice";
import Question from "./questionFormat/question";
import Options from "./questionFormat/options";
import RemainingQuestion from "./questionFormat/remainingQuestion";
import RemainingTime from "./questionFormat/remainingTime";
import GameAction from "./questionFormat/gameAction";
// import StatusIndicatorList from "./questionFormat/statusIndicatorList";
import GameExitWarning from "./gameTermination/gameExitWarning";
import { calculateGamePoint } from "../../data/utils";
import { resetNavigateAwayFromGame } from "../../reduxSlices/appSlice";

const Play = () => {
	const { quizId } = useParams();
	const dispatch = useAppDispatch();
	const { currentGame } = useAppSelector((state: any) => state.game);
	const { profileInfo } = useAppSelector((state: any) => state.user);
	const { navigateAway } = useAppSelector((state: any) => state.app);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [userExited, setUserExited] = useState(false);
	const [gameTimeOver, setGameTimeOver] = useState(false);
	const [gameOver, setGameOver] = useState(false);

	useEffect(() => {
		if (!currentGame && profileInfo) {
			dispatch(getGameData({ gameId: quizId, userId: profileInfo.user_id }));
		}
		if (currentGame) {
			const { attempted } = currentGame;
			setCurrentQuestionIndex(attempted);
			if (currentGame.game_status_id === 2) {
				setGameOver(true);
			}
		}
	}, [currentGame, profileInfo]);

	useEffect(() => {
		if (navigateAway) {
			showUserExitWarning();
		}
	}, [navigateAway]);

	const showGameTimeOverWarning = () => {
		setGameTimeOver(true);
	};

	const showUserExitWarning = () => {
		setUserExited(true);
	};

	const resetExitReason = () => {
		dispatch(resetNavigateAwayFromGame());
		setUserExited(false);
		setGameTimeOver(false);
		setGameOver(false);
	};

	const submitGamePlay = ({
		isCorrect,
		isWrong,
	}: {
		isCorrect: boolean;
		isWrong: boolean;
	}) => {
		const totalCorrectAnswer = isCorrect
			? currentGame.correct + 1
			: currentGame.correct;
		const totalWrongAnswer = isWrong
			? currentGame.wrong + 1
			: currentGame.wrong;

		const { game_difficulty_id, game_time_id } = currentGame;
		let updatedCurrentGame = {
			...currentGame,
			correct: totalCorrectAnswer,
			wrong: totalWrongAnswer,
			remaining: currentGame.remaining - 1,
			attempted: currentGame.attempted + 1,
			game_status_id: 2,
			game_point: calculateGamePoint(
				totalCorrectAnswer,
				game_difficulty_id,
				game_time_id
			),
		};

		// console.log("inProgressCurrentGame", updatedCurrentGame);
		dispatch(submitGameData(updatedCurrentGame));
		setGameOver(true);
	};

	return (
		<>
			{currentGame && (
				<>
					{currentGame.game_status_id === 1 &&
						currentGame.formatted_questions &&
						!userExited &&
						!gameTimeOver &&
						!gameOver && (
							<>
								<div className="sectionTop">
									<div className="questionArea">
										<RemainingQuestion
											questionList={currentGame.formatted_questions}
											selectedIndex={currentQuestionIndex}
										/>

										<Question
											questionList={currentGame.formatted_questions}
											selectedIndex={currentQuestionIndex}
										/>
									</div>
									<RemainingTime
										questionList={currentGame.formatted_questions}
										selectedIndex={currentQuestionIndex}
										timeOverHandler={showGameTimeOverWarning}
									/>
									<Options
										questionList={currentGame.formatted_questions}
										selectedIndex={currentQuestionIndex}
										gameOverHandler={submitGamePlay}
									/>
								</div>
								<div className="sectionBottom">
									<div className="questionFormat_actionArea_container">
										{/* <StatusIndicatorList
											questionList={currentGame.formatted_questions}
											selectedIndex={currentQuestionIndex}
										/> */}
										<GameAction
											questionList={currentGame.formatted_questions}
											selectedIndex={currentQuestionIndex}
											gameOverHandler={submitGamePlay}
										/>
									</div>
								</div>
							</>
						)}
					{(userExited || gameTimeOver || gameOver) && (
						<GameExitWarning
							exitReason={{ userExited, gameTimeOver, gameOver }}
							exitReasonHandler={resetExitReason}
						/>
					)}
				</>
			)}
		</>
	);
};

export default Play;
