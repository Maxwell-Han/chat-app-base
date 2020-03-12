import React from "react";
import { connect } from "react-redux";
import "../index.css";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from "shards-react";
import { Form, FormInput, FormGroup } from "shards-react";
import { FormTextarea } from "shards-react";

const Home = (props) => {
  console.log(props)
  return (
    <Container className="main-container">
      <Row>
        <Col sm="4" lg="4">
          <h5>Search Bar</h5>
        </Col>
        <Col sm="8" lg="8">
          <h5>{`${props.user._id ? props.user.userName : ''} Chat Details and other options`}</h5>
        </Col>
      </Row>
      <Row>
        <Col sm="4" lg="4">
          <ListGroup>
            <ListGroupItem>Cras justo odio</ListGroupItem>
            <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
            <ListGroupItem>Morbi leo risus</ListGroupItem>
            <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
            <ListGroupItem>Vestibulum at eros</ListGroupItem>
          </ListGroup>
        </Col>
        <Col sm="8" lg="8">
          <ListGroup flush>
            <div>Message blah blah</div>
            <div>Message blah blah</div>
            <div>Message blah blah</div>
            <div>Message blah blah</div>
            <div>Message blah blah</div>
          </ListGroup>
        </Col>
      </Row>
      <Row>
      <Col sm="4" lg="4">
        <h6>Menu Nav</h6>
        </Col>
        <Col sm="8" lg="8">
          <Form>
            <FormGroup>
              <p className="mb-2">
                {`"🤔 Waiting for you to say something...`}
              </p>
              <FormTextarea />
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  };
};

export default connect(mapState)(Home);
