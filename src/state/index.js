import { createStore } from "redux"
import rootReducer from './reducers';

export const initStore = (initialState) => {
    return createStore(rootReducer, initialState);
}