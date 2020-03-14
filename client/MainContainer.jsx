import React from "react";
import MainMenu from "./components/MainMenu";
import MeetingArea from "./components/MeetingArea/index";

const styles = {
  outerContainer: {
    display: "flex",
    flexDirection: "column"
  },
  topContainer: {
    height: "40vh",
    border: "1px solid blue"
  },
  bottomContainer: {
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
