import { querySurvey, addQuestion, changeType, update, remove, publish, submit } from '../services/questionnairedetail';
import { parse } from 'qs';
import { message } from 'antd';

export default {

  namespace: 'questionnairedetail',

  state: {
    data: {},
    param: {},
    modalVisible: false,
    currentItem: {},
    modalType: 'create',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/questionnairedetail') {
          dispatch({
            type: 'querySurvey',
            payload: location.query,
          });
        }
      });
    },
  },

  effects: {
    *querySurvey({ payload }, { call, put, select }) {
      yield put({
        type: 'changeParam',
        payload: payload,
      });
      const param = yield select(state => state.questionnairedetail.param);
      const { data } = yield call(querySurvey, param);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: data,
          },
        });
      }
    },
    *create({ payload }, { call, put }) {
      yield put({type: 'hideModal',});
      const { data } = yield call(addQuestion, parse(payload));
      if (data) {
        yield put({
          type: 'querySurvey',
        });
        yield put({
          type: 'addSuccess',
        });
        message.success('创建问题成功');
      } else {
        message.error('创建问题错误！');
      }
    },
    *update({ payload }, { select, call, put }) {
      yield put({ type: 'hideModal' });
      const id = yield select(({ questionnaire }) => questionnaire.currentItem.id);
      const newQuestionnaire = { ...payload, id };
      const { data } = yield call(update, payload);
      if (data) {
        yield put({
          type: 'querySurvey',
        });
        yield put({
          type: 'updateSuccess',
        });
        message.success('修改问题成功');
      } else {
        message.error('修改问题错误！');
      }
    },
    *'delete'({ payload }, { call, put }) {
      const { data } = yield call(remove, payload);
      if (data) {
        yield put({
          type: 'querySurvey',
        });
        yield put({
          type: 'deleteSuccess',
        });
        message.success('删除问题成功');
      } else {
        message.error('删除问题错误！');
      }
    },
    *changeType({ payload }, { call, put }) {
      yield put({type: 'hideModal',});
      const { data } = yield call(changeType, parse(payload));
      if (data) {
        yield put({
          type: 'querySurvey',
        });
        yield put({
          type: 'saveSuccess',
        });
        message.success('保存问卷成功');
      } else {
        message.error('保存问卷错误！');
      }
    },
    *publish({ payload }, { call, put }) {
      const { data } = yield call(publish, payload);
      if (data) {
        yield put({
          type: 'querySurvey',
        });
        yield put({
          type: 'publishSuccess',
        });
        message.success('发布问卷成功');
      } else {
        message.error('发布问卷错误！');
      }
    },
    *submit({ payload }, { call, put }) {
      const { data } = yield call(submit, payload);
      if (data) {
        yield put({
          type: 'querySurvey',
        });
        yield put({
          type: 'submitSuccess',
        });
        window.location.href=`/submitsuccess`;
      } else {
        message.error('提交问卷错误！');
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
    deleteSuccess(state, action) {
      return { ...state, ...action.payload };
    },
    addSuccess(state, action) {
      return { ...state, ...action.payload };
    },
    saveSuccess(state, action) {
      return { ...state, ...action.payload };
    },
    updateSuccess(state, action) {
      return { ...state, ...action.payload };
    },
    publishSuccess(state, action) {
      return { ...state, ...action.payload };
    },
    submitSuccess(state, action) {
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
