import React from 'react';
import { Router, Route, IndexRedirect } from 'dva/router';
import Home from './routes/Home';
import Login from './routes/Login';
import NotFound from './routes/NotFound';
import SubmitSuccess from './routes/SubmitSuccess';
import User from './routes/User';
import Questionnaire from './routes/Questionnaire';
import QuestionnaireDetail from './routes/QuestionnaireDetail';

export default function ({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={Login} >
        <IndexRedirect to="/login" />
      </Route>
      <Route path="/home" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/user" component={User} />
      <Route path="/questionnaire" component={Questionnaire} />
      <Route path="/questionnairedetail" component={QuestionnaireDetail} />
      <Route path="/submitsuccess" component={SubmitSuccess} />
      <Route path="*" component={NotFound} />
    </Router>
  );
}
