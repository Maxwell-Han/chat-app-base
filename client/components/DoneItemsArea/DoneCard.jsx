import React from "react";
import { Card } from "shards-react";
import { ItemTypes } from "../../constants";
import { useDrag } from "react-dnd";

const styles = {
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "65% 35%",
    alignItems: "center",
    justifyItems: "start",
    padding: 2,
    height: 45,
    fontSize: '0.7rem'
  },
  divContainer: {
    height: 55
  },
  para: {
    margin: '0 auto'
  }
};

const DoneCard = props => {
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
      <Card small style={styles.cardContainer} opacity={isDragging ? 0.5 : 1}>
        <p style={styles.para}>{props.name}</p>
        <p style={styles.para}>{props.status}</p>
      </Card>
    </div>
  );
};

export default DoneCard;
