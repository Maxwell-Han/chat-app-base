import React, { Component } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../constants";
import ItemCard from "../MeetingItems";

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
class MeetingFocusArea extends Component {
  render() {
    return (
      <section style={styles.outerContainer}>
        <h6>Current Discussion Item</h6>
        <DropArea>

        </DropArea>
      </section>
    );
  }
}

const DropArea = (props) => {
  const [{ isOver, canDrop, item }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => console.log("dropping an item!"),
    collect: mon => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
      //testing this
      item: mon.getItem()
    })
  });
  console.log("drop area props are, ", isOver, canDrop, item);
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
        >
          {props.children}
        </div>
      )}
    </div>
  );
};

export default MeetingFocusArea;
