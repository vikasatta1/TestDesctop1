import React from 'react';
import {Route, Routes} from "react-router-dom";
import Event from "../pages/Event";
import Login from "../pages/Login";
import {useTypedSelector} from "../hooks/useTypedSelector";


const AppRouter = () => {
/*    const auth = useSelector<RootState>(state => state.auth.isAuth);*/
    const {isAuth} = useTypedSelector(state => state.auth)
    return (
        isAuth ?
            <Routes>
                <Route key={1} path={"/event"} element={<Event/>}/>
            </Routes>
            :
            <Routes>
                <Route key={2} path={"/login"} element={<Login/>}/>
            </Routes>

    );
};

export default AppRouter;