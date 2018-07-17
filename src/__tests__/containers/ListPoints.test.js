import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import ListPoints from '../../containers/ListPoints';
import { Provider } from 'react-redux';
import { createStore } from "redux";
import RootReducer from "../../reducers";
import * as actions from '../../actions';

configure({ adapter: new Adapter() });

describe('Should render two points and delete it', () => {
    const store = createStore(RootReducer);
    const point1 = { coords: [55.76, 37.64], namePoint: 'A', id: 1 };
    const point2 = { coords: [10, 10], namePoint: 'B', id: 2 };
    store.dispatch(actions.addPointToStore(point1));
    store.dispatch(actions.addPointToStore(point2));

    const wrapper = mount(<Provider store = { store }><ListPoints /></Provider>);

    it('Should contain 2 points', () => {
        const listPoints = wrapper.find('.list-group-item');
        expect(listPoints.length).toBe(2);
    });

    it('Should delete second point and stay first point', () => {
        const secondPoint = wrapper.find('.list-group-item').at(1);
        const delButton = secondPoint.find('button');
        delButton.simulate('click');
        const listPoints = wrapper.find('.list-group-item');
        expect(listPoints.length).toBe(1);
    });

    it('Should delete first point', () => {
        const firstPoint = wrapper.find('.list-group-item').at(0);
        const delButton = firstPoint.find('button');
        delButton.simulate('click');
        const listPoints = wrapper.find('.list-group-item');
        expect(listPoints.length).toBe(0);
    });
});

