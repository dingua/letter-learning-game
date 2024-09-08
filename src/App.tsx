import React, { useState, useEffect } from 'react';
import './App.css';

const App: React.FC = () => {
  const [currentLetter, setCurrentLetter] = useState<string>('');
  const [word, setWord] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const getRandomLetter = (): string => {
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  };

  const updateLetter = (): void => {
    setCurrentLetter(getRandomLetter());
  };

  const checkWordInDictionary = async (word: string): Promise<boolean> => {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      return response.ok;
    } catch (error) {
      console.error('Error checking word:', error);
      return false;
    }
  };

  const checkWord = async (): Promise<void> => {
    setIsLoading(true);
    if (word.toLowerCase().startsWith(currentLetter.toLowerCase())) {
      const isValidWord = await checkWordInDictionary(word);
      if (isValidWord) {
        setResult('Correct! Great job!');
        setTimeout(updateLetter, 1500);
      } else {
        setResult(`"${word}" is not a valid word. Try again!`);
      }
    } else {
      setResult(`Try again. The word should start with ${currentLetter}`);
    }
    setWord('');
    setIsLoading(false);
    
    setTimeout(() => {
      setResult('');
    }, 3000);
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
          disabled={isLoading}
        />
        <button onClick={checkWord} disabled={isLoading}>
          {isLoading ? 'Checking...' : 'Submit'}
        </button>
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
