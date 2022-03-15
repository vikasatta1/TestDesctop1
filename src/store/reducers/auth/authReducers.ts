import {AppDispatch} from "../../store";
import axios from "axios"

const initialState: AuthStateType = {
    isAuth: false,
    user: {} as UserType,
    isLoading: false,
    error: ""
}

export enum AuthActionEnum {
    SET_AUTH = "SET-AUTH",
    SET_ERROR = "SET-ERROR",
    SET_ISLOADING = "SET-ISLOADING",
    SET_USER = "SET-USER",
}

export const authReducers = (state = initialState, action: AuthActionType) => {

    switch (action.type) {
        case AuthActionEnum.SET_AUTH: {
            return {...state, isAuth: action.isAuth}
        }
        case AuthActionEnum.SET_ISLOADING: {
            return {...state, isLoading: action.isLoading}
        }
        case AuthActionEnum.SET_USER: {
            return {...state, user: action.user}
        }
        case AuthActionEnum.SET_ERROR: {
            return {...state, error: action.error}
        }
        default:
            return state
    }
}

//action


export const AuthActionCreators = {
    setAuthAC: (isAuth: boolean) => {
        return {
            type: AuthActionEnum.SET_AUTH,
            isAuth
        } as const
    },
    setUserAC: (user: UserType) => {
        return {
            type: AuthActionEnum.SET_USER,
            user
        } as const
    },
    setErrorAC: (error: string) => {
        return {
            type: AuthActionEnum.SET_ERROR,
            error
        } as const
    },
    setIsLoadingAC: (isLoading: boolean) => {
        return {
            type: AuthActionEnum.SET_ISLOADING,
            isLoading
        } as const
    }
}


// thunk
    export
const login = (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(AuthActionCreators.setIsLoadingAC(true))
        setTimeout(async () => {
            const response = await axios.get<UserType[]>('./user.json')
            const mocKUser = response.data.find(user => user.username === username && user.password === password)
            if (mocKUser) {
                localStorage.setItem("auth", "true")
                localStorage.setItem("username", mocKUser.username)
                dispatch(AuthActionCreators.setAuthAC(true))
                dispatch(AuthActionCreators.setUserAC(mocKUser))
            } else {
                dispatch(AuthActionCreators.setErrorAC("error name or password"))
            }
            dispatch(AuthActionCreators.setIsLoadingAC(false))
        }, 100)

    } catch (e) {
        dispatch(AuthActionCreators.setErrorAC("Error"))
    }
}
export const logout = () => async (dispatch: AppDispatch) => {
    localStorage.removeItem('auth')
    localStorage.removeItem('username')
    dispatch(AuthActionCreators.setUserAC({} as UserType))
    dispatch(AuthActionCreators.setAuthAC(false))

}


//type
type AuthStateType = {
    isAuth: boolean,
    user: UserType,
    isLoading: boolean,
    error: string
}
type UserType = {
    username: string,
    password: string,

}
type SetAuthAT = ReturnType<typeof AuthActionCreators.setAuthAC>
type SetErrorAT = ReturnType<typeof AuthActionCreators.setErrorAC>
type SetUserAT = ReturnType<typeof AuthActionCreators.setUserAC>
type SetIsLoadingAT = ReturnType<typeof AuthActionCreators.setIsLoadingAC>

type AuthActionType = SetAuthAT | SetErrorAT | SetUserAT | SetIsLoadingAT