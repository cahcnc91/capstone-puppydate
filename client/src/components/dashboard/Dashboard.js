import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import Profiles from "../profile/Profiles";
import Profile from "../profile/Profile";
import ProfileActions from "./ProfileActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //CHECK IF LOGGED IN USER HAS PROFILE DATA
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <ProfileActions />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              <i className="fas fa-graduation-cap text-info mr-1" />
              Delete Account
            </button>
            <Profile profile={profile} user={user} />
          </div>
        );
      } else {
        //User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome, {user.name}</p>
            <p>You have not created a profile yet, please add some info</p>
            <Link
              to="/create-profile"
              className="btn btn-log button-customized"
            >
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <h1>Dashboard</h1>
          {dashboardContent}
        </div>
      </div>
    );
  }
}

Dashboard.PropTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProp = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProp,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
