import React, { PropTypes } from 'react';
import styles from './User.less';
import { Layout, Menu, Breadcrumb, Icon, Card, Button, Upload, Modal  } from 'antd';
const { Header, Content, Footer } = Layout;

let uuid = 0; 
class User extends React.Component {
    state = {
      previewVisible: false,
      previewImage: '',
      fileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }],
    };

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
      this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
      });
    }

    handleChange = ({ fileList }) => this.setState({ fileList })

    render() {
      const data = this.props.data;
      const onEditItem = this.props.onEditItem;
      const onModifyPassword = this.props.onModifyPassword;
      

      const { previewVisible, previewImage, fileList } = this.state;
      const uploadButton = (
        <div>
          <Icon type="plus" />
          <div className="ant-upload-text">Upload</div>
        </div>
      );

      function isEmptyObject(obj){
        for(var n in obj) {
          return false;
        }
        return true;
      }

      if (isEmptyObject(data)) {
        return (
          <div className={styles.no_authority}>?</div>
          );
      } else {
      return (
          <Layout>
            <Header>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['4']}
                className={styles.user_menu}
              >
                <Menu.Item key="0"><a href={"/home?id="+data.id}><Icon type="star-o" /></a></Menu.Item>
                <Menu.Item key="1"><a href={"/home?id="+data.id}>主界面</a></Menu.Item>
                <Menu.Item key="3"><a href={"/questionnaire?id="+data.id}>我的问卷</a></Menu.Item>
                <Menu.Item key="4">个人中心</Menu.Item>
              </Menu>
              <Button className="sign_out" type="primary"><a href={"/"}>退出登录</a></Button>
            </Header>
            <Content style={{ padding: '0 50px' }} className="user_content">
              <Breadcrumb style={{ margin: '12px 0' }}>
                <Breadcrumb.Item href={"/home?id="+data.id}>Home</Breadcrumb.Item>
                <Breadcrumb.Item>user</Breadcrumb.Item>
              </Breadcrumb>
              <img className={styles.user_backgroud_img} src={require('../img/backgroud.jpg')} />
              <Card className={styles.user_card} title={"English name："+data.nameEn} extra={<a onClick={() => onEditItem(data)}>edit</a>}>
                <div>
                  <Icon type="user" />
                  <span>Chinese name:</span>
                  <span className={styles.name_ch_data}>{data.nameCh}</span>
                </div>
                <div>
                  <Icon type="mobile" />
                  <span>Phone number:</span>
                  <span className={styles.name_ch_data}>{data.phoneNumber}</span>
                </div>
                <div>
                  <Icon type="mail" />
                  <span>Email:</span>
                  <span className={styles.name_ch_data}>{data.email}</span>
                </div>
                <div>
                  <Icon type="home" />
                  <span>Address:</span>
                  <span className={styles.name_ch_data}>{data.address}</span>
                </div>
                <div>
                  <img src={data.image}/>
                </div>
                <div className="clearfix">
                  <Upload
                    action={"http://localhost:8080/questionnairesurvey/user/upload?id="+data.id}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                  >
                    {fileList.length >= 3 ? null : uploadButton}
                  </Upload>
                  <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                </div>
                <a className={styles.update_password} onClick={() => onModifyPassword(data)}>修改密码</a>
              </Card>
              <Footer className={styles.user_footer}>
                Questionnaire Servey ©2017 Created by Zheng Xianyu
              </Footer>
            </Content>
          </Layout>
      );
    }
    }
}

export default User;