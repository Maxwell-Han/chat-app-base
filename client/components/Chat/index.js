import React, { Component } from "react";
import ChatMenu from "./ChatMenu";
import ChatBody from "./ChatBody";
import MeetingMenu from './MeetingMenu'

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewChat: true
    };
    this.handleTabs = this.handleTabs.bind(this);
  }
  handleTabs(name) {
    console.log("got tab with name of ", name);
    const { viewChat } = this.state;
    if (name === "chat" && !viewChat) {
      this.setState({
        viewChat: true
      });
    } else if (name === "meeting-actions") {
      this.setState({
        viewChat: false
      });
    }
  }

  render() {
    const { viewChat } = this.state;
    return (
      <section>
        <ChatMenu viewChat={this.state.viewChat} handleTabs={this.handleTabs} />
        {viewChat && <ChatBody />}
        {!viewChat && <MeetingMenu />}
      </section>
    );
  }
}

export default Chat;
