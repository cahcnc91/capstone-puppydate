import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import puppies4 from "../../img/puppies4.jpg";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="container col-8">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-2">
              <img src={puppies4} alt="puppy" className="rounded-circle" />
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{profile.puppyname}</h3>
              <p>{profile.location}</p>
              <p>{profile.breed}</p>
              <Link to={`/profile/${profile.handle}`} className="btn btn-info">
                View Profile
              </Link>
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
  profile: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default ProfileItem;
