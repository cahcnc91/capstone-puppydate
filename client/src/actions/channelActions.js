import axios from "axios";

import {
  GET_ERRORS,
  CREATE_CHANNEL_SUCCESS,
  GET_ALL_CHANNELS_FOR_USER
} from "./types";

export const createChannel = channelName => dispatch => {
  axios
    .post("./api/channels/create", channelName)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: CREATE_CHANNEL_SUCCESS,
        payload: [res.data]
      });
    })
    .catch(err =>
      //   dispatch({
      //     type: GET_ERRORS,
      //     payload: err.response.data
      //   })
      console.log(err)
    );
};

export const getChannelsUser = () => dispatch => {
  axios
    .get("./api/channels/allchannels")
    .then(res => {
      console.log(res);
      dispatch({
        type: GET_ALL_CHANNELS_FOR_USER,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
