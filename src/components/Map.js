import React from 'react';
import _ from 'lodash';
import {removePointDone} from "../actions";

export default class Map extends React.Component
{
    constructor(props) {
        super(props);

        const { ymaps } = window;

        function init(){
            this.myMap =  new ymaps.Map("map", {
                center: [55.76, 37.64],
                zoom: 9
            });
        }
        ymaps.ready(init.bind(this));

        this.state = { markers: {} } ;
    };

    componentDidUpdate() {
        if (this.props.addPointState === 'success') {
            this.addMarker();
        }
        if (this.props.removePointState.state === 'remove') {
            this.deleteMarker();
        }
    }

    renderMap = () => {
        console.log('render')
        console.log(this.state)
     };

    addMarker = () => {
        this.props.addPointClear();
        const { ymaps } = window;
        const { points } = this.props;
        const { markers } = this.state;

        points.forEach((item, i) => {

            if (typeof markers[item.id] === 'undefined') {
                const myPlacemark = new ymaps.Placemark(item.coords, {
                    hintContent: `Point # ${i + 1}`,
                    balloonContent: item.displayName,
                });
                this.myMap.geoObjects.add(myPlacemark);
                this.myMap.panTo(item.coords);
                this.setState({ markers: {...markers, [item.id]: myPlacemark} });
            }

        });

    };

    deleteMarker = () => {
        this.props.removePointDone();
        const { markers } = this.state;
        const id = this.props.removePointState.id;
        const myPlacemark = markers[id];

        this.myMap.geoObjects.remove(myPlacemark);

        const newMarkers = _.omit(markers, [id]);
        this.setState({ markers: {...newMarkers} });

        const points = this.props.points;

        if (points.length !== 0) {
            const lastPoint = points[points.length - 1];
            this.myMap.panTo(lastPoint.coords);
        } else {
            this.myMap.panTo(this.myMap.getCenter());
        }
    };

    render() {
        return(
            <div id="map" style={ { width: '100%', height: 400 } }>
                {this.renderMap()}
            </div>
        );
    }
}