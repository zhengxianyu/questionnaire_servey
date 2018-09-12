import React, { PropTypes } from 'react';
import styles from './QuestDetailAdd.less';
import { Form, Input, Modal, Select, Col, Button, Icon, message } from 'antd';
const FormItem = Form.Item;

const Option = Select.Option;
let uuid = 0; 
class QuestDetailAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectType: "",
    }
  }

  remove = (k) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');

    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add = () => {
    uuid++;
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue, getFieldsValue, validateFields } = this.props.form;
    const dataSource = this.props.dataSource;
    const visible = this.props.visible;
    const item = this.props.item;
    const type = this.props.type;
    const onOk = this.props.onOk;
    const onCancel = this.props.onCancel;
    const questionType = this.state.selectType;

    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');

    const formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };

    const formItems = keys.map((k, index) => {
        let optionTitleShow = String.fromCharCode(65+index+2);
        let option = optionTitleShow.toLowerCase();
        if (index < 6) {
          return (
            <FormItem key={k} label={optionTitleShow} {...formItemLayout}>
              {
                getFieldDecorator(option, {
                  initialValue: item.option,
                  rules: [
                    { required: true, message: '选项未填写' },
                  ],
                })(
                  <Input type="text" />
                )
              }
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                disabled={keys.length === 1}
                onClick={() => this.remove(k)}
              />
            </FormItem>
          );
        } else {
          return <div key={k} className={styles.option_bottom}>亲，到底线了哦~</div>
        }
    });

    function handleOk() {
      validateFields((errors) => {
        if (errors) {
          return;
        }
        let newData;
        if (questionType === 'completion') {
          newData = { ...getFieldsValue(), survey_id: dataSource.key, a: "" };
        } else {
          newData = { ...getFieldsValue(), survey_id: dataSource.key };
        }
        
        console.log("newData:")
        console.log(newData)
        onOk(newData);
      });
    }
    const modalOpts = {
      title: type === 'create' ?'Add Question':'Edit Question',
      visible,
      onOk: handleOk,
      onCancel,
    };
    return (
    <Modal {...modalOpts} className="question_add">
      <Form layout='horizontal'>
        <FormItem {...formItemLayout} label="type:">
          {
            getFieldDecorator('type', {
              initialValue: item.type,
              rules: [
                { required: true, message: '类型未选择' },
              ],
            })(
              <Select onChange={(value)=>this.handleChange(value)}>
                <Option value="radio">单选题</Option>
                <Option value="check">多选题</Option>
                <Option value="completion">问答题</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem {...formItemLayout} label="QuestionTitle：">
          {
            getFieldDecorator('questionTitle', {
              initialValue: item.questionTitle,
              rules: [
                { required: true, message: '问题名未填写' },
              ],
            })(
              <Input type="text" />
            )
          }
        </FormItem>
        {
          this.state.selectType==='completion'?"":
          <div>
            <FormItem {...formItemLayout} label="A:">
              {
                getFieldDecorator('a', {
                  initialValue: item.a,
                  rules: [
                    { required: true, message: '选项未填写' },
                  ],
                })(
                  <Input type="text" />
                )
              }
            </FormItem>
            <FormItem {...formItemLayout} label="B:">
              {
                getFieldDecorator('b', {
                  initialValue: item.b,
                  rules: [
                    { required: true, message: '选项未填写' },
                  ],
                })(
                  <Input type="text" />
                )
              }
            </FormItem>
            <div>
              {formItems}
              <Button type="dashed" onClick={this.add}>
                <Icon type="plus" /> Add Question
              </Button>
            </div>
          </div>
        }
      </Form>
    </Modal>
    );
  };
  handleChange(value) {
    this.setState({
      selectType: value,
    })
  }
}

export default Form.create()(QuestDetailAdd);
