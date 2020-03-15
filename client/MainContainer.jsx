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
    border: "1px solid blue"
  },
  bottomContainer: {
    height: '55%',
    border: "1px solid yellow"
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
