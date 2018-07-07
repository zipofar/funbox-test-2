import * as _ from 'lodash';

const ymaps = window.ymaps;

export const searchPoints = (value, cb) => async (dispatch) => {
    try {
        const result = await ymaps.suggest(value);
        cb(result);
    } catch (e) {

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

export const addPoint = point => async (dispatch) => {
    dispatch(addPointRequest());
    try {
        const pointAddress = point.value;
        const result = await ymaps.geocode(pointAddress, { results: 1 });
        const firstGeoObject = result.geoObjects.get(0);
        const coords = firstGeoObject.geometry.getCoordinates();

        const data = {
            displayName: point.displayName,
            value: pointAddress,
            coords: coords,
            id: _.uniqueId(),
        };
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

export const updatePoint = (coords, idPoint, marker) => async (dispatch) => {
    dispatch(updatePointRequest());
    try {
        const res = await ymaps.geocode(coords);
        const firstGeoObject = res.geoObjects.get(0);
        const data = {
            displayName: firstGeoObject.getAddressLine(),
            value: firstGeoObject.getCountry() + ', ' + firstGeoObject.getAddressLine(),
            coords: coords,
            id: idPoint,
        };

        marker.properties.set({
            balloonContent: firstGeoObject.getAddressLine(),
        });

        dispatch(updatePointToStore(data));
        dispatch(updatePointSuccess());
    } catch (e) {
        dispatch(updatePointFailure());
    }

};