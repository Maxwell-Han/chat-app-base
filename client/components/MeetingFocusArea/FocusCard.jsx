import React from "react";
import { Card } from "shards-react";
import { ItemTypes } from "../../constants";
import { useDrag } from "react-dnd";
import Vote from "./Vote";
import Score from "./Score";

const styles = {
  cardContainer: {
    height: "100%",
    fontSize: "0.7rem"
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "auto auto auto",
    alignItems: "center",
    justifyItems: "start",
    padding: 5
  },
  divContainer: {
    height: "100%"
  }
};

const FocusCard = props => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, cardContent: { ...props } },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        // props.handleDrop()
        // console.log('item is ', item)
        // alert('you dropped ', item)
      }
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });

  return (
    <div ref={drag} style={styles.divContainer}>
      <Card small style={styles.cardContainer} opacity={isDragging ? 0.5 : 1}>
        <h6 style={{textAlign: 'center'}}>{props.name}</h6>
        <section style={styles.cardGrid}>
          <div>
            <p>Description: {props.description}</p>
            <p>Item status: {props.status}</p>
          </div>
          <div>
            <h6>Votes</h6>
            <Vote />
          </div>
          <div>
            <h6>Score</h6>
            <Score />
          </div>
        </section>
      </Card>
    </div>
  );
};

export default FocusCard;
