import { useState, useEffect } from "react";
import { useAppSelector } from "../utils/hooks";
// import { getUserInfoById } from "../reduxSlices/userSlice";
import SettingGearIconUrl from "/images/profile-settings.png";
import ClaimIconUrl from "/images/profile-claim-ico.png";
import CoinIconUrl from "/images/profile-points-box.png";
import WorldRankIconUrl from "/images/profile-worldrank-box.png";
import MapIconUrl from "/images/profile-rank-box.png";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LastPlayedQuizes from "../components/userProfile/lastPlayedQuizes";
import PersonalBadges from "../components/userProfile/personalBadges";
import Stats from "../components/userProfile/stats";
import userService from "../reduxSlices/services/userService";

const a11yProps = (index: number) => {
	return {
		id: `full-width-tab-${index}`,
		// "aria-controls": `full-width-tabpanel-${index}`,
	};
};

type TabPanelProps = {
	children?: React.ReactNode;
	dir?: string;
	index: number;
	value: number;
};

const TabPanel = (props: TabPanelProps) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && <>{children}</>}
		</div>
	);
};

const Profile = () => {
	const [tabIndex, setTabIndex] = useState(0);
	const [worldRank, setWorldRank] = useState(0);
	// const [localRank, setLocalRank] = useState(0);

	const { profileInfo } = useAppSelector((state: any) => state.user);

	useEffect(() => {
		userService
			.getWorldRankByUserId(localStorage.getItem("userId") || "")
			.then((res: any) => {
				if (res && res.length > 0) {
					setWorldRank(res[0].rank);
				}
			});
	}, [profileInfo]);

	const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
		e.stopPropagation();
		setTabIndex(newValue);
	};

	return (
		<div className="profile_page_container">
			<div className="profile_page_header_container">
				<div>Profile</div>
				<div>
					<img src={SettingGearIconUrl} alt="settings" />
				</div>
			</div>
			<div className="profile_page_body_container">
				{profileInfo && (
					<>
						<div className="avatar">
							<img src={`/images/${profileInfo.user_id}.png`} alt="profile" />
						</div>
						<div className="nameContainer">{`${profileInfo.first_name} ${profileInfo.last_name}`}</div>
						<div className="claimContainer">
							<img src={ClaimIconUrl} />
							<span>Check your Claims</span>
						</div>
						<div className="rankContainer">
							<div className="badge">
								<div className="icon">
									<img src={WorldRankIconUrl} />
								</div>
								<div className="title">World rank</div>
								<div className="value">{`# ${worldRank}`}</div>
							</div>
							<div className="separator"></div>
							<div className="badge">
								<div className="icon">
									<img src={CoinIconUrl} />
								</div>
								<div className="title">points</div>
								<div className="value">{profileInfo.user_points}</div>
							</div>
							<div className="separator"></div>
							<div className="badge">
								<div className="icon">
									<img src={MapIconUrl} />
								</div>
								<div className="title">Local rank</div>
								<div className="value">{`# ${
									profileInfo.local_rank || 0
								}`}</div>
							</div>
						</div>
						<div className="statsContainer">
							<Tabs
								value={tabIndex}
								onChange={handleTabChange}
								// aria-label="basic tabs example"
								textColor="primary"
								variant="fullWidth"
							>
								<Tab
									label="Details"
									{...a11yProps(0)}
									style={{ textTransform: "none" }}
								/>
								<Tab
									label="Badge"
									{...a11yProps(1)}
									style={{ textTransform: "none" }}
								/>
								<Tab
									label="Stats"
									{...a11yProps(2)}
									style={{ textTransform: "none" }}
								/>
							</Tabs>
							<TabPanel value={tabIndex} index={0}>
								<LastPlayedQuizes />
							</TabPanel>
							<TabPanel value={tabIndex} index={1}>
								<PersonalBadges />
							</TabPanel>
							<TabPanel value={tabIndex} index={2}>
								<Stats />
							</TabPanel>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Profile;
