import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { getCategoryName, dayInWeek } from "../../data/utils";
import userService from "../../reduxSlices/services/userService";

const options1 = {
	pieHole: 0.4,
	is3D: false,
	colors: ["#06F6C8", "#46A0AE", "#3AC1FD", "#FFBB1B", "#f0b3ff"],
	chartArea: { left: 0, top: 0, width: "100%", height: "100%" },
	fontSize: 14,
	legend: { alignment: "center" },
};

const options2 = {
	fontSize: 14,
	chartArea: { left: 30, top: 40, width: "100%", height: "70%" },
	legend: { position: "none" },
	bar: { groupWidth: 10 },
	vAxis: {
		textStyle: {
			color: "#77838F",
		},
	},
	hAxis: {
		textStyle: {
			color: "#77838F",
		},
	},
};

const Stats = () => {
	const [chartData, setChartData] = useState<any[]>([]);
	const [dailyProgressData, setDailyProgressDataData] = useState<any[]>([]);

	useEffect(() => {
		userService
			.getDailyScoreByUserId(localStorage.getItem("userId") || "")
			.then((res: any) => {
				if (res && res.length > 0) {
					let data = [["Day", "Score", { role: "style" }]];
					for (let i = 1; i <= 7; i++) {
						const dayData = res.find(
							(item: any) => item.day_of_week === i.toString()
						);
						data.push([
							dayInWeek[
								(dayData?.day_of_week as keyof typeof dayInWeek) || `${i}`
							],
							dayData?.game_point || 0,
							"#16E1C2",
						]);
					}
					setDailyProgressDataData(data);
				}
			});

		userService
			.getCategoryWiseScoreByUserId(localStorage.getItem("userId") || "")
			.then((res: any) => {
				if (res) {
					const newData = [
						["Category", "Score"],
						...res.map((item: any) => [
							getCategoryName(item.game_category_id),
							parseInt(item.total_game_points, 10),
						]),
					];
					setChartData(newData);
				}
			});
	}, []);

	return (
		<div className="stat_container">
			{chartData && chartData.length > 0 && (
				<>
					<div className="stat_chart_title">Recent Status</div>
					<Chart
						chartType="PieChart"
						width={"100%"}
						height="300px"
						data={chartData}
						options={options1}
					/>
				</>
			)}

			<div className="stat_chart_title">Daily Progress</div>
			<Chart
				chartType="ColumnChart"
				width={"100%"}
				height="300px"
				data={dailyProgressData}
				options={options2}
			/>
		</div>
	);
};

export default Stats;
