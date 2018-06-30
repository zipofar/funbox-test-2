import React from 'react';

export default class AddPoint extends React.Component
{
    state = { value: '' };

    onChangeValue = (e) => {
        this.setState({ value: e.target.value });
    };

    onSubmitPoint = (e) => {
        e.preventDefault();
        console.log(this.state.value)
        this.setState({ value: '' });
    };

    render() {
        return(
            <div className='row'>
                <form onSubmit={this.onSubmitPoint}>
                    <div className='form-row'>
                        <div className='col'>
                            <input
                                type="text"
                                className="form-control"
                                id="inputPoint"
                                placeholder="New point route"
                                onChange={this.onChangeValue}
                                value={this.state.value}
                            />
                        </div>
                        <div className='col'>
                            <button type="submit" className="btn btn-primary">Add</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}