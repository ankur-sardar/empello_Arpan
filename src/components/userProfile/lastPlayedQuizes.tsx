import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../utils/hooks";
import { getLastPlayedQuizes } from "../../reduxSlices/gameSlice";
import { getCategoryName, getCategoryLogo } from "../../data/utils";
import "./style.css";

const LastPlayedQuizes = () => {
	const [gameList, setGameList] = useState<any>([]);
	const [noOfListItemSinglePlayer, setNoOfListItemSinglePlayer] = useState(3); // [noOfListItemS
	const { profileInfo } = useAppSelector((state: any) => state.user);
	const { playedGameList } = useAppSelector((state: any) => state.game);
	const dispatch = useAppDispatch();

	const { user_id } = profileInfo;

	useEffect(() => {
		if (user_id) {
			dispatch(getLastPlayedQuizes(user_id));
		}
	}, [user_id]);

	useEffect(() => {
		if (playedGameList) {
			const playedGameListFilledWithMetaData = playedGameList
				? [...playedGameList].map((quiz: any) => {
						return {
							quiz_name: getCategoryName(quiz.game_category_id),
							logo_name: getCategoryLogo(quiz.game_category_id),
							...quiz,
						};
				  })
				: [];
			setGameList([...playedGameListFilledWithMetaData]);
		}
	}, [playedGameList]);

	const loadMoreHandlerSinglePlayer = () => {
		setNoOfListItemSinglePlayer(noOfListItemSinglePlayer + 3);
	};

	return (
		<div className="lastPlayedQuizes_container">
			{playedGameList && playedGameList.length > 0 && (
				<>
					<div className="lastPlayedQuizes_container_header">Recent Quizes</div>
					{gameList
						.slice(0, noOfListItemSinglePlayer)
						.map((quiz: any, index: number) => {
							return (
								<div
									className="lastPlayedQuizes_quizCategoryCard_container"
									key={index}
								>
									<div className="logo">
										<img src={`/images/${quiz.logo_name}`} />
									</div>
									<div className="name">{quiz.quiz_name}</div>
									<div className="action">
										<div className="quizPoint">
											<span>{`+${quiz.game_point} points`}</span>
										</div>
									</div>
								</div>
							);
						})}
					{noOfListItemSinglePlayer < playedGameList.length && (
						<div
							className="loadMoreButton"
							onClick={loadMoreHandlerSinglePlayer}
						>
							<span>Load More</span>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default LastPlayedQuizes;
