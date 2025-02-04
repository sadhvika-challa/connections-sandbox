// src/App.js
import React from 'react';
import Controls from './components/controls';
import WordGrid from './components/sandbox';
import useWordGrid from './functions/useSandbox';
import './styles.css';

function App() {
  const {
    words,
    selectedIds,
    wordInput,
    setWordInput,
    addWord,
    resetGrid,
    onWordContextMenu,
    onWordPointerDown,
    onContainerPointerDown,
  } = useWordGrid();

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '20px',
        height: '100vh',
        backgroundColor: 'white',
        overflow: 'hidden'
      }}
    >
      <h2>NYT Connections Sandbox</h2>
      <Controls
        wordInput={wordInput}
        setWordInput={setWordInput}
        addWord={addWord}
        resetGrid={resetGrid}
      />
      <WordGrid
        words={words}
        selectedIds={selectedIds}
        onWordPointerDown={onWordPointerDown}
        onWordContextMenu={onWordContextMenu}
        onContainerPointerDown={onContainerPointerDown}
      />
    </div>
  );
}

export default App;
