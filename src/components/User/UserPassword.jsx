import React, { PropTypes } from 'react';
import styles from './UserPassword.less';
import { Form, Input, Modal } from 'antd';
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

const UserPassword = ({
  visible,
  data,
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
      const newData = { ...getFieldsValue(), id: data.id};
      onOk(newData);
    });
  }

  console.log("data:")
  console.log(data)

  const modalOpts = {
    title: 'Update User',
    visible,
    onOk: handleOk,
    onCancel,
  };

  return (
    <Modal {...modalOpts} className="user_password">
      <Form layout='horizontal'>
        <FormItem hasFeedback {...formItemLayout} label="EnglishNa：">
          {
            getFieldDecorator('nameEn', {
              initialValue: data.nameEn,
              rules: [
                { required: true, message: '英文名未填写' },
              ],
            })(
              <Input type="text" />
            )
          }
        </FormItem>
        <FormItem hasFeedback {...formItemLayout} label="OldPassword：">
          {
            getFieldDecorator('oldPassword', {
              initialValue: data.oldPassword,
              rules: [
                { required: true, message: '密码未填写' },
              ],
            })(
              <Input type="text" />
            )
          }
        </FormItem>
        
        <FormItem hasFeedback {...formItemLayout} label="NewPassword：">
          {
            getFieldDecorator('newPassword', {
              initialValue: data.newPassword,
              rules: [
                { required: true, message: '新密码未填写' },
              ],
            })(
              <Input type="text" />
            )
          }
        </FormItem>
      </Form>
    </Modal>
  );
};

export default Form.create()(UserPassword);
