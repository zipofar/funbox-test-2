import { combineReducers } from 'redux';

const points = (state = [], action) => {
    switch (action.type) {
        case 'ADD_POINT':
            const data = action.payload;
            return [...state, data];
        case 'REMOVE_POINT':
            const id = action.payload;
            const newState = state.filter(item => item.id !== id);
            return newState;
        case 'REORDER_POINTS':
            return state;
        default:
            return state;
    }
};

export default combineReducers({
    points,
});