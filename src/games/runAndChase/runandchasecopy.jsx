// import GameComponent from '../../GameComponent.js';
// import React, { Component } from 'react';
// import Board from './Board.jsx';
// import Movement from './Movement.jsx';
// import UserApi from '../../UserApi.js';

// export default class RunAndChase extends GameComponent{
//     render() {
//         var id = UserApi.getName(this.getSessionId());
//             var users = this.getSessionUserIds().map((user_id) => (
//               <li key={user_id}>{UserApi.getName(user_id)}</li>
//             ));
//             var creator = UserApi.getName(this.getSessionCreatorUserId());
//         return (
//             <div className="containe">
//                 <div className="outGame">
//                     <p>Session ID: {id}</p>
//                     <p>Session creator: {creator}</p>
//                     <p>Session users: {this.getSessionUsersIds} </p>
//                     <ul>
//                         {users}
//                     </ul>
//                 </div>

//             {/* <div className="inGame">
//                 <Board/>
//                 <Movement/>
//             </div> */}

//             </div>
              
//         )
//     }
// }
