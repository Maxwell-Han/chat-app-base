import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Row, Col, Button } from "shards-react";
import { Form, FormInput, FormGroup } from "shards-react";
import { auth } from "../store";

const LoginForm = props => {
  const { handleSubmit } = props;
  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit} name="login">
            <FormGroup>
              <label htmlFor="#username">Username</label>
              <FormInput name="username" placeholder="Username" />
            </FormGroup>
            <FormGroup>
              <label htmlFor="#password">Password</label>
              <FormInput
                type="password"
                name="password"
                placeholder="Password"
              />
            </FormGroup>
            <Button theme="primary" type="submit">
              Log In
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <form method="get" action="/auth/google">
            <button type="submit">Login With Google</button>
          </form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Link to="/signup">Sign up as a new user</Link>
        </Col>
      </Row>
    </Container>
  );
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit(e) {
      e.preventDefault();
      const formName = e.target.name;
      const email = e.target.email ? e.target.email.value : null;
      const password = e.target.password.value;
      const userName = e.target.username.value;
      const zipCode = e.target.zipCode ? e.target.zipCode.value : null;
      dispatch(auth(userName, email, password, formName, zipCode));
      ownProps.history.push('/home')
    }
  };
};

export default connect(null, mapDispatch)(LoginForm);
