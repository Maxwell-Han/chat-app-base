import React, { Component } from 'react';
import ItemCard from './ItemCard'

const styles = {
  outerContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: 300,
    border: '4px solid gray',
    overflow: 'scroll'
  }
}

const dummyData =[
  {itemName: 'Florida', itemStatus: 'questionable', decision: 'pending'},
  {itemName: 'Costco', itemStatus: 'long lines', decision: 'pending'},
  {itemName: 'Wuhan', itemStatus: 'safe', decision: 'pending'},
  {itemName: 'Wu Tang Clan Bunker', itemStatus: 'safe', decision: 'pending'},
  {itemName: 'Chic Fil A', itemStatus: 'overrated', decision: 'pending'}
]

class MeetingItems extends Component {

  render() {
    return (
      <section style={styles.outerContainer}>
        {dummyData.map(data => (
          <ItemCard {...data} />
        ))}
      </section>
    );
  }
}

export default MeetingItems;
