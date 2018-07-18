import {connect} from 'react-redux';
import AddPoint from '../components/AddPoint';
import * as actions from '../actions';

const mapStateToProps = state => {
  return {
    mapCenterCoords: state.mapCenterCoords,
  };
};

const container = connect(mapStateToProps, actions)(AddPoint);

export default container;