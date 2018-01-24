import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import LoginForm from '../forms/LoginForm.js';
import {login} from '../../actions/auth'

class LoginPage extends React.Component {

  submit = (data) => this.props.login(data).then(() => this.props.history.push("/"))

  render(){
    return (
      <div>
        <h1>Login Page</h1>
        <Link to="/" >Home Page </Link>
        <LoginForm submit={this.submit}/>
      </div>
  );
}}

LoginPage.propTypes = {
  history: PropTypes.shape({
    login: PropTypes.func.isRequired
  }).isRequired
}
export default connect(null,{login})(LoginPage);
