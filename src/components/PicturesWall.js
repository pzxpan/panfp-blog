import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Upload, Modal, message, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './styles/component.less';
import storageHelper from '@/utils/storage';
import copy from 'copy-to-clipboard';
import style from '@/pages/article/article.less';

const BASE_HOST = 'https://www.panfp.cn/img/';

function uploadButton() {
  return (
    <div>
      <PlusOutlined/>
      <div className="ant-upload-text">上传</div>
    </div>
  );
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function PicturesWall() {
  const user = storageHelper.get('web_user');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const [previewTitle, setPreviewTitle] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'image/getUserImg',
      payload: {
        user_id: parseInt(user.user_id),
      },
      callback: (fileList) => {
        setFileList(fileList && fileList.map((item) => {
          return {
            'uid': item.id + '',
            'name': item.source_name,
            'status': 'done',
            'url': BASE_HOST + item.path,
          };
        }));
      },
    });
  }, []);

  const handleCancel = () => setPreviewVisible(false);
  const handleSelect = () => {
    copy(previewUrl);
    message.success('已复制到剪贴板');
    setPreviewVisible(false);
  };

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name);
    setPreviewUrl(file.url);
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const customRequest = (option) => {
    const formData = new FormData();
    formData.append('user_id', user.user_id);
    formData.append('file', option.file);
    dispatch({
      type: 'image/uploadFile',
      payload: formData,
      callback: (insertFile) => {
        fileList.push({
          'uid': insertFile.id + '',
          'name': insertFile.source_name,
          'status': 'done',
          'url': BASE_HOST + insertFile.path,
        });
        setFileList(fileList);
      },
    });
  };

  const handleRemove = (item) => {
    const formData = new FormData();
    dispatch({
      type: 'image/deleteImg',
      payload: {
        'user_id': parseInt(user.user_id),
        'image_id': parseInt(item.uid),
      },
      callback: (id) => {
        message.success('删除成功');
      },
    });
  };
  const handleBeforeUpload = file => {
    //限制图片 格式、size、分辨率
    const isJPG = file.type === 'image/jpeg';
    const isJPEG = file.type === 'image/jpeg';
    const isGIF = file.type === 'image/gif';
    const isPNG = file.type === 'image/png';
    if (!(isJPG || isJPEG || isGIF || isPNG)) {
      Modal.error({
        title: '只能上传JPG 、JPEG 、GIF、 PNG格式的图片~',
      });
      return;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      Modal.error({
        title: '超过2M限制，不允许上传~',
      });
      return;
    }
    return (isJPG || isJPEG || isGIF || isPNG) && isLt2M;
  };
  return (
    <div className="clearfix">
      <Upload
        action=""
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        customRequest={customRequest}
        beforeUpload={handleBeforeUpload}
        onRemove={handleRemove}
      >
        {fileList && fileList.length >= 20 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        okText={'select'}
        onCancel={handleCancel}
       >
        <img  style={{ width: '100%' }} src={previewImage}/>
        <Button style={{ padding: 20 }} onClick={handleSelect} style={{ margin: '16px 24px 0 0' }}>复制链接</Button>
      </Modal>
    </div>
  );
}

export default PicturesWall;
