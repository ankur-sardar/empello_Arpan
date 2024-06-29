import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { quizLevelType } from "../../dataTypes";
import LinearProgress from "@mui/material/LinearProgress";
import { getLevelProgress } from "../../utils/helperFunctions";
import lockedImage from "/images/locked.png";
import unlockedImage from "/images/unlocked.png";
import forwardArrowImageUrl from "/images/greaterThanArrow.png";
import Rating from "@mui/material/Rating";
import "./style.css";

type LevelCardProps = {
	index: number;
	levelDetails: quizLevelType;
	userPoints: number;
};

const QuizLevelCard = (props: LevelCardProps) => {
	const [showCardDetails, setShowCardDetails] = useState(false);
	const { id, name, completion_point, points_per_star } = props.levelDetails;
	const navigate = useNavigate();

	const progress = getLevelProgress(
		props.userPoints,
		completion_point,
		points_per_star
	);

	const starCount = progress.star;

	return (
		<div
			className={`progresslevelPage_quizLevelCard_container animated fadeInUp fast delay-${props.index}`}
		>
			<div className="summary" id={`${id}`}>
				<div className="logo">
					<img src={progress.locked ? lockedImage : unlockedImage} />
				</div>
				<div className="name">
					<span>{name}</span>
				</div>
				{showCardDetails ? (
					<div className="remainingPoints">{`${props.userPoints}/${completion_point}`}</div>
				) : (
					<div className="stars">
						<Rating name="read-only" value={starCount} readOnly max={3} />
					</div>
				)}

				<div className="progress">
					<LinearProgress
						variant="determinate"
						value={progress.value}
						color="primary"
					/>
				</div>
				<div
					className={`action${showCardDetails ? " rotate90Right" : ""}`}
					onClick={
						progress.locked
							? () => {}
							: () => setShowCardDetails(!showCardDetails)
					}
				>
					<img src={forwardArrowImageUrl} />
				</div>
			</div>
			{showCardDetails && (
				<div className="details">
					<div className="stars">
						<Rating name="read-only" value={starCount} readOnly max={3} />
					</div>
					<div
						className="actionButton"
						onClick={() => navigate("/playground?categoryId=0")}
					>
						Continue
					</div>
				</div>
			)}
		</div>
	);
};

export default QuizLevelCard;
