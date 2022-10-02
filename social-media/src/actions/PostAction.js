import * as PostApi from '../api/postRequest';

export const getTimelinePosts = (id) => async(dispatch) => {
    dispatch({ type: "RETRIEVING_START" })
    try {
        const data = await PostApi.getTimelinePosts(id);
        dispatch({ type: "RETRIEVING_SUCCESS", data: data });

    } catch (error) {
        dispatch({ type: "RETRIEVING_FAIL" })
        console.log(error)
    }
};

export const deletePost = (id, userId) => async(dispatch) => {
    dispatch({ type: "DELETING_START" })
    try {
        const data = await PostApi.deletePost(id, userId);
        console.log(data)
        dispatch({ type: "DELETING_SUCCESS", data: id });

    } catch (error) {
        dispatch({ type: "DELETING_FAIL" })
        console.log(error)
    }
};

export const updatePost = (userId, formData) => async(dispatch) => {
    dispatch({ type: "UPDATING_POST_START" })
    try {
        const {data} = await PostApi.updatePost(userId, formData)
       dispatch({ type: "UPDATING_POST_SUCCESS", data: formData })
    } catch (error) {
        dispatch({ type: "UPDATING_POST_FAIL" })
    }
};