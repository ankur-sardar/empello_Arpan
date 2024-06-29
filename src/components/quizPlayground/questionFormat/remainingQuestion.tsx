import type { questionFormatType } from "../../../dataTypes";
import "./style.css";

type RemainingQuestionPropType = {
	questionList: questionFormatType[];
	selectedIndex: number;
};

const RemainingQuestion = (props: RemainingQuestionPropType) => {
	return (
		<div className="questionFormat_remainingQuestion_container">
			<span>{`Question ${props.selectedIndex + 1} of ${
				props.questionList.length
			}`}</span>
		</div>
	);
};

export default RemainingQuestion;
