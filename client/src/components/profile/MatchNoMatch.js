import React, { Component } from "react";
import PropTypes from "prop-types";

class MatchNoMatch extends Component {
  
  render() {
    const { match, profile } = this.props;

    let matchContent;

    if (match.length === 0) {
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
    } else {
      matchContent = (
        <div>test</div>
      )
    }

    return <div>{matchContent}</div>;
  }
}

MatchNoMatch.propTypes = {
  profile: PropTypes.object.isRequired,
  match: PropTypes.array.isrequired
};

export default MatchNoMatch;
