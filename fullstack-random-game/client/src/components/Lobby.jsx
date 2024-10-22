import React from 'react';
import { useRoom } from '../hooks/useRoom';

export default function Lobby({
  roomId,
  setRoomId,
  setStatus,
  setGameStarted,
  status,
}) {
  const { joinRoom, leaveRoom } = useRoom({
    setRoomId,
    setStatus,
    setGameStarted,
    roomId,
  });

  return (
    <div>
      <button onClick={joinRoom} disabled={!!roomId}>
        {roomId ? 'Вы уже в комнате' : 'Найти комнату'}
      </button>
      <p>
        <span>{status}</span>
        {roomId && (
          <button onClick={() => leaveRoom(roomId)}>Выйти из комнаты</button>
        )}
      </p>
    </div>
  );
}
