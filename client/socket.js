import io from "socket.io-client";
import store from './store'
import { addedMessage } from './store/currentChat'
import { addedBuddyToRoom } from './store/currentRoomUsers'
import { getRooms } from './store/rooms'

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("client socket connected");
});

socket.on("ADD_MESSAGE", (message) => {
  store.dispatch(addedMessage(message));
});

socket.on('ADD_BUDDY_TO_ROOM', (buddy) => {
  console.log('client recieved event to add buddy ', buddy)
  console.log('socket here is ', socket.id, socket)
  // store.dispatch(addedBuddyToRoom(buddy))
})

socket.on('GET_ROOMS', (userId) => {
  console.log('client recieved event to add buddy ')
  store.dispatch(getRooms(userId))
})

socket.on('JOIN_ROOMS', user => {
  socket.emit('GET_USER', user)
  console.log(user.userName, ' is going to join the new rooom they were added to')
})



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
