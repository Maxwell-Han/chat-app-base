import axios from "axios";
import history from '../history';
import socket from '../socket'

// ACTION TYPES
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";

// ACTION CREATORS
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

// THUNK CREATORS
export const me = () => async dispatch => {
  try {
    const res = await axios.get("/auth/me");
    dispatch(getUser(res.data || defaultUser));
    console.log('ME THUNK ', res.data)
    socket.emit('GET_USER', res.data)
  } catch (err) {
    console.error(err);
  }
};

export const auth = (
  userName,
  email,
  password,
  method,
  zipCode
) => async dispatch => {
  let res;
  console.log('dispatching auth ', userName, email, password, method, zipCode)
  try {
    res = await axios.post(`/auth/${method}`, {
      userName,
      email,
      password,
      zipCode
    });
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data));
    console.log('socket from AUTH thunk ', res.data)
    socket.emit('GET_USER', res.data)
    history.push("/main");
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post("/auth/logout");
    dispatch(removeUser());
    socket.emit('logout')
    history.push("/login");
  } catch (err) {
    console.error(err);
  }
};

// Initial State
const defaultUser = {};

// Reducer
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
