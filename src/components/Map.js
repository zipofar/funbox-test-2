import React from 'react';

export default class Map extends React.Component
{

    renderMap = () => {
        const ymaps = this.props.ym;
        ymaps.ready(init);
        function init(){
            const myMap = new ymaps.Map("map", {
                center: [55.76, 37.64],
                zoom: 12
            });

            const myPlacemark = new ymaps.Placemark([55.76, 37.64], {
                hintContent: 'Содержимое всплывающей подсказки',
                balloonContent: 'Содержимое балуна'
            });
            const myPlacemark2 = new ymaps.Placemark([55.77, 37.65], {
                hintContent: 'Содержимое всплывающей подсказки',
                balloonContent: 'Содержимое балуна'
            });

            myMap.geoObjects.add(myPlacemark);
            myMap.geoObjects.add(myPlacemark2);
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