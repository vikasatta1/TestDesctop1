import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk"
import {authReducers} from "./reducers/auth/authReducers";
import {eventReducers} from "./reducers/event/eventReducer";

const RootReducer = combineReducers({
    auth: authReducers,
    event: eventReducers
})
export const store = createStore(RootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;