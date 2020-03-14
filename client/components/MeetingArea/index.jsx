import React from 'react'
import MeetingItems from '../MeetingItems'
import MeetingFocus from '../MeetingFocus'

const styles = {
  container: {
    display: 'flex',
    height: '100%'
  }
}

const MeetingArea = () => {
  return (
    <section style={styles.container}>
      <MeetingItems />
      <MeetingFocus />
    </section>
  );
}

export default MeetingArea;
