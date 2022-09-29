import * as UploadApi from '../api/uploadRequest';

//takes in data from the upload, then uses the uploadapi function to upload the data
export const uploadImage = (data) => async(dispatch) => {
    try {
        await UploadApi.uploadImage(data)
    } catch (error) {
        console.log(error)
    }
}

export const uploadPost = (data) => async(dispatch) => {
    dispatch({ type: "UPLOAD_START" })
    try {
        const newPost = await UploadApi.uploadPost(data)
        newPost.data["username"] = data.username;
        dispatch({ type: "UPLOAD_SUCCESS", data : newPost.data })
    } catch (error) {
        console.log(error)
        dispatch({ type: "UPLOAD_FAIL"})
    }
}