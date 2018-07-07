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
            const reorderedState = action.payload;
            return reorderedState;
        default:
            return state;
    }
};

const addPointState = (state = '', action) => {
    switch (action.type) {
        case 'ADD_POINT_REQUEST':
            return 'request';
        case 'ADD_POINT_SUCCESS':
            return 'success';
        case 'ADD_POINT_FAILURE':
            return 'failure';
        case 'ADD_POINT_CLEAR':
            return '';
        default:
            return state;
    }
};

const removePointState = (state = { state: 'done' }, action) => {
    switch (action.type) {
        case 'REMOVE_POINT':
            const id = action.payload;
            return { id, state: 'remove'};
        case 'REMOVE_POINT_DONE':
            return { state: 'done' };
        default:
            return state;
    }
};

const reorderPointsState = (state = { state: 'done' }, action) => {
    switch (action.type) {
        case 'REORDER_POINTS':
            const id = action.payload;
            return { id, state: 'reorder'};
        case 'REORDER_POINTS_DONE':
            return { state: 'done' };
        default:
            return state;
    }
};

export default combineReducers({
    points,
    addPointState,
    removePointState,
    reorderPointsState,
});