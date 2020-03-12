import axios from "axios";
import history from "../history";

// ACTION TYPES
const GET_MESSAGES = "GET_MESSAGES";
const ADD_MESSAGE = "ADD_MESSAGE";

// ACTION CREATORS
const gotMessages = messages => ({ type: GET_MESSAGES, messages });
const addedMessage = message => ({ type: ADD_MESSAGE, message });

// THUNK CREATORS
export const getMessages = roomId => async dispatch => {
  try {
    const {data: messages} = await axios.get(`/api/rooms/${roomId}/messages`);
    dispatch(gotMessages(messages));
  } catch (err) {
    console.error(err);
  }
};

export const addMessage = (roomId, message) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/rooms/${roomId}`, message);
    dispatch(addedMessage(data));
  } catch (err) {
    console.error(err);
  }
};

// Initial State
const defaultMessages = {};

// Reducer
export default function(state = defaultMessages, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return action.messages
    case ADD_MESSAGE:
      return { ...state, [action.message._id]: action.message };
    default:
      return state;
  }
}
