import { useEffect, useReducer, useState } from "react";
import { BsCircleFill } from 'react-icons/bs';

export const ChatBar = ({ socket, setShow }) => {
  const [newUser, setNewUser] = useState([]);

  useEffect(() => {
    socket.on("newUserResponse", (data) => setNewUser(data)) 
  }, [newUser, socket]);

  return (
    <div className="chat__sidebar">
      <div className="chat__sidebar__inner">
      <button className="close__btn" onClick={() => setShow(false)}>X</button>
        <div>
          <h4 className="chat__header">Active users</h4>
          <div className="chat__users">
          {newUser.map(user => {
            if(user.username != localStorage.getItem("username")){ 
              return <p><BsCircleFill style={{width:"8px", color:"greenyellow", marginRight: "10px"}}/>{user.username}</p> 
            }
          })}
          </div>
        </div>
      </div>
    </div>
  );
};