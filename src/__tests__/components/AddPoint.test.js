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
        { displayName: 'Sochi'},
    ];

    beforeEach(() => {
        comp = shallow(<AddPoint />);
    });

    it('Should render list finded addresses', () => {
        comp.setState({ searchedPoints, });
        expect(shallowToJson(comp)).toMatchSnapshot();
    });

    it('Should toggle state.hoverIndex when mouse hover on list finded addresses', () => {
        comp.setState({ searchedPoints, });

        const firstPoint = comp.find('button.list-group-item').at(0);
        firstPoint.simulate('mouseenter');
        expect(comp.state().hoverIndex).toEqual(0);

        firstPoint.simulate('mouseleave');
        expect(comp.state().hoverIndex).toEqual(null);
    });

    it('Should add and remove class "active" when mouse hover on element of list finded addresses', () => {

        //onMouseEnter
        comp.setState({ searchedPoints, hoverIndex: 0 });
        const firstAddressInactive = comp.find('button.list-group-item').at(0);
        expect(shallowToJson(firstAddressInactive)).toMatchSnapshot();

        //onMouseLeave
        comp.setState({ searchedPoints, hoverIndex: null });
        const firstAddressActive = comp.find('button.list-group-item').at(0);
        expect(shallowToJson(firstAddressActive)).toMatchSnapshot();

    });

    it('Click on searched point element must change state', () => {
        comp = mount(<AddPoint addPoint={ () => {} } />);
        comp.setState({ searchedPoints, });

        const firstPoint = comp.find('button.list-group-item').at(0);
        firstPoint.simulate('click', {
            preventDefault: () => {},
        });
        expect(comp.state().inputValue).toEqual('');
        expect(comp.state().currentPoint).toEqual([]);
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
        expect(shallowToJson(comp)).toMatchSnapshot();

    });

    it('KeyDown and KeyUp on InputPoint must toggle class on selected point', () => {
        comp = mount(<AddPoint />);

        comp.setState({ searchedPoints, });

        const inputPoint = comp.find('#inputPoint');

        //Activated first address
        inputPoint.simulate('keyUp', { key: 'ArrowDown' });
        const searchedPoints1 = comp.find('#searchedPoints');
        expect(shallowToJson(searchedPoints1)).toMatchSnapshot();

        //Activated second address
        inputPoint.simulate('keyUp', { key: 'ArrowDown' });
        const searchedPoints2 = comp.find('#searchedPoints');
        expect(shallowToJson(searchedPoints2)).toMatchSnapshot();

        //Again activated first address
        inputPoint.simulate('keyUp', { key: 'ArrowUp' });
        const searchedPoints3 = comp.find('#searchedPoints');
        expect(shallowToJson(searchedPoints3)).toMatchSnapshot();

        //Activated third address like a onMouseEnter
        comp.setState({ hoverIndex: 2, currentIndexSearch: 2 });
        const searchedPoints4 = comp.find('#searchedPoints');
        expect(shallowToJson(searchedPoints4)).toMatchSnapshot();

        //Activated second address
        inputPoint.simulate('keyUp', { key: 'ArrowUp' });
        const searchedPoints5 = comp.find('#searchedPoints');
        expect(shallowToJson(searchedPoints5)).toMatchSnapshot();

        //Activated first address like a onMouseEnter
        comp.setState({ hoverIndex: 0, currentIndexSearch: 0 });
        const searchedPoints6 = comp.find('#searchedPoints');
        expect(shallowToJson(searchedPoints6)).toMatchSnapshot();

        //Activated second address
        inputPoint.simulate('keyUp', { key: 'ArrowDown' });
        const searchedPoints7 = comp.find('#searchedPoints');
        expect(shallowToJson(searchedPoints7)).toMatchSnapshot();
    });

});
