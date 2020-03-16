import React from 'react'
import MeetingItems from '../MeetingItems'
import MeetingFocusArea from '../MeetingFocusArea'
import DoneItemsArea from '../DoneItemsArea'

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
      <DoneItemsArea />
    </section>
  );
}

export default MeetingArea;
