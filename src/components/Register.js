import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
const { Title, Text } = Typography;

const Register = () => {
    const onFinish = (values) => {
        console.log('Received values:', values);
        // 在这里可以将注册信息发送到后端（Node.js）进行处理
        // 例如：发送 POST 请求到后端的注册接口
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', marginTop: '50px' }}>
            <Title level={2}>Register...</Title>

            <Form
                name="register-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder="Username" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                        { required: true, message: 'Please confirm your password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Confirm Password" />
                </Form.Item>

                <Form.Item
                    name="captcha"
                    rules={[{ required: true, message: 'Please input the captcha!' }]}
                >
                    <Input placeholder="Captcha" />
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
