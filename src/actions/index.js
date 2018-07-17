import { uniqueId } from "lodash";

export const setCenterCoords = (coords) => ({ type: 'SET_COORDS', payload: coords });

export const removePointFromStore = (id) => ({ type: 'REMOVE_POINT', payload: id });
export const removePointDone = () => ({ type: 'REMOVE_POINT_DONE' });

export const reorderPointsInStore = (points) => ({ type: 'REORDER_POINTS', payload: points });
export const reorderPointsDone = () => ({ type: 'REORDER_POINTS_DONE' });

export const addPointToStore = (point) => ({ type: 'ADD_POINT', payload: { ...point, id: uniqueId() } });
export const addPointSuccess = () => ({ type: 'ADD_POINT_SUCCESS' });
export const addPointDone = () => ({ type: 'ADD_POINT_DONE' });

export const updatePointToStore = (data) => ({ type: 'UPDATE_POINT', payload: data });
export const updatePointSuccess = () => ({ type: 'UPDATE_POINT_SUCCESS' });
export const updatePointDone = () => ({ type: 'UPDATE_POINT_DONE' });
