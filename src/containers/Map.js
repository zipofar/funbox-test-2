import { connect } from 'react-redux';
import Map from '../components/Map';
import { addPointClear, removePointDone, reorderPointsDone } from '../actions';

const mapStateToProps = state => ({
    points: state.points,
    addPointState: state.addPointState,
    removePointState: state.removePointState,
    reorderPointsState: state.reorderPointsState,
});

const mapDispatchToProps = {
    addPointClear,
    removePointDone,
    reorderPointsDone,
};

const container = connect(mapStateToProps, mapDispatchToProps)(Map);

export default container;