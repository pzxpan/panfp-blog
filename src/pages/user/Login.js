import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CryptoJS from 'crypto-js';
import { Button, Row, Form, Input, message } from 'antd';
import Link from 'umi/link';
import router from 'umi/router';
import storageHelper from '../../utils/storage';
import './Login.less';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({
      type: 'user/login',
      payload: {
        email: email,
        password: CryptoJS.MD5(password).toString(),
      },
      callback: (data) => {
        storageHelper.set('web_user', data);
        storageHelper.set('token', data.token);
        message.success('登录成功首页');
        router.push('/');
      },
    });
  };

  return (
    <div>
      <Row
        type="flex"
        align="middle"
        justify="center"
        className="px-3"
        style={{ minHeight: '100vh', background: '#ddd' }}
      >
        <div className="login-main">
          <h3 className="text-center mbb-1 mmt-1">登录</h3>
          <Form layout="vertical" onSubmit={handleSubmit}>
            <Form.Item>
              <Input placeholder="a@a.com" onChange={(e) => {setEmail(e.target.value);}}/>
            </Form.Item>
            <Form.Item>
              <Input.Password placeholder="密码：111111" onChange={(e) => {setPassword(e.target.value);}}/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block className="mt-20">
                登陆
              </Button>
            </Form.Item>
            <Link to="/user/register">
              注册账户
            </Link>
          </Form>
        </div>
      </Row>
    </div>
  );
}
export default Login;
