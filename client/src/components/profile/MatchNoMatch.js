import React, { Component } from "react";
import PropTypes from "prop-types";

class MatchNoMatch extends Component {
  render() {
    const { match, profile, reverseMatch } = this.props;

    let matchContent;

    if (match && reverseMatch) {
      if (match.match === "true" && reverseMatch.match === "true") {
        matchContent = (
          <div className="row mb-4">
            <div className="col-md-12 text-center">
              <h3>{profile.user.puppyname} and you are matched! </h3>
            </div>
          </div>
        );
      } else if (match.match === "false") {
        matchContent = (
          <div className="row mb-4">
            <div className="col-md-12 text-center">
              <h3>You choose not to connect with {profile.user.puppyname}</h3>
            </div>
          </div>
        );
      } else {
        matchContent = (
          <div className="row mb-4">
            <div className="col-md-12 text-center">
              <h3>
                {profile.user.puppyname} and you are not a match. Match with
                someone else!
              </h3>
            </div>
          </div>
        );
      }
    } else if (match) {
      if (match.match === "true") {
        matchContent = (
          <div className="row mb-4">
            <div className="col-md-12 text-center">
              <h3>
                {" "}
                You are not match yet. Wait until {profile.user.puppyname}{" "}
                responds.
              </h3>
            </div>
          </div>
        );
      } else {
        matchContent = (
          <div className="row mb-4">
            <div className="col-md-12 text-center">
              <h3> You chose not to match with {profile.user.puppyname}</h3>
            </div>
          </div>
        );
      }
    } else {
      matchContent = (
        <div className="row mb-4">
          <div className="col-md-12 text-center">
            <button
              className="btn button-customized button-match-pair"
              onClick={e => this.props.handleMatch(e)}
            >
              <ion-icon size="large" name="heart" />
            </button>
            <button
              className="btn button-nomatch button-match-pair"
              onClick={e => this.props.handleNoMatch(e)}
            >
              <ion-icon size="large" name="close" />
            </button>
          </div>
        </div>
      );
    }

    return <div>{matchContent}</div>;
  }
}

MatchNoMatch.propTypes = {
  profile: PropTypes.object.isRequired
};

export default MatchNoMatch;
