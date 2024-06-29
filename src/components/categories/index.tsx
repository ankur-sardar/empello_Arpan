import { quizCategoryType } from "../../dataTypes";
import CategoryCard from "./categoryCard";

export type quizCategoriesPropType = {
	categories: quizCategoryType[];
};

const QuizCategories = (props: quizCategoriesPropType) => {
	return (
		<>
			{props.categories?.map((cat, i) => (
				<CategoryCard key={i} categoryDetails={cat} index={i} />
			))}
		</>
	);
};

export default QuizCategories;
