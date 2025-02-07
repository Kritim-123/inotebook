import React from "react";
import Notes from "./Notes";

const Home = (props) => {
  return (
    <div>
      <Notes showAlert= {props.showAlert}></Notes>
    </div>
  );
};

export default Home;
