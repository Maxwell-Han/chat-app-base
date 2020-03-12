import React from "react";
import { connect } from "react-redux";
import { auth } from "../store";
import { Form, FormInput, FormGroup, Button } from "shards-react";

const SignUp = props => {
  const { handleSubmit } = props;
  return (
    <Form onSubmit={handleSubmit} name="signup">
      <FormGroup>
        <label htmlFor="#username">Username</label>
        <FormInput name="username" placeholder="Username" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="#email">Email</label>
        <FormInput name="email" placeholder="Email" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="#password">Password</label>
        <FormInput name="password" id="#password" placeholder="Password" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="#zipCode">Zip Code</label>
        <FormInput name="zipCode" placeholder="ZipCode" />
      </FormGroup>
      <Button theme="primary" type="submit">
        Sign Up
      </Button>
    </Form>
  );
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(e) {
      e.preventDefault();
      const formName = e.target.name;
      const email = e.target.email.value;
      const password = e.target.password.value;
      const username = e.target.username.value
      const zipCode = e.target.zipCode.value
      dispatch(auth(username, email, password, formName, zipCode));
    }
  };
};

export default connect(null, mapDispatch)(SignUp);
