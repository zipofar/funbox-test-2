import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import AddPoint from '../../containers/AddPoint';
import { createStore } from "redux";
import RootReducer from "../../reducers/index";
import * as actions from '../../actions/index';

configure({ adapter: new Adapter() });

describe('Should add two points to store', () => {

    const store = createStore(RootReducer);
    const coords1 = [55.76, 37.64];
    const coords2 = [10, 10];
    const wrapper = mount(<AddPoint store = { store }/>);
    const input = wrapper.find('#inputPoint');
    const form = wrapper.find('form');

    it('Should match to snapshot AddPoint', () => {
        const divContainer = wrapper.find('#container-input-point');
        expect(shallowToJson(divContainer)).toMatchSnapshot();
    });

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
