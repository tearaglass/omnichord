import React from 'react';
import './ChordButtons.css';

function ChordButtons({ onChordPress, currentChord }) {
  const chords = ['C', 'F', 'G', 'Am', 'Dm', 'Em'];

  return (
    <div className="chord-buttons">
      {chords.map(chord => (
        <button 
          key={chord} 
          className={`chord-button ${currentChord === chord ? 'selected' : ''}`}
          onClick={() => onChordPress(chord)}
        >
          {chord}
        </button>
      ))}
    </div>
  );
}

export default ChordButtons;