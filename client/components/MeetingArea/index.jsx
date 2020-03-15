import React from 'react'
import MeetingItems from '../MeetingItems'
import MeetingFocusArea from '../MeetingFocusArea'

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
      <MeetingFocusArea />
    </section>
  );
}

export default MeetingArea;
