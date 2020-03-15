import React, { Component } from "react";
import { Nav, NavItem, NavLink } from "shards-react";

class ChatMenu extends Component {
  constructor(props) {
    super(props);
    this.handleTabSelect = this.handleTabSelect.bind(this);
  }
  handleTabSelect(e) {
    const name = e.target.id
    this.props.handleTabs(name)
  }
  render() {
    return (
      <Nav fill tabs>
        <NavItem >
          <NavLink
            href="#"
            id="chat"
            active={this.props.viewChat}
            onClick={(e) => this.handleTabSelect(e)}
          >
            Chat
          </NavLink>
        </NavItem>
        <NavItem >
          <NavLink
            href="#"
            id="meeting-actions"
            active={!this.props.viewChat}
            onClick={(e) => this.handleTabSelect(e)}
          >
            Meeting Actions
          </NavLink>
        </NavItem>
      </Nav>
    );
  }
}

export default ChatMenu;
