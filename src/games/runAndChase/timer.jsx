import React, {Component} from 'react';

class Timer extends Component{

    constructor(props) {
        super(props);
        this.state = {
          min: 40,
          sec: 0
        }
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { min, sec } = this.state
            if (sec > 0) {
              this.setState(({ sec }) => ({
                sec: sec - 1
              }))
            }
            if (sec === 0) {
              if (min === 0) {
                clearInterval(this.myInterval)
                alert("Runner Win");
              } else {
                this.setState(({ min }) => ({
                  min: min - 1,
                  sec: 59
                }))
              }
            }
          }, 1000)
    }

    render(){
        return(
            <div className="timerBoard">
                <h1 className="timeText">
                    {this.state.min}:{this.state.sec < 10 ? `0${this.state.sec}` : this.state.sec}
                </h1>
            </div>
        )
    }
}

export default Timer;
