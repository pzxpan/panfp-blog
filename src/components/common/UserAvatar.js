import React from 'react';
import { Avatar } from 'antd';

function  UserAvatar ({src}) {
  return (
    src ? (
        <Avatar
          size="large"
          src={src}/>) : (
        <Avatar
          size="large"
          icon="user"
          className="ft-24 mr-0"/>)
  );
}

export default UserAvatar;
