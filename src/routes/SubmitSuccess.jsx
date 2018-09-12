import React from 'react';
import { Button } from 'antd';
import styles from './SubmitSuccess.less';

const SubmitSuccess = () =>
  <div className={styles.normal}>
    <div className={styles.container}>
      <h1 className={styles.title}>success</h1>
      <p className={styles.desc}>提交问卷成功</p>
      <a href="/"><Button type="primary" style={{ marginTop: 5 }}>去登录</Button></a>
    </div>
  </div>;

export default SubmitSuccess;