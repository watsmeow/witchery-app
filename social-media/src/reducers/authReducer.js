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
        default: return state;
    }
}

export default authReducer;