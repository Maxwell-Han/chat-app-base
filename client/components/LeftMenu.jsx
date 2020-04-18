import React from "react";
import { Menu } from "antd";
const { SubMenu } = Menu;

const LeftMenu = ({
  rooms,
  buddies,
  users,
  handleRoomSelect,
  handleAddBuddy,
}) => {
  console.log(rooms);
  return (
    <Menu mode="inline">
      <SubMenu title={<span>Meetings</span>}>
        {Object.keys(rooms).length > 0 &&
          Object.keys(rooms).map((id) => (
            <Menu.Item key={id} id={id} onClick={() => handleRoomSelect(id)}>
              {rooms[id].roomName}
            </Menu.Item>
          ))}
      </SubMenu>
      <SubMenu title={<span>Buddies</span>}>
        {Object.keys(buddies).length > 0 &&
          Object.keys(buddies).map((id) => (
            <Menu.Item key={id} id={id}>
              {buddies[id].userName}
            </Menu.Item>
          ))}
      </SubMenu>
      <SubMenu title={<span>Other Users</span>}>
        {Object.keys(users).length > 0 &&
          Object.keys(users).map((id) => (
            <Menu.Item
              key={id}
              id={id}
              onClick={() => handleAddBuddy(id)}
            >
              {users[id].userName}
            </Menu.Item>
          ))}
      </SubMenu>
    </Menu>
  );
};

export default LeftMenu;
