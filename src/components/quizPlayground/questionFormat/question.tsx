import type { questionFormatType } from "../../../dataTypes";

type QuestionPropType = {
	questionList: questionFormatType[];
	selectedIndex: number;
};

const Question = (props: QuestionPropType) => {
	return (
		<div
			className="questionFormat_question_container animated fadeIn fast delay-0"
			key={`question_${props.selectedIndex}`}
		>
			<span>{props.questionList[props.selectedIndex].question}</span>
		</div>
	);
};

export default Question;
