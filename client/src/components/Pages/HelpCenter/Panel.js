import React from "react";
import ReactDom from "react-dom";
import "./Panel.css";
class Panel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0,
    };
  }

  componentDidMount() {
    window.setTimeout(() => {
      const el = ReactDom.findDOMNode(this);
      const height = el.querySelector(".panel__inner").scrollHeight;
      this.setState({
        height,
      });
    }, 333);
  }

  render() {
    const { label, content, activeTab, index, activateTab } = this.props;
    const { height } = this.state;
    const isActive = activeTab === index;
    const innerStyle = {
      height: `${isActive ? height : 0}px`,
    };

    return (
      <div className="panel" role="tabpanel" aria-expanded={isActive}>
        <button className="panel__label" role="tab" onClick={activateTab}>
          {label}
        </button>
        <div
          className="panel__inner"
          style={innerStyle}
          aria-hidden={!isActive}
        >
          <section className="panel__content">{content}</section>
        </div>
      </div>
    );
  }
}

export default Panel;
