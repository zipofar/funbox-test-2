import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import AddPoint from '../../components/AddPoint';

configure({ adapter: new Adapter() });

it('render AddPoint without crashing', () => {
    shallow(<AddPoint />);
});

it('write some symbol and call func "searchPoints"', () => {
    const searchPoints = jest.fn();
    const comp = shallow(<AddPoint searchPoints={searchPoints}/>);
    const input = comp.find('#inputPoint');
    input.prop('onChange')({ target: { value: 'a' } });
    expect(searchPoints).toBeCalled();
});

describe('DropDownSearch element', () => {
    let comp;

    const searchedPoints = [
        { displayName: 'Moscow'},
        { displayName: 'Penza'},
    ];

    beforeEach(() => {
        comp = shallow(<AddPoint />);
    });

    it('add search point to state and show "showDropDownSearch"', () => {
        comp.setState({ searchedPoints, });
        expect(shallowToJson(comp)).toMatchSnapshot();
    });

    it('mouse hover on first searched point must change state hoverIndex', () => {
        comp.setState({ searchedPoints, });

        const firstPoint = comp.find('button.list-group-item').at(0);
        firstPoint.simulate('mouseenter');
        expect(comp.state().hoverIndex).toEqual(0);

        firstPoint.simulate('mouseleave');
        expect(comp.state().hoverIndex).toEqual(null);
    });

    it('mouseEnter on first searched point element, must toggle class element to active', () => {
        //onMouseEnter
        comp.setState({ searchedPoints, hoverIndex: 0 });
        expect(shallowToJson(comp)).toMatchSnapshot();

        //onMouseLeave
        comp.setState({ searchedPoints, hoverIndex: null });
        expect(shallowToJson(comp)).toMatchSnapshot();
    });

    it('Click on first searched point element must change state', () => {
        comp = mount(<AddPoint />);
        comp.setState({ searchedPoints, });

        const firstPoint = comp.find('button.list-group-item').at(0);
        firstPoint.simulate('click', {
            preventDefault: () => {},
        });
        expect(comp.state().inputValue).toEqual('Moscow');
        expect(comp.state().currentPoint).toEqual({ displayName: 'Moscow' });
        expect(comp.state().searchedPoints).toEqual([]);
    });

    it('Submit form must change state', () => {

        comp = mount(<AddPoint addPoint={ () => {} } />);
        comp.setState({ searchedPoints, });

        // Click on first point
        const firstPoint = comp.find('button.list-group-item').at(0);
        firstPoint.simulate('click', {
            preventDefault: () => {},
        });

        //Click on submit
        const form = comp.find('form');
        form.simulate('submit', {
            preventDefault: () => {},
        });

        expect(comp.state().inputValue).toEqual('');
        expect(comp.state().currentPoint).toEqual([]);
        expect(comp.state().searchedPoints).toEqual([]);

    });

});
