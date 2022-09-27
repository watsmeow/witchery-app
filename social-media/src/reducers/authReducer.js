//this function carries a state, inside the state is auth data, action tells what kind of reducer is being called from AuthActions,
const authReducer = (state = { authData: null, loading: false, error: false}, action) => {
    switch (action.type) {
        //when auth starts, the action starts. returns previous state 
        case "AUTH_START": 
            return {...state, loading: true, error: false};
        //auth data will be data carried inside of action
        case "AUTH_SUCCESS": 
            //saves data in local storage, question mark applied a chain operator that determines if the data has actually been received
            localStorage.setItem("profile", JSON.stringify({ ...action?.data}));
            return {...state, authData: action.data, loading: false, error: false};
        //return previous state, loading is false, but error is true due to error serverside  
        case "AUTH_FAIL": 
            return {...state, loading: false, error: true};

        //cases for updating user from profilemodal
        case "UPDATING_START":
            return {...state, updateLoading: true , error: false}
        case "UPDATING_SUCCESS":
            console.log(JSON.stringify({ ...action?.data}))
            localStorage.setItem("profile", JSON.stringify({...action?.data}));
        return {...state, authData: action.data, updateLoading: false, error: false}
    
        case "UPDATING_FAIL":
            return {...state, updateLoading: true, error: true}

        case "LOG_OUT":
            localStorage.clear();
            return {...state, authData: null, loading: false, error: false}

        case "FOLLOW_USER":
            return {...state, authData: {...state.authData, user: {...state.authData.user, following: [...state.authData.user.following, action.data]} }}
            
        case "UNFOLLOW_USER":
            return {...state, authData: {...state.authData, user: {...state.authData.user, following: [...state.authData.user.following.filter((personId)=>personId!==action.data)]} }}    

        default: return state;
    }
}

export default authReducer;