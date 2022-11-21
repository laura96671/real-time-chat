import { useState } from "react";
import { IoIosArrowUp } from 'react-icons/io';

export const ChatFooter = ({socket}) => {

    const [message, setMessage] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if(message.trim() && localStorage.getItem("username")){
            socket.emit("message", {
                text: message,
                name: localStorage.getItem("username"),
                id: `${socket.id}${Math.random()}`,
                socketID: socket.id
            });
        };
        setMessage("");
    }

    return(
        <div className="chat__footer">
            <form className="chat__form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Wite text..."
                    className="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className="sendBtn">
                    <IoIosArrowUp style={{color: "white", width: "20px", height: "20px"}}/>
                </button>
            </form>
        </div>
    )
}