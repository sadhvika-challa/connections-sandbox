// src/hooks/useSandbox.js
import { useState, useRef, useEffect } from 'react';

const useSandbox = () => {
  const [words, setWords] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [wordInput, setWordInput] = useState('');
  const dragData = useRef(null);

  const addWord = () => {
    const trimmed = wordInput.trim();
    if (!trimmed) return;
    const newWordText = trimmed.toUpperCase();
    const newId = Date.now(); // simple unique id based on timestamp

    // Compute initial position in a 4x grid.
    const gridSize = 4;
    const index = words.length;
    const startX = window.innerWidth / 2 - gridSize * 70;
    const startY = 50;
    const left = startX + (index % gridSize) * 140;
    const top = startY + Math.floor(index / gridSize) * 70;

    setWords(prev => [...prev, { id: newId, text: newWordText, left, top }]);
    setWordInput('');
  };

  const resetGrid = () => {
    setSelectedIds(new Set());
    setWords(prev =>
      prev.map((word, index) => {
        const gridSize = 4;
        const startX = window.innerWidth / 2 - gridSize * 70;
        const startY = 50;
        const left = startX + (index % gridSize) * 140;
        const top = startY + Math.floor(index / gridSize) * 70;
        return { ...word, left, top };
      })
    );
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
  };

  const onWordContextMenu = (e, word) => {
    e.preventDefault();
    const newText = prompt('Edit word:', word.text);
    if (newText && newText.trim() !== '') {
      setWords(prev =>
        prev.map(w =>
          w.id === word.id ? { ...w, text: newText.trim().toUpperCase() } : w
        )
      );
    }
  };

  const onWordPointerDown = (e, word) => {
    if (e.button !== 0) return; // Only handle left-click drags.

    // If Shift is held, toggle selection; otherwise, select only this word.
    if (e.shiftKey) {
      toggleSelect(word.id);
    } else {
      if (!selectedIds.has(word.id)) {
        clearSelection();
        setSelectedIds(new Set([word.id]));
      }
    }

    // Record the starting pointer position and positions for all selected words.
    const startX = e.clientX;
    const startY = e.clientY;
    const startPositions = {};
    words.forEach((w) => {
      if (selectedIds.has(w.id) || w.id === word.id) {
        startPositions[w.id] = { left: w.left, top: w.top };
      }
    });
    dragData.current = { startX, startY, startPositions, dragging: false };
    const dragThreshold = 3;

    const onPointerMove = (moveEvent) => {
      const dx = moveEvent.clientX - dragData.current.startX;
      const dy = moveEvent.clientY - dragData.current.startY;
      if (!dragData.current.dragging && Math.sqrt(dx * dx + dy * dy) > dragThreshold) {
        dragData.current.dragging = true;
      }
      if (dragData.current.dragging) {
        setWords(prev =>
          prev.map((w) => {
            if (selectedIds.has(w.id) || w.id === word.id) {
              const startPos = dragData.current.startPositions[w.id];
              return { ...w, left: startPos.left + dx, top: startPos.top + dy };
            }
            return w;
          })
        );
      }
    };

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    e.preventDefault();
  };

  // When clicking outside any word, clear the selection.
  const onContainerPointerDown = (e) => {
    if (!e.target.getAttribute('data-word-id')) {
      clearSelection();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      // Optionally, reset positions on window resize.
      // resetGrid();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    words,
    selectedIds,
    wordInput,
    setWordInput,
    addWord,
    resetGrid,
    onWordContextMenu,
    onWordPointerDown,
    onContainerPointerDown,
  };
};

export default useSandbox;
