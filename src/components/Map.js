import React from 'react';
import _ from 'lodash';
import {removePointDone, reorderPointsDone} from "../actions";

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

        this.state = { markers: {}, polyLines: null } ;
    };

    componentDidUpdate() {
        if (this.props.addPointState === 'success') {
            this.addMarker();
            this.props.addPointClear();
            this.renderPolyLine();
        }
        if (this.props.removePointState.state === 'remove') {
            this.deleteMarker();
            this.props.removePointDone();
            this.renderPolyLine();
        }
        if (this.props.reorderPointsState.state === 'reorder') {
            this.renderPolyLine();
            this.props.reorderPointsDone();
        }
    }

    renderMap = () => {
        //console.log('render')
        //console.log(this.state)
     };

    addMarker = () => {

        const { ymaps } = window;
        const { points } = this.props;
        const { markers } = this.state;

        points.forEach((item, i) => {

            if (typeof markers[item.id] === 'undefined') {
                const myPlacemark = new ymaps.Placemark(item.coords, {
                    hintContent: `Point # ${i + 1}`,
                    balloonContent: item.displayName,
                }, {
                    draggable: true,
                });
                this.myMap.geoObjects.add(myPlacemark);
                this.myMap.panTo(item.coords);
                this.setState({ markers: {...markers, [item.id]: myPlacemark} });
            }

        });

    };

    renderPolyLine = () => {
        const { ymaps } = window;
        const { points } = this.props;
        const coordsPoints = points.map(item => {
            return item.coords;
        });

        const myPolyline = new ymaps.Polyline(coordsPoints, {
            // Описываем свойства геообъекта.
            // Содержимое балуна.
            balloonContent: "Маршрут"
        }, {
            // Задаем опции геообъекта.
            // Отключаем кнопку закрытия балуна.
            balloonCloseButton: false,
            // Цвет линии.
            strokeColor: "#000000",
            // Ширина линии.
            strokeWidth: 4,
            // Коэффициент прозрачности.
            strokeOpacity: 0.5
        });

        if (this.state.polyLines !== null) {
            this.myMap.geoObjects.remove(this.state.polyLines);
        }
        this.setState({ polyLines: myPolyline });
        this.myMap.geoObjects.add(myPolyline);
    };

    deleteMarker = () => {

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