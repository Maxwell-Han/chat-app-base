import React from "react";
import { connect } from "react-redux";
import { markItemDone } from "../../store";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../constants";

const styles = {
  focusSection: {
    border: "1px solid lightyellow",
    borderRadius: '4px',
    height: "80%",
    margin: "0 auto"
  }
};

const DoneItemDropArea = props => {
  const [{ isOver, canDrop, item }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => {
      handleDroppedItem(item.cardContent._id)
    },
    collect: mon => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
      item: mon.getItem()
    })
  });
  const handleDroppedItem = itemId => {
    console.log("handling dropping a done item");
    props.markItemDone(props.currentRoomId, itemId);
  };
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
    currentRoomId: state.currentRoomId
  };
};

const mapDispatch = dispatch => {
  return {
    markItemDone: (roomId, itemId) => dispatch(markItemDone(roomId, itemId))
  };
};

export default connect(mapState, mapDispatch)(DoneItemDropArea);
