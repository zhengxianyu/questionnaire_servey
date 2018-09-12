import { querySurveys, queryUser, addQuestionnaire, update, remove, publish } from '../services/questionnaire';
import { parse } from 'qs';
import { message } from 'antd';

export default {

  namespace: 'questionnaire',

  state: {
    userData: {},
    list: [],
    param: {},
    modalVisible: false,
    currentItem: {},
    modalType: 'create',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/questionnaire') {
          dispatch({
            type: 'querySurveys',
            payload: location.query,
          });
          dispatch({
            type: 'queryUser',
            payload: location.query,
          });
        }
      });
    },
  },

  effects: {
    *querySurveys({ payload }, { call, put, select }) {
      yield put({
        type: 'changeParam',
        payload: payload,
      });
      const param = yield select(state => state.questionnaire.param);
      const { data } = yield call(querySurveys, param);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data,
          },
        });
      }
    },
    *queryUser({ payload }, { call, put }) {
      const { data } = yield call(queryUser, parse(payload));
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            userData: data,
          },
        });
      }
    },
    *create({ payload }, { call, put }) {
      yield put({type: 'hideModal',});
      const { data } = yield call(addQuestionnaire, parse(payload));
      if (data) {
        yield put({
          type: 'querySurveys',
        });
        yield put({
          type: 'addSuccess',
        });
        message.success('创建问卷成功');
      } else {
        message.error('创建问卷错误！');
      }
    },
    *update({ payload }, { select, call, put }) {
      yield put({ type: 'hideModal' });
      const id = yield select(({ questionnaire }) => questionnaire.currentItem.id);
      const newQuestionnaire = { ...payload, id };
      const { data } = yield call(update, newQuestionnaire);
      if (data) {
        yield put({
          type: 'querySurveys',
        });
        yield put({
          type: 'updateSuccess',
        });
        message.success('修改问卷成功');
      } else {
        message.error('修改问卷错误！');
      }
    },
    *'delete'({ payload }, { call, put }) {
      const { data } = yield call(remove, { id: payload });
      if (data) {
        yield put({
          type: 'querySurveys',
        });
        yield put({
          type: 'deleteSuccess',
        });
        message.success('停止问卷成功');
      } else {
        message.error('停止问卷错误！');
      }
    },
    *publish({ payload }, { call, put }) {
      const { data } = yield call(publish, payload);
      if (data) {
        yield put({
          type: 'querySurveys',
        });
        yield put({
          type: 'publishSuccess',
        });
        message.success('发布问卷成功');
      } else {
        message.error('发布问卷错误！');
      }
    },
  },

  reducers: {
    changeParam(state, action) {
      const newParam =  {...state.param, ...action.payload};
      console.log("newParam:")
      console.log(newParam)
      return { ...state, ...{param: newParam} };
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload };
    },
    addSuccess(state, action) {
      return { ...state, ...action.payload };
    },
    updateSuccess(state, action) {
      return { ...state, ...action.payload };
    },
    publishSuccess(state, action) {
      return { ...state, ...action.payload };
    },
    showModal(state, action) {
      return { ...state, ...action.payload, modalVisible: true };
    },
    hideModal(state) {
      return { ...state, modalVisible: false };
    },
  },

};
