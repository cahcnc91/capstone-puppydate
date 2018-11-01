import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfileByHandle } from "../../actions/profileActions";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import puppies4 from "../../img/puppies4.jpg";
import axios from "axios";

class ProfileIndividual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      match: ""
    };

    this.handleMatch = this.handleMatch.bind(this);
    this.handleNoMatch = this.handleNoMatch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/not-found");
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.match === true || this.state.match === false) {
      this.handleSubmit();
    }
  }

  handleMatch(e) {
    e.preventDefault();
    this.setState({ match: true });
  }

  handleNoMatch(e, handleSubmit) {
    e.preventDefault();
    this.setState({ match: false });
  }

  handleSubmit() {
    const { profile } = this.props;
    const { user } = this.props.auth;

    const match = {
      user: user.id,
      userName: user.name,
      match: this.state.match,
      userMatch: profile.profile.user._id,
      nameUserMatch: profile.profile.user.name
    };

    axios
      .post("/api/match", match)
      .then(res => {
        res.json(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    this.setState({ match: "" });
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <Link to="/profiles" className="btn btn-light mb-3">
            Back to profiles
          </Link>
          <div className="text-center">
            <div className="col-12">
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

              <div className="row content">
                <div className="col-12 text-center">
                  <button
                    className="btn btn-lg button-customized button-match-pair"
                    onClick={this.handleMatch}
                  >
                    <ion-icon size="large" name="heart" />
                  </button>
                  <button
                    className="btn btn-lg button-nomatch button-match-pair"
                    onClick={this.handleNoMatch}
                  >
                    <ion-icon size="large" name="close" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return <div>{profileContent}</div>;
  }
}

ProfileIndividual.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(ProfileIndividual);
