import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../store";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    const { handleLogout } = this.props;
    return (
      <section>
        <Link to="/home">Go to home</Link>
        <Link to="/main">Main Menu</Link>
        <Link to="/signup">Sign up as new user</Link>
        <Link to="/login">Login</Link>
        <a href="#" onClick={handleLogout}>
          Logout
        </a>
      </section>
    );
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    handleLogout() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(NavBar);
