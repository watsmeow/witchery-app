//import auth request as api, import all from authRequest file
import * as AuthApi from '../api/authRequest'

// formData is the parameter received from Auth.jsx component, makes an async call to the redux function, then interact with the API to call an endpoint to the server for the login
export const logIn = (formData) => async(dispatch) => {
    //need to interact with global state management, aka the reducer. Tells the reducer that authentication has been started
    dispatch({ type: "AUTH_START" })
    try {
        //receives "data" from API endpoint, then passes in the form data from the login function
        const {data} = await AuthApi.logIn(formData)
        //tells reducer that authentication has been completed and passes the authenticated data
        dispatch({ type: "AUTH_SUCCESS", data: data })
    } catch (error) {
        console.log(error)
        //tells reducer that authentication failed
        dispatch({ type: "AUTH_FAIL" })
    }
}

//same as above, but for sign up function
export const signUp = (formData) => async(dispatch) => {
    dispatch({ type: "AUTH_START" })
    try {
        const {data} = await AuthApi.signUp(formData)
        dispatch({ type: "AUTH_SUCCESS", data: data })
    } catch (error) {
        console.log(error)
        dispatch({ type: "AUTH_FAIL" })
    }
}