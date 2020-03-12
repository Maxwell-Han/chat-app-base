const router = require("express").Router();
const { Room, User } = require("../db/models/");

const toObj = arr => {
  const res = {};
  arr.forEach(el => (res[el._id] = el));
  return res;
};

router.get("/", async (req, res, next) => {
  console.log("GET api/rooms: getting all of your rooms");
  try {
    const data = await Room.find();
    const parsedData = toObj(data);
    res.json(parsedData);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:roomId/users", async (req, res, next) => {
  console.log("GET api/rooms/roomId/users: getting all of your rooms users");
  try {
    const roomId = req.params.roomId;
    const { users: userIds } = await Room.findById(roomId).select("users");
    const userData = await User.findUsersByIds(userIds);
    res.json(userData);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:roomId/messages", async (req, res, next) => {
  console.log(
    "GET api/rooms/roomId/messages: getting all of your rooms messages"
  );
  try {
    const roomId = req.params.roomId;
    const { messages } = await Room.findById(roomId).select("messages");
    res.json(messages);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:roomId/user", async (req, res, next) => {
  console.log("this is the rooms PUT /user route!");
  try {
    const roomId = req.params.roomId;
    const userId = req.body.userId;
    const room = await Room.findById(roomId);
    room.addUser(userId);
    res.json(room);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res, next) => {
  console.log("this is the POST route!");
  try {
    const userId = req.body.ownerId;
    const roomName = req.body.roomName;
    const room = await Room.createRoomWithOwner(roomName, userId);
    res.json(room);
  } catch (err) {
    console.log("there was an error ", err);
  }
});

router.post("/:roomId", async (req, res, next) => {
  console.log("rooms POST a message");
  try {
    const roomId = req.params.roomId;
    const room = await Room.findById(roomId);
    const newMessage = await room.addMessage(req.body);
    res.json(newMessage);
  } catch (err) {
    console.log("there was an error ", err);
  }
});

module.exports = router;
