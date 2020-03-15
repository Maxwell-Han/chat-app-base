import React, { Component } from "react";
import ItemCard from "./ItemCard";
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
    console.log('MEETING ITEMS rendering with item of ', items)
    return (
      <section style={styles.outerContainer}>
        {!isEmpty(items) && Object.keys(items).map(id => (
          <ItemCard
            key={items[id]._id}
            {...items[id]}
            handleDrop={() => this.testingDrop()}
          />
        ))}
      </section>
    );
  }
}

const mapState = state => {
  return {
    currentItems: state.currentItems
  };
};

export default connect(mapState)(MeetingItems);
