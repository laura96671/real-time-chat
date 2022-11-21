import { useEffect, useState } from 'react';
import { ChatBody } from './ChatBody';
import { ChatFooter } from './ChatFooter';
import { ChatBar } from './ChatBar';

export const ChatPage = ({socket}) => {

    const [messages, setMessages] = useState([""]);

    useEffect(() => {
        socket.on("messageResponse", (data) => setMessages([...messages, data]));
    }, [socket, messages]);

    return (
        <div className="chat">
            <div className='chat__main'>
                <ChatBody messages={messages} socket={socket} />
                <ChatFooter socket={socket} />
            </div>
        </div>
    )
}