import React from 'react';

const word = ({ word, selectedIds, onPointerDown, onContextMenu }) => {
  return (
    <div
      key={word.id}
      data-word-id={word.id}
      onPointerDown={(e) => onPointerDown(e, word)}
      onContextMenu={(e) => onContextMenu(e, word)}
      style={{
        width: '120px',
        height: '50px',
        backgroundColor: '#eff0e6',
        cursor: 'grab',
        userSelect: 'none',
        borderRadius: '10px',
        fontSize: '20px',
        fontWeight: '700',
        textTransform: 'uppercase',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: word.left,
        top: word.top,
        border: selectedIds.has(word.id) ? '2px solid black' : '2px solid transparent',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        touchAction: 'none'
      }}
    >
      {word.text}
    </div>
  );
};

export default word;
