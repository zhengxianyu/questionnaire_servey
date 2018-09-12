import React from 'react';
import styles from './Home.less';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb, Carousel, Icon, Button } from 'antd';
import HomeECharts from '../components/Home/Home';
const { Header, Content, Footer } = Layout;

function Home({ location, dispatch, home }) {
  const {
    data, status
  } = home;
  console.log("status-routes:")
  console.log(status)
  function isEmptyObject(obj){
	for(var n in obj) {
		return false;
	}
	return true;
  }

  const statusProps = {
  	status, data,
  	statusCreate(user_id) {
		window.location.href="/questionnaire?id="+user_id+"&type=creating";
  	},
  	statusSave(user_id) {
		window.location.href="/questionnaire?id="+user_id+"&type=save";
  	},
  	statusPublish(user_id) {
		window.location.href="/questionnaire?id="+user_id+"&type=publish";
  	},
  	statusStop(user_id) {
		window.location.href="/questionnaire?id="+user_id+"&type=stop";
  	},
  };

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
	            defaultSelectedKeys={['1']}
	            className={styles.home_menu}
	          >
	          	<Menu.Item key="0"><Icon type="star-o" /></Menu.Item>
	            <Menu.Item key="1">主界面</Menu.Item>
	            <Menu.Item key="3"><a href={"/questionnaire?id="+data.id}>我的问卷</a></Menu.Item>
	            <Menu.Item key="4"><a href={"/user?id="+data.id}>个人中心</a></Menu.Item>
	          </Menu>
	          <Button className="sign_out" type="primary"><a href={"/"}>退出登录</a></Button>
	        </Header>
		    <Content style={{ padding: '0 50px' }}>
		      <Breadcrumb style={{ margin: '12px 0' }}>
		        <Breadcrumb.Item>Home</Breadcrumb.Item>
		      </Breadcrumb>
		      <div style={{ background: '#fff', height: 470, borderRadius: 15, }}>
		        <HomeECharts {...statusProps}/>
		      </div>
		    </Content>
			<Footer className={styles.home_footer}>
	          Questionnaire Servey ©2017 Created by Zheng Xianyu
	        </Footer>
    	</Layout>   
	  );
  }
  
}

function mapStateToProps({ home }) {
  return { home };
}

export default connect(mapStateToProps)(Home);
