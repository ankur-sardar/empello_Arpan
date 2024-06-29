import PointBubbleBackgroundUrl from "/images/point-buble.png";
import PositionFirstStandUrl from "/images/leaderboard-first.png";
import PositionSecondStandUrl from "/images/leaderboard-second.png";
import PositionThirdStandUrl from "/images/leaderboard-third.png";
import { useEffect } from "react";
import { getAllUserWithRank } from "../reduxSlices/userSlice";
import { useAppDispatch, useAppSelector } from "../utils/hooks";

const Leaderboard = () => {
	const dispatch = useAppDispatch();
	const { userListWithRank } = useAppSelector((state: any) => state.user);

	useEffect(() => {
		dispatch(getAllUserWithRank());
	}, []);

	return (
		<div className="leaderboard_page_container">
			<div className="leaderboard_page_header_container">
				<div>Leaderboard</div>
			</div>
			{userListWithRank && (
				<>
					<div className="leaderboard_page_victoryStand_container">
						<div className="leaderboard_page_victoryStand_item second">
							<div className="name">{userListWithRank[1].first_name}</div>
							<div className="avatar">
								<img
									src={`/images/${userListWithRank[1].user_id}.png`}
									alt="profile"
								/>
							</div>
							<div className="points_container">
								<img className="background" src={PointBubbleBackgroundUrl} />
								<div className="points">{userListWithRank[1].user_points}</div>
							</div>
							<div className="victoryStand">
								<img className="background" src={PositionSecondStandUrl} />
								<div className="position">2</div>
							</div>
						</div>
						<div className="leaderboard_page_victoryStand_item first">
							<div className="name">{userListWithRank[0].first_name}</div>
							<div className="avatar">
								<img
									src={`/images/${userListWithRank[0].user_id}.png`}
									alt="profile"
								/>
							</div>
							<div className="points_container">
								<img className="background" src={PointBubbleBackgroundUrl} />
								<div className="points">{userListWithRank[0].user_points}</div>
							</div>
							<div className="victoryStand">
								<img className="background" src={PositionFirstStandUrl} />
								<div className="position">1</div>
							</div>
						</div>
						<div className="leaderboard_page_victoryStand_item third">
							<div className="name">{userListWithRank[2].first_name}</div>
							<div className="avatar">
								<img
									src={`/images/${userListWithRank[2].user_id}.png`}
									alt="profile"
								/>
							</div>
							<div className="points_container">
								<img className="background" src={PointBubbleBackgroundUrl} />
								<div className="points">{userListWithRank[2].user_points}</div>
							</div>
							<div className="victoryStand">
								<img className="background" src={PositionThirdStandUrl} />
								<div className="position">3</div>
							</div>
						</div>
					</div>
					<div className="rankList_container">
						{userListWithRank.slice(3).map((user: any, index: number) => (
							<div className="rankList_item" key={index}>
								<div className="rank">{user.rank}</div>
								<div className="avatar">
									<img src={`/images/${user.user_id}.png`} alt="profile" />
								</div>
								<div className="name">{`${user.first_name || "Guest"} ${
									user.last_name
								}`}</div>
								{/* <div className="badge">John Doe</div> */}
								<div className="points">{user.user_points || 0}</div>
								<div className="points_label">Points</div>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default Leaderboard;
