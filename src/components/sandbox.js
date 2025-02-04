// src/components/WordGrid.js
import React from 'react';
import Word from './word';

const sandbox = ({ words, selectedIds, onWordPointerDown, onWordContextMenu, onContainerPointerDown }) => {
  return (
    <div
      onPointerDown={onContainerPointerDown}
      style={{
        position: 'relative',
        width: '100vw',
        height: 'calc(100vh - 120px)',
        backgroundColor: 'white',
        overflow: 'hidden'
      }}
    >
      {words.map((word) => (
        <Word
          key={word.id}
          word={word}
          selectedIds={selectedIds}
          onPointerDown={onWordPointerDown}
          onContextMenu={onWordContextMenu}
        />
      ))}
    </div>
  );
};

export default sandbox;