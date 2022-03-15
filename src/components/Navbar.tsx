import {Layout, Menu, Row} from 'antd';
import React, {FC, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {RouteNames} from "../routs";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../store/reducers/auth/authReducers";
import {RootState} from "../store/store";

const Navbar: FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {isAuth} = useTypedSelector(state => state.auth)
    const userName = useSelector<RootState,string>(state => state.auth.user.username)
    return (
        <Layout.Header>
            <Row justify={'end'}>
                {isAuth
                    ?
                    <>
                        <div style={{color: "white"}}>{userName}</div>
                        <Menu theme="dark" mode="horizontal" selectable={false}>
                            <Menu.Item onClick={() =>dispatch(logout())} key="1">Выйти</Menu.Item>
                        </Menu>
                    </>
                    :
                    <>
                        <div style={{color: "white"}}>IT-KAMASUTRA</div>
                        <Menu theme="dark" mode="horizontal" selectable={false}>
                        <Menu.Item onClick={() => navigate(RouteNames.LOGIN)} key="1">Логин</Menu.Item>
                    </Menu>
                    </>
                }
            </Row>
        </Layout.Header>
    );
};


export default Navbar;