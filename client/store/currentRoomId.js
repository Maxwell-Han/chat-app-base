import axios from "axios";
import history from "../history";
import socket from '../socket'

// ACTION TYPES
const GET_ROOM_ID = 'GET_ROOM_ID'
// ACTION CREATORS
export const gotRoomId = roomId => ({ type: GET_ROOM_ID, roomId });

// THUNK CREATORS

// Initial State
const defaultRoom = ''

// Reducer
export default function(state = defaultRoom, action) {
  switch (action.type) {
    case GET_ROOM_ID:
      return action.roomId
    default:
      return state;
  }
}
