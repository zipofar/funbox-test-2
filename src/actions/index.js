import { getCoords, getAddress, getAddressByLetter } from './geoHandlers';

export const setCenterCoords = (coords) => ({ type: 'SET_COORDS', payload: coords });

const searchPointsRequest = () => ({ type: 'SEARCH_POINTS_REQUEST' });
const searchPointsSuccess = () => ({ type: 'SEARCH_POINTS_SUCCESS' });
const searchPointsFailure = () => ({ type: 'SEARCH_POINTS_FAILURE' });

export const searchPoints = (value, cb, fnGetAddressByLetter = getAddressByLetter) => async (dispatch) => {
    dispatch(searchPointsRequest());
    try {
        const result = await fnGetAddressByLetter(value);
        dispatch(searchPointsSuccess());
        cb(result);
    } catch (e) {
        dispatch(searchPointsFailure());
    }
};

export const removePointFromStore = (id) => ({ type: 'REMOVE_POINT', payload: id });
export const removePointDone = () => ({ type: 'REMOVE_POINT_DONE' });

export const reorderPointsDone = () => ({ type: 'REORDER_POINTS_DONE' });
export const reorderPointsInStore = (points) => ({ type: 'REORDER_POINTS', payload: points });

const addPointRequest = () => ({ type: 'ADD_POINT_REQUEST' });
const addPointSuccess = () => ({ type: 'ADD_POINT_SUCCESS' });
const addPointFailure = () => ({ type: 'ADD_POINT_FAILURE' });
export const addPointClear = () => ({ type: 'ADD_POINT_CLEAR' });
const addPointToStore = (data) => ({ type: 'ADD_POINT', payload: data });

export const addPoint = (point, fnGetCoords = getCoords) => async (dispatch) => {
    dispatch(addPointRequest());
    try {
        const data = await fnGetCoords(point);
        dispatch(addPointToStore(data));
        dispatch(addPointSuccess());
    } catch (e) {
        dispatch(addPointFailure());
    }
};

const updatePointRequest = () => ({ type: 'UPDATE_POINT_REQUEST' });
const updatePointSuccess = () => ({ type: 'UPDATE_POINT_SUCCESS' });
const updatePointFailure = () => ({ type: 'UPDATE_POINT_FAILURE' });
export const updatePointDone = () => ({ type: 'UPDATE_POINT_DONE' });
const updatePointToStore = (data) => ({ type: 'UPDATE_POINT', payload: data });

export const updatePoint = (coords, idPoint, marker, fnGetAddress = getAddress) => async (dispatch) => {
    dispatch(updatePointRequest());
    try {
        const data = await fnGetAddress(coords, idPoint, marker);
        dispatch(updatePointToStore(data));
        dispatch(updatePointSuccess());
    } catch (e) {
        dispatch(updatePointFailure());
    }
};