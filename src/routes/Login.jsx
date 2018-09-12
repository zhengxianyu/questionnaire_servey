import React, { PropTypes } from 'react';
import { connect } from 'dva';
import LoginPage from '../components/Login/Login';

function Login({ location, dispatch, login }) {
  const {
    data
  } = login;

  const loginProps = {
  	data,
  	onConfirm(data) {
  	  dispatch({
        type: `login/searchUser`,
        payload: data,
      });
  	}
  };

  return (
    <LoginPage {...loginProps}/>
  );
}

Login.propTypes = {
  Login: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ login }) {
  return { login };
}

export default connect(mapStateToProps)(Login);
