import { queryUser, updateUser, updatePassword } from '../services/user';
import { parse } from 'qs';
import { message } from 'antd';

export default {

  namespace: 'user',

  state: {
    data: {},
    param: {},
    modalVisible: false,
    passwordVisible: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/user') {
          dispatch({
            type: 'queryUser',
            payload: location.query,
          });
        }
      });
    },
  },

  effects: {
    *queryUser({ payload }, { call, put, select }) {
      yield put({
        type: 'changeParam',
        payload: payload,
      });
      const param = yield select(state => state.user.param);
      const { data } = yield call(queryUser, param);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: data,
          },
        });
      }
    },
    *updateUser({ payload }, { call, put }) {
      yield put({type: 'hideModal',});
      const { data } = yield call(updateUser, parse(payload));
      if (data) {
        yield put({
          type: 'queryUser',
        });
        yield put({
          type: 'updateSuccess',
          payload: {
            data: data,
          },
        });
        message.success('修改信息成功');
      }  else {
        message.error('修改信息错误！');
      }
    },
    *updatePassword({ payload }, { call, put }) {
      yield put({type: 'hidePasswordModal',});
      const { data } = yield call(updatePassword, parse(payload));
      if (data) {
        yield put({
          type: 'queryUser',
        });
        yield put({
          type: 'updateSuccess',
          payload: {
            data: data,
          },
        });
        message.success('修改密码成功');
      }  else {
        message.error('修改密码失败！');
      }
    },
  },

  reducers: {
    changeParam(state, action) {
      const newParam =  {...state.param, ...action.payload};
      return { ...state, ...{param: newParam} };
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload };
    },
    updateSuccess(state, action) {
      return { ...state, ...action.payload };
    },
    showModal(state, action) {
      return { ...state, ...action.payload, modalVisible: true };
    },
    hideModal(state) {
      return { ...state, modalVisible: false };
    },
    showPasswordModal(state, action) {
      return { ...state, ...action.payload, passwordVisible: true };
    },
    hidePasswordModal(state) {
      return { ...state, passwordVisible: false };
    },
  },

};
