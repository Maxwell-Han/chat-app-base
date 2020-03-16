import React, { Component } from "react";
import ItemCard from "./ItemCard";
import ItemListDropArea from './ItemListDropArea'
import { connect } from "react-redux";

const styles = {
  outerContainer: {
    display: "flex",
    flexDirection: "column",
    width: 300,
    overflowY: "scroll"
  }
};

function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

class MeetingItems extends Component {
  testingDrop = id => {
    console.log("testing passing method into ItemCard props");
  };
  render() {
    const { currentItems: items } = this.props
    const nonFocusItemId = Object.keys(items).filter(
      id => items[id].inFocus === false && items[id].status === 'open'
    );
    return (
      <ItemListDropArea>
      <section style={styles.outerContainer}>
        {!isEmpty(items) && nonFocusItemId.map(id => (
          <ItemCard
            key={items[id]._id}
            {...items[id]}
            handleDrop={() => this.testingDrop()}
          />
        ))}
      </section>
      </ItemListDropArea>
    );
  }
}

const mapState = state => {
  return {
    currentItems: state.currentItems
  };
};

export default connect(mapState)(MeetingItems);
