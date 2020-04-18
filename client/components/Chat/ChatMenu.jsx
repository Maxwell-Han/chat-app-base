import React, { Component } from "react";
import { Menu } from 'antd';

class ChatMenu extends Component {
  constructor(props) {
    super(props);
    this.handleTabSelect = this.handleTabSelect.bind(this);
  }
  handleTabSelect(e) {
    this.props.handleTabs(e);
  }
  render() {
    const { current }  = this.props
    return (
      <Menu
        onClick={this.handleTabSelect}
        selectedKeys={[current]}
        mode="horizontal"
      >
        <Menu.Item key="chat">
          Chat
        </Menu.Item>
        <Menu.Item
          key="meeting-actions"
          // active={'meetings-actions' === current}
        >
          Meeting Actions
        </Menu.Item>
      </Menu>
    );
  }
}

export default ChatMenu;
