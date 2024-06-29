import { useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";
import type { questionFormatType } from "../../../dataTypes";
import { useAppSelector } from "../../../utils/hooks";
import { getGameTimeById } from "../../../data/utils";
import "./style.css";

type RemainingTimePropType = {
	questionList: questionFormatType[];
	selectedIndex: number;
	timeOverHandler: () => void;
};

const RemainingTime = (props: RemainingTimePropType) => {
	const [progress, setProgress] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [isActive, setIsActive] = useState(true);

	const { currentGame } = useAppSelector((state: any) => state.game);

	useEffect(() => {
		let interval: any;

		if (isActive && currentGame) {
			const selectedGameTimeIsSeconds = getGameTimeById(
				currentGame.game_time_id
			);
			interval = setInterval(() => {
				setSeconds((prevSeconds) => {
					if (prevSeconds === selectedGameTimeIsSeconds) {
						clearInterval(interval);
						setIsActive(false);
						props.timeOverHandler();
						return prevSeconds;
					}
					setProgress(((prevSeconds + 1) / selectedGameTimeIsSeconds) * 100);
					return prevSeconds + 1;
				});
			}, 1000);
		} else {
			clearInterval(interval);
		}

		return () => clearInterval(interval);
	}, [isActive, currentGame]);

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes.toString().padStart(2, "0")}:${seconds
			.toString()
			.padStart(2, "0")}`;
	};

	return (
		<div className="timeRemaining_container">
			<LinearProgress
				variant="determinate"
				value={progress}
				className="timeRemaining_progressBar"
			/>
			<span className="timeRemaining_label">
				{/* {`${progress}%`} */}
				{formatTime(seconds)}
			</span>
		</div>
	);
};

export default RemainingTime;
