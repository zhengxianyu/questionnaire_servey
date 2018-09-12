import React, { PropTypes } from 'react';
import styles from './QuestionnaireAddUpdate.less';
import { Form, Input, Modal } from 'antd';
const FormItem = Form.Item;

const QuestionnaireAddUpdate = ({
  visible,
  item,
  type,
  userData,
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    },
  }) => {
  function handleOk() {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const newData = { ...getFieldsValue(), userId: userData.id, key: item.key };
      console.log("questionnaire-newData-add:")
      console.log(newData)
      onOk(newData);
    });
  }

  const modalOpts = {
    title: type === 'create' ?'Add Questionnaire':'Edit Questionnaire',
    visible,
    onOk: handleOk,
    onCancel,
  };

  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };
  return (
    <Modal {...modalOpts} className="questionnaire_add">
      <Form layout='horizontal'>
        <FormItem {...formItemLayout} label="Name：">
          {
            getFieldDecorator('surveyTitle', {
              initialValue: item.surveyTitle,
              rules: [
                { required: true, message: '问卷名未填写' },
              ],
            })(
              <Input type="text" />
            )
          }
        </FormItem>
        <FormItem {...formItemLayout} label="Description：">
          {
            getFieldDecorator('surveyDetail', {
              initialValue: item.surveyDetail,
            })(
              <textarea type="text" className={styles.questionn_description}/>
            )
          }
        </FormItem>
      </Form>
    </Modal>
  );
};

QuestionnaireAddUpdate.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(QuestionnaireAddUpdate);
