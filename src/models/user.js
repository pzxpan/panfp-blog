import {
  login,
  register,
  detailUser,
} from '@/services/user';


export default {
  namespace: 'user',
  state: {},

  effects: {
    * login({ payload, callback }, { call, put }) {
      const data = yield call(login, payload);
      if (callback && data)
        callback(data);
    },
    * register({ payload, callback }, { call, put }) {
      const data = yield call(register, payload);
      if (callback && data) callback(data);
    },

    * detailUser({ payload, callback }, { call, put }) {
      const data = yield call(detailUser, payload);
      if (callback && data) callback(data);
    },
  },
};
