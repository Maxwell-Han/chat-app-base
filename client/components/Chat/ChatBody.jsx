import React, { Component } from "react";
import { connect } from "react-redux";
import { getMembers, getMessages, addMessage } from "../../store";
import { Link } from "react-router-dom";
import ChatMenu from "./ChatMenu";
import { Form, Input, Button, List, Avatar } from "antd";
const { TextArea } = Input;
import { SendOutlined } from "@ant-design/icons";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddMessage = this.handleAddMessage.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
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
      content: "",
    });
  }

  render() {
    const { currentChat: messages } = this.props;
    const userId = this.props.user._id;
    const numbMessages = Object.keys(messages).length;
    console.log("we have numb messages ", numbMessages);

    return (
      <section style={styles.outerContainer}>
        <div style={styles.messageContainer}>
          <List itemLayout="horizontal">
            {numbMessages > 0
              ? Object.keys(messages).map((mId) => (
                  <MessageCard
                    key={mId}
                    text={messages[mId].content}
                    isCurrentUser={messages[mId].userId === userId}
                  />
                ))
              : null}
          </List>
        </div>
        <Form onSubmit={this.handleAddMessage}>
          <p className="mb-2">{`"🤔 Waiting for you to say something...`}</p>
          <div style={styles.inputContainer}>
            <TextArea
              name="content"
              onChange={this.handleChange}
              value={this.state.content}
              autoSize
              allowClear
            />
            <Button
              type="primary"
              shape="circle"
              icon={<SendOutlined />}
              htmlType="submit"
            />
          </div>
        </Form>
      </section>
    );
  }
}

const styles = {
  outerContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  cardBody: {
    width: "fit-content",
    padding: "0.4rem",
    height: "auto",
  },
  messageContainer: {
    height: 180,
    display: "flex",
    flexDirection: "column",
    overflowY: "scroll",
  },
  inputContainer: {
    display: "flex",
  },
  cardContainer: {
    width: "fit-content",
  },
  cardContainerBuddy: {
    width: "fit-content",
    alignSelf: "flex-end",
  },
};
const MessageCard = (props) => {
  const { text, isCurrentUser } = props;
  return (
    <List.Item
      style={isCurrentUser ? styles.cardContainer : styles.cardContainerBuddy}
    >
      <div style={styles.cardBody}>
        <p>{text}</p>
      </div>
    </List.Item>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    currentChat: state.currentChat,
    currentRoomId: state.currentRoomId,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getMessages: (roomId) => dispatch(getMessages(roomId)),
    addMessage: (roomId, message) => dispatch(addMessage(roomId, message)),
  };
};

export default connect(mapState, mapDispatch)(Chat);
