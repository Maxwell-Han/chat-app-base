import React, { Component } from "react";
import { connect } from "react-redux";
import { getMembers, getMessages, addMessage } from "../../store";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "shards-react";
import ChatMenu from "./ChatMenu";
import { Form, FormInput, FormGroup, FormTextarea } from "shards-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter,
  Button
} from "shards-react";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddMessage = this.handleAddMessage.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  async handleAddMessage(e) {
    e.preventDefault();
    const content = this.state.content;
    const userId = this.props.user._id;
    const roomId = this.props.currentRoomId;
    const message = { content, userId, roomId };
    console.log("our props are ", this.props, userId, roomId, message);
    await this.props.addMessage(roomId, message);
    this.setState({
      content: ""
    });
  }

  render() {
    const { currentChat: messages } = this.props;
    const numbMessages = Object.keys(messages).length;
    console.log("we have numb messages ", numbMessages);
    return (
      <section>
        <div>
          {numbMessages > 0
            ? Object.keys(messages).map(mId => (
                <MessageCard key={mId} text={messages[mId].content} />
              ))
            : null}
        </div>
        <Form onSubmit={this.handleAddMessage}>
          <FormGroup>
            <p className="mb-2">{`"🤔 Waiting for you to say something...`}</p>
            <FormTextarea
              name="content"
              onChange={this.handleChange}
              value={this.state.content}
            />
            <Button theme="light" type="submit">
              Send
            </Button>
          </FormGroup>
        </Form>
      </section>
    );
  }
}

const styles = {
  cardBody: {
    padding: "0.4rem",
    height: "auto"
  },
  messageContainer: {
    height: "100%"
  }
};
const MessageCard = props => {
  const { text } = props;
  return (
    <Card>
      <CardBody style={styles.cardBody}>
        <p>{text}</p>
      </CardBody>
    </Card>
  );
};

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    currentChat: state.currentChat,
    currentRoomId: state.currentRoomId
  };
};

const mapDispatch = dispatch => {
  return {
    getMessages: roomId => dispatch(getMessages(roomId)),
    addMessage: (roomId, message) => dispatch(addMessage(roomId, message))
  };
};

export default connect(mapState, mapDispatch)(Chat);