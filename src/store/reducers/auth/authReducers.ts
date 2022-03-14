const initialState:AuthStateType = {
    isAuth:false
}
export const authReducers = (state=initialState,action:AuthActionType) => {

    switch (action.type){
        case "SET-AUTH":{
            return {...state,isAuth:action.isAuth}
        }
        default:
            return state
    }
}

//action
export const setAuthAC = (isAuth: boolean) =>{
    return {
        type:"SET-AUTH",
        isAuth
    } as const
}





//type
type AuthStateType = { isAuth: boolean }

type SetAuthAT = ReturnType<typeof setAuthAC>

type AuthActionType = SetAuthAT