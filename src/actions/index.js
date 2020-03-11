import _ from "lodash";

import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPosts = () => {
  return async function(dispatch) {
    const response = await jsonPlaceholder.get("/posts");
    dispatch({ type: "FETCH_POSTS", payload: response.data });
  };
};

export const fetchPostsAndUsers = () => {
  return async function(dispatch, getState) {
    await dispatch(fetchPosts());
    const userIds = _.uniq(_.map(getState().posts, "userId"));
    console.log(userIds);
    userIds.forEach(id => dispatch(fetchUser(id)));
  };
};

export const fetchUser = function(id) {
  return async function(dispatch) {
    const response = await jsonPlaceholder.get("/users/" + id);
    dispatch({ type: "FETCH_USER", payload: response.data });
  };
};
