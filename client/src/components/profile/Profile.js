import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import puppies4 from "../../img/puppies4.jpg";

class OwnProfile extends Component {
  render() {
    const profile = this.props.profile;
    const user = this.props.user;

    return (
      <div className="dashboard">
        <div className="container-fluid">
          <div className="row text-center">
            <div className="col-md-12 main">
              <h3>Welcome, {user.name}!</h3>
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
                          <a href="profile.html" className="btn btn-info">
                            View Pics
                          </a>
                        </div>
                        <div className="col-5">
                          <div className="card-body">
                            <h3>Meet Luna</h3>
                            <p>{profile.description}</p>
                            <p>
                              <ion-icon size="large" name="paw" />
                            </p>
                          </div>
                        </div>
                        <div className="col-3 d-none d-lg-block">
                          <h4>Qualities</h4>
                          <ul className="list-group">
                            <li className="list-group-item">
                              <i className="fa fa-check pr-1" />
                              HTML
                            </li>
                            <li className="list-group-item">
                              <i className="fa fa-check pr-1" />
                              CSS
                            </li>
                            <li className="list-group-item">
                              <i className="fa fa-check pr-1" />
                              Python
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-2">
                  <table className="table table-striped side-chat">
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
