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
    console.log(this.state.match);

    this.setState({ match: "" });
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
              <div className="row">
                <form onSubmit={this.handleSubmit}>
                  <input
                    className="btn btn-lg button-customized button-match-pair"
                    onChange={this.handleMatch}
                    type='submit'
                  />
                    <ion-icon size="large" name="heart" />
                </form>
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
