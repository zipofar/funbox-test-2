import * as _ from 'lodash';

const ymaps = window.ymaps;

export const searchPoints = (value, cb) => async (dispatch) => {
    try {
        const result = await ymaps.suggest(value);
        cb(result);
    } catch (e) {

    }
};

const addPointToStore = (data) => {
    return {
        type: 'ADD_POINT',
        payload: data,
    };
};

export const removePointFromStore = (id) => {
    return {
        type: 'REMOVE_POINT',
        payload: id,
    };
};

export const addPoint = point => async (dispatch) => {
    try {
        const result = await ymaps.geocode(point.value, { results: 1 });
        const firstGeoObject = result.geoObjects.get(0);
        const coords = firstGeoObject.geometry.getCoordinates();

        const data = {
            displayName: point.displayName,
            value: point.value,
            coords: coords,
            id: _.uniqueId(),
        };
        dispatch(addPointToStore(data));
    } catch (e) {
        
    }
};