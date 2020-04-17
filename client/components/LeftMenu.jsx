import React from "react";
import { Menu } from "antd";
const { SubMenu } = Menu;

const LeftMenu = ({ rooms, handleRoomSelect }) => {
  console.log(rooms)
  return (
    <Menu mode="inline">
      <SubMenu title={<span>Meetings</span>}>
        <Menu.ItemGroup title="Rooms">
        {Object.keys(rooms).length > 0 &&
          Object.keys(rooms).map((id) => (
            <Menu.Item key={id} id={id} onClick={() => handleRoomSelect(id)}>
              {rooms[id].roomName}
            </Menu.Item>
          ))}
          </Menu.ItemGroup>
      </SubMenu>
    </Menu>
  );
};

export default LeftMenu;
