// import React from 'react';
// import { Form, Input, Button, Typography } from 'antd';
// import { Link } from 'react-router-dom'; // 假设使用React Router
// import './Login.css'; // 引入新的 CSS 文件
// const { Title, Text } = Typography;

// const Login = () => {
//     const onFinish = (values) => {
//         console.log('Received values:', values);
//         // 在这里可以处理登录逻辑，例如发送到服务器进行验证
//     };

//     return (
//         <div className="login-container">
//             <Title level={2} className='login-title'>Login...</Title>
//             <Form
//                 name="login-form"
//                 initialValues={{ remember: true }}
//                 onFinish={onFinish}
//             >
//                 <Form.Item
//                     name="username"
//                     rules={[{ required: true, message: '账号不能为空' }]}
//                 >
//                     <Input placeholder="请输入你的账号" />
//                 </Form.Item>
//                 <Form.Item
//                     name="password"
//                     rules={[{ required: true, message: '密码不能为空' }]}
//                 >
//                     <Input.Password placeholder="请输入你的密码" />
//                 </Form.Item>

//                 <Form.Item>
//                     <Button type="primary" htmlType="submit" style={{ width: '30%' }}>
//                         登录
//                     </Button>
//                 </Form.Item>
//             </Form>

//             <Text>
//                 没有账号，<a href="/register">点击注册</a>
//             </Text>
//         </div>
//     );
// };

// export default Login;


import React, { useState } from 'react';
import { Form, Input, Button, Typography,message } from 'antd';
import { Link, Navigate } from 'react-router-dom'; 
import './Login.css'; // 引入新的 CSS 文件


const { Title, Text } = Typography;

const Login = () => {
    const [loggedIn, setLoggedIn] = useState(false); // 管理登录状态的 state

    const onFinish = (values) => {
        console.log('Received values:', values);
        // 假设在这里进行用户名和密码的验证
        if (values.username === 'admin' && values.password === '1234') {
            setLoggedIn(true); // 设置登录状态为 true
        }
        else {
            message.error('用户名或密码错误！');
        }
    };

    // 如果已经登录成功，重定向到 /app 页面
    if (loggedIn) {
        return <Navigate to="/app" />;
    }
    return (
        <div className="login-container">
            <Title level={2} className='login-title'>Login...</Title>

            <Form
                name="login-form"
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

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Log in
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
