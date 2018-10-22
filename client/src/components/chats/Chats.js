import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ChatForm from "./ChatForm";
import Spinner from "../common/Spinner";

class Chats extends Component {
  render() {
    return (
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
          </tbody>
        </table>
      </div>
    );
  }
}

export default Chats;
