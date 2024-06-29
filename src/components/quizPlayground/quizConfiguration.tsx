import singlePlayerActiveIcon from "/images/quiz-level-singleplayer-active.png";
import singlePlayerInactiveIcon from "/images/quiz-level-singleplayer-inactive.png";
import twoPlayersInactiveIcon from "/images/quiz-level-twoplayers-inactive.png";
import { quiz_times } from "../../data";
import "./style.css";

type quizConfigurationProps = {
	categoryId: number;
	playMode: number;
	playDifficulty: number;
	playTime: number;
	playModeHandler: (e: any) => void;
	playDifficultyHandler: (e: any) => void;
	playTimeHandler: (e: any) => void;
};

const quizConfiguration = (props: quizConfigurationProps) => {
	return (
		<div className="quizPlayground_configuration_container">
			<div className="row">
				<div className="sectionHeader">Select</div>
				<div className="sectionOptions">
					<div
						className={`button playerMode_card ${
							props.playMode === 1 ? "selected" : ""
						}`}
					>
						<div className="top">
							<div className="name">Single Player</div>
							<div className="avatar">
								<img
									src={
										props.playMode === 1
											? singlePlayerActiveIcon
											: singlePlayerInactiveIcon
									}
								/>
							</div>
						</div>
						<div className={`bottom ${props.playMode === 1 ? "selected" : ""}`}>
							<span>{props.playMode === 1 ? "Selected" : "Select"}</span>
						</div>
					</div>
					<div className="button playerMode_card">
						<div className="top">
							<div className="name">Two Player</div>
							<div className="avatar">
								<img
									src={twoPlayersInactiveIcon}
									style={{ width: 45, height: 40 }}
								/>
							</div>
						</div>
						<div className="bottom">
							<span>Select</span>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="sectionHeader">Select Level</div>
				<div className="sectionOptions" onClick={props.playDifficultyHandler}>
					{["Easy", "Medium", "Hard"].map((x, i) => (
						<div
							id={`${i + 1}`}
							key={i}
							className={`button playerDifficulty_card ${
								props.playDifficulty === i + 1 ? "selected" : ""
							}`}
						>
							<span id={`${i + 1}`}>{x}</span>
						</div>
					))}
				</div>
			</div>
			<div className="row">
				<div className="sectionHeader">Select time</div>
				<div className="sectionOptions" onClick={props.playTimeHandler}>
					{quiz_times.map((x: any, i: number) => (
						<div
							id={x.id}
							key={i}
							className={`button playerDifficulty_card ${
								props.playTime === x.id ? "selected" : ""
							}`}
						>
							<span id={`${x.id}`}>{x.label}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default quizConfiguration;
