# Stack Chat 

#### StackChat is a real-time chat and meeting collaboration tool.  Focus on your meeting, not taking notes!

## Tech Stack
- Node.js
- Express
- React
- Redux
- MongoDB
- React-DnD
- Socket.io

## Local Setup

Run `git clone https://github.com/Maxwell-Han/chat-app-base.git`
Navigate to project folder with cd chat-app-base
Run npm install
If MongoDB is not installed locally you will need to install it with `brew install mongodb-community@4.2`
Run MongoDB locally with the command`brew services start mongodb-community`
To stop the database server run `brew services stop mongodb-community`
Run `npm run start-dev` to start the app on http://localhost:3000/

## Features
- Add others to your friends list
- Create meeting rooms and invite your friends
- Add meeting items to your meeting room 
- Live chat functionality
- Users see if their friends are on or offline
- Messages and meeting items persist in database
- Local authentication where passwords are secured with BCryptJs

#### Demo chat features
![](Chat-Demo.gif)
#### Drag and drop meeting items
![](DnD-Demo.gif)

## Project Challenges
- Updating Mongoose arrays are more complicated that other transactions
- Utilize alternative ways of rendering props (render children) for use with React-DnD
- Roomifying chat adds additional complexity to managing socket connections
- Managing socket connections with reference to users also adds complexity

## Learning Takeaways
- Mongoose does not have built in support for findOrCreate functions and requires an npm package
- Socket event handlers can assist with dispatching actions to our Redux store
- React-Dnd provides an api that allows defining methods which to be used on drop events.  These methods allow us to pass props to other components and to trigger actions that change  our state.
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


