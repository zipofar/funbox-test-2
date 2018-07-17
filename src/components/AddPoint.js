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

    resetState = () => {
        this.setState({ inputValue: '', searchedPoints: [],  currentPoint: [] });
    };

    savePoint = () => {
        this.props.addPoint(this.state.currentPoint);
        this.resetState();
    };

    onSubmitPoint = (e) => {
        e.preventDefault();

        //this.savePoint();
    };

    onBlurPointInput = () => {
        setTimeout(() => this.resetState(), 400);
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
                                onBlur={this.onBlurPointInput}
                                value={this.state.inputValue}
                            />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}