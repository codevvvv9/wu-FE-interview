'use strict';

import React from "react";
import ReachDOM from "react-dom";
import "./search.less";

class Search extends React.Component {

  render() {
    return <div className='search-text'>Search Text</div>
  }
}

ReachDOM.render(
  <Search />,
  document.getElementById("root")
)