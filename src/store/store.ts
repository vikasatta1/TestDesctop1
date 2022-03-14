import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk"
import {authReducers} from "./reducers/auth/authReducers";

const RootReducer = combineReducers({
    auth: authReducers,
})
export const store = createStore(RootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;