import React, { Component } from 'react';


const styles = {
  outerContainer: {
    border: '4px solid blue',
    width: '100%'
  },
  focusSection: {
    border: '3px light blue',
    backgroundColor: 'aliceblue',
    width: '80%',
    height: '80%',
    margin: '0 auto'
  }
}
class MeetingItems extends Component {

  render() {
    return (
      <section style={styles.outerContainer}>
        <h6>Current Discussion Item</h6>
        <section style={styles.focusSection}>

        </section>
      </section>
    );
  }
}

export default MeetingItems;
