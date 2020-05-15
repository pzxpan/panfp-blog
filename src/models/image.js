import {
  getUserImg,
  uploadFile,
  deleteImg
} from '@/services/image';


export default {
  namespace: 'image',
  state: {},

  effects: {
    * uploadFile({ payload, callback }, { call, put }) {
      const data = yield call(uploadFile, payload);
      if (callback && data)
        callback(data);
    },
    * getUserImg({ payload, callback }, { call, put }) {
      const data = yield call(getUserImg, payload);
      if (callback && data) callback(data);
    },

    * deleteImg({ payload, callback }, { call, put }) {
      const data = yield call(deleteImg, payload);
      if (callback && data) callback(data);
    }
  },
};
