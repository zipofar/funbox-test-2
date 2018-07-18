import {connect} from 'react-redux';
import Map from '../components/Map';
import * as actions from '../actions';

const mapStateToProps = state => ({
  points: state.points,
  mapCenterCoords: state.mapCenterCoords,
  addPointState: state.addPointState,
  removePointState: state.removePointState,
  reorderPointsState: state.reorderPointsState,
  updatePointState: state.updatePointState,
});

const container = connect(mapStateToProps, actions)(Map);

export default container;