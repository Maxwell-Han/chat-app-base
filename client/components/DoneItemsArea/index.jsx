import React, { Component } from "react";
import DoneCard from "./DoneCard";
import DoneItemsDropArea from "./DoneItemsDropArea";
import { connect } from "react-redux";

const styles = {
  outerContainer: {
    width: "20%"
  },
  DropTarget: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

class DoneItemsArea extends Component {
  render() {
    const { currentItems: items } = this.props;
    const doneItemIds = Object.keys(items).filter(
      id => items[id].status === 'closed'
    );
    return (
      <section style={styles.outerContainer}>
        <h6 style={{textAlign: 'center'}}>Done: </h6>
        <DoneItemsDropArea style={styles.dropTarget}>
          {!isEmpty(items) &&
            doneItemIds.map(id => (
              <DoneCard
                key={items[id]}
                {...items[id]}
              />
            ))}
        </DoneItemsDropArea>
      </section>
    );
  }
}

const mapState = state => {
  return {
    currentItems: state.currentItems
  };
};

export default connect(mapState)(DoneItemsArea);
