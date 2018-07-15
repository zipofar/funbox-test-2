import * as _ from "lodash";

const ymaps = window.ymaps;

export const getAddressByLetter = async (value) => {
    try {
        const result = await ymaps.suggest(value);
        return Promise.resolve(result);
    } catch (e) {
        return Promise.reject(e);
    }
};

export const getCoords = async (point) => {
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
        return Promise.resolve(data);
    } catch (e) {
        return Promise.reject(e);
    }
};

export const getAddress = async (coords, idPoint, marker) => {
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
        return Promise.resolve(data);
    } catch (e) {
        return Promise.reject(e);
    }
};