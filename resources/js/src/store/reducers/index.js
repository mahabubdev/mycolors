import { combineReducers } from 'redux';
import auth from './auth';
import theme from './theme';

const rootReducer = combineReducers({
    auth,
    theme
});

export default rootReducer;