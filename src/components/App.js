import React from 'react';
import AddPoint from './AddPoint';
import Map from './Map';

export default class App extends React.Component
{

    render() {
        return(
            <div className='container'>
                <div className='row'>
                    <div className='col-sm col-md-5'>
                        <AddPoint/>
                    </div>
                    <div className='col-sm col-md-7'>
                        <Map ym ={ this.props.ym } />
                    </div>
                </div>
            </div>
        );
    }
}