import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import ListPoints from '../../components/ListPoints';

configure({ adapter: new Adapter() });

const points = [
    { id: 1, displayName: 'Moscow'},
    { id: 2, displayName: 'Penza'},
];

it('Render ListPoints must contain 2 points', () => {
    const wrapper = mount(<ListPoints points={points} />);
    const listPoints = wrapper.find('.list-group-item');
    expect(listPoints.length).toBe(2);
});

it('Call onClickButtonDelete when delete point', () => {
    const removePointFromStore = jest.fn();
    const wrapper = mount(<ListPoints points={points} removePointFromStore={removePointFromStore} />);
    const deleteButton = wrapper.find('.list-group-item > button').at(0);
    deleteButton.simulate('click');
    expect(removePointFromStore).toHaveBeenCalledWith(1);
});


