import React, { Component } from "react";
import PropTypes from "prop-types";
import CircularProgress from "material-ui/CircularProgress";
import { Link } from "react-router-dom";
import _ from "lodash";
import { PopBubble, Profile } from "../../components";
import { BlurDialog } from "../../containers";
import ProfileIcon from "../icons/thin/Profile";

import "./ActionBar.css";

class ActionBar extends Component {
  openProfileMenu = event => {
    // This prevents ghost click.
    event.preventDefault();
    this.props.openCloseProfile(
      event.currentTarget.querySelector(".profile-pic")
    );
  };

  openProfileDialog = event => {
    event.preventDefault();
    this.props.openCloseProfile(this.props.profile.target);
    this.props.openCloseEdit();
  };

  render() {
    let profileCard;
    let profileDialog = "";

    const t = this.context.translate;

    const profile = this.props.profile.user;

    if (!_.isEmpty(profile)) {
      // Displayed when profile is loaded

      profileCard = (
        <a
          href="profile"
          className="profile-card"
          onClick={this.openProfileMenu}
        >
          <div className="profile-pic">
            {profile.picture ? (
              <img src={profile.picture} alt="" />
            ) : (
              <ProfileIcon className="profile-default-icon" color="white" />
            )}
          </div>
          <div className="profile-info">
            <div className="profile-name">{`${profile.first_name} ${profile.last_name}`}</div>
            <div className="profile-view-profile">
              {t("actionBar.viewProfile")}
            </div>
          </div>
        </a>
      );

      profileDialog = (
        <BlurDialog
          open={this.props.profile.openEdit}
          onRequestClose={this.props.openCloseEdit}
        >
          <Profile
            profile={profile}
            close={this.props.openCloseEdit}
            save={this.props.saveProfile}
          />
        </BlurDialog>
      );
    } else {
      // Displayed while profile is loading
      profileCard = (
        <div className="profile-card">
          <CircularProgress />
        </div>
      );
    }

    return (
      <div className="ActionBar">
        {profileCard}
        <PopBubble
          open={this.props.profile.open}
          anchorEl={this.props.profile.target}
          onRequestClose={this.props.openCloseProfile}
          style={{
            marginLeft: "50px",
            boxShadow:
              "0 0 5px 0 rgba(0, 0, 0, 0.04), 0 10px 10px 0 rgba(0, 0, 0, 0.04)"
          }}
        >
          <div className="profile-bubble">
            <a
              href="profile"
              onClick={this.openProfileDialog}
              className="edit-profile"
            >
              {t("actionBar.editProfile")}
            </a>
            <Link to="/logout" className="log-out">
              {t("actionBar.logOut")}
            </Link>
          </div>
        </PopBubble>
        {profileDialog}
        <div className="content-header">
          <div className="content-header-left">
            <img
              src="/img/logo.png"
              srcSet="/img/logo@2x.png 2x, /img/logo@3x.png 3x"
              className="content-header-logo"
              alt="Ledger Vault logo"
            />
          </div>
          <div className="content-header-right">
            {this.props.pathname === "/" ? (
              <Link
                to=""
                onClick={this.props.openAccount}
                className="content-header-button"
              >
                <div className="content-header-button-icon">
                  <i className="material-icons flipped">add</i>
                </div>
                <div className="content-header-button-text">account</div>
              </Link>
            ) : (
              false
            )}
            <Link to="/export" className="content-header-button">
              <div className="content-header-button-icon">
                <i className="material-icons flipped">reply</i>
              </div>
              <div className="content-header-button-text">
                {t("actionBar.export")}
              </div>
            </Link>
            <Link to="/settings" className="content-header-button">
              <div className="content-header-button-icon">
                <i className="material-icons">settings</i>
              </div>
              <div className="content-header-button-text">
                {t("actionBar.settings")}
              </div>
            </Link>
            <Link to="/activity" className="content-header-button">
              <div className="content-header-button-icon">
                <i className="material-icons">notifications</i>
              </div>
              <div className="content-header-button-text">
                {t("actionBar.activity")}
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

ActionBar.propTypes = {
  profile: PropTypes.shape({
    user: PropTypes.shape({}),
    target: PropTypes.object,
    open: PropTypes.bool,
    openEdit: PropTypes.bool
  }).isRequired,
  openCloseProfile: PropTypes.func.isRequired,
  openCloseEdit: PropTypes.func.isRequired,
  saveProfile: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  openAccount: PropTypes.func.isRequired
};

ActionBar.contextTypes = {
  translate: PropTypes.func.isRequired
};

export default ActionBar;
