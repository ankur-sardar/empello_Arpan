import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../utils/hooks";
import { getUserInfoById } from "../reduxSlices/userSlice";

const Home = () => {
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();
	const userId = searchParams.get("uid") || "fdf098fcc6";
	const { profileInfo } = useAppSelector((state: any) => state.user);

	useEffect(() => {
		if (!profileInfo && userId) {
			dispatch(getUserInfoById(userId));
		}
	}, [profileInfo, userId]);

	return <></>;
};

export default Home;
