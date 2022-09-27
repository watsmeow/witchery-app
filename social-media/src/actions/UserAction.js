import * as UserApi from "../api/userRequest";

//takes in data from the upload, then uses the uploadapi function to upload the data
export const updateUser = (id, formData) => async(dispatch) => {
    dispatch({ type: "UPDATING_START" })
    try {
        console.log(formData)
        const {data} = UserApi.updateUser(id, formData)
        console.log(data)
        dispatch({ type: "UPDATING_SUCCESS", data: data })
    } catch (error) {
        console.log("we fucked", error)
        dispatch({ type: "UPDATING_FAIL" })
    }
};

//takes in data from the upload, then uses the uploadapi function to upload the data
export const followUser = (id, data) => async(dispatch) => {
    dispatch({ type: "FOLLOW_USER" })
    UserApi.followUser(id, data)
};

export const unfollowUser = (id, data)=> async(dispatch)=> {
    dispatch({type: "UNFOLLOW_USER", data: id})
    UserApi.unfollowUser(id, data)
};