import React from "react";
import MainMenu from "./components/MainMenu";
import MeetingArea from "./components/MeetingArea/index";

const styles = {
  outerContainer: {
    display: "flex",
    flexDirection: "column",
    height: '95vh'
  },
  topContainer: {
    height: "45%",
    border: '1px solid lightgray',
    borderRadius: '6px'
  },
  bottomContainer: {
    height: '55%'
  }
};

const MainContainer = () => {
  return (
    <section style={styles.outerContainer}>
      <div style={styles.topContainer}>
        <MeetingArea />
      </div>
      <div style={styles.bottomContainer}>
        <MainMenu />
      </div>
    </section>
  );
};

export default MainContainer;
