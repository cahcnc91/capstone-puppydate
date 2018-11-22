import React, { Component } from "react";
import { connect } from "react-redux";

class Profile extends Component {
  render() {
    const { profile, user } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-md-3">
            <img
              className="img-thumbnail"
              src={profile.user.avatar}
              alt="avatar"
            />
            <p>Sex: {profile.sex}</p>
            <p>Location: {profile.location}</p>
            <p>Breed: {profile.breed}</p>
            <p>Age: {profile.age}</p>
            <p>Size: {profile.size}</p>
            <p>Lives at: {profile.location}</p>
            <p>Owner: {profile.user.name}</p>
          </div>

          <div className="col-md-6">
            <h3>Meet {user.puppyname}</h3>
            <p>{profile.description}</p>
            <p>
              <ion-icon size="large" name="paw" />
            </p>
          </div>

          <div className="col-md-3">
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

            <div className="mt-4">
              <a
                href={profile.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ion-icon size="large" name="logo-youtube" />
              </a>
              <a
                href={profile.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ion-icon size="large" name="logo-instagram" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null)(Profile);
