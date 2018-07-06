import { connect } from 'react-redux';
import Map from '../components/Map';
import { addPointClear, removePointDone } from '../actions';

const mapStateToProps = state => ({
    points: state.points,
    addPointState: state.addPointState,
    removePointState: state.removePointState,
});

const mapDispatchToProps = {
    addPointClear,
    removePointDone,
};

const container = connect(mapStateToProps, mapDispatchToProps)(Map);

export default container;