import { useState } from 'react';
import Lobby from './components/Lobby';
import Game from './components/Game';

const App = () => {
  const [roomId, setRoomId] = useState('');
  const [status, setStatus] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div>
      {!gameStarted ? (
        <Lobby
          setRoomId={setRoomId}
          setStatus={setStatus}
          setGameStarted={setGameStarted}
          status={status}
          roomId={roomId}
        />
      ) : (
        <Game roomId={roomId} />
      )}
    </div>
  );
};

export default App;
