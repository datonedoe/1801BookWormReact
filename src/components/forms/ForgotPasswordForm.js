import React from 'react';
import {Form, Button, Message} from 'semantic-ui-react';
import InlineError from '../messages/InlineError';
import isEmail from 'validator/lib/isEmail';
import PropTypes from 'prop-types';

class ForgotPasswordForm extends React.Component {
  state ={
    data: {
      email: ''
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      ...this.state,
      data: {...this.state.data, [e.target.name]: e.target.value}
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({errors});
    if (Object.keys(errors).length===0) {
      this.setState({loading: true});
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({errors: err.response.data.errors, loading: false})
        );
    }
  }

  validate = data => {
    const errors ={};
    if (!isEmail(data.email)) errors.email = "Invalid email";
    return errors;
  };

  render() {
    const {errors, data, loading} = this.state;
    console.log("API | components/forms/ForgotPasswordForm errors:", errors);
    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {!!errors.global && <Message negative>{errors.global}</Message>}
        <Form.Field error={!!errors.email}>
          <label>Email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="email"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email}/>}
        </Form.Field>
        <Button primary>Reset Password</Button>
      </Form>
    )
  }
};

ForgotPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired
}

export default ForgotPasswordForm;
