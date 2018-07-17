import React from 'react';

export default class AddPoint extends React.Component
{
    state = {
        inputValue: '',
    };

    onChangeValue = (e) => {
        const { value } = e.target;
        this.setState({ inputValue: value });
    };

    onSubmitPoint = (e) => {
        e.preventDefault();
        const coords = this.props.mapCenterCoords;
        const namePoint = this.state.inputValue;
        this.props.addPointToStore({ coords, namePoint, });
        this.props.addPointSuccess();
        this.setState({ inputValue: '' });
    };

    render() {
        return(
            <div className='row'>
                <form onSubmit={this.onSubmitPoint} style={{width: '100%'}} autoComplete='off'>
                    <div className='form-row'>
                        <div className='col-sm-12'>
                            <input
                                type="text"
                                className="form-control"
                                id="inputPoint"
                                placeholder="Enter name point"
                                onChange={this.onChangeValue}
                                value={this.state.inputValue}
                            />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}