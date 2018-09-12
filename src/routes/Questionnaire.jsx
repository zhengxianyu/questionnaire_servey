import React, { PropTypes } from 'react';
import { connect } from 'dva';
import QuestionnairePage from '../components/Questionnaire/Questionnaire';
import QuestionnaireAddUpdate from '../components/Questionnaire/QuestionnaireAddUpdate';

function Questionnaire({ location, dispatch, questionnaire }) {
  const {
    list, userData, modalVisible, modalType, currentItem
  } = questionnaire;

  const questionnairePageProps = {
    list,
  	userData,
  	onAdd() {
  	  dispatch({
        type: `questionnaire/showModal`,
        payload: {
          modalType: 'create',
        },
      });
  	},
    onDeleteItem(id) {
      dispatch({
        type: 'questionnaire/delete',
        payload: id,
      });
    },
    onEditItem(item) {
      dispatch({
        type: 'questionnaire/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      });
    },
    onSearch(value) {
      console.log("value:")
      console.log(value)
      dispatch({
        type: 'questionnaire/querySurveys',
        payload: {search_value : value},
      });
    },
    onPublishItem(id) {
      dispatch({
        type: 'questionnaire/publish',
        payload: {
          status: 'publish',
          id: id,
        },
      });
    }
  };

  const questAddUpdateProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    userData,
    visible: modalVisible,
    onOk(data) {
      console.log("routes-data:")
      console.log(data)
      dispatch({
        type: `questionnaire/${modalType}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'questionnaire/hideModal',
      });
    },
  };

  const QuestionnaireAddUpdateGen = () =>
    <QuestionnaireAddUpdate {...questAddUpdateProps} />;

  return (
    <div>
      <QuestionnairePage {...questionnairePageProps}/>
      <QuestionnaireAddUpdateGen />
    </div>
  );
}

Questionnaire.propTypes = {
  Questionnaire: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ questionnaire }) {
  return { questionnaire };
}

export default connect(mapStateToProps)(Questionnaire);
