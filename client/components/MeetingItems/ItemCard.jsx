import React from "react";
import { Card } from "shards-react";

const styles ={
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: '35% 35% 30%',
    alignItems: 'center',
    justifyItems: 'start',
    height: 55,
    padding: 5
  }
}

const ItemCard = props => {
  return (
    <Card small style={styles.cardContainer}>
      <p>{props.itemName}</p>
      <p>{props.itemStatus}</p>
      <p>{props.decision}</p>
    </Card>
  );
};

export default ItemCard;
