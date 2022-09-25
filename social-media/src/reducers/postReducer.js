const postReducer = (
    state = { posts: [], loading: false, error: false, uploading: false },
    action
  ) => {
    switch (action.type) {
      // in this case returns and spreads previous state and notes the uploading state as true
      case "UPLOAD_START":
        return { ...state, error: false, uploading: true };
    //returns the state, the posts will be an array and the first index is the newly made post, available from action.data and seperate previous posts
      case "UPLOAD_SUCCESS":
        return { ...state, posts: [action.data, ...state.posts], uploading: false, error: false };
    //returns previous state and makes error true
      case "UPLOAD_FAIL":
        return { ...state, posts: [], uploading: false, error: true };
      default:
        return state;
    }
  };
  
  export default postReducer;
