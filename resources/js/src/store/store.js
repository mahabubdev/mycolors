import rootReducer from './reducers/index';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(thunk, promiseMiddleware)(createStore);

const store = createStoreWithMiddleware(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ 
    &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
); 

export default store;