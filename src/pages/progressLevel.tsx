// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useAppSelector, useAppDispatch } from "../utils/hooks";
// import { getUserInfoById } from "../reduxSlices/userSlice";
import { quiz_levels } from "../data";
import { getSortedData } from "../data/utils";
import starIconUrl from "/images/category-lesson-titlestar.png";
import QuizLevels from "../components/quizlevels";

import "./style.css";

const ProgressLevel = () => {
	const navigate = useNavigate();
	// const dispatch = useAppDispatch();

	// const { profileInfo } = useAppSelector((state: any) => state.user);
	// const { quizLevels, loading, error, success } = useAppSelector(
	// 	(state: any) => state.quiz
	// );

	// useEffect(() => {
	// 	if (!profileInfo) {
	// 		// window.location.href = "http://localhost:9000/";
	// 		window.location.href = "https://demo.xr-academy.com/";
	// 	}
	// }, [dispatch, profileInfo]);

	return (
		<div className="progresslevelPage_container">
			<div className="headerBanner animated fadeInUp delay-0">
				<span>
					Collect 3<img src={starIconUrl} />
					to move up to the next level
				</span>
			</div>
			<div className="progresslevelPage_quizProgressList_container">
				<div className="list">
					<QuizLevels
						levels={getSortedData(quiz_levels, "id")}
						shape="rectangle"
					/>
				</div>
			</div>
			<div className="footerAction">
				<div
					className="btn_randomizeQuestion"
					onClick={() => navigate("/playground?categoryId=0")}
				>
					<span>Randomise Questions</span>
				</div>
			</div>
		</div>
	);
};

export default ProgressLevel;
