import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from '../../reducers';
import * as actions from '../../actions';


it('Should add point to state', async () => {
    const store = createStore(RootReducer, applyMiddleware(thunk));
    const expectedPoint = {
        displayName: "Moscow",
        value: "Russia, Moscow",
        coords: [12, 15],
        id: 1,
    };

    const mockGetCoords = () => { return expectedPoint };
    await store.dispatch(actions.addPoint({}, mockGetCoords));

    expect(store.getState().points).toEqual([expectedPoint]);
    expect(store.getState().addPointState).toEqual('success');

    store.dispatch(actions.addPointClear());
    expect(store.getState().addPointState).toEqual('');
});


it('Should failure when add point to state', async () => {
    const store = createStore(RootReducer, applyMiddleware(thunk));
    const mockGetCoords = () => { return Promise.reject(new Error()) };

    await store.dispatch(actions.addPoint({}, mockGetCoords));
    expect(store.getState().points).toEqual([]);
    expect(store.getState().addPointState).toEqual('failure');
});

it('Should remove point from state', async () => {
    const store = createStore(RootReducer, applyMiddleware(thunk));
    const initPoint = {
        displayName: "Moscow",
        value: "Russia, Moscow",
        coords: [12, 15],
        id: 1,
    };

    const mockGetCoords = () => { return initPoint };
    await store.dispatch(actions.addPoint({}, mockGetCoords));

    store.dispatch(actions.removePointFromStore(1));

    expect(store.getState().points).toEqual([]);
    expect(store.getState().removePointState).toEqual({ id: 1, state: 'remove'});

    store.dispatch(actions.removePointDone());
    expect(store.getState().removePointState).toEqual({ state: 'done' });
});

it('Should update point to state', async () => {
    const store = createStore(RootReducer, applyMiddleware(thunk));
    const initPoint = {
        displayName: "Moscow",
        value: "Russia, Moscow",
        coords: [12, 15],
        id: 1,
    };

    const expectedPoint = {
        displayName: "Penza",
        value: "Russia, Penza",
        coords: [20, 40],
        id: 1,
    };

    const mockGetCoords = () => { return initPoint };
    await store.dispatch(actions.addPoint({}, mockGetCoords));


    const mockGetAddress = () => { return expectedPoint };
    await store.dispatch(actions.updatePoint([], 1, {}, mockGetAddress));

    expect(store.getState().points).toEqual([expectedPoint]);
    expect(store.getState().updatePointState).toEqual('success');

    store.dispatch(actions.updatePointDone());
    expect(store.getState().updatePointState).toEqual('');
});

it('Should failure state when update point', async () => {
    const store = createStore(RootReducer, applyMiddleware(thunk));

    const mockGetAddress = () => { return Promise.reject(new Error()) };
    await store.dispatch(actions.updatePoint([], 1, {}, mockGetAddress));

    expect(store.getState().updatePointState).toEqual('failure');
});

it('Should reorder points', () => {
    const store = createStore(RootReducer, applyMiddleware(thunk));
    const expectedPoints = [
        {
            displayName: "Moscow",
            value: "Russia, Moscow",
            coords: [12, 15],
            id: 1,
        },
        {
            displayName: "Penza",
            value: "Russia, Penza",
            coords: [22, 55],
            id: 2,
        },
    ];

    store.dispatch(actions.reorderPointsInStore(expectedPoints));
    expect(store.getState().points).toEqual(expectedPoints);
    expect(store.getState().reorderPointsState).toEqual({ state: 'reorder'});

    store.dispatch(actions.reorderPointsDone());
    expect(store.getState().reorderPointsState).toEqual({ state: 'done' });
});

it('Should set state success when eval searched points', async () => {
    const store = createStore(RootReducer, applyMiddleware(thunk));
    const mockSearchPoints = () => { return [] };
    const cb = jest.fn();
    await store.dispatch(actions.searchPoints('A', cb, mockSearchPoints));

    expect(store.getState().searchPointState).toEqual('success');
    expect(cb).toBeCalledWith([]);
});

it('Should set state failure when eval searched points', async () => {
    const store = createStore(RootReducer, applyMiddleware(thunk));
    const mockSearchPoints = () => { return Promise.reject(new Error()) };
    const cb = jest.fn();
    await store.dispatch(actions.searchPoints('A', cb, mockSearchPoints));

    expect(store.getState().searchPointState).toEqual('failure');
});