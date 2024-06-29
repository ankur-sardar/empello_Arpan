import type { questionFormatType } from "../../../dataTypes";

type StatusIndicatorListPropType = {
	questionList: questionFormatType[];
	selectedIndex: number;
};

const StatusIndicatorList = (props: StatusIndicatorListPropType) => {
	const getStatusDotClass = (qs: questionFormatType) => {
		if (qs.attempted) {
			if (qs.correct) {
				return " correct";
			}
			if (qs.wrong) {
				return " wrong";
			}
		}
		return "";
	};

	return (
		<div className="statusIndicator_list_container">
			<div className="title">
				Questions: {`${props.selectedIndex + 1}/${props.questionList.length}`}
			</div>
			<div className="statusIndicator_list_wrapper">
				<div className="statusIndicator_list">
					{props.questionList.map((qs, i) => (
						<div
							key={i}
							className={`statusIndicator_list_item ${
								i === props.selectedIndex ? "active" : ""
							}`}
						>
							<span className="questionNumber">{i + 1}</span>
							<div className={`statusDot${getStatusDotClass(qs)}`} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default StatusIndicatorList;
