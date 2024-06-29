import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../utils/hooks";
import { getUserInfoById } from "../reduxSlices/userSlice";
import forwardArrowImageUrl from "/images/category-lesson-arrow-inactive.png";
import hiiIconImageUrl from "/images/hiico.png";
import prizeIconImageUrl from "/images/prize.png";

import QuizCategories from "../components/categories";
import QuizLevels from "../components/quizlevels";
import { quiz_levels, quiz_categories } from "../data";
import { getSortedData } from "../data/utils";
import { quizCategoryType } from "../dataTypes";
import coinMusicUrl from "/sounds/coins.mp3";

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();
	const userId = searchParams.get("uid") || "fdf098fcc6";
	const { profileInfo } = useAppSelector((state: any) => state.user);
	const [coinImages, setCoinImages] = useState<JSX.Element[]>([]);
	const [userPoints, setUserPoints] = useState(0);
	const audio_coin = new Audio(coinMusicUrl);
	let interval: any;

	useEffect(() => {
		const images = [];
		for (let i = 1; i <= 10; i++) {
			images.push(
				<img
					key={`coin-${i}`}
					src="/images/coin-ico.png"
					alt=""
					className={`coin coin-${i}`}
				/>
			);
		}
		setCoinImages(images);

		setTimeout(() => {
			audio_coin.play();
		}, 1000);
	}, []);

	useEffect(() => {
		if (!profileInfo && userId) {
			dispatch(getUserInfoById(userId));
		}
	}, [profileInfo, userId]);

	useEffect(() => {
		if (profileInfo && profileInfo.user_points && profileInfo.user_points > 0) {
			interval = setInterval(() => {
				setUserPoints((prevPoints) => {
					if (prevPoints < profileInfo.user_points) {
						if (prevPoints === 9) {
							return profileInfo.user_points;
						} else {
							return prevPoints + 1;
						}
					} else {
						clearInterval(interval);
						return prevPoints;
					}
				});
			}, 200);
		}
		return () => clearInterval(interval);
	}, [profileInfo]);

	const goToQuizProgress = () => {
		navigate("/progresslevel");
	};

	const navigateToPlayground_random = () => {
		navigate("/playground?categoryId=0");
	};

	return (
		<>
			{profileInfo && (
				<>
					<div className="homePage_userStat_container">
						<div className="leftBlock">
							<div className="goodbye">
								<div className="icon">
									<img src={hiiIconImageUrl} className="hand animated wobble" />
								</div>
								{profileInfo.first_name && (
									<div className="greetingText animated fadeInUp">{`Good Morning ${
										profileInfo.first_name || ""
									} !`}</div>
								)}
							</div>
							<div className="letsplay">Let’s Play a Quiz today!</div>
						</div>
						<div className="coins-area">
							<div className="coinFx">{coinImages}</div>
							<div className="icon">
								<img src={prizeIconImageUrl} />
							</div>
							<div className="rank">{`${profileInfo.world_rank || "0"}#`}</div>
							<div className="points" id="coin">
								<span>{`${userPoints || 0} Points`}</span>
							</div>
						</div>
					</div>
					<div className="homePage_randomQuizInitiator_card">
						<div className="actionText">Play and Learn with us</div>
						<div className="actionButton" onClick={navigateToPlayground_random}>
							<span>Randomize Questions</span>
						</div>
					</div>
					<div className="sectionHeading_container" onClick={goToQuizProgress}>
						<div className="headerText">Quiz progress</div>
						<div className="headerIcon">
							<img src={forwardArrowImageUrl} />
						</div>
					</div>
					<div className="homePage_quizProgressList_container">
						<QuizLevels
							levels={getSortedData(quiz_levels, "id")}
							shape="square"
						/>
					</div>
					<div className="sectionHeading_container" onClick={goToQuizProgress}>
						<div className="headerText">Quiz by Category</div>
						<div className="headerIcon">
							<img src={forwardArrowImageUrl} />
						</div>
					</div>
					<div className="homePage_quizCategoryList_container">
						<QuizCategories
							categories={quiz_categories as quizCategoryType[]}
						/>
					</div>
				</>
			)}
		</>
	);
};

export default Home;
