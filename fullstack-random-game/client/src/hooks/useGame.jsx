import { useEffect, useState } from 'react';
import { useSocket } from '../hooks/useSocket';

export const useGame = (roomId) => {
  const socket = useSocket();
  const [generatedNumber, setGeneratedNumber] = useState(null);
  const [hasChosen, setHasChosen] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!socket || !roomId) return;

    socket.emit('generateNumber', roomId);

    return () => {
      socket.off('generateNumber');
    };
  }, [socket, roomId]);

  useEffect(() => {
    if (!socket) return;

    const handleGeneratedNumber = (num) => {
      setGeneratedNumber(num);
      console.log('Received number: ', num);
    };

    const handleResult = (result) => {
      setResult(result);
      console.log('Received result: ', result);
    };

    const handleNewRound = () => {
      setGeneratedNumber(null);
      setHasChosen(false);
    };

    socket.on('generatedNumber', handleGeneratedNumber);
    socket.on('result', handleResult);
    socket.on('newRound', handleNewRound);

    return () => {
      socket.off('generatedNumber', handleGeneratedNumber);
      socket.off('result', handleResult);
      socket.off('newRound', handleNewRound);
    };
  }, [socket]);

  const generateNumber = () => {
    socket.emit('generateNumber', roomId);
    setResult(null);
  };

  const chooseSolution = (solution) => {
    console.log(solution);
    setHasChosen(true);
    socket.emit('chooseSolution', roomId, solution);
  };

  return { generatedNumber, generateNumber, chooseSolution, hasChosen, result };
};
