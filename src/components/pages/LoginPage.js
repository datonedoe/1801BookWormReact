import React from 'react';
import {Link} from 'react-router-dom';
import LoginForm from '../forms/LoginForm.js';


class LoginPage extends React.Component {

  submit = (data) => {
    console.log(data);
  }
  render(){
    return (
      <div>
        <h1>Login Page</h1>
        <Link to="/" >Home Page </Link>
        <LoginForm submit={this.submit}/>
      </div>
  );
}}

export default LoginPage;
