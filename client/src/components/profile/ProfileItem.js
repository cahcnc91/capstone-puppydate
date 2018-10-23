import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";
import axios from "axios";

class ProfileItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      match: "empty"
    };

    this.handleMatch = this.handleMatch.bind(this);
    this.handleNoMatch = this.handleNoMatch.bind(this);
  }

  handleMatch(e) {
    e.preventDefault();
    this.setState({ match: "positive" });
    this.handleSubmit();
  }

  handleNoMatch(e) {
    e.preventDefault();
    this.setState({ match: "negative" });
    this.handleSubmit();
  }

  handleSubmit() {
    console.log(this.state.match);
    const match = {
      user: user.id,
      match: this.state.match,
      userMatch: profile.id
    };
    console.log(match);
  }

  render() {
    const { profile, user } = this.props;

    return (
      <div className="container col-8">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-2">
              <img
                src={profile.user.avatar}
                alt=""
                className="rounded-circle"
              />
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{profile.puppyname}</h3>
              <p>{profile.location}</p>
              <p>{profile.breed}</p>
              <Link to={`/profile/${profile.handle}`} className="btn btn-info">
                View Profile
              </Link>
              <div className="row">
                <button
                  className="btn button-customized button-match-pair-profile-item"
                  onClick={this.handleMatch}
                >
                  <ion-icon name="heart" />
                </button>
                <button
                  className="btn button-nomatch button-match-pair-profile-item"
                  onClick={this.handleNoMatch}
                >
                  <ion-icon name="close" />
                </button>
              </div>
            </div>

            <div className="col-md-4 d-none d-md-block">
              <h4>Qualities</h4>
              <ul className="list-group">
                <li className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {profile.qualities1}
                </li>
                <li className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {profile.qualities2}
                </li>
                <li className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {profile.qualities3}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
