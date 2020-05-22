import Button from "@material-ui/core/Button";
import GameComponent from "../../GameComponent.js";
import React from "react";
import UserApi from "../../UserApi.js";
import Character from "./character.jsx";
import Runner from "./runner.jsx";
import Chaser from "./chaser.jsx";
import Timer from "./timer.jsx";
import "./css/game.css"
import { blue } from "@material-ui/core/colors";

export default class RunAndChase extends GameComponent {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.getSessionCreatorUserId(),
      creatorCharacterX: 0,
      creatorCharacterY: 0,
      creatorCharacterColor: "blue",
      otherCharacterX: 12,
      otherCharacterY: 12,
      otherCharacterColor: "red",
    };
    this.textInput = React.createRef();
  }

  sendFirebaseData() {
    var databaseState = {
          creatorCharacterX: this.state.creatorCharacterX,
          creatorCharacterY: this.state.creatorCharacterY,
          creatorCharacterColor: this.state.creatorCharacterColor, 
          otherCharacterX: this.state.otherCharacterX,
          otherCharacterY: this.state.otherCharacterY,
          otherCharacterColor: this.state.otherCharacterColor
        };
    this.getSessionDatabaseRef().set(databaseState, error => {
      if (error) {
        console.error("Error updating Kevin state", error);
      }
    });
    console.log("hi");
  }
  
  onSessionDataChanged(data) {
    this.setState({
      creatorCharacterX: data.creatorCharacterX,
      creatorCharacterY: data.creatorCharacterY,
      creatorCharacterColor: data.creatorCharacterColor, 
      otherCharacterX: data.otherCharacterX,
      otherCharacterY: data.otherCharacterY,
      otherCharacterColor: data.otherCharacterColor
    });
    console.log("hello");
    console.log(`data change ${data}`);
  }

  componentDidMount() {
      document.onkeydown = this.onKeyDown;
  }

  onKeyDown = (e) => {
      e = e || window.event;
      console.log(e.keyCode);

      switch(e.keyCode) {
        case 87: //W
            this.setState (
            {
              creatorCharacterY: this.state.creatorCharacterY-1
            });
            this.sendFirebaseData();
            break;
        case 83: //S
            this.setState (
            {
              creatorCharacterY: this.state.creatorCharacterY+1
            });
            this.sendFirebaseData();
            break;
        case 65: //A
            this.setState (
              {
                creatorCharacterX: this.state.creatorCharacterX-1
              });
              this.sendFirebaseData();
            break;
        case 68: //D
            this.setState (
              {
                creatorCharacterX: this.state.creatorCharacterX+1
              });
              this.sendFirebaseData();
            break;
        }
          
      }    

  // changeInfo() {
  //   var databaseState = {
  //     info: "abc"
  //   };
  //   this.getSessionDatabaseRef().set(databaseState, error => {
  //     if (error) {
  //       console.error("Error updating Kevin state", error);
  //     }
  //   });
  // }



  // submitText(e) {
  //   e.preventDefault();
  //   var databaseState = {
  //     info: this.textInput.current.value
  //   };
  //   this.getSessionDatabaseRef().set(databaseState, error => {
  //     if (error) {
  //       console.error("Error updating Kevin state", error);
  //     }
  //   });
  // }
  
  render() {
    
    return (

          <div className="container">
            <div className="board">
              <Character playerXCoor={this.state.creatorCharacterX} playerYCoor={this.state.creatorCharacterY} color={this.state.creatorCharacterColor}/>
              <Character playerXCoor={this.state.otherCharacterX} playerYCoor={this.state.otherCharacterY} color={this.state.otherCharacterColor}/>
            </div>
           
            <div className="chatBox">
              <Timer/>
              <button onClick= {() => this.sendFirebaseData()}> onClick </button>
              {/* <h1>Info: {this.state.info}</h1>
              <button onClick={() => this.changeInfo()}>Change Info</button>
              <form onSubmit={e => this.submitText(e)}>
                <input type="text" ref={this.textInput} />
              </form> */}
            </div>
              
          </div>
       
    );
  }
}

