import React from "react";
import { connect } from "react-redux";

const styles = {
  itemContainer: {
    display: "flex",
    justifyContent: "space-between",
    borderRadius: '6px',
    paddingLeft: 5,
    paddingRight: 5,
    border: '1px solid #c7c7c7',
    height: '2rem'
  }
};
const BuddyList = props => {
  const { buddies, onlineBuddies } = props;
  const buddyIds = Object.keys(buddies).filter(id => id !== props.userId) || []
  return (
    <section>
      <h6>Friends</h6>
      <div>
        {Object.keys(buddies).length > 0 &&
          buddyIds.map(id => (
            <BuddyListItem buddy={buddies[id]} key={id} />
          ))}
      </div>
    </section>
  );
};

const DiscBuddyListItem = props => {
  const { buddy, onlineBuddies } = props;
  return (
    <div small style={styles.itemContainer}>
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
    userId: state.user._id,
    buddies: state.buddies,
    onlineBuddies: state.onlineBuddies
  };
};
const BuddyListItem = connect(mapState)(DiscBuddyListItem);
export default connect(mapState)(BuddyList);
