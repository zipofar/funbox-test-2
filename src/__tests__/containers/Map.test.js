import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Map from '../../containers/Map';
import { createStore } from "redux";
import RootReducer from "../../reducers/index";
import * as actions from '../../actions/index';

configure({ adapter: new Adapter() });

const ymaps = {
    ready: (fn) => {fn()},
    Map: function () {
        this.geoObjects = {
            add: function () {},
            remove: function () {},
        };
        this.events = {
            add: function () {},
        };
        this.panTo = function () {};
    },
    Placemark: function () {
        this.geometry = {
            getCoordinates: function () {}
        };
        this.events = {
            add: function () {},
        };
    },
    Polyline: function () {},
};

it('Should render Map', () => {
    const store = createStore(RootReducer);
    const point1 = { coords: [55.76, 37.64], namePoint: 'A', id: 1 };
    const wrapper = mount(<Map store = { store } ymaps = { ymaps } />);
    store.dispatch(actions.addPointToStore(point1));
    store.dispatch(actions.addPointSuccess());
});
