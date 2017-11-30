//@flow
import { Component } from "react";
import ReactDOM from "react-dom";
import "./Bubble.css";

type Props = {
  isOpen: boolean,
  anchorEl: ?Element,
  onRequestClose: Function,
  children: string | React$Node
};

// TODO we need to have a max-height and scroll because on big select, it will go off screen (see Settings screen)
export default class Bubble extends Component<Props, {}> {
  bubbleWrap: Element = document.createElement("div");
  bubble: Element = document.createElement("div");
  Voffset = 20;

  componentDidMount() {
    const { onRequestClose } = this.props;
    this.bubbleWrap.className = "bubbleWrap";
    this.bubbleWrap.onclick = onRequestClose;
    this.bubble.className = "bubble";
    this.bubbleWrap.appendChild(this.bubble);
  }

  componentWillUnmount() {
    this.hide();
  }

  componentDidUpdate() {
    const { isOpen, anchorEl } = this.props;
    console.log(this.props);
    if (anchorEl) {
      console.log(anchorEl.getBoundingClientRect());
      const { top, left, height } = anchorEl.getBoundingClientRect();
      this.bubble.style.top = top + height + this.Voffset + "px";
      this.bubble.style.left = left + "px";
    }
    if (isOpen) this.display();
    else this.hide();
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.bubble);
  }

  display = () => {
    if (document.body) {
      document.body.appendChild(this.bubbleWrap);
    }
  };
  hide = () => {
    if (document.body && document.body.contains(this.bubbleWrap)) {
      document.body.removeChild(this.bubbleWrap);
    }
  };
}
