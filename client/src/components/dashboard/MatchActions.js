import React from "react";
import { Link } from "react-router-dom";

const MatchActions = () => {
  return (
    <div className="row content">
      <div className="col-10">
        <div className="col-10 text-center">
          <Link
            className="btn btn-lg button-customized button-match-pair"
            to="/match"
          >
            <ion-icon size="large" name="heart" />
          </Link>
          <Link
            className="btn btn-lg button-nomatch button-match-pair"
            to="/no-match"
          >
            <ion-icon size="large" name="close" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MatchActions;
