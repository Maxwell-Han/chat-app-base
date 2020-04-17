import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../store";
import { Link } from "react-router-dom";
import { Menu, Layout } from "antd";
const { Header } = Layout;
const topNavStyles = {display: 'flex', justifyContent: 'space-between'}

class TopNav extends Component {
  render() {
    const { handleLogout } = this.props;
    return (
      <Header>
         <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]} style={topNavStyles}>
          <Link to="/main">Main Menu</Link>
          <Link to="/login">Login</Link>
          <a href="#" onClick={handleLogout}>
            Logout
          </a>
        </Menu>
      </Header>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleLogout() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(TopNav);
