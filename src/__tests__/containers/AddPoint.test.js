import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';

import AddPoint from '../../containers/AddPoint';

import { Provider } from 'react-redux';
import { createStore } from "redux";
import RootReducer from "../../reducers";
import * as actions from '../../actions';

configure({ adapter: new Adapter() });

it('Should render AddPoint', () => {
    const store = createStore(RootReducer);
    mount(<Provider store = { store }><AddPoint /></Provider>);
});

it('Should match to snapshot AddPoint', () => {
    const store = createStore(RootReducer);
    const wrapper = mount(<Provider store = { store }><AddPoint /></Provider>);
    const divContainer = wrapper.find('#container-input-point');
    expect(shallowToJson(divContainer)).toMatchSnapshot();
});

describe('Should add two points to store', () => {

    const store = createStore(RootReducer);
    const coords1 = [55.76, 37.64];
    const coords2 = [10, 10];
    const wrapper = mount(<Provider store = { store }><AddPoint /></Provider>);
    const input = wrapper.find('#inputPoint');
    const form = wrapper.find('form');

    it('Should add first point to store', () => {
        const expectedPoints = [ { coords: coords1, namePoint: 'A', id: '1' } ];
        store.dispatch(actions.setCenterCoords(coords1));
        input.prop('onChange')({ target: { value: 'A' } });
        form.simulate('submit');

        expect(store.getState().points).toEqual(expectedPoints);
        expect(store.getState().addPointState).toEqual('success');
    });

    it('Should add second point to store', () => {
        const expectedPoints = [
            { coords: coords1, namePoint: 'A', id: '1' },
            { coords: coords2, namePoint: 'B', id: '2' },
        ];
        store.dispatch(actions.setCenterCoords(coords2));
        input.prop('onChange')({ target: { value: 'B' } });
        form.simulate('submit');

        expect(store.getState().points).toEqual(expectedPoints);
        expect(store.getState().addPointState).toEqual('success');
    });
});


/*
it('render AddPoint without crashing', () => {
    shallow(<AddPoint />);
});

it('write some symbol and call func "searchPoints"', () => {
    const comp = shallow(<AddPoint />);
    const input = comp.find('#inputPoint');
    input.prop('onChange')({ target: { value: 'A' } });
    expect(searchPoints).toBeCalled();
});
*/