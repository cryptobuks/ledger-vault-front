//@flow
import React, { Component } from "react";
import "./Bubble.css";
import ReactDOM from "react-dom";


const RenderInBody = React.createClass({

  componentDidMount() {
    this.popup = document.createElement("div");
    document.body.appendChild(this.popup);
    this._renderLayer();
  },


  componentDidUpdate() {
    this._renderLayer();
  },


  componentWillUnmount() {
    React.unmountComponentAtNode(this.popup);
    document.body.removeChild(this.popup);
  },


  _renderLayer() {
    React.render(this.props.children, this.popup);
  }

  render() {
    // Render a placeholder
    return React.DOM.div(this.props);
  }

});










type Props = {
  isOpen: boolean,
  anchorEl: ?Element,
  onRequestClose: Function,
  children: string | React$Node
};

// TODO we need to have a max-height and scroll because on big select, it will go off screen (see Settings screen)
export default class Bubble extends Component<Props, {}> {
  display = () => {
    const { isOpen, children } = this.props;
    const bubble = (
      <div className="bubbleWrap">
        <div
          className={`bubble ${isOpen ? "show" : "hide"}`}
          style={{
            boxShadow:
              "0 0 5px 0 rgba(0, 0, 0, 0.04), 0 10px 10px 0 rgba(0, 0, 0, 0.04)",
            padding: "20px",
            fontSize: "11px",
            textAlign: "right"
          }}
        >
          {children}
        </div>
      </div>
    );

    if (document.body) {
      document.body.appendChild(React.createElement(bubble));
    }
  };
  hide = () => {};
  componentDidUpdate() {
    const { isOpen } = this.props;
    if (isOpen) this.display();
    else this.hide();
  }

  render() {
    return <div />;
  }
}
