import React, {useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Input, Button, Form,message} from 'antd';
import storageHelper from '@/utils/storage';
import CryptoJS from 'crypto-js';
import router from 'umi/router';

function Setting() {
  const user = storageHelper.get('web_user');
  const dispatch = useDispatch();
  const [nickName,setNickName] = useState(user.nick_name);
  const [profession,setProfession] = useState(user.profession);
  const [avatar,setAvatar] = useState(user.avatar);
  const [password,setPass] = useState("");
  const [newPassword,setNewPass] = useState("");
  const [newPasswordAgain,setNewPassAgain] = useState("");
  function saveUserDetail() {
      dispatch({
        type: 'user/updateUserInfo',
        payload: {
          user_id: user.user_id,
          nick_name: nickName,
          profession,
          avatar,
          level:user.level,
          email:user.email
        },
        callback: (data) => {
          message.success("保存成功")
        },
      });
  }

  function changePassword() {
    if (newPassword && newPassword === newPasswordAgain) {
      dispatch({
        type: 'user/changePassword',
        payload: {
          user_id: user.user_id,
          password:CryptoJS.MD5(password).toString(),
          new_password: CryptoJS.MD5(newPassword).toString()
        },
        callback: (data) => {
          message.success("保存成功")
          router.push("/user/login");
        },
      });
    } else {
      message.success("两次输入的密码不同，请重新输入");
    }
  }
  return (
    <div>
      <Row
        type="flex"
        align="middle"
        justify="center"
        >
        <div style={{ width: 400, padding: '40px', background: '#fff' }}>
          <h3 className="text-center mmb-1 mmt-1">个人基本信息</h3>
          <Form
            layout="vertical"
            >
            <Form.Item>
              <Input  value= {user.email} disabled={true}/>
            </Form.Item>
            <Form.Item>
              <Input value={user.level} disabled={true} />
            </Form.Item>
            <Form.Item>
              <Input placeholder={'花名'} value={nickName} onChange={(e) => {
                setNickName(e.target.value);
              }}/>
            </Form.Item>
            <Form.Item>
              <Input placeholder={'头像地址'} value={avatar} onChange={(e) => {
                setAvatar(e.target.value);
              }}/>
            </Form.Item>
            <Form.Item>
              <Input placeholder= {'专业'} value={profession} onChange={(e) => {
                setProfession(e.target.value);
              }}/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block className="mt-10" onClick={saveUserDetail}>
                保存用户信息
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Row>
      <Row
        type="flex"
        align="middle"
        justify="center"
        >
        <div style={{ width: 400, padding: '40px', background: '#fff' }}>
          <h3 className="text-center mmb-1 mmt-1">修改密码</h3>
          <Form
            layout="vertical">
            <Form.Item>
              <Input.Password placeholder={'旧密码'} onChange={(e) => {
                setPass(e.target.value);
              }}/>
            </Form.Item>
            <Form.Item>
              <Input.Password placeholder={'新密码'} onChange={(e) => {
                setNewPass(e.target.value);
              }}/>
            </Form.Item>
            <Form.Item>
              <Input.Password placeholder={'确认新密码'}  onChange={(e) => {
                setNewPassAgain(e.target.value);
              }}/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block className="mt-10" onClick={changePassword}>
                修改密码
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Row>
    </div>
  );
}

export default Setting;
