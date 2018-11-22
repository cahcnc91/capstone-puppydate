import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getProfiles } from "../../actions/profileActions";
import ProfileItem from "./ProfileItem";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    const { user } = this.props.auth;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else if (profiles.length > 0) {
      let filteredArray = profiles.filter(profile => {
        return profile.user._id !== user.id;
      });

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
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
