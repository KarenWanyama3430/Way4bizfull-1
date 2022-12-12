import React from "react";
import { css } from "@emotion/core";
import FadeLoader from "react-spinners/FadeLoader";

import "./BottomPageLoader.css";

class BottomPageLoader extends React.Component {
  state = {
    loading: true
  };

  render() {
    const override = css`
      display: block;
      margin: 0 auto;
    `;
    return (
      <div id="bottom-page-loader" className="mb-4">
        <FadeLoader
          loading={this.state.loading}
          size={40}
          css={override}
          color={"#f76b1a"}
        />
      </div>
    );
  }
}

export default BottomPageLoader;
