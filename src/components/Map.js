import React from 'react';
import {omit} from 'lodash';

class Map extends React.Component {
  constructor(props) {
    super(props);
    const {ymaps} = window;

    function init() {
      this.myMap = new ymaps.Map("map", {
        center: this.props.mapCenterCoords,
        zoom: 9
      });

      this.myMap.events.add('actionend', (e) => {
        const coords = this.myMap.getCenter();
        this.props.setCenterCoords(coords);
      });
    };

    ymaps.ready(init.bind(this));
    this.state = {markers: {}, polyLines: null};
  };

  componentDidUpdate() {
    if (this.props.addPointState === 'success') {
      this.addMarker();
      this.renderPolyLine();
      this.props.addPointDone();
    }

    if (this.props.removePointState.state === 'remove') {
      this.deleteMarker();
      this.renderPolyLine();
      this.props.removePointDone();
    }

    if (this.props.reorderPointsState.state === 'reorder') {
      this.renderPolyLine();
      this.props.reorderPointsDone();
    }

    if (this.props.updatePointState === 'success') {
      this.renderPolyLine();
      this.props.updatePointDone();
    }
  }

  addMarker = () => {
    const {ymaps} = window;
    const {points} = this.props;
    const {markers} = this.state;

    points.forEach((item, i) => {
      if (typeof markers[item.id] === 'undefined') {
        const myPlacemark = new ymaps.Placemark(item.coords, {
          hintContent: item.namePoint,
          balloonContent: item.namePoint,
        }, {
          draggable: true,
        });

        this.myMap.geoObjects.add(myPlacemark);

        // Слушаем событие окончания перетаскивания на метке.
        myPlacemark.events.add('dragend', () => {
          const newCoords = myPlacemark.geometry.getCoordinates();
          this.props.updatePointToStore({namePoint: item.namePoint, coords: newCoords, id: item.id});
          this.props.updatePointSuccess();
        });

        //Move map to point
        this.myMap.panTo(item.coords);
        this.setState({markers: {...markers, [item.id]: myPlacemark}});
      }
    });
  };

  renderPolyLine = () => {
    const {ymaps} = window;
    const {points} = this.props;
    const coordsPoints = points.map(item => item.coords);
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

    this.setState({polyLines: myPolyline});
    this.myMap.geoObjects.add(myPolyline);
  };

  deleteMarker = () => {
    const {markers} = this.state;
    const {id} = this.props.removePointState;
    const myPlacemark = markers[id];

    this.myMap.geoObjects.remove(myPlacemark);

    const newMarkers = omit(markers, [id]);
    this.setState({markers: {...newMarkers}});

    const points = this.props.points;

    if (points.length > 1) {
      const lastPoint = points[points.length - 1];
      this.myMap.panTo(lastPoint.coords);
    }
  };

  render() {
    const windowHeight = window.innerHeight - 50;
    return (
      <div id="map" style={{width: '100%', height: windowHeight}}></div>
    );
  }
}

export default Map;