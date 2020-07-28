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
import { black } from "material-ui/styles/colors";

export default class RunAndChase extends GameComponent {

  constructor(props) {
    super(props);
    this.state = {
      win: false,
      clicked: false,
      creatorCharacterX: 0,
      creatorCharacterY: 0,
      creatorCharacterColor: "black",
      otherCharacterX: 49,
      otherCharacterY: 33,
      otherCharacterColor: "white",
      min: 1,
      sec: 0,
    };
  }

  sendFirebaseData() {
    var databaseState = {
      win: this.state.win,
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
        win: data.win,
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
        clicked : true
      });
  }

  onKeyDown = (e) => {
      e = e || window.event;
      console.log(e.keyCode);
    
      if(this.getSessionCreatorUserId() === this.getMyUserId()){
        switch(e.keyCode) {
          case 87: //W
            if(this.state.creatorCharacterY > 0) {
              this.setState ({creatorCharacterY : this.state.creatorCharacterY-1});
              this.sendFirebaseData();
              this.isTouching();
            }
              break;
          case 83: //S
            if(this.state.creatorCharacterY < 34) {
              this.setState ({creatorCharacterY: this.state.creatorCharacterY+1});
              this.sendFirebaseData();
              this.isTouching();
            }
              break;
          case 65: //A
            if(this.state.creatorCharacterX > 0) {
              this.setState ({creatorCharacterX: this.state.creatorCharacterX-1});
              this.sendFirebaseData();
              this.isTouching();
            }
              break;
          case 68: //D
            if(this.state.creatorCharacterX < 49) {
              this.setState ({creatorCharacterX: this.state.creatorCharacterX+1});
              this.sendFirebaseData();
              this.isTouching();
            }
              break;
          }
      }else{
        switch(e.keyCode) {
          case 87: //W
            if(this.state.otherCharacterY > -1) {
              this.setState ({otherCharacterY : this.state.otherCharacterY-1});
              this.sendFirebaseData();
              this.isTouching();
            }
              break;
          case 83: //S
            if(this.state.otherCharacterY < 33) {
              this.setState ({otherCharacterY: this.state.otherCharacterY+1});
              this.sendFirebaseData();
              this.isTouching();
            }
              break;
          case 65: //A
            if(this.state.otherCharacterX > 0) {
              this.setState ({otherCharacterX: this.state.otherCharacterX-1});
              this.sendFirebaseData();
              this.isTouching();
            }
              break;
          case 68: //D
            if(this.state.otherCharacterX < 49) {
              this.setState ({otherCharacterX: this.state.otherCharacterX+1});
              this.sendFirebaseData();
              this.isTouching();
            }
              break;
        }
      }  
    }
      

    isTouching() {
      if(this.state.creatorCharacterX === this.state.otherCharacterX && this.state.creatorCharacterY-1 === this.state.otherCharacterY) {
        this.setState({
          win : true
        })
        this.sendFirebaseData();
        alert("Chaser Win");
      }
      if(this.state.min === 0 && this.state.sec === 0 && this.state.win !== true) {
        alert("Runner Win");
      } 
    }
 
  
  render() {
    return (
      <div className="container">
        <div className="board">
          {this.state.win === false ?
          <div>
            <Character playerXCoor={this.state.creatorCharacterX} playerYCoor={this.state.creatorCharacterY} color={this.state.creatorCharacterColor}/>
            <Character playerXCoor={this.state.otherCharacterX} playerYCoor={this.state.otherCharacterY} color={this.state.otherCharacterColor}/>
          </div>
            : null}
        </div>
        
        <div className="chatBox">
          <Timer min={this.state.min} sec={this.state.sec}/>
          {this.state.clicked === false ? 
          <button className="start" onClick={this.myInterval}> Start Game </button> : null }
        </div>
      </div>
    );
  }
}

