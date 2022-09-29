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

      // reducer for Posts component
      case "RETRIEVING_START":
        return { ...state, loading: true, error: false };
      case "RETRIEVING_SUCCESS":
        return { ...state, posts: action.data, loading: false, error: false };
      case "RETRIEVING_FAIL":
        return { ...state, loading: false, error: true };

              // reducer for Posts component
      case "DELETING_START":
        return { ...state, loading: true, error: false };
      case "DELETING_SUCCESS":
        const updatedPosts = state.posts.filter((post) => {return post._id != action.data})

        return { ...state, posts: [...updatedPosts], loading: false, error: false };
      case "DELETING_FAIL":
        return { ...state, loading: false, error: true };

      default:
        return state;
    }
  };
  
  export default postReducer;
