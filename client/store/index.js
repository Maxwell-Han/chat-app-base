import { createStore, combineReducers, applyMiddleware } from 'redux';
import user from './user'
import users from './users'
import buddies from './buddies'
import rooms from './rooms'
import currentChat from './currentChat'
import currentRoomUsers from './currentRoomUsers'
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';


const reducer = combineReducers({
  user,
  rooms,
  buddies,
  users,
  currentChat,
  currentRoomUsers
});

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);

export default store;
export * from './user'
export * from './users'
export * from './buddies'
export * from './rooms'
export * from './currentChat'
export * from './currentRoomUsers'

