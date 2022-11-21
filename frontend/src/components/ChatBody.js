import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ChatBar } from './ChatBar';
import { HiUsers } from 'react-icons/hi';
import { IoIosArrowBack } from 'react-icons/io';

export const ChatBody = ({messages, socket}) => {

    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    const handleLeaveChat = () => {
        localStorage.removeItem('userName');
        navigate('/');
        window.location.reload();
    };

    const clickHandler = (e) => {
        e.preventDefault();
        setShow(true);
    }
    
    return(
        <div className='app__container'>
            <header className="chat__mainHeader">
                <button className="leaveChat__btn" onClick={handleLeaveChat}>
                    <IoIosArrowBack style={{height:"20px", width:"20px"}}/>
                </button>
                <p>Chatting...</p>
                <button className='users__btn' onClick={clickHandler}>
                    <HiUsers style={{ width:"20px", height:"20px" }}/>
                </button>
            </header>
            <div className='message__container'>
                {messages.map(message => 
                    message.name === localStorage.getItem("username") ? (
                        <div className='message__chats' key={message.id}>
                            <p className='sender__name'>You</p>
                            <div className='message__sender'>
                                <p>{message.text}</p>
                            </div>
                        </div>
                    ) : (
                    <div className='message_chats' key={message.id}>
                            <p className='user__sender__name'>{message.name}</p>
                            <div className='message__recipient'>
                                <p>{message.text}</p>
                            </div>
                    </div>
                    )
                )}
            </div>
            {show && <ChatBar socket={socket} setShow={setShow} />}
        </div>
    )
}