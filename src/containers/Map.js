import { connect } from 'react-redux';
import Map from '../components/Map';

const mapStateToProps = state => ({
    points: state.points,
});

const container = connect(mapStateToProps)(Map);

export default container;