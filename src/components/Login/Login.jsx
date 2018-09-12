import React, { PropTypes } from 'react';
import styles from './Login.less';
import { Layout, Icon, Form, Input, Button, Checkbox } from 'antd';

const { Content, Footer } = Layout;
const FormItem = Form.Item;

const Login = ({
    form: {
      getFieldDecorator,
      validateFields,
      getFieldsValue,
    },
    onConfirm,
  }) => {
    function handleSubmit(e) {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          console.log("handleSubmit-data:")
          console.log(data)
          const data = { ...getFieldsValue() };
          onConfirm(data);
        }
      });
    }

    return (
      <div className="login">
        <Layout className={styles.login_first_layout}>
          <Content className={styles.login_cotent}>
            <Layout className={styles.login_second_layout}>
              <div className={styles.login_title}>Questionnaire Servey</div>
              <Form onSubmit={handleSubmit}>
                <FormItem>
                  {
                    getFieldDecorator('nameEn', {
                      rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                      <Input className={styles.login_input} prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                    )
                  }
                </FormItem>
                <FormItem>
                  {
                    getFieldDecorator('password', {
                      rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                      <Input className={styles.login_input} prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                    )
                  }
                </FormItem>
                <FormItem>
                  {
                    getFieldDecorator('remember', {
                      valuePropName: 'checked',
                      initialValue: true,
                    })(
                      <Checkbox>Remember me</Checkbox>
                    )
                  }
                  <Button type="primary" htmlType="submit">
                    Log in
                  </Button>
                </FormItem>
              </Form>
            </Layout>
          </Content>
          
        </Layout>
        <img src={require('../img/login.jpg')} className={styles.login_back}/>
        <Footer className={styles.login_footer}>
            Questionnaire Servey ©2017 Created by Zheng Xianyu
          </Footer>
      </div>
    );
}


const FormLogin = Form.create()(Login);
export default FormLogin;
