import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { rootState, appDispatch } from "../dataTypes";

export const useAppSelector: TypedUseSelectorHook<rootState> = useSelector;
export const useAppDispatch = () => useDispatch<appDispatch>();
