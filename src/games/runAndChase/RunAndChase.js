import Button from "@material-ui/core/Button";
import GameComponent from "../../GameComponent.js";
import React, {useEffect, useState} from "react";
import UserApi from "../../UserApi.js";
import Character from "./character.jsx";
import Runner from "./runner.jsx";
import Chaser from "./chaser.jsx";
import Timer from "./timer.jsx";
import "./css/game.css"
import { blue } from "@material-ui/core/colors";
import GameCard from "../../GameCard.js";
import gameData from "../../gameData.js"

export default class RunAndChase extends GameComponent {

  constructor(props) {
    super(props);
    this.state = {
      timerRunning : false,
      creatorCharacterX: 0,
      creatorCharacterY: 0,
      creatorCharacterColor: "blue",
      otherCharacterX: 12,
      otherCharacterY: 12,
      otherCharacterColor: "red",
      min: 0,
      sec: 5
    };
  }

  sendFirebaseData() {
    var databaseState = {
      timerRunning : this.state.timerRunning,
      creatorCharacterX: this.state.creatorCharacterX,
      creatorCharacterY: this.state.creatorCharacterY,
      creatorCharacterColor: this.state.creatorCharacterColor,
      otherCharacterX: this.state.otherCharacterX,
      otherCharacterY: this.state.otherCharacterY,
      otherCharacterColor: this.state.otherCharacterColor,
      min: this.state.min,
      sec: this.state.sec
    };
      
    this.getSessionDatabaseRef().set(databaseState, error => {
      if (error) {
        console.error("Error updating Kevin state", error);
      }
    });
  }
  
  onSessionDataChanged(data) {
      this.setState({
        timerRunning : data.timerRunning,
        creatorCharacterX: data.creatorCharacterX,
        creatorCharacterY: data.creatorCharacterY,
        creatorCharacterColor: data.creatorCharacterColor,
        otherCharacterX: data.otherCharacterX,
        otherCharacterY: data.otherCharacterY,
        otherCharacterColor: data.otherCharacterColor,
        min : data.min,
        sec : data.sec
    });
  }

  componentDidMount() {
    this.getSessionDatabaseRef().on("value", snapshot => {
      if (snapshot.val() !== null) {
        this.onSessionDataChanged(snapshot.val());
      }
    });

    this.getSessionMetadataDatabaseRef().on("value", snapshot => {
      let data = snapshot.val();
      if (data !== null) {
        let sessionMetadata = {
          creator: data.creator,
          users: data.users,
        }
        if (data.type in gameData) {
          sessionMetadata.title = gameData[data.type].title;
        }
        let newState = this.state;
        newState.metadata = sessionMetadata;
        this.setState(newState);
        this.onSessionMetadataChanged(data);
      }
    });
    document.onkeydown = this.onKeyDown;
  }

  myInterval = () => {
    setInterval(() => {
      if (this.state.sec > 0) {
        this.setState({
          sec: this.state.sec - 1
        });
        this.sendFirebaseData();
      }
      if (this.state.sec === 0) {
        if (this.state.min === 0) {
          clearInterval(this.myInterval);
          alert("runner win");
        } else {
          this.setState({
            min: this.state.min - 1,
            sec: 59
          });
          this.sendFirebaseData();
        }
      }
    }, 1000);
    this.setState({
      timerRunning : true
    });
    console.log(this.state.timerRunning);
    this.sendFirebaseData();
  }

  resetGame() {
    this.setState({
      min: 3,
      sec: 0,
      timerRunning : false,
      creatorCharacterX: 0,
      creatorCharacterY: 0,
      creatorCharacterColor: "blue",
      otherCharacterX: 12,
      otherCharacterY: 12,
      otherCharacterColor: "red"
    });
    this.sendFirebaseData();
  }

  onKeyDown = (e) => {
      e = e || window.event;
      console.log(e.keyCode);
      if(this.getSessionCreatorUserId() === this.getMyUserId()){
        switch(e.keyCode) {
          case 87: //W
              this.setState ({creatorCharacterY : this.state.creatorCharacterY-1});
              this.sendFirebaseData();
              this.isTouching();
              break;
          case 83: //S
              this.setState ({creatorCharacterY: this.state.creatorCharacterY+1});
              this.sendFirebaseData();
              this.isTouching();
              break;
          case 65: //A
              this.setState ({creatorCharacterX: this.state.creatorCharacterX-1});
              this.sendFirebaseData();
              this.isTouching();
              break;
          case 68: //D
              this.setState ({creatorCharacterX: this.state.creatorCharacterX+1});
              this.sendFirebaseData();
              this.isTouching();
              break;
          }
      }else{
        switch(e.keyCode) {
          case 87: //W
              this.setState ({otherCharacterY : this.state.otherCharacterY-1});
              this.sendFirebaseData();
              this.isTouching();
              break;
          case 83: //S
              this.setState ({otherCharacterY: this.state.otherCharacterY+1});
              this.sendFirebaseData();
              this.isTouching();
              break;
          case 65: //A
              this.setState ({otherCharacterX: this.state.otherCharacterX-1});
              this.sendFirebaseData();
              this.isTouching();
              break;
          case 68: //D
              this.setState ({otherCharacterX: this.state.otherCharacterX+1});
              this.sendFirebaseData();
              this.isTouching();
              break;
        }
      }   
    }    

    isTouching() {
      if(this.state.creatorCharacterX === this.state.otherCharacterX && this.state.creatorCharacterY === this.state.otherCharacterY) {
        this.setState({
          min: 0,
          sec: 0
        })
        this.sendFirebaseData();
        alert("chaser Win");
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
            {this.state.timerRunning === false ? 
              <button className="start" onClick={this.myInterval}> Start Timer </button>
              : null}
            {this.state.min === 0 && this.state.sec === 0 ? 
              <button onClick = {() => this.resetGame()}> resetGame </button> 
              : null}
            <div className="board">
              <Character playerXCoor={this.state.creatorCharacterX} playerYCoor={this.state.creatorCharacterY} color={this.state.creatorCharacterColor}/>
              <Character playerXCoor={this.state.otherCharacterX} playerYCoor={this.state.otherCharacterY} color={this.state.otherCharacterColor}/>
            </div>
           
            <div className="chatBox">
              <Timer min={this.state.min} sec={this.state.sec}/>
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

