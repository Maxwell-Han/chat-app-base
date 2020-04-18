import React, { Component } from "react";
import ChatMenu from "./ChatMenu";
import ChatBody from "./ChatBody";
import MeetingMenu from "./MeetingMenu";
import { useDispatch } from 'react-redux';

const outerContainer = {
  margin: 'auto',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  width: '100%'
}

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'chat',
    };
    this.handleTabs = this.handleTabs.bind(this);
  }
  handleTabs(e) {
    console.log("click ", e);
    this.setState({
      current: e.key,
    });
  }

  render() {
    const { current } = this.state;
    return (
      <section style={outerContainer}>
        <ChatMenu viewChat={this.state.viewChat} handleTabs={this.handleTabs} />
        {current === 'chat' && <ChatBody />}
        {current !== 'chat' && <MeetingMenu />}
      </section>
    );
  }
}

export default Chat;
