import axios from "axios";

import {
  GET_MATCH
} from "./types";


//Get profile by handle
export const getMatchByHandle = handle => dispatch => {
  axios
    .get(`/api/match/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_MATCH,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_MATCH,
        payload: null
      })
    );
};