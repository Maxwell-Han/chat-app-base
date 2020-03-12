import axios from "axios";
import history from '../history';

// ACTION TYPES
const CREATE_ROOM = "CREATE_ROOM";


// ACTION CREATORS
const createRoom = room => ({ type: CREATE_ROOM, room });

// THUNK CREATORS
export const createdRoom = () => async dispatch => {
  try {
    const res = await axios.post("/rooms");
    dispatch(createRoom(res.data));
  } catch (err) {
    console.error(err);
  }
};


// Initial State
const defaultRooms = {};

// Reducer
export default function(state = defaultRooms, action) {
  switch (action.type) {
    case CREATE_ROOM:
      return action.room;
    default:
      return state;
  }
}
