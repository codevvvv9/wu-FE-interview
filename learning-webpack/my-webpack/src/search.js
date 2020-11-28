"use strict";

import React from "react";
import ReachDOM from "react-dom";
import "./search.less";
import bg from "./images/bg.jpg";
class Search extends React.Component {
  render() {
    return (
      <div className="search-text">
        Search Text Text
        <img src={bg} />
      </div>
    );
  }
}

ReachDOM.render(<Search />, document.getElementById("root"));
