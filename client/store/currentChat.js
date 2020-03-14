import axios from "axios";
import history from "../history";
import socket from '../socket'

// ACTION TYPES
const GET_MESSAGES = "GET_MESSAGES";
const ADD_MESSAGE = "ADD_MESSAGE";

// ACTION CREATORS
const gotMessages = messages => ({ type: GET_MESSAGES, messages });
export const addedMessage = message => ({ type: ADD_MESSAGE, message });

// THUNK CREATORS
export const getMessages = roomId => async dispatch => {
  try {
    const {data: messages} = await axios.get(`/api/rooms/${roomId}/messages`);
    dispatch(gotMessages(messages));
  } catch (err) {
    console.error(err);
  }
};

export const addMessage = (roomId, message) => async () => {
  try {
    const {data} = await axios.post(`/api/rooms/${roomId}`, message);
    console.log('thunk poseted message for addMessage is ', data)
    socket.emit('ADD_MESSAGE', data)
    // ../socket.js will dispatch
  } catch (err) {
    console.error(err);
  }
};

// Initial State
const defaultRoom = {
  users: {},
  messages: {}
};

// Reducer
export default function(state = defaultRoom, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return action.messages
    case ADD_MESSAGE:
      return { ...state, [action.message._id]: action.message };
    default:
      return state;
  }
}
