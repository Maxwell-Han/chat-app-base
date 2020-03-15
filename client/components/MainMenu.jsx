import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getUsers,
  addBuddy,
  getBuddies,
  getRooms,
  createRoom,
  getMessages,
  addBuddyToRoom,
  getMembers,
  gotRoomId,
  getItems,
  logout
} from "../store";
import Chat from "./Chat";
import { Link } from "react-router-dom";
import { FormSelect, Button } from "shards-react";

const styles = {
  outerContainer: {
    display: "grid",
    gridTemplateColumns: "40% 60%",
    border: "1px solid black",
    height: '100%',
    overflow: 'scroll'
  },
  rightPane: {
    border: "1px solid green"
  }
};

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: "",
      buddy: "",
      currentRoomId: ""
    };
    this.handleAddBuddy = this.handleAddBuddy.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCreateRoom = this.handleCreateRoom.bind(this);
    this.handleRoomSelect = this.handleRoomSelect.bind(this);
    this.handleAddBuddyToRoom = this.handleAddBuddyToRoom.bind(this);
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
  async handleCreateRoom(event) {
    event.preventDefault();
    const roomName = this.state.roomName;
    const ownerId = this.props.user._id;
    await this.props.createRoom(roomName, ownerId);
    this.setState({
      roomName: ""
    });
  }
  async handleRoomSelect(e) {
    const roomId = e.target.id;
    console.log("clicked handle room select ", '..',roomId, roomId.length);
    await this.props.getMessages(roomId);
    await this.props.getMembers(roomId);
    await this.props.gotRoomId(roomId)
    await this.props.getItems(roomId)
    console.log(this.props.currentRoomId)
    this.setState({
      currentRoomId: roomId
    });
  }

  async handleAddBuddyToRoom(e) {
    e.preventDefault();
    console.log(
      "adding buddy to room with id of ",
      this.state.buddy,
      "  to room with id of ",
      this.state.currentRoomId
    );
    const buddyId = this.state.buddy;
    await this.props.addBuddyToRoom(this.state.currentRoomId, buddyId);
  }

  render() {
    const { user, users, buddies, rooms, currentChat: messages } = this.props;
    return (
      <section style={styles.outerContainer}>
        <div>
          <h6>Hello {user.userName}</h6>
          <div>
            <h6>Create a New Room</h6>
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
            <h6>Rooms</h6>
            <div>
              <ul>
                {Object.keys(rooms).length > 0 &&
                  Object.keys(rooms).map(id => (
                    <li key={id} id={id} onClick={this.handleRoomSelect}>
                      {rooms[id].roomName}
                    </li>
                  ))}
              </ul>
            </div>
          </section>
          <section>
            <h6>Add Buddy to Room</h6>
            <form onSubmit={this.handleAddBuddyToRoom}>
              <FormSelect
                value={this.state.buddy}
                name="buddy"
                onChange={this.handleChange}
              >
                {Object.keys(buddies).length > 0 &&
                  Object.keys(buddies).map(id => (
                    <option key={id} value={id}>
                      {buddies[id].userName}
                    </option>
                  ))}
              </FormSelect>
              <Button theme="light" type="submit" size="sm">
                Send
              </Button>
            </form>
          </section>
          <section>
            <h6>Friends</h6>
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
            <h6>People Online</h6>
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
          <Chat
            key={this.state.currentRoomId}
            messages={messages}
            roomId={this.state.currentRoomId}
          />
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
    buddies: state.buddies,
    currentChat: state.currentChat,
    currentRoomUsers: state.currentRoomUsers,
    currentItems: state.currentItems
  };
};

const mapDispatch = dispatch => {
  return {
    getUsers: () => dispatch(getUsers()),
    getBuddies: userId => dispatch(getBuddies(userId)),
    addBuddy: (userId, buddyId) => dispatch(addBuddy(userId, buddyId)),
    getRooms: userId => dispatch(getRooms(userId)),
    createRoom: (roomName, ownerId) => dispatch(createRoom(roomName, ownerId)),
    getMembers: roomId => dispatch(getMembers(roomId)),
    getMessages: roomId => dispatch(getMessages(roomId)),
    addBuddyToRoom: (roomId, buddyId) =>
      dispatch(addBuddyToRoom(roomId, buddyId)),
    gotRoomId: roomId => dispatch(gotRoomId(roomId)),
    getItems: roomId => dispatch(getItems(roomId))
  };
};

export default connect(mapState, mapDispatch)(MainMenu);
