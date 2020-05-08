import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CryptoJS from 'crypto-js';
import { Row, Form, Input, Button, message } from 'antd';
import Link from 'umi/link';
import router from 'umi/router';

function Register() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [nick_name, setNickName] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({
      type: 'user/register', payload: { email, nick_name, password: CryptoJS.MD5(password).toString() },
      callback: (res) => {
        if (res) {
          message.success('注册成功,请登录');
          router.push({ pathname: '/user/login', isRegister: true });
        } else {
          message.error('注册失败，请重新注册');
        }
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
        style={{ minHeight: '100vh', background: '#ddd' }}>
        <div style={{ width: 400, padding: '40px', background: '#fff' }}>
          <h3 className="text-center mmb-1 mmt-1">注册</h3>
          <Form
            layout="vertical"
            onSubmit={handleSubmit}>
            <Form.Item>
              <Input placeholder="请输入昵称" onChange={(e) => {
                setNickName(e.target.value);
              }}/>
            </Form.Item>
            <Form.Item>
              <Input placeholder="请输入邮箱" onChange={(e) => {
                setEmail(e.target.value);
              }}/>
            </Form.Item>
            <Form.Item>
              <Input.Password placeholder="请输入密码" onChange={(e) => {
                setPassword(e.target.value);
              }}/>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block className="mt-10">
                注册
              </Button>
            </Form.Item>
            <Link to="/user/login">
              登陆账户
            </Link>
          </Form>
        </div>
      </Row>
    </div>
  );
}

export default Register;
