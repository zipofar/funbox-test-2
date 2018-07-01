import React from 'react';

export default class ListPoints extends React.Component
{

    onClickButtonDelete = (id) => (e) => {
        e.preventDefault();
        this.props.removePointFromStore(id);
    };

    showListPoints = () => {
        const { points } = this.props;
        return(
            <ul className="list-group">
                { points.map((item, i) => {
                    return(
                        <li key={i} className="list-group-item">
                            <button className='btn' onClick={this.onClickButtonDelete(item.id)}>X</button>
                            { item.displayName }
                        </li>
                    );
                }) }
            </ul>
        );
    };

    render() {

        if (this.props.points.length === 0) {
            return null;
        }

        return(
            <div>
                {this.showListPoints()}
            </div>
        );
    }
}