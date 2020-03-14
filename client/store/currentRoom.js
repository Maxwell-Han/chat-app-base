import axios from "axios";
import history from "../history";
import socket from '../socket'

// ACTION TYPES
const GET_ROOM = 'GET_ROOM'
// ACTION CREATORS
export const gotRoom = message => ({ type: GET_ROOM, roomId });

// THUNK CREATORS

// Initial State
const defaultRoom = {
  currentRoomId: ''
};

// Reducer
export default function(state = defaultRoom, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return action.roomId
    default:
      return state;
  }
}
