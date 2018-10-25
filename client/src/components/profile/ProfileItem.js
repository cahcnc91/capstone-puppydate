import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";

class ProfileItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      match: false
    };

    this.handleMatch = this.handleMatch.bind(this);
    this.handleNoMatch = this.handleNoMatch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    this.handleSubmit();
  }

  handleMatch(e) {
    e.preventDefault();
    this.setState({ match: true });
  }

  handleNoMatch(e) {
    e.preventDefault();
    this.setState({ match: false });
  }

  handleSubmit() {
    const { profile, user } = this.props;

    const match = {
      user: user.id,
      match: this.state.match,
      userMatch: profile.user._id
    };

    axios
      .post("/api/match", match)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { profile } = this.props;

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
              <p>{this.state.match}</p>
              <div className="row">
                <button
                  className="btn button-customized button-match-pair"
                  onClick={this.handleMatch}
                >
                  <ion-icon name="heart" />
                </button>
                <button
                  className="btn button-nomatch button-match-pair"
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
