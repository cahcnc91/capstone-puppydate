import axios from "axios";

import { GET_ERRORS, ADD_NEW_MEMBER_FORUM_SUCCESS } from "./types";

export const addMemberForum = () => dispatch => {
  axios
    .post("./api/forums/create")
    .then(res =>
      dispatch({
        type: ADD_NEW_MEMBER_FORUM_SUCCESS,
        payload: res.data
      })
    )
    .catch(err =>
      //   dispatch({
      //     type: GET_ERRORS,
      //     payload: err.response.data
      //   })
      console.log(err)
    );
};
