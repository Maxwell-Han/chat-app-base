## This project has been moved to [MONGOTOMEETING](https://github.com/Maxwell-Han/MonGoToMeeting)

# MonGoToMeeting 

#### MonGoToMeeting is a real-time chat and meeting collaboration tool.  Focus on your meeting, not taking notes!
#### A 5 day stackathon project built during attendance at [Fullstack Academy](https://fullstackacademy.com)

## Tech Stack
- [Node.js](https://nodejs.org/en/)
- [Express](http://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [React](https://facebook.github.io/react/)
- [Redux](https://redux.js.org/)
- [React-DnD](https://react-dnd.github.io/react-dnd/about)
- [Socket.io](http://socket.io/)
- [Webpack](https://webpack.js.org/)
- [Shards React (UI)](https://designrevision.com/docs/shards-react/getting-started)

## Local Setup

1. Run `git clone https://github.com/Maxwell-Han/chat-app-base.git` and navigate to the project folder with cd chat-app-base
2. Run npm install
3. If MongoDB is not installed locally you will need to install it with `brew install mongodb-community@4.2`
4. Run MongoDB locally with the command`brew services start mongodb-community` To stop the database server run `brew services stop mongodb-community`
5. Run `npm run start-dev` to start the app on http://localhost:3000/

## Features
- Add others to your friends list
- Create meeting rooms and invite your friends
- Add meeting items to your meeting room 
- Live chat functionality
- Users see if their friends are on or offline
- Messages and meeting items persist in database
- Drag and drop events trigger data updates which subsequently allow different components to render each with customized functionalities
- Local authentication utilizing BCryptJS

#### Demo chat features
![](Chat-Demo.gif)
#### Drag and drop meeting items
![](DnD-Demo.gif)
#### Additional drop areas update your meeting items
![](Chat-App-DropSpaces-Demo.gif)

## Project Challenges
- Updating Mongoose arrays are more complicated that other transactions
- Utilizing alternative ways of rendering components (props.children) for use with React-DnD
- Roomifying chat adds additional complexity to managing socket connections
- Managing socket connections with reference to users also adds complexity
- Finding an efficient way of integrating sockets into the redux-thunk data flow

## Learning Takeaways
- Mongoose does not have built in support for findOrCreate functions and requires an npm package
- Socket event handlers can assist with dispatching actions to our Redux store. 

```javascript 
// example socket flow 

// in our React component we define an event handler containing our thunk
async handleCreateRoom(event) {
    event.preventDefault();
    const roomName = this.state.roomName;
    const ownerId = this.props.user._id;
    await this.props.createRoom(roomName, ownerId);
    this.setState({
      roomName: ""
    });
  }
  
// our thunk contains a socket.emit function which communicates with and sends
// data to our server
export const createRoom = (roomName, ownerId) => async dispatch => {
  try {
    const data = {roomName, ownerId}
    const res = await axios.post("/api/rooms", data);
    socket.emit(CREATE_ROOM, res.data)
  } catch (err) {
    console.error(err);
  }
};

// our server side socket handlers receive the event and then send back the data 
// to be dispatched so that other users have the new data
socket.on('CREATE_ROOM', room => {
  const  ownerId  = room.owners[0]
  socket.emit('CREATE_ROOM', room)
  if(ownerId in onlineUsers) {
    socket.join(room._id)
  }
})

// finally our client side socket handles the received data and triggers our state update
socket.on('CREATE_ROOM', room => {
  store.dispatch(createdRoom(room))
})
```
- React-Dnd provides an api that allows us to define methods which will be called during drop events.  These methods allow us to pass props to other components and to trigger methods defined in the drop components that can update state.  A sample data flow involves the following.  First a drag and drop-able item is defined which holds required data passed in as props along with a handler function which will be called during a drop event. This requires a thunk from our store and a handler function to call that.  Then we can define the drop area.
```javascript
const DropTarget = props => {
  const [{ isOver, canDrop, item }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => {
      console.log("dropping an item!");
      handleDroppedItem(item.cardContent._id)
    },
    collect: mon => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
      item: mon.getItem()
    })
  });
  const handleDroppedItem = itemId => {
    // dispatch an action that updates a meeting item
    props.setFocusItem(props.currentRoomId, itemId);
  };
  //....
```

## Features - time permitting and stretch goals
- Update UI library
- Define additional drop zones to allow for more interaction such as changing item card status, prioritizing and ordering items, and deleting
- Add data visualization options to apply onto meeting items
- Connect drag and drop events to socket functions so that all users connected to room receive the updates
- Refine socket connection management either through refactoring code or integrating with Mongo database
- Add edit and delete options on users, friends, rooms, messages,
- Add addtional messaging features such as typing notifications, time sent, sticker/smilies, and image uploads
- Incorporate drag and resize components for more custom UI
- Segment room and friend menus into individual tabs

