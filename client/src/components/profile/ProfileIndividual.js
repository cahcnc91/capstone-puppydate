import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfileByHandle } from "../../actions/profileActions";
import {
  getMatchByHandle,
  getReverseMatchByHandle
} from "../../actions/matchActions";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import MatchNoMatch from "./MatchNoMatch";
import axios from "axios";

class ProfileIndividual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matched: ""
    };

    this.handleMatch = this.handleMatch.bind(this);
    this.handleNoMatch = this.handleNoMatch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
      this.props.getMatchByHandle(this.props.match.params.handle);
      this.props.getReverseMatchByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/not-found");
    }
  }

  componentDidUpdate() {
    if (this.state.matched === true || this.state.matched === false) {
      this.handleSubmit();
      this.props.getMatchByHandle(this.props.match.params.handle);
      this.props.getReverseMatchByHandle(this.props.match.params.handle);
    }
  }

  handleMatch(e) {
    e.preventDefault();
    this.setState({ matched: true });
  }

  handleNoMatch(e) {
    e.preventDefault();
    this.setState({ matched: false });
  }

  handleSubmit() {
    const { profile } = this.props;
    const { user } = this.props.auth;

    const match = {
      user: user.id,
      userName: user.puppyname,
      match: this.state.matched,
      userMatch: profile.profile.user._id,
      nameUserMatch: profile.profile.user.puppyname
    };

    axios

      .post("/api/match", match)
      .then(res => {
        res.json({ response: "success!" });
      })
      .catch(err => {
        console.log(err);
      });

    this.setState({ matched: "" });
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;
    const { match, reverseMatch } = this.props.matches;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="row">
                <Link to="/profiles" className="btn btn-light mb-3">
                  Back to profiles
                </Link>
              </div>

              <div className="row text-center">
                <div className="card card-body bg-light mb-3">
                  <div className="row">
                    <div className="col-md-3">
                      <img
                        className="img-thumbnail"
                        src={profile.user.avatar}
                        alt="user-avatar"
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
                      <h3>Meet {profile.user.puppyname}</h3>
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
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="container-for-all-components">
        <div className="mt-4">{profileContent}</div>
        <MatchNoMatch
          profile={profile}
          match={match}
          reverseMatch={reverseMatch}
          handleMatch={e => this.handleMatch(e)}
          handleNoMatch={e => this.handleNoMatch(e)}
        />
      </div>
    );
  }
}

ProfileIndividual.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  getMatchByHandle: PropTypes.func.isRequired,
  getReverseMatchByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  matches: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  matches: state.matches
});

export default connect(
  mapStateToProps,
  { getProfileByHandle, getMatchByHandle, getReverseMatchByHandle }
)(ProfileIndividual);
