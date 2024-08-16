import React from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const { Title, Text } = Typography;

const Register = () => {
    const [form] = Form.useForm();

    const usernamePattern = /^[A-Za-z0-9!]+$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*[0-9!])|(?=.*[A-Za-z!])(?=.*[0-9])|(?=.*[A-Z])(?=.*[a-z])/;

    const navigate = useNavigate()

    const onFinish = async (values) => {

        try {
            const response = await axios.post('http://localhost:5002/register', values);
            if (response.data.success) {
                message.success('注册成功');
                form.resetFields();
                navigate('/login');
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error('注册请求失败');
        }

    };

    return (
        <div className='register-container'>
            <Title level={2} className='register-title'>Register...</Title>

            <Form
                form={form}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        { required: true, message: '请输入用户名!' },
                        { pattern: usernamePattern, message: '用户名只能包含字母、数字和!' },
                        { min: 6, message: '用户名至少为6个字符' }
                    ]}
                >
                    <Input placeholder="用户名" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: '请输入密码！' },
                        { pattern: passwordPattern, message: '密码必须包含字母、数字或!中至少两种' },
                        { min: 8, message: '密码至少为8个字符' }
                    ]}
                >
                    <Input.Password placeholder="密码" />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                        { required: true, message: '请确认密码' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('密码不匹配！');
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="确认密码" />
                </Form.Item>


                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Register
                    </Button>
                </Form.Item>
            </Form>

            <Text>
                已有账号，<Link to="/login">点击登录</Link>
            </Text>
        </div>
    );
};

export default Register;
