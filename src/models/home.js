import { queryHome, queryStatus } from '../services/home';
import { parse } from 'qs';

export default {

  namespace: 'home',

  state: {
    data: {},
    status: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/home') {
          dispatch({
            type: 'queryHome',
            payload: location.query,
          });
          dispatch({
            type: 'queryStatus',
            payload: location.query,
          });
        }
      });
    },
  },

  effects: {
    *queryHome({ payload }, { call, put }) {
      const { data } = yield call(queryHome, parse(payload));
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: data,
          },
        });
      }
    },
    *queryStatus({ payload }, { call, put }) {
      const { data } = yield call(queryStatus, parse(payload));
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            status: data,
          },
        });
      }
    },
  },

  reducers: {
    querySuccess(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
