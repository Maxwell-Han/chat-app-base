import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers, addBuddy, getBuddies, logout } from "../store";
import { Link } from "react-router-dom";

const styles = {
  outerContainer: {
    display: "grid",
    gridTemplateColumns: "40% 60%",
    border: "1px solid black"
  },
  rightPane: {
    border: '1px solid green'
  }
};

class MainMenu extends Component {
  constructor(props) {
    super(props)

    this.handleAddBuddy = this.handleAddBuddy.bind(this)
  }

  async componentDidMount() {
    await this.props.getUsers();
    await this.props.getBuddies(this.props.user._id);
  }
  async handleAddBuddy(userId, buddyId) {
    console.log('click handler ', userId, buddyId)
    await this.props.addBuddy(userId, buddyId)
  }

  render() {
    const { user, users, buddies } = this.props;
    return (
      <section style={styles.outerContainer}>
        <div>
          <h5>Hello {user.userName}</h5>
          <div>
            <h4>Create a New Room</h4>
            <form>
              <label>Room Name:</label>
              <input type="text" name="room-name" />
            </form>
          </div>
          <div>
            <h4>Add a User as Friend</h4>
          </div>
          <div>
            <h4>Start Chatting</h4>
          </div>
          <section>
            <h5>Rooms</h5>
          </section>
          <section>
            <h5>Friends</h5>
            <div>
              <ul>
                {Object.keys(buddies).length > 0 &&
                  Object.keys(buddies).map(id => (
                    <li key={id}>{buddies[id].userName}</li>
                  ))}
              </ul>
            </div>
          </section>
          <section>
            <h5>People Online</h5>
            <div>
              <ul>
                {Object.keys(users).length > 0 &&
                  Object.keys(users).map(id => (
                    <li
                      key={id}
                      onClick={() => this.handleAddBuddy(user._id, id)}
                    >{users[id].userName}</li>
                  ))}
              </ul>
            </div>
          </section>
        </div>
        <div style={styles.rightPane}>
          <h5>Chats go here</h5>
          <ul></ul>
        </div>
      </section>
    );
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    users: state.users,
    buddies: state.buddies
  };
};

const mapDispatch = dispatch => {
  return {
    getUsers: () => dispatch(getUsers()),
    getBuddies: userId => dispatch(getBuddies(userId)),
    addBuddy: (userId, buddyId) => dispatch(addBuddy(userId, buddyId))
  };
};

export default connect(mapState, mapDispatch)(MainMenu);
