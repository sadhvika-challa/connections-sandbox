// src/components/Controls.js
import React from 'react';

const controls = ({ wordInput, setWordInput, addWord, resetGrid }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginBottom: '20px',
        backgroundColor: 'white',
        padding: '10px',
        width: '100%',
        maxWidth: '500px'
      }}
    >
      {/* First row: Enter word */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <input
          type="text"
          placeholder="Enter a word"
          value={wordInput}
          onChange={(e) => setWordInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') addWord();
          }}
        />
        <button onClick={addWord}>Add Word</button>
      </div>
      {/* Second row: Choose image */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <input type="file" accept="image/*" />
      </div>
      {/* Third row: Reset grid */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button onClick={resetGrid}>Reset Grid</button>
      </div>
    </div>
  );
};

export default controls;