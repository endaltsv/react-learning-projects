import { useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';

export const useRoom = ({ setRoomId, setStatus, setGameStarted, roomId }) => {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on('roomFull', (roomId) => setStatus('Room ' + roomId + ' is full'));
    socket.on('roomCreated', (roomId) => {
      setStatus('Room created: ' + roomId);
      setRoomId(roomId);
    });

    socket.on('joinedRoom', (roomId) => {
      setRoomId(roomId);
      setStatus('Joined room: ' + roomId);
    });

    socket.on('startGame', () => {
      console.log('startGame');
      setGameStarted(true);
    });

    return () => {
      socket.off('roomCreated');
      socket.off('roomFull');
      socket.off('joinedRoom');
      socket.off('startGame');
    };
  }, [socket, setRoomId, setStatus, setGameStarted]);

  const joinRoom = () => {
    if (!socket || roomId) {
      setStatus('You already joined room: ' + roomId);
      return;
    }
    socket.emit('joinRoom');
  };

  const leaveRoom = (roomId) => {
    if (!socket || !roomId) return;
    socket.emit('leaveRoom', roomId);
    setRoomId('');
    setStatus('Left the room');
  };

  return { joinRoom, leaveRoom };
};
