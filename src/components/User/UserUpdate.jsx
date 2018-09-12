import React, { PropTypes } from 'react';
import styles from './UserUpdate.less';
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

const UserUpdate = ({
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

  function checkNumber(rule, value, callback) {
    if (!value) {
      callback(new Error('手机号未填写'));
    }
    if (!/^[\d]{11,11}$/.test(value)) {
      callback(new Error('手机号位数不对'));
    } else {
      callback();
    }
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
    <Modal {...modalOpts} className="user_update">
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
        <FormItem hasFeedback {...formItemLayout} label="ChineseNa：">
          {
            getFieldDecorator('nameCh', {
              initialValue: data.nameCh,
              rules: [
                { required: true, message: '中文名未填写' },
              ],
            })(
              <Input type="text" />
            )
          }
        </FormItem>
        
        <FormItem hasFeedback {...formItemLayout} label="PhoneNum：">
          {
            getFieldDecorator('phoneNumber', {
              initialValue: data.phoneNumber,
              rules: [
                { validator: checkNumber },
              ],
            })(
              <Input type="text" />
            )
          }
        </FormItem>
        <FormItem hasFeedback {...formItemLayout} label="Email：">
          {
            getFieldDecorator('email', {
              initialValue: data.email,
              rules: [
                { required: true, message: '邮箱未填写' },
              ],
            })(
              <Input type="text" />
            )
          }
        </FormItem>
        <FormItem hasFeedback {...formItemLayout} label="Address：">
          {
            getFieldDecorator('address', {
              initialValue: data.address,
              rules: [
                { required: true, message: '不能为空' },
              ],
            })(
              <Input type="address" />
            )
          }
        </FormItem>
      </Form>
    </Modal>
  );
  /*return (
    <Modal {...modalOpts} className="user_update">
      <Form layout='horizontal'>
        <FormItem hasFeedback {...formItemLayout} label="Password：">
          {
            getFieldDecorator('password', {
              initialValue: data.password,
              rules: [
                { required: true, message: '中文名未填写' },
              ],
            })(
              <Input type="text" />
            )
          }
        </FormItem>
      </Form>
    </Modal>
    );*/
};

UserUpdate.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  data: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(UserUpdate);
