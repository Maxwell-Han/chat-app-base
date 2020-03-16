import React from "react";
import { connect } from "react-redux";
import { unsetFocusItem } from "../../store";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../constants";

const styles = {
  focusSection: {
    border: "2px solid lightgray",
    borderRadius: '7px',
    height: "15%",
    margin: "0 auto"
  }
};

const ItemListDropArea = props => {
  const [{ isOver, canDrop, item }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => {
      console.log("Card being moved BACK over to item LIST area", item);
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
    props.unsetFocusItem(props.currentRoomId, itemId);
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
            backgroundColor: "lightgray"
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
    unsetFocusItem: (roomId, itemId) => dispatch(unsetFocusItem(roomId, itemId))
  };
};

export default connect(mapState, mapDispatch)(ItemListDropArea);
