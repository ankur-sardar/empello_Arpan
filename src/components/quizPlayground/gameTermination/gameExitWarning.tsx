import leavingScreenImageUrl from "/images/leavingscreen-image.png";
import quizEndMedalImageUrl from "/images/quiz-end-medal-image.png";
import { useAppSelector, useAppDispatch } from "../../../utils/hooks";
import {
	resetCurrentGame,
	retakeCurrentQuiz,
} from "../../../reduxSlices/gameSlice";
import { useNavigate } from "react-router-dom";
import sadMusicUrl from "/sounds/sad.mp3";
import completedMusicUrl from "/sounds/completed.mp3";
import "./styles.css";
import { useEffect } from "react";

type GameExitWarningProps = {
	exitReason: {
		userExited: boolean;
		gameTimeOver: boolean;
		gameOver: boolean;
	};
	exitReasonHandler: Function;
};
const GameExitWarning = (props: GameExitWarningProps) => {
	const { userExited, gameTimeOver, gameOver } = props.exitReason;
	const { currentGame, loading } = useAppSelector((state: any) => state.game);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const gameQuit_sad = new Audio(sadMusicUrl);
	const gameComplete = new Audio(completedMusicUrl);

	const { correct, formatted_questions, game_status_id } = currentGame;

	useEffect(() => {
		if (userExited || gameTimeOver) {
			gameQuit_sad.play();
		}
		if (gameOver) {
			gameComplete.play();
		}
	}, [userExited, gameTimeOver]);

	const backToHome = () => {
		dispatch(resetCurrentGame());
		props.exitReasonHandler();
		navigate("/");
	};
	const retakeQuiz = () => {
		dispatch(retakeCurrentQuiz());
		props.exitReasonHandler();
	};

	return (
		<div className="timeOverWarning_container">
			<img
				src="/images/conffeti.png"
				alt=""
				id="conffeti"
				className="animated boom fast delay-1"
			/>
			{/* {gameOver && (
				<img
					src="/images/conffeti.png"
					alt=""
					id="conffeti"
					className="animated boom fast delay-7"
				/>
			)} */}
			<div className="emotionImage">
				{gameOver ? (
					<img
						src={quizEndMedalImageUrl}
						className="animated flipInX fast delay-0"
					/>
				) : (
					<img
						src={leavingScreenImageUrl}
						className="animated jackInTheBox delay-0"
					/>
				)}
			</div>
			<div className="warningText animated fadeInUp fast delay-1">
				{userExited && "Are you sure you want to exit the quiz?"}
				{gameTimeOver &&
					!userExited &&
					!gameOver &&
					"Sorry !! your time is over"}
				{gameOver && (
					<>{game_status_id === 1 ? "You’ve earned" : "This game is over !"}</>
				)}
			</div>
			<div className="points animated fadeIn fast delay-2">
				<span className="value">
					{userExited && "0"}
					{gameTimeOver && !userExited && !gameOver && "0"}
					{gameOver && (
						<>{loading ? <>...</> : <>{`${currentGame.game_point}`}</>}</>
					)}
				</span>
				<br />
				<span className="label">Points</span>
			</div>
			<div className="questionAttemptStatus">
				<div className="questionAttemptStatusTextContainer animated fadeInUp fast delay-2">
					<span>
						{`${correct} Correct Out of ${formatted_questions.length} Questions`}{" "}
					</span>
				</div>
			</div>
			<div className="pointInformation animated fadeIn fast delay-3">
				{(userExited || gameTimeOver) &&
					!gameOver &&
					"Unanswered questions will be marked as incomplete, affecting your final score."}
				{gameOver &&
					"Congratulations, you have successfully completed the Quiz!"}
			</div>
			<div className="actionButtonContainer animated fast fadeInUp delay-4">
				<div className="actionButton_secondary" onClick={backToHome}>
					BACK TO LESSONS
				</div>
				{!gameOver && (userExited || gameTimeOver) && (
					<div className="actionButton_primary" onClick={retakeQuiz}>
						RE-TAKE QUIZ
					</div>
				)}
				{gameOver && (
					<div className="actionButton_primary" onClick={backToHome}>
						CONTINUE
					</div>
				)}
			</div>
		</div>
	);
};

export default GameExitWarning;
