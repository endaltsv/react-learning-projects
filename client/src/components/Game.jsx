import React from 'react';
import { useGame } from '../hooks/useGame';

export default function Game({ roomId }) {
  const { generatedNumber, generateNumber, result, chooseSolution, hasChosen } =
    useGame(roomId);

  const handleRestartGame = () => {
    generateNumber();
  };

  return (
    <>
      <div>Game</div>

      {generatedNumber ? (
        <>
          <p>Ваше число: {generatedNumber}</p>
          <button disabled={hasChosen} onClick={() => chooseSolution('less')}>
            Меньше
          </button>
          <button disabled={hasChosen} onClick={() => chooseSolution('more')}>
            Больше
          </button>
        </>
      ) : (
        <p>{result && `Результат: ${result}`}</p>
      )}

      <button onClick={handleRestartGame}>Начать новый раунд</button>
    </>
  );
}
