import ruleBulletPointImg from "/images/quiz-rules-point-ico.png";
import ruleBulletPointPlusImg from "/images/quiz-rules-plus-ico.png";
import "./style.css";
type quizRulesProps = {
	goNext: () => void;
};
const QuizRules = (props: quizRulesProps) => {
	return (
		<div className="quizRule_container">
			<div className="headerBanner">
				<span>Quiz Reward Rules</span>
			</div>
			<div className="quizPlaygroundPage_ruleList_container">
				<div className="list">
					<div className="ruleContainer">
						<div className="ruleTitle">Time</div>
						<div className="ruleList">
							<div className="row">
								<div className="bulletPoint">
									<img src={ruleBulletPointImg} />
								</div>
								<div className="description">
									Select to complete the quiz within <b>8 minutes</b> to receive
									a reward of <b>100 coins.</b>
								</div>
							</div>
							<div className="row">
								<div className="bulletPoint">
									<img src={ruleBulletPointImg} />
								</div>
								<div className="description">
									Select to complete the quiz within <b>16 minutes</b> to
									receive a reward of <b>50 coins </b>
								</div>
							</div>
							<div className="row">
								<div className="bulletPoint">
									<img src={ruleBulletPointImg} />
								</div>
								<div className="description">
									Select to complete the quiz within <b>24 minutes</b> to
									receive a reward of <b>25 coins. </b>
								</div>
							</div>
						</div>
					</div>
					<div className="ruleContainer">
						<div className="ruleTitle">Level</div>
						<div className="ruleList">
							<div className="row">
								<div className="bulletPoint">
									<img src={ruleBulletPointImg} />
								</div>
								<div className="description">
									For the “<b>Easy</b>” difficulty level with <b>8 questions</b>
									, your score is calculated by multiplying the number of
									correct answers by
									<b>1</b>.
								</div>
							</div>
							<div className="row">
								<div className="bulletPoint">
									<img src={ruleBulletPointImg} />
								</div>
								<div className="description">
									For the “<b>Medium</b>” difficulty level consisting of{" "}
									<b>24 questions</b>, your score is determined by multiplying
									the number of correct answers by <b>2</b>.
								</div>
							</div>
							<div className="row">
								<div className="bulletPoint">
									<img src={ruleBulletPointImg} />
								</div>
								<div className="description">
									In the “<b>Hard</b>” difficulty level featuring 4
									<b>0 questions</b>, your score is calculated by multiplying
									the number of correct answers by <b>3</b>.
								</div>
							</div>
						</div>
					</div>
					<div className="ruleContainer">
						<div className="ruleTitle">Additional Reward</div>
						<div className="ruleList">
							<div className="row">
								<div className="bulletPoint">
									<img src={ruleBulletPointImg} />
								</div>
								<div className="description">
									In the “Hard” difficulty level featuring 40 questions, your
									score is calculated by multiplying the number of correct
									answers by 3.
									<div className="row">
										<div className="bulletPoint">
											<img src={ruleBulletPointPlusImg} />
										</div>
										<div className="description">
											<b>Mythical I</b>
											<br />
											(Bronze can be sold/converted at +500 points)
										</div>
									</div>
									<div className="row">
										<div className="bulletPoint">
											<img src={ruleBulletPointPlusImg} />
										</div>
										<div className="description">
											<b>Mythical II</b>
											<br />
											(Silver can be sold/converted at +1000 points){" "}
										</div>
									</div>
									<div className="row">
										<div className="bulletPoint">
											<img src={ruleBulletPointPlusImg} />
										</div>
										<div className="description">
											<b>Mythical III</b>
											<br />
											(Gold can be sold/converted at +2000 points){" "}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="footerAction">
				<div className="button btn_next" onClick={() => props.goNext()}>
					<span>Next</span>
				</div>
			</div>
		</div>
	);
};

export default QuizRules;
