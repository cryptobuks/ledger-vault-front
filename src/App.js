import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'open-sans-fontface/open-sans.css';
import 'material-design-icons/iconfont/material-icons.css';

import Header from './Header';
import Content from './Content';
import Menu from './Menu';
import './App.css';

// Set blur status to root element on dispatch
const mapStateToProps = state => ({ blurredBG: state.blurBG.blurredBG > 0 });

// Required by Material-UI
injectTapEventPlugin();

function App(props) {
  return (
    <div className={`App ${props.blurredBG ? 'blurred' : ''}`}>
      <Header />
      <div className="Main">
        <Menu />
        <Content />
      </div>
    </div>
  );
}

App.propTypes = {
  blurredBG: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(App);
