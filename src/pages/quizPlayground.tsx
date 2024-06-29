import { useState, useEffect } from "react";
import {
	useNavigate,
	useSearchParams,
	useParams,
	Outlet,
} from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../utils/hooks";
import {
	setCurrentGameCategory,
	createNewGame,
} from "../reduxSlices/gameSlice";
import { navigateAwayFromGame } from "../reduxSlices/appSlice";
import { v4 as uuidv4 } from "uuid";
import QuizRules from "../components/quizPlayground/quizRules";
import QuizConfiguration from "../components/quizPlayground/quizConfiguration";
import {
	getCategoryName,
	createQuestionSet,
	getCategoryDescription,
} from "../data/utils";
import clickMusicUrl from "/sounds/click.mp3";
import bgMusicUrl from "/sounds/bg.mp3";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import "./style.css";

const QuizPlayground = () => {
	const [quizRuleAccepted, setQuizRuleAccepted] = useState(false);
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const [playMode, setPlayMode] = useState(1);
	const [playDifficulty, setPlayDifficulty] = useState(1);
	const [playTime, setPlayTime] = useState(1);
	const [quizStarted, setQuizStarted] = useState(false);
	const dispatch = useAppDispatch();
	const categoryId = searchParams.get("categoryId") || "0";
	const { quizId } = useParams();

	const { currentGameCategory } = useAppSelector((state: any) => state.game);
	const { profileInfo } = useAppSelector((state: any) => state.user);
	const audio_click = new Audio(clickMusicUrl);
	const audio_background = new Audio(bgMusicUrl);

	useEffect(() => {
		audio_background.play();
		return () => {
			audio_background.pause();
		};
	}, []);

	useEffect(() => {
		dispatch(
			setCurrentGameCategory({
				categoryName: getCategoryName(parseInt(categoryId)),
				categoryDescription: getCategoryDescription(parseInt(categoryId)),
			})
		);
	}, []);

	useEffect(() => {
		if (quizId) {
			setQuizStarted(true);
			setQuizRuleAccepted(true);
		}
	}, [quizId]);

	const playModeHandler = (e: any) => {
		setPlayMode(parseInt(e.target.id));
		audio_click.play();
	};

	const playDifficultyHandler = (e: any) => {
		setPlayDifficulty(parseInt(e.target.id));
		audio_click.play();
	};

	const playTimeHandler = (e: any) => {
		setPlayTime(parseInt(e.target.id));
		audio_click.play();
	};

	const createQuiz = () => {
		setQuizStarted(true);
		const game_id = uuidv4();
		const game_category_id = parseInt(categoryId);
		const formatted_questions = createQuestionSet(
			game_category_id,
			playDifficulty
		);

		dispatch(
			createNewGame({
				game_id,
				game_category_id,
				game_type_id: playMode,
				game_difficulty_id: playDifficulty,
				game_time_id: playTime,
				game_status_id: 1,
				formatted_questions,
				participant_ids: [profileInfo.user_id],
				user_id: profileInfo.user_id,
			})
		);
		navigate(`/playground/${game_id}`);
	};

	const goToHome = () => {
		dispatch(navigateAwayFromGame());
	};

	return (
		<div className="quizPlaygroundPage_container">
			{quizRuleAccepted && quizStarted && (
				<>
					<div className="banner_quizCategory">
						<IconButton onClick={goToHome}>
							<ArrowBackIosNewIcon
								style={{
									// border: "1px solid #fff",
									borderRadius: "50%",
									padding: 5,
									color: "#fff",
								}}
							/>
						</IconButton>
						<span>{currentGameCategory}</span>
					</div>
				</>
			)}
			{!quizRuleAccepted && (
				<QuizRules goNext={() => setQuizRuleAccepted(true)} />
			)}
			{quizRuleAccepted && !quizStarted && (
				<>
					<div className="banner_quizCategory justifyCenter">
						<span>{currentGameCategory}</span>
					</div>
					<QuizConfiguration
						categoryId={parseInt(categoryId)}
						playMode={playMode}
						playDifficulty={playDifficulty}
						playTime={playTime}
						playModeHandler={playModeHandler}
						playDifficultyHandler={playDifficultyHandler}
						playTimeHandler={playTimeHandler}
					/>
					<div className="footerAction">
						<div className="button btn_next" onClick={createQuiz}>
							<span>START QUIZ</span>
						</div>
					</div>
				</>
			)}
			<Outlet />
		</div>
	);
};

export default QuizPlayground;
