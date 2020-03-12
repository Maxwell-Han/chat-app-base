import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getUsers,
  addBuddy,
  getBuddies,
  getRooms,
  createRoom,
  logout
} from "../store";
import { Link } from "react-router-dom";

const styles = {
  outerContainer: {
    display: "grid",
    gridTemplateColumns: "40% 60%",
    border: "1px solid black"
  },
  rightPane: {
    border: "1px solid green"
  }
};

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: ""
    };
    this.handleAddBuddy = this.handleAddBuddy.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCreateRoom = this.handleCreateRoom.bind(this);
  }

  async componentDidMount() {
    await this.props.getUsers();
    await this.props.getBuddies(this.props.user._id);
    await this.props.getRooms(this.props.user._id);
  }
  async handleAddBuddy(userId, buddyId) {
    console.log("click handler ", userId, buddyId);
    await this.props.addBuddy(userId, buddyId);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleCreateRoom(event) {
    event.preventDefault();
    const roomName = this.state.roomName;
    const ownerId = this.props.user._id;
    this.props.createRoom(roomName, ownerId);
    this.setState({
      roomName: ""
    });
  }
  render() {
    const { user, users, buddies, rooms } = this.props;
    return (
      <section style={styles.outerContainer}>
        <div>
          <h5>Hello {user.userName}</h5>
          <div>
            <h4>Create a New Room</h4>
            <form onSubmit={this.handleCreateRoom}>
              <label>Room Name:</label>
              <input type="text" name="roomName" onChange={this.handleChange} />
              <button type="submit">Create Room</button>
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
            <div>
              <ul>
                {Object.keys(rooms).length > 0 &&
                  Object.keys(rooms).map(id => (
                    <li key={id}>{rooms[id].roomName}</li>
                  ))}
              </ul>
            </div>
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
                    >
                      {users[id].userName}
                    </li>
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
    rooms: state.rooms,
    users: state.users,
    buddies: state.buddies
  };
};

const mapDispatch = dispatch => {
  return {
    getUsers: () => dispatch(getUsers()),
    getBuddies: userId => dispatch(getBuddies(userId)),
    addBuddy: (userId, buddyId) => dispatch(addBuddy(userId, buddyId)),
    getRooms: userId => dispatch(getRooms(userId)),
    createRoom: (roomName, ownerId) => dispatch(createRoom(roomName, ownerId))
  };
};

export default connect(mapState, mapDispatch)(MainMenu);
