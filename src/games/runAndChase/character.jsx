import React, { Component } from 'react';

class Character extends Component{
    
    constructor(props) {
        super(props);
        
    }

    render(){
        const playerStyle = {
            top: `${this.props.playerYCoor}rem`,
            left: `${this.props.playerXCoor}rem`,
            backgroundColor: `${this.props.color}`
        }

        // const runnerStyle = {
        //     top: `${this.state.runnerCoor[0]}rem`,
        //     left: `${this.state.runnerCoor[1]}rem`
        // }

        
        return(
            <div> 
                <div className="char" style={playerStyle}></div> 
            </div>
        )
    }
}

export default Character;