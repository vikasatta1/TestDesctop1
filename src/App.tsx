import React, {useEffect} from 'react';
import './App.css';
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import {Layout} from "antd";
import {useDispatch} from "react-redux";
import {AuthActionCreators, UserType} from "./store/reducers/auth/authReducers";

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        if (localStorage.getItem('auth')) {
            dispatch(AuthActionCreators.setUserAC({username:localStorage.getItem('username' || '')} as UserType))
            dispatch(AuthActionCreators.setAuthAC(true))
        }
    }, [])
    return (
        <Layout>
            <Navbar/>
            <Layout.Content>
                <AppRouter/>
            </Layout.Content>
            <Layout.Footer>

            </Layout.Footer>
        </Layout>
    );
}

export default App;
