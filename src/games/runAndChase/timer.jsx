import React, {Component} from 'react';

class Timer extends Component{
    render(){
        return(
            <div className="timerBoard">
                <h1 className="timeText">
                    {this.props.min}:{this.props.sec < 10 ? `0${this.props.sec}` : this.props.sec}
                </h1>
            </div>
        )
    }
}

export default Timer;
