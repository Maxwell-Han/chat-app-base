import { createStore, combineReducers, applyMiddleware } from 'redux';
import user from './user'
import users from './users'
import buddies from './buddies'
import rooms from './rooms'
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const reducer = combineReducers({
  user,
  rooms,
  buddies,
  users
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


