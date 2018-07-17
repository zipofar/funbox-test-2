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
        case 'UPDATE_POINT':
            const idPoint = action.payload.id;
            const newPoints = state.map(item => {
                return item.id === idPoint ? action.payload: item;
            });
            return newPoints;
        default:
            return state;
    }
};

const mapCenterCoords = (state = [55.76, 37.64], action) => {
    switch (action.type) {
        case 'SET_COORDS':
            return action.payload;
        default:
            return state;
    }
};

const addPointState = (state = '', action) => {
    switch (action.type) {
        case 'ADD_POINT_SUCCESS':
            return 'success';
        case 'ADD_POINT_DONE':
            return '';
        default:
            return state;
    }
};

const updatePointState = (state = '', action) => {
    switch (action.type) {
        case 'UPDATE_POINT_SUCCESS':
            return 'success';
        case 'UPDATE_POINT_DONE':
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
            //const id = action.payload;
            return { state: 'reorder'};
        case 'REORDER_POINTS_DONE':
            return { state: 'done' };
        default:
            return state;
    }
};

export default combineReducers({
    mapCenterCoords,
    points,
    addPointState,
    updatePointState,
    removePointState,
    reorderPointsState,
});