import React, { useState } from 'react';
import './Alphabet.css'

const AlphabetGrid = () => {
  const [outputString, setOutputString] = useState('');

  const handleTileClick = (letter) => {
    let newString = outputString + letter;
    const regex = /(.)\1{2,}/g;
    newString = newString.replace(regex, (match) => '_'.repeat(match.length));
    setOutputString(newString);
  };

  return (
    <div className="alphabet-grid">
      <div id="outputString">{outputString}</div>
      {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
        <div key={letter} className="tile" onClick={() => handleTileClick(letter)}>
          {letter}
        </div>
      ))}
      
    </div>
  );
};

const App = () => <AlphabetGrid />;

export default App;