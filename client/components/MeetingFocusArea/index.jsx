import React, { Component } from "react";
import FocusCard from "./FocusCard";
import DropTarget from "./DropTarget";
import { connect } from "react-redux";

const styles = {
  outerContainer: {
    width: "100%"
  },
  focusSection: {
    border: "3px solid lightblue",
    width: "80%",
    height: "80%",
    margin: "0 auto"
  },
  DropTarget: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  inFocusCard: {
    width: "95%",
    height: "90%"
  }
};

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

class MeetingFocusArea extends Component {
  render() {
    const { currentItems: items } = this.props;
    const inFocusItemId = Object.keys(items).filter(
      id => items[id].inFocus === true
    );
    const inFocusItem = [items[inFocusItemId[0]]];
    console.log("infocus itemId is ", inFocusItemId, inFocusItem);
    return (
      <section style={styles.outerContainer}>
        <h6 style={{textAlign: 'center'}}>Current Discussion Item</h6>
        <DropTarget style={styles.dropTarget}>
          {!isEmpty(items) &&
            inFocusItemId.map(id => (
              <FocusCard
                key={items[id]}
                {...items[id]}
                style={styles.inFocusCard}
              />
            ))}
        </DropTarget>
      </section>
    );
  }
}

const mapState = state => {
  return {
    currentItems: state.currentItems
  };
};

export default connect(mapState)(MeetingFocusArea);
