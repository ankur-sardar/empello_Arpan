import store from "../store";

export type rootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
