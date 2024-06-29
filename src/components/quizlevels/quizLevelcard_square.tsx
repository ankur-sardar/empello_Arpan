import { quizLevelType } from "../../dataTypes";
import LinearProgress from "@mui/material/LinearProgress";
import { getLevelProgress } from "../../utils/helperFunctions";
import lockedImage from "/images/locked.png";
import unlockedImage from "/images/unlocked.png";
import "./style.css";

type LevelCardProps = {
	levelDetails: quizLevelType;
	userPoints: number;
};

const QuizLevelCard = (props: LevelCardProps) => {
	const { id, name, logo_name, completion_point, points_per_star } =
		props.levelDetails;

	const progress = getLevelProgress(
		props.userPoints,
		completion_point,
		points_per_star
	);

	return (
		<div className="homePage_quizLevelCard_container" id={`${id}`}>
			<div className="logo">
				<img src={`/images/${logo_name}`} />
			</div>
			<div className="cardDetailsContainer">
				<div className="name">
					<span>{name}</span>
					<img src={progress.locked ? lockedImage : unlockedImage} />
				</div>
				<div className="progress">
					<LinearProgress
						variant="determinate"
						value={progress.value}
						color="primary"
					/>
				</div>
			</div>
		</div>
	);
};

export default QuizLevelCard;
