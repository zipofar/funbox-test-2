import { connect } from 'react-redux';
import ListPoints from '../components/ListPoints';
import * as actions from '../actions';

const mapStateToProps = state => {
    return {
        points: state.points,
    };
};

const container = connect(mapStateToProps, actions)(ListPoints);

export default container;