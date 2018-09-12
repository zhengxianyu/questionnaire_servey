import { searchUser } from '../services/login';
import { parse } from 'qs';
import { message } from 'antd';

export default {

  namespace: 'login',

  state: {
    data: {
      userName:'',
      password:'',
    },
  },

  effects: {
    *searchUser({ payload }, { call, put }) {
      const { data } = yield call(searchUser, payload);
      console.log("models-data:")
      console.log(data)
      if (data) {
        yield put({
          type: 'querySuccess',
          data: data,
        });
        window.location.href=`/home?id=${data.id}`;
      } else {
        message.error('用户名或密码错误！');
      }
    },
  },

  reducers: {
    querySuccess(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
