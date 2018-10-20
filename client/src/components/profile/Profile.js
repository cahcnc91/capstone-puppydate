import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import puppies4 from "../../img/puppies4.jpg";

class OwnProfile extends Component {
  render() {
    const profile = this.props.profile;
    const user = this.props.user;

    return (
      <div className="dashboard mt-4">
        <div className="container-fluid">
          <div className="row text-center">
            <div className="col-md-12 main">
              <div className="row first-row">
                <div className="col-10 main-dash">
                  <div className="col-10">
                    <div className="card card-body bg-light mb-3">
                      <div className="row">
                        <div className="col-4">
                          {/*   IMAGES STILL FIGURING IT OUT?! */}
                          <img src={puppies4} alt="puppy" />

                          <p>Sex: {profile.sex}</p>
                          <p>Location: {profile.location}</p>
                          <p>Breed: {profile.breed}</p>
                          <p>Age: {profile.age}</p>
                          <p>Size: {profile.size}</p>
                          <p>Lives at: {profile.location}</p>
                          <p>Owner: {profile.user.name}</p>
                        </div>
                        <div className="col-5">
                          <div className="card-body">
                            <h3>Meet {profile.puppyname}</h3>
                            <p>{profile.description}</p>
                            <p>
                              <ion-icon size="large" name="paw" />
                            </p>
                          </div>
                        </div>
                        <div className="col-3 d-none d-lg-block">
                          <div>
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

                          <div className="medias">
                            <a href={profile.youtube}>
                              <ion-icon size="large" name="logo-youtube" />
                            </a>
                            <a href={profile.instagram}>
                              <ion-icon size="large" name="logo-instagram" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-2">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Chats</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>John</td>
                      </tr>
                      <tr>
                        <td>Mary</td>
                      </tr>
                      <tr>
                        <td>July</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null)(OwnProfile);
