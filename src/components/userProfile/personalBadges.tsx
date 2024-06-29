const PersonalBadges = () => {
	return (
		<>
			<div className="personalBadges_container">
				<div className="personalBadges_container_header">Recent Medals</div>
				<div className="badgeList">
					<div className="badgeList_item">
						<div className="logo imageDisabled">
							<img src={`/images/mythicaliii.png`} />
						</div>
						<div className="name">Mythical III</div>
						<div className="point">
							<span className="title textDisabled">Convert{"\n"}</span>
							<span className="value textDisabled">500pt</span>
						</div>
					</div>
					<div className="badgeList_item">
						<div className="logo imageDisabled">
							<img src={`/images/mythicalii.png`} />
						</div>
						<div className="name">Mythical II</div>
						<div className="point">
							<span className="title textDisabled">Convert{"\n"}</span>
							<span className="value textDisabled">1000pt</span>
						</div>
					</div>
					<div className="badgeList_item">
						<div className="logo imageDisabled">
							<img src={`/images/mythicali.png`} />
						</div>
						<div className="name">Mythical I</div>
						<div className="point">
							<span className="title textDisabled">Convert{"\n"}</span>
							<span className="value textDisabled">2000pt</span>
						</div>
					</div>
				</div>
			</div>
			<div className="personalBadges_container">
				<div className="personalBadges_container_header">
					Collectible Badges
				</div>
				<div className="badgeList">
					<div className="badgeList_item">
						<div className="logo imageDisabled">
							<img src={`/images/Mask_Group_263.png`} />
						</div>
						<div className="badgeName">XR Learner</div>
					</div>
					<div className="badgeList_item">
						<div className="logo imageDisabled">
							<img src={`/images/Mask_Group_236.png`} />
						</div>
						<div className="badgeName">Adventurer</div>
					</div>
					<div className="badgeList_item">
						<div className="logo imageDisabled">
							<img src={`/images/Mask_Group_237.png`} />
						</div>
						<div className="badgeName">Explorer</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PersonalBadges;
