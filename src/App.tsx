import React, { useState, useEffect } from 'react';
import './App.css';

const App: React.FC = () => {
  const [currentLetter, setCurrentLetter] = useState<string>('');
  const [word, setWord] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const getRandomLetter = (): string => {
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  };

  const updateLetter = (): void => {
    setCurrentLetter(getRandomLetter());
  };

  const checkWord = (): void => {
    if (word.toLowerCase().startsWith(currentLetter.toLowerCase())) {
      setResult('Correct! Great job!');
      setTimeout(updateLetter, 1500);
    } else {
      setResult(`Try again. The word should start with ${currentLetter}`);
    }
    setWord('');
    
    // Clear the result message after 3 seconds
    setTimeout(() => {
      setResult('');
    }, 2000);
  };

  useEffect(() => {
    updateLetter();
  }, []);

  return (
    <div className="App">
      <h1>🎈 Letter Learning Game 🎈</h1>
      <div className="game-container">
        <div className="letter-display">{currentLetter}</div>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter a word"
        />
        <button onClick={checkWord}>Submit</button>
        {result && (
          <div className={`result ${result.startsWith('Correct') ? 'correct' : 'incorrect'}`}>
            {result}
          </div>
        )}
      </div>
      <div className="decorations">
        <span className="star">⭐</span>
        <span className="heart">❤️</span>
        <span className="sun">☀️</span>
      </div>
    </div>
  );
};

export default App;
