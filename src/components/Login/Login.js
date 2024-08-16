import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
const { Title, Text } = Typography;

const Login = () => {
    const userid = localStorage.getItem("userId");

    const [loggedIn, setLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const [form] = Form.useForm();

    if (userid) {
        return <Navigate to="/app" />;
    }
    
    const onFinish = async (values) => {
        try {
            const response = await axios.post('http://localhost:5002/login', values);
            if (response.data.success) {
                const { userId } = response.data;
                localStorage.setItem('userId', userId);
                message.success('登录成功');
                setUserId(userId);
                setLoggedIn(true);
            } else {
                message.error('用户名或密码错误');
            }
        } catch (error) {
            message.error('登录请求失败');
        }
    };

    if (loggedIn) {
        return <Navigate to="/app" />;
    }
    return (
        <div className="login-container">
            <Title level={2} className='login-title'>Login...</Title>
            <Form form={form}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        { required: true, message: '请输入用户名!' },
                        {
                            pattern: /^\S*$/,
                            message: '用户名不能包含空格！'
                        },
                    ]}
                >
                    <Input placeholder="用户名" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入密码！' }]}
                >
                    <Input.Password placeholder="密码" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        登录
                    </Button>
                </Form.Item>
            </Form>

            <Text>
                没有账号，<Link to="/register">点击注册</Link>
            </Text>
        </div>
    );
};

export default Login;