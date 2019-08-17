import React, { Component } from "react";
import PropTypes from "prop-types";

class MatchNoMatch extends Component {
  
  render() {
    const { match, profile, user} = this.props;
    console.log(match)
    console.log(user)

    let matchContent;

    if (match.matchOneId === user.id && match.matchTwo === 1){
      matchContent = (
          <div className="row mb-4">
            <div className="col-md-12 text-center">
              <h3> You are not match yet. Wait until {profile.user.puppyname}{" "}
                responds.</h3>
            </div>
          </div>
      )
    } else if (match.matchOne === 3 || match.matchTwo === 3) {
      matchContent = (
        <div className="row mb-4">
            <div className="col-md-12 text-center">
              <h3> No match</h3>
            </div>
        </div>
      )
    } else if (match.matchTwo === 2 && match.matchOne === 2){
      matchContent = (
        <div className="row mb-4">
            <div className="col-md-12 text-center">
              <h3>{profile.user.puppyname} and you are matched! </h3>
            </div>
        </div>
      )
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
      )
    }

    return <div>{matchContent}</div>;
  }
}

MatchNoMatch.propTypes = {
  profile: PropTypes.object.isRequired,
  match: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
};

export default MatchNoMatch;
