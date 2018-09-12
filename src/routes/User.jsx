import React, { PropTypes } from 'react';
import { connect } from 'dva';
import UserPage from '../components/User/User';
import UserUpdate from '../components/User/UserUpdate'
import UserPassword from '../components/User/UserPassword'

function User({ location, dispatch, user }) {
  const {
    data, modalVisible, passwordVisible
  } = user;

  const userPageProps = {
  	data,
  	onEditItem(data) {
  	  dispatch({
        type: `user/showModal`,
        payload: data,
      });
  	},
    onModifyPassword(data) {
      dispatch({
        type: `user/showPasswordModal`,
        payload: data,
      });
    },
  };

  const userUpdateProps = {
    data,
    visible: modalVisible,
    onOk(data) {
      dispatch({
        type: `user/updateUser`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'user/hideModal',
      });
    },
  };

  const userPasswordProps = {
    data,
    visible: passwordVisible,
    onOk(data) {
      dispatch({
        type: `user/updatePassword`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'user/hidePasswordModal',
      });
    },
  }

  const UserUpdateGen = () =>
    <UserUpdate {...userUpdateProps} />;

  const UserPasswordGen = () =>
    <UserPassword {...userPasswordProps} />

  return (
    <div>
      <UserPage {...userPageProps}/>
      <UserUpdateGen />
      <UserPasswordGen />
    </div>
  );
}

User.propTypes = {
  User: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(User);
