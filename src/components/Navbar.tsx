import {Layout, Menu, Row} from 'antd';
import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";
import {RouteNames} from "../routs";
import {useTypedSelector} from "../hooks/useTypedSelector";

const Navbar: FC = () => {
    const navigate = useNavigate();
    console.log(navigate)
    const {isAuth} = useTypedSelector(state => state.auth)
    return (
        <Layout.Header>
            <Row justify={'end'}>
                {isAuth
                    ?
                    <>
                        <div style={{color: "white"}}>IT-KAMASUTRA</div>
                        <Menu theme="dark" mode="horizontal" selectable={false}>
                            <Menu.Item onClick={() => console.log()} key="1">Выйти</Menu.Item>
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