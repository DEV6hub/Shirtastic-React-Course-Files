
import { combineReducers } from 'redux';
import shirts from './shirts';

const rootReducer = combineReducers({
    shirts: shirts
});

export default rootReducer;