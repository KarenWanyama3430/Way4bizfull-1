import React from "react";
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";

import "./ScreenLoader.css";

class ScreenLoader extends React.Component {
  state = {
    loading: true,
  };

  render() {
    const override = css`
      display: block;
      margin: 0 auto;
    `;
    return (
      <div id="full-screen-loader">
        <HashLoader
          loading={this.state.loading}
          size={40}
          css={override}
          color={"#f76b1a"}
        />
      </div>
    );
  }
}

export default ScreenLoader;
