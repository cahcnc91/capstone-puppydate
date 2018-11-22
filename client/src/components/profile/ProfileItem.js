import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="col-10 mb-4">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-3">
              <img
                src={profile.user.avatar}
                alt=""
                className="rounded-circle img-fluid"
              />
            </div>

            <div className="col-6">
              <h3>{profile.user.puppyname}</h3>
              <p>{profile.location}</p>
              <p>{profile.breed}</p>
              <p>Owner: {profile.user.name}</p>
              <Link to={`/profile/${profile.handle}`} className="btn btn-info">
                View Profile
              </Link>
            </div>

            <div className="col-3 text-center d-none d-lg-block">
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
