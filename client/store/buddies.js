import axios from "axios";
import history from '../history';

// ACTION TYPES
const GET_BUDDIES = "GET_BUDDIES";
const ADD_BUDDY = "ADD_BUDDY"

// ACTION CREATORS
const gotBuddies = buddies => ({ type: GET_BUDDIES, buddies });
const addedBuddy = buddy =>({ type: ADD_BUDDY, buddy})

// THUNK CREATORS
export const getBuddies = (userId) => async dispatch => {
  try {
    const {data} = await axios.get(`api/users/${userId}/buddies`);
    dispatch(gotBuddies(data));
  } catch (err) {
    console.error(err);
  }
};

export const addBuddy = (userId, buddyId) => async dispatch => {
  try {
    console.log('thunk buddyId is ', buddyId)
    const {data} = await axios.post(`api/users/${userId}/buddies`, {buddyId: buddyId});
    console.log('thunk data is ', data)
    dispatch(addedBuddy(data));
  } catch (err) {
    console.error(err);
  }
};


// Initial State
const defaultBuddies = {};

// Reducer
export default function(state = defaultBuddies, action) {
  switch (action.type) {
    case GET_BUDDIES:
      return action.buddies;
    case ADD_BUDDY:
      return {...state, [action.buddy._id]: action.buddy}
    default:
      return state;
  }
}
