import React from 'react';

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
    };

    renderMap = () => {
        const { ymaps } = window;
        const { points } = this.props;

        points.forEach((item, i) => {
            const myPlacemark = new ymaps.Placemark(item.coords, {
                hintContent: `Point # ${i + 1}`,
                balloonContent: item.displayName,
            });

            this.myMap.geoObjects.add(myPlacemark);
            this.myMap.panTo(item.coords);
        });
     };

    render() {
        return(
            <div id="map" style={ { width: '100%', height: 400 } }>
                {this.renderMap()}
            </div>
        );
    }
}