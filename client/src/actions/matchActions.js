import axios from "axios";

import { GET_MATCH, GET_ERRORS } from "./types";

//Get match by handle
export const getMatchByHandle = handle => dispatch => {
  axios
    .get(`/api/match/handle/match/${handle}`)
    .then(res =>
      dispatch({
        type: GET_MATCH,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    );
};

//create match
export const createMatch = match => dispatch => {
  axios
    .post("/api/match", match)
    .then(res => {
      dispatch({
        type: GET_MATCH,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
