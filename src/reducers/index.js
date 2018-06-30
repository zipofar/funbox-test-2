import { combineReducers } from 'redux';

const points = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_POINT':
            return state;
        case 'REMOVE_POINT':
            return state;
        case 'REORDER_POINTS':
            return state;
        default:
            return state;
    }
};

export default combineReducers({
    points,
});