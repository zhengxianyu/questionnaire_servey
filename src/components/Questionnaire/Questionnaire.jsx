import React, { PropTypes } from 'react';
import styles from './Questionnaire.less';
import { Layout, Menu, Breadcrumb, Icon, Card, Table, Button, Input, Popconfirm, Tooltip } from 'antd';
const { Header, Content, Footer } = Layout;
const Search = Input.Search;

class Questionnaire extends React.Component {
    render() {
      const userData = this.props.userData;
      const list = this.props.list;
      const onAdd = this.props.onAdd;
      const onDeleteItem = this.props.onDeleteItem;
      const onEditItem = this.props.onEditItem;
      const onSearch = this.props.onSearch;
      const onPublishItem = this.props.onPublishItem;

      const columns = [{
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
        width: 150,
      }, {
        title: 'SurveyTitle',
        dataIndex: 'surveyTitle',
        key: 'surveyTitle',
        width: 250,
        render: (text, record) => ( <a href={"/questionnairedetail?id="+record.key} target="_blank">{text}</a>),
      }, {
        title: 'Description',
        dataIndex: 'surveyDetail',
        key: 'surveyDetail',
        width: 300,
      }, {
        title: 'Sponsor',
        dataIndex: 'sponsor',
        key: 'sponsor',
        width: 150,
      }, {
        title: 'Status',
        dataIndex: 'statusCh',
        key: 'statusCh',
        width: 150,
      }, {
        title: 'Action',
        key: 'operation',
        render: (text, record) => (
          record.status === 'creating' || record.status === 'save'
          ?
            <p>
              <Tooltip title="view">
                <a href={"/questionnairedetail?id="+record.key}>
                  <Icon type="eye-o" />
                </a>
              </Tooltip>
              <Tooltip title="publish">
                <Icon type="file-text" onClick={() => onPublishItem(record.key)}/>
              </Tooltip>
              <Tooltip title="edit">
                <Icon type="edit" className={styles.survey_edit} onClick={() => onEditItem(record)}/>
              </Tooltip>
              <Popconfirm title="Are you sure stop？" onConfirm={() => onDeleteItem(record.key)}>
                <Tooltip title="stop">
                  <Icon type="delete" />
                </Tooltip>
              </Popconfirm>
            </p>
          : 
            record.status === 'publish'
            ?
              <p>
                <Tooltip title="view">
                  <a href={"/questionnairedetail?id="+record.key}>
                    <Icon type="eye-o" />
                  </a>
                </Tooltip>
                <Popconfirm title="Are you sure stop？" onConfirm={() => onDeleteItem(record.key)}>
                  <Tooltip title="stop">
                    <Icon type="delete" />
                  </Tooltip>
                </Popconfirm>
              </p>
            :
              <Tooltip title="view">
                <a href={"/questionnairedetail?id="+record.key} target="_blank">
                  <Icon type="eye-o" />
                </a>
              </Tooltip>
        ),
      }];

      return (
          <Layout>
            <Header>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['3']}
                className={styles.survey_menu}
              >
                <Menu.Item key="0"><a href={"/home?id="+userData.id}><Icon type="star-o" /></a></Menu.Item>
                <Menu.Item key="1"><a href={"/home?id="+userData.id}>主界面</a></Menu.Item>
                <Menu.Item key="3">我的问卷</Menu.Item>
                <Menu.Item key="4"><a href={"/user?id="+userData.id}>个人中心</a></Menu.Item>
              </Menu>
              <Button className="sign_out" type="primary"><a href={"/"}>退出登录</a></Button>
            </Header>
            <Content style={{ padding: '0 50px' }} className="survey_content">
              <Breadcrumb style={{ margin: '12px 0 0' }}>
                <Breadcrumb.Item href={"/home?id="+userData.id}>Home</Breadcrumb.Item>
                <Breadcrumb.Item>questionnaire</Breadcrumb.Item>
              </Breadcrumb>
              <div className={styles.action_add_search}>
                <Button className={styles.survey_button} onClick={() => onAdd()}>Add</Button>
                <Search
                  className={styles.survey_search}
                  placeholder="search survey title"
                  style={{ width: 300 }}
                  onSearch={(value) => onSearch(value)}
                />
              </div>
              <Table columns={columns} pagination={{ pageSize: 6 }} dataSource={list} />
              <Footer className={styles.survey_footer}>
                Questionnaire Servey ©2017 Created by Zheng Xianyu
              </Footer>
            </Content>
          </Layout>
      );
    }
}

export default Questionnaire;