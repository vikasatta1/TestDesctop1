import {AuthActionCreators, AuthActionEnum, UserType} from "../auth/authReducers";
import {EventCalendarType} from "../../../components/EventCalendar";
import {AppDispatch} from "../../store";
import axios from "axios";
import UserService from "../../../api/UserService";

const initialState: EventStateType = {
    guest: [],
    event: [],
}

export enum EventActionEnum {
    SET_GUESTS = "SET-GUESTS",
    SET_EVENT = "SET-EVENT",

}

export const eventReducers = (state = initialState, action: EventActionType) => {
    switch (action.type) {
        case EventActionEnum.SET_GUESTS: {
            return {...state, guest: action.users}
        }
        case EventActionEnum.SET_EVENT: {
            return {...state, events: action.events}
        }
        default:
            return state
    }
}
//actions
export const SetGuestsAction = (users: UserType[]) => {
    return {
        type: EventActionEnum.SET_GUESTS,
        users
    } as const
}
export const SetEventAction = (events: EventCalendarType[]) => {
    return {
        type: EventActionEnum.SET_EVENT,
        events
    } as const
}

//thunk
export const CreateEventAction = (event: EventCalendarType) => async (dispatch: AppDispatch) => {
    try {
        const events = localStorage.getItem('events') || '[]'
        const json = JSON.parse(events) as EventCalendarType[]
        json.push(event);
        dispatch(SetEventAction(json));
        localStorage.setItem('events',JSON.stringify(json));
    } catch (e) {

    }
}
export const fetchEventAction = (username:string) => async (dispatch: AppDispatch) => {
    try {
        const events = localStorage.getItem('events') || '[]'
        const json = JSON.parse(events) as EventCalendarType[]
        const currentUserEvents = json.filter(ev => ev.author === username || ev.guest === username)
        dispatch(SetEventAction(currentUserEvents))
    } catch (e) {

    }
}
export const fetchGuests = () => async (dispatch: AppDispatch) => {
    try {
        const response = await UserService.getUsers()
        dispatch(SetGuestsAction(response.data))
    } catch (e) {

    }

}

//type
type EventStateType = {
    guest: UserType[];
    event: EventCalendarType[];
}
type SetGuestsAT = ReturnType<typeof SetGuestsAction>
type SetEventAT = ReturnType<typeof SetEventAction>


type EventActionType = SetGuestsAT | SetEventAT


