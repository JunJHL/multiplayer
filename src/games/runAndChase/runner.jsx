import React, { Component } from 'react';


let y = Math.floor(Math.random()*10);
let x = Math.floor(Math.random()*10);

class Runner extends Component{
    
     
    constructor(props) {
        super(props);
        this.state = {
            // chaserCoor: [1,2],
            // runnerCoor: [-1,0],
            playerCoor: [x, y]
        }
    }

    componentDidMount() {
        document.onkeydown = this.onKeyDown;
    }

    onKeyDown = (e) => {
        e = e || window.event;
        console.log(e.keyCode);

        // let chaser = this.state.chaserCoor;
        // let runner = this.state.runnerCoor;
        // let player = chaser;


        switch(e.keyCode) {
            case 87:
                this.setState( (state) => {
                    return {playerCoor: [state.playerCoor[0]-1, state.playerCoor[1]]}
                });
                break;
            case 83:
                this.setState( (state) => {
                    return {playerCoor: [state.playerCoor[0]+1, state.playerCoor[1]]}
                });
                break;
            case 65:
                this.setState( (state) => {
                    return {playerCoor: [state.playerCoor[0], state.playerCoor[1]-1]}
                });
                break;
            case 68:
                this.setState((state) => {
                    return {playerCoor: [state.playerCoor[0], state.playerCoor[1]+1]}
                });
                break;
            }
             
        }    

    render(){
       
        const playerStyle = {
            top: `${this.state.playerCoor[0]}rem`,
            left: `${this.state.playerCoor[1]}rem`
        }

        // const runnerStyle = {
        //     top: `${this.state.runnerCoor[0]}rem`,
        //     left: `${this.state.runnerCoor[1]}rem`
        // }

        
        return(
            <div> 
                <div className="char2" style={playerStyle}></div> 
            </div>
        )
    }
}

export default Runner;