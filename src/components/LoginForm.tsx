import React, {FC, useState} from 'react';
import {Button, Form, Input} from "antd";
import {rules} from "../utils/rules";
import {useDispatch} from "react-redux";
import {login} from "../store/reducers/auth/authReducers";
import {useTypedSelector} from "../hooks/useTypedSelector";

const LoginForm: FC = () => {
    const dispatch = useDispatch()
    const {error, isLoading} = useTypedSelector(state => state.auth)
    const [userName,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const submit = () => {
        dispatch(login(userName, password))
    };

console.log(userName)
    return (
        <Form onFinish={submit}>
            {error && <div style={{color: 'red'}}>
                {error}
            </div>}
            <Form.Item
                label="Username"
                name="username"
                rules={[rules.required('Please input your username!')]}>
                <Input value={userName} onChange={e => setUsername(e.currentTarget.value)}/>
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[rules.required('Please input your password!')]}>
                <Input value={password} onChange={e => setPassword(e.currentTarget.value)}
                />

            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Login
                </Button>
            </Form.Item>
        </Form>

    );
};

export default LoginForm;