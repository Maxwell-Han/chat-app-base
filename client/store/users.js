import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS';

/**
 * INITIAL STATE
 */
const defaultUsers = {};

/**
 * ACTION CREATORS
 */
const gotUsers = users => ({type: GET_USERS, users});

/**
 * THUNK CREATORS
 */
export const getUsers = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users');
    console.log('got users are ', data)
    dispatch(gotUsers(data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultUsers, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    default:
      return state;
  }
}
