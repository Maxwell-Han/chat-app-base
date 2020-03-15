import axios from "axios";
import history from "../history";
import socket from '../socket'

// ACTION TYPES
const GET_MEETING_ITEMS = 'GET_MEETING_ITEMS'
const ADD_MEETING_ITEM = 'ADD_MEETING_ITEM'
const SET_FOCUS_ITEM = 'SET_FOCUS_ITEM'

// ACTION CREATORS
export const gotItems = items => ({ type: GET_MEETING_ITEMS, items });
export const addedItem = item => ({ type: ADD_MEETING_ITEM, item });
const haveSetFocusItem = items => ({ type: SET_FOCUS_ITEM, items });

// THUNK CREATORS
export const getItems = (roomId) => async dispatch => {
  try {
    console.log('thunk getting rooms from rom ', roomId)
    const {data} = await axios.get(`/api/rooms/${roomId}/items`);
    console.log('thunk getting meeting items ', data)
    // socket.emit('ADD_MESSAGE', data)
    dispatch(gotItems(data))
  } catch (err) {
    console.error(err);
  }
};

export const addItem = (item) => async dispatch => {
  try {
    const {roomId} = item
    const {data} = await axios.post(`/api/rooms/${roomId}/items`, item);
    console.log('thunk item to room ', data)
    // socket.emit('ADD_MESSAGE', data)
    dispatch(addedItem(data))
  } catch (err) {
    console.error(err);
  }
};

// set focus on one item but get back all items
export const setFocusItem = (roomId, itemId) => async dispatch => {
  try {
    const { data: items } = await axios.put(`/api/rooms/${roomId}/items/${itemId}`, {inFocus: true});
    dispatch(haveSetFocusItem(items));
  } catch (err) {
    console.error(err);
  }
};

// Initial State
const defaultItems = {}

// Reducer
export default function(state = defaultItems, action) {
  switch (action.type) {
    case GET_MEETING_ITEMS:
      return action.items
    case ADD_MEETING_ITEM:
      return {...state, [action.item._id]: action.item}
    case SET_FOCUS_ITEM:
      return action.items
    default:
      return state;
  }
}
