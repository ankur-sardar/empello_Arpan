import { quizCategoryType } from "../../dataTypes";
import { useNavigate } from "react-router-dom";

type CategoryCardProps = {
	index: number;
	categoryDetails: quizCategoryType;
};
const CategoryCard = (props: CategoryCardProps) => {
	const { id, category_name, logo_name } = props.categoryDetails;
	const navigate = useNavigate();

	const navigateToPlayground = () => {
		navigate(`/playground?categoryId=${id}`);
	};
	return (
		<div
			className={`homePage_quizCategoryCard_container animated fadeInUp fast delay-${props.index}`}
			id={`${id}`}
		>
			<div className="logo">
				<img src={`/images/${logo_name}`} />
			</div>
			<div className="name">{category_name}</div>
			<div className="action">
				<div
					className="quizCategory_actionButton_start"
					onClick={navigateToPlayground}
				>
					<span>Start</span>
				</div>
			</div>
		</div>
	);
};

export default CategoryCard;
