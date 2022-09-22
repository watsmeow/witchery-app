import {
    legacy_createStore as createStore,
    //have to apply redux thunk middleware
    applyMiddleware,
    compose,
  } from "redux";
  //thunk is used for async performance
  import thunk from "redux-thunk";
  import { reducers } from "../reducers";
  
  //saves the state to local storage in serialized format
  function saveToLocalStorage(store) {
    try {
        const serializedStore = JSON.stringify(store);
        window.localStorage.setItem('store', serializedStore);
    } catch(e) {
        console.log(e);
    }
  }
  
  //retrieves data from local storage
  function loadFromLocalStorage() {
    try {
        const serializedStore = window.localStorage.getItem('store');
        if(serializedStore === null) return undefined;
        return JSON.parse(serializedStore);
    } catch(e) {
        console.log(e);
        return undefined;
    }
  }

  //makes the store available to redux dev tools
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const persistedState = loadFromLocalStorage();
  
  //function to make a redux store, brings in all reducers, persisted state of local storage, applies thunk middleware
  const store = createStore(reducers, persistedState, composeEnhancers(applyMiddleware(thunk)));
  
  //every time there is a change to the store state, it is reflected in local storage
  store.subscribe(() => saveToLocalStorage(store.getState()));
  
  export default store;