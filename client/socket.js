import io from "socket.io-client";
import store from './store'
import { addMessage } from './store/currentChat'
const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("client socket connected");
});

socket.on("ADD_MESSAGE", (message) => {
  console.log("Client socket caught add message from server");
  console.log('the message data is ', message)
  // store.dispatch(addMessage(roomId, content));
});
export default socket;

//CONFIG SOCKET OPTION
// const configureSocket = dispatch => {
//   // make sure our socket is connected to the port
//   socket.on("connect", () => {
//     console.log("client socket connected");
//   });

//   // the socket.on method is like an event listener
//   // just like how our redux reducer works
//   // the different actions that our socket/client will emit
//   // is catched by these listeners
//   socket.on("ADD_MESSAGE", message => {
//     console.log("Client socket caught add message from server");
//     dispatch({ type: "ADD_MESSAGE", message });
//   });

//   return socket;
// };

// export default configureSocket;

// export const initSocket = dispatch => {
//   console.log('initializing SOCKET')
//   socket.on('connect', () => {
//     console.log('Connected!')
//   })

//   socket.on('ADD_MESSAGE', message => {
//     console.log('Client socket caught add message from server')
//     dispatch({type: 'ADD_MESSAGE', message})
//   })
// }

// socket.on('ADD_MESSAGE', message => {
//   console.log('testing client socket')

// })
