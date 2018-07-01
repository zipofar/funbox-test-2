import React from 'react';
import AddPoint from '../containers/AddPoint';
import ListPoints from '../containers/ListPoints';
import Map from './Map';

export default class App extends React.Component
{

    render() {
        return(
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <AddPoint />
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <ListPoints />
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <Map ymaps ={ this.props.ymaps } />
                    </div>
                </div>
            </div>
        );
    }
}