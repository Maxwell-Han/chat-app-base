import React from "react";
import { Card } from 'antd';
import { ItemTypes } from "../../constants";
import { useDrag } from "react-dnd";

const styles = {
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "35% 35% 30%",
    alignItems: "center",
    justifyItems: "start",
    padding: 5,
    height: 45,
    fontSize: '0.7rem'
  },
  divContainer: {
    height: 55
  }
};

const ItemCard = props => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, cardContent: {...props} },
    // end: (item, monitor) => {
    //   const dropResult = monitor.getDropResult()
    //   if(item && dropResult) {
    //     props.handleDrop()
    //     // console.log('item is ', item)
    //     // alert('you dropped ', item)
    //   }
    // },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });

  return (
    <div ref={drag} style={styles.divContainer}>
      <Card>
        <p>{props.name}</p>
        <p>{props.description}</p>
        <p>{props.status}</p>
      </Card>
    </div>
  );
};

export default ItemCard;
