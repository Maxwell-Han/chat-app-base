import axios from "axios";
import history from "../history";
import socket from "../socket";

// ACTION TYPES
const GOT_CONNECTED_BUDDY = 'GOT_CONNECTED_BUDDY'
const GOT_DISCONNECTED_BUDDY = 'GOT_DISCONNECTED_BUDDY'

// ACTION CREATORS
export const gotConnectedBuddy = id => ({ type: GOT_CONNECTED_BUDDY, id });
export const gotDisconnectedBuddy = id => ({ type: GOT_DISCONNECTED_BUDDY, id });

// THUNK CREATORS

// Initial State
const defaultOnlineBuddies = [];

// Reducer
export default function(state = defaultOnlineBuddies, action) {
  switch (action.type) {
    case GOT_CONNECTED_BUDDY:
      return state.includes(action.id) ? [...state] : [...state, action.id]
    case GOT_DISCONNECTED_BUDDY:
      return state.filter(id => id !== action.id)
    default:
      return state;
  }
}
