import axios from "axios";
import history from "../history";
import user from "./user";
import socket from "../socket";

// ACTION TYPES
const GET_ROOM_MEMBERS = 'GET_ROOM_MEMBERS'
const ADD_BUDDY_TO_ROOM = "ADD_BUDDY_TO_ROOM";

// ACTION CREATORS
const gotMembers = members => ({ type: GET_ROOM_MEMBERS, members });
export const addedBuddyToRoom = buddy => ({ type: ADD_BUDDY_TO_ROOM, buddy });

// THUNK CREATORS
export const getMembers = roomId => async dispatch => {
  try {
    const {data: members} = await axios.get(`/api/rooms/${roomId}/users`);
    dispatch(gotMembers(members));
  } catch (err) {
    console.error(err);
  }
};

export const addBuddyToRoom = (roomId, buddyId) => async dispatch => {
  try {
    const {data: buddy} = await axios.put(`/api/rooms/${roomId}/user`, {userId: buddyId});
    socket.emit(ADD_BUDDY_TO_ROOM, buddy)
    console.log('addBuddytoRoom thunk  has socket of ', socket.id, socket)
    // dispatch(addedBuddyToRoom(buddy));
  } catch (err) {
    console.error(err);
  }
};

// Initial State
const defaultMembers = {};

// Reducer
export default function(state = defaultMembers, action) {
  switch (action.type) {
    case GET_ROOM_MEMBERS:
      return action.members
    case ADD_BUDDY_TO_ROOM:
      return { ...state, [action.buddy._id]: action.buddy };
    default:
      return state;
  }
}
