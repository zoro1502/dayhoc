import { combineReducers } from 'redux';
import { commonReducer } from './reducers/common-reducer';

export default combineReducers({
    commonReducer: commonReducer,
})