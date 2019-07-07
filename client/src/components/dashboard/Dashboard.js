import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import Profile from "./Profile";
import io from "socket.io-client";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.socket = io.connect();
  }

  componentDidMount() {
    this.props.getCurrentProfile();

    if (this.props.auth.user) {
      this.socket.emit('identify', {
        user_id: this.props.auth.user.user_id,
      });

      this.socket.on('message', (data) => {
        console.log(`message ${data.message}`)
      });
    }
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
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-10">
                <div className="row">
                  <Link to="/edit-profile" className="btn btn-light">
                    <i className="fas fa-user-circle text-info mr-1" /> Edit
                    Profile
                  </Link>
                  <button
                    onClick={this.onDeleteClick.bind(this)}
                    className="btn btn-danger"
                  >
                    <i className="fas fa-graduation-cap text-info mr-1" />
                    Delete Account
                  </button>
                </div>

                <div className="row text-center mt-4">
                  <Profile profile={profile} user={user} />
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        //User is logged in but has no profile
        dashboardContent = (
          <div className="container">
            <div className="row">
              <h5 className="mt-4">
                You have not created a profile yet, please add some info.
              </h5>
            </div>
            <div className="row">
              <Link
                to="/create-profile"
                className="btn btn-log button-customized mt-4"
              >
                Create Profile
              </Link>
            </div>
          </div>
        );
      }
    }

    return (
      <Fragment>
        <h3 className="welcome mt-3">Welcome, {user.owner_name}!</h3>
        {dashboardContent}
      </Fragment>
    );
  }
}

Dashboard.propTypes = {
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
