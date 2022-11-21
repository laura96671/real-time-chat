import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const Home = ({socket}) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        socket.emit("addElem", username);
        socket.emit('newUser', { username, socketID: socket.id });
        localStorage.setItem("username", username);
        navigate("/chat");
    }

    return (
        <div className='form__home__container'>
            <form className='home__container' onSubmit={handleSubmit}>
                <p className='home__header'>ENTER USERNAME</p>
                <input 
                    id='username'
                    name='username'
                    minLength={6}
                    className='username__input'
                    placeholder='Your username'
                    value={username}
                    onChange={(e) => {setUsername(e.target.value)}}
                /><br/>
                <button className='home__cta'>SIGN IN</button>
            </form>
        </div>
    )
}