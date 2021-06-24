import { combineReducers } from "redux";
import { ACTIONS } from "./actions";

const formDataReducer = (state = {}, action) => {
    switch (action.type) {
        case ACTIONS.SAVE_FORM:
            return action.data;
        default:
            return state;
    }
}

const versionChangedReducer = (state = false, action) => {
    console.log('[versionReducer]: ', state, action);
    switch (action.type) {
        case ACTIONS.UPDATE_VERSION:
            return true;
        default:
            return (state === true);
    }
}

const versionReducer = (state = process.env.REACT_APP_VERSION, action) => {
    return (action.type === ACTIONS.UPDATE_VERSION ? action.version : (state || process.env.REACT_APP_VERSION));
}

export default combineReducers({
    version: versionReducer,
    versionChanged: versionChangedReducer,
    formData: formDataReducer
});
