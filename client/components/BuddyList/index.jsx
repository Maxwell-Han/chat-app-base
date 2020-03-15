import React from "react";
import { connect } from "react-redux";

const styles = {
  itemContainer: {
    display: "flex",
    justifyContent: "space-between"
  }
};
const BuddyList = props => {
  const { buddies, onlineBuddies } = props;
  return (
    <section>
      <h6>Friends</h6>
      <div>
        {Object.keys(buddies).length > 0 &&
          Object.keys(buddies).map(id => (
            <BuddyListItem buddy={buddies[id]} key={id} />
          ))}
      </div>
    </section>
  );
};

const DiscBuddyListItem = props => {
  const { buddy, onlineBuddies } = props;
  return (
    <div style={styles.itemContainer}>
      <p>{buddy.userName}</p>
      {onlineBuddies.includes(buddy._id) ? (
        <i className="ri-chat-smile-3-line"></i>
      ) : (
        <i className="ri-chat-off-line"></i>
      )}
    </div>
  );
};

const mapState = state => {
  return {
    buddies: state.buddies,
    onlineBuddies: state.onlineBuddies
  };
};
const BuddyListItem = connect(mapState)(DiscBuddyListItem);
export default connect(mapState)(BuddyList);
