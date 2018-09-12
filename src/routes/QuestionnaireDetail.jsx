import React, { PropTypes } from 'react';
import { connect } from 'dva';
import QuestionnaireDetailPage from '../components/Questionnaire/QuestionnaireDetail/QuestionnaireDetail';
import QuestDetailAdd from '../components/Questionnaire/QuestionnaireDetail/QuestDetailAdd';

function QuestionnaireDetail({ location, dispatch, questionnairedetail }) {
  const {
    data, modalType, modalVisible, currentItem
  } = questionnairedetail;

  const questionnairedetailProps = {
  	data,
    onSaveQuestion(surveyId) {
      dispatch({
        type: `questionnairedetail/changeType`,
        payload: {
          status: 'save',
          survey_id: surveyId,
        },
      });
    },
  	onAddQuestion() {
      dispatch({
        type: `questionnairedetail/showModal`,
        payload: {
          modalType: 'create',
        },
      });
    },
    onEditItem(item) {
      dispatch({
        type: `questionnairedetail/showModal`,
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      });
    },
    onDeleteItem(question_id) {
      dispatch({
        type: `questionnairedetail/delete`,
        payload: {
          question_id: question_id,
        },
      });
    },
    onPublishItem(id) {
      dispatch({
        type: 'questionnairedetail/publish',
        payload: {
          status: 'publish',
          id: id,
        },
      });
    },
    onSubmitData(radio, check, completion) {
      console.log("onSubmitData-radio:")
      console.log(radio)
      console.log("onSubmitData-check:")
      console.log(check)
      console.log("onSubmitData-completion:")
      console.log(completion)
      dispatch({
        type: 'questionnairedetail/submit',
        payload: {
          radio: radio,
          check: check,
          completion, completion,
        },
      });
    }
  };

  const questDetailAddProps = {
    dataSource: data,
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk(data) {
      dispatch({
        type: `questionnairedetail/${modalType}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'questionnairedetail/hideModal',
      });
    },
  };

  const QuestDetailAddGen = () =>
    <QuestDetailAdd {...questDetailAddProps} />;

  return (
    <div>
      <QuestionnaireDetailPage {...questionnairedetailProps}/>
      <QuestDetailAddGen/>
    </div>
  );
}

QuestionnaireDetail.propTypes = {
  QuestionnaireDetail: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ questionnairedetail }) {
  return { questionnairedetail };
}

export default connect(mapStateToProps)(QuestionnaireDetail);
