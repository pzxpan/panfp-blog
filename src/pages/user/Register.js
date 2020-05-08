import React from 'react';
import { Row, Form, Input, Button, message } from 'antd';

import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';

function Register({dispatch,user}) {
  function handleSubmit (e) {
    e.preventDefault();
    dispatch({
      type: 'user/register',
      payload: {
        ...user,
      },
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
        style={{ minHeight: '100vh', background: '#ddd' }}
      >
        <div style={{ width: 400, padding: '40px', background: '#fff' }}>
          <h3 className="text-center mmb-1 mmt-1">注册</h3>
          <Form
            layout="vertical"
            onSubmit={handleSubmit}>
            <Form.Item>
              <Input placeholder="请输入昵称" onChange ={(e) => {user.nickname = e.target.value}}/>
            </Form.Item>
            <Form.Item>
                <Input placeholder="请输入邮箱" onChange ={(e) => {user.email = e.target.value}} />
            </Form.Item>
            <Form.Item>
              <Input.Password placeholder="请输入密码" onChange ={(e) => {user.password = e.target.value}}/>
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
export default connect(({user})=>({user}))(Register);
