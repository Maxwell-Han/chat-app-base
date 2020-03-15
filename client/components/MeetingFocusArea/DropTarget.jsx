import React from "react";
import { connect } from "react-redux";
import { setFocusItem } from "../../store";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../constants";

const styles = {
  outerContainer: {
    border: "4px solid blue",
    width: "100%"
  },
  focusSection: {
    border: "3px solid lightblue",
    width: "80%",
    height: "80%",
    margin: "0 auto"
  }
};

const DropTarget = props => {
  const [{ isOver, canDrop, item }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => {
      console.log("dropping an item!", item);
      handleDroppedItem(item.cardContent._id)
    },
    collect: mon => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
      item: mon.getItem()
    })
  });
  const handleDroppedItem = itemId => {
    console.log("handling dropped item");
    props.setFocusItem(props.currentRoomId, itemId);
  };
  console.log("Over drop zone, props are ", isOver, canDrop, item);
  return (
    <div ref={drop} style={styles.focusSection}>
      {isOver && (
        <div
          style={{
            height: "100%",
            width: "100%",
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: "yellow"
          }}
        ></div>
      )}
      {props.children}
    </div>
  );
};

const mapState = state => {
  return {
    inFocusItem: state.inFocusItem,
    currentRoomId: state.currentRoomId
  };
};

const mapDispatch = dispatch => {
  return {
    setFocusItem: (roomId, itemId) => dispatch(setFocusItem(roomId, itemId))
  };
};

export default connect(mapState, mapDispatch)(DropTarget);
