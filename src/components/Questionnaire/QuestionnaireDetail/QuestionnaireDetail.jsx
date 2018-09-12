import React, { PropTypes } from 'react';
import styles from './QuestionnaireDetail.less';
import copy from 'copy-to-clipboard';
import { Layout, Icon, Form, Input, Button, Checkbox, Card,
 Col, Radio, Popconfirm, Modal, Progress } from 'antd';

const RadioGroup = Radio.Group;
const { Content, Footer } = Layout;
const FormItem = Form.Item;

const radio = [];
const check = [];
const completion = [];
const radioSelect = [];
const checkSelect = [];
const completionValue = [];

class QuestionnaireDetail extends React.Component{
  state = {
    visible: false,
    id: 0,
   }

  render() {
    const data = this.props.data;
    const onAddQuestion = this.props.onAddQuestion;
    const onSaveQuestion = this.props.onSaveQuestion;
    const onEditItem = this.props.onEditItem;
    const onDeleteItem = this.props.onDeleteItem;
    const onSubmitData = this.props.onSubmitData;

    const url = location.href;
    const { getFieldDecorator, getFieldsError, validateFields, getFieldsValue, } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 5,
      },
      wrapperCol: {
        span: 14,
      },
    };

    function isEmptyObject(obj){
      for(var n in obj) {
        return false;
      }
      return true;
    }

    if (isEmptyObject(data)) {
      return null;
    }

    function onChangeRadio(e) {
      radio.map(function(record, index) {
        record.optionVOs.map(function(option, index1) {
          let temp;
          if (e.target.value === option.id) {
            temp = index1;
            option.value = "select";
            radioSelect[option.id] = option.value;
          } else if (temp === index1) {
            option.value = "unSelect";
          }
        });
      });
      console.log("radio:")
      console.log(radio)
    }

    function onChangeCheck(e) {
      check.map(function(record, index) {
        record.optionVOs.map(function(option, index1) {
          let temp;
          if (e.target.value === option.id && temp === index1) {
            option.value = "unSelect";
          } else if (e.target.value === option.id && temp !== index1) {
            temp = index1;
            option.value = "select";
            checkSelect[option.id] = option.value;
          }
        });
      });
      console.log("check:")
      console.log(check)
    }

    function onChangeCompletion(e, id) {
      console.log("id:")
      console.log(id)
      completion.map(function(record, index) {
        record.optionVOs.map(function(option, index1) {
          if (option.id === id) {
            option.value = e.target.value;
            completionValue[option.id] = option.value;
          }
        });
      });
      console.log("completion:")
      console.log(completion)
    }

    return (
      <div className="questionnaire_detail">
        <Modal visible={this.state.visible}
           onCancel={()=>this.handleCancel()}
           className="modal_detail"
        >
          <a href={url}>
            {url}
          </a>
          <span onClick={() => this.onCopyUrl(url)} className={styles.click_copy}>点我复制</span>
        </Modal>
        <div className={styles.detail_title}>{data.surveyTitle}</div>
        <div className={styles.survey_description}>{data.surveyDetail}</div>
        <div className={styles.question_type}>
          <div className={styles.question_radio}>{"单选题："+data.typeVO.radio+"题"}</div>
          <div className={styles.question_check}>{"多选题："+data.typeVO.check+"题"}</div>
          <div className={styles.question_completion}>{"问答题："+data.typeVO.completion+"题"}</div>
        </div>
        {
          data.status === 'stop' ?
          <div className={styles.survey_time}>
            <div>
              问卷开始时间：{data.createTime}
            </div>
            <div>
              问卷结束时间：{data.expiredTime}
            </div>
          </div>
          :""
        }
        {
          data.status === "publish" || data.status === "stop" ? "" :
          <Card>
            <Button className={styles.add_question_button} type="primary" onClick={() => onAddQuestion()}>添加问题</Button>
            <Button className={styles.add_question_button} type="primary" onClick={() => this.onPublishSurvey(url, data.key)}>发布</Button>
            {
              data.status === "save" ? 
              <Button className={styles.add_question_button} type="primary" onClick={() => onSaveQuestion(data.key)} disabled>保存</Button> :
              <Button className={styles.add_question_button} type="primary" onClick={() => onSaveQuestion(data.key)}>保存</Button>
            }
          </Card>
        }
        {
          data.qustionVOs.map(function(question, index) {
            if (question.type === 'radio') {
              radio.push(question);
              return (
                <div key={index} className={styles.question_record}>
                  {
                    data.status === 'creating' || data.status === 'save' ?
                    <div>
                      <Popconfirm title="Are you sure delete？" onConfirm={() => onDeleteItem(question.id)}>
                        <Button className={styles.question_delete} size="small">删除</Button>
                      </Popconfirm>
                    </div>
                    : ""
                  }
                  <div className={styles.question_title}>
                    <span>{"第"+(index+1)+"题："}</span>
                    <span>{question.questionTitle}</span>
                  </div>
                  <RadioGroup onChange={onChangeRadio}>
                  {
                    question.optionVOs.map(function(option, index_o) {
                      return  <div key={index_o}>
                                <Radio value={option.id}>{option.optionName}</Radio>
                                {
                                  data.status === 'stop' ?
                                  <span className={styles.option_radio}>{option.selectTimes}/{question.allSelectTimes}</span>
                                  : ""
                                }
                              </div>
                    })
                  }
                  </RadioGroup> 
                </div>
              );
            } else if (question.type === 'check') {
              check.push(question);
              return (
                <div key={index} className={styles.question_record}>
                  {
                    data.status === 'creating' || data.status === 'save' ?
                    <div>
                      <Popconfirm title="Are you sure delete？" onConfirm={() => onDeleteItem(question.id)}>
                        <Button className={styles.question_delete} size="small">删除</Button>
                      </Popconfirm>
                    </div>
                    : ""
                  }
                  <div className={styles.question_title}>
                    <span>{"第"+(index+1)+"题："}</span>
                    <span>{question.questionTitle}</span>
                  </div>
                  {
                    question.optionVOs.map(function(option, index_o) {
                      return  <div key={index_o}>
                                <Checkbox onChange={onChangeCheck} value={option.id}>{option.optionName}</Checkbox>
                                {
                                  data.status === 'stop' ?
                                  <span className={styles.option_check}>{option.selectTimes}/{question.allSelectTimes}</span>
                                  :""
                                }
                              </div>
                    })
                  }
                </div>
                );
            } else if (question.type === 'completion') {
              completion.push(question);
              console.log(question.optionVOs[0].id)
              return (
                <div key={index} className={styles.question_record}>
                  {
                    data.status === 'creating' || data.status === 'save' ?
                    <div>
                      <Popconfirm title="Are you sure delete？"
                        onConfirm={() => onDeleteItem(question.id)}
                      >
                        <Button className={styles.question_delete} size="small">删除</Button>
                      </Popconfirm>
                    </div>
                    : ""
                  }
                  <div className={styles.question_title}>
                    <span>{"第"+(index+1)+"题："}</span>
                    <span>{question.questionTitle}</span>
                  </div>
                  <textarea className={styles.question_textarea}
                    onChange={(e) => onChangeCompletion(e, question.optionVOs[0].id)}
                  />
                </div>
                );
            }
          })
        }
        {
          data.status === "publish" ?
          <Button
            className={styles.git_up_button} 
            onClick={() => onSubmitData(radioSelect, checkSelect, completionValue)}
            type="primary"
          >
            提交
          </Button>
          : ""
        }
        {
          data.status === "stop" ?
          <Button className={styles.git_up_button} type="primary" disabled>提交</Button>
          : ""
        }
        <Footer className={styles.footer}>
          Questionnaire Servey ©2017 Created by Zheng Xianyu
        </Footer>
      </div>
    );
  }

  onPublishSurvey(url, key) {
    this.setState({
      visible: true,
    });
    this.props.onPublishItem(key);
  }

  handleCancel() {
    this.setState({
      visible: false,
    });
  }

  onCopyUrl(url) {
    copy(url);
    alert("已复制好，可贴粘。");
  }

}


const FormQuestionnaireDetail = Form.create()(QuestionnaireDetail);
export default FormQuestionnaireDetail;
