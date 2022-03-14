import React from 'react';
import {Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../routs";
import Event from "../pages/Event";
import Login from "../pages/Login";
import {useTypedSelector} from "../hooks/useTypedSelector";


const AppRouter = () => {

/*    const auth = useSelector<RootState>(state => state.auth.isAuth);*/
    const {isAuth} = useTypedSelector(state => state.auth)
    return (
        isAuth ?
            <Routes>
                {privateRoutes.map(route =>
                <Route key={route.path} path={route.path} element={<Event/>}/>
                )}

            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route key={route.path} path={route.path} element={<Login/>}/>
                )}

            </Routes>

    );
};

export default AppRouter;