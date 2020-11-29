"use strict";

import React from "react";
import ReachDOM from "react-dom";
import "./search.less";
import bg from "./images/bg.jpg";
class Search extends React.Component {
  render() {
    return (
      <div className="search-text">
        我是搜索
        <img src={bg} />
      </div>
    );
  }
}

ReachDOM.render(<Search />, document.getElementById("root"));
