import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { ChatPage } from './components/ChatPage';
import io from 'socket.io-client';
import './App.css';

const socket = io.connect('http://localhost:4000');

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home socket={socket} />}></Route>
        <Route path="/chat" element={<ChatPage socket={socket} />}></Route>   
      </Routes>
    </BrowserRouter>
  );
}

export default App;
