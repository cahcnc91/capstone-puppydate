import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import ProfileItem from "./ProfileItem";

class Profiles extends Component {
  render() {
    const { profiles, loading } = this.props.profile;
    const { user } = this.props.auth;
    let profileItems;
    const filteredArray = Object.values(profiles).filter(profile => {
      return profile.user._id !== user.id;
    });

    if (filteredArray === null || loading) {
      profileItems = <Spinner />;
    } else if (filteredArray.length > 0) {
      profileItems = filteredArray.map(profile => (
        <ProfileItem key={profile._id} profile={profile} />
      ));
    } else {
      profileItems = <h4> No profiles found...</h4>;
    }

    return (
      <div className="container">
        <h1 className="display-4 text-center">Puppies Profiles</h1>
        <p className="lead text-center">Find and connect with other puppies</p>
        <div className="row justify-content-center">{profileItems}</div>
      </div>
    );
  }
}

Profiles.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps)(Profiles);
