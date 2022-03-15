import {useDispatch} from "react-redux";
import {AppDispatch} from "../store/store";
import {bindActionCreators} from "redux";
import {allActionCreators} from "../store/reducers/auth/actions-creators";


export const useActions = () => {
    const dispatch = useDispatch<AppDispatch>()
    return bindActionCreators(allActionCreators, dispatch)
}