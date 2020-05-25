import React, {Component} from 'react';

class Ann extends Component{
    print() {
        const color = `${this.props.currentUserColor}`;
        const current = `${this.props.currentStatus}`;
        let an = "You Win";
        if(current === true) {
            if(color === "black") {
                an = "You lost";
                return an;
            }
            return an;
        }
        return null;
    }
    
    render(){
        return(
            <div className="titleBoard">

                <h1 className="title">
                    {this.print()}
                </h1>
            </div>
        )
    }
}

export default Ann;
