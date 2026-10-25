import { useState, useEffect } from 'react';

// Step 1 & 3: Reusable Square Component with Props (Step 4 & 5)
function Square({ value, onSquareClick, isWinningSquare }) {
  return (
    <button
      className={`square ${value ? (value === 'X' ? 'x-marker' : 'o-marker') : ''} ${
        isWinningSquare ? 'winning' : ''
      }`}
      onClick={onSquareClick}
      aria-label={value ? `Square with ${value}` : 'Empty square'}
    >
      {value}
    </button>
  );
}

// Step 2, 7 & 8: Board Component with Game Logic and State lifted up
function Board({ xIsNext, squares, onPlay }) {
  const winInfo = calculateWinner(squares);
  const winner = winInfo?.winner;
  const winningLine = winInfo?.line || [];

  const isDraw = !winner && squares.every((square) => square !== null);

  function handleClick(i) {
    if (squares[i] || winner) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  let status;
  let statusClass = '';
  if (winner) {
    status = `🎉 Winner: ${winner}`;
    statusClass = 'status-winner';
  } else if (isDraw) {
    status = '🤝 Match Drawn!';
    statusClass = 'status-draw';
  } else {
    status = `Next Player: ${xIsNext ? 'X' : 'O'}`;
    statusClass = xIsNext ? 'status-x' : 'status-o';
  }

  return (
    <div className="board-container">
      <div className={`status-badge ${statusClass}`}>{status}</div>
      <div className="board-grid">
        {[0, 1, 2].map((row) => (
          <div key={row} className="board-row">
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              return (
                <Square
                  key={index}
                  value={squares[index]}
                  onSquareClick={() => handleClick(index)}
                  isWinningSquare={winningLine.includes(index)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// Step 9 & 10: Game Component with History & Time Travel + Theme Customization
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  // Theme states: Default is white/light theme as requested
  const [theme, setTheme] = useState(() => localStorage.getItem('ttt_theme') || 'light');
  const [accent, setAccent] = useState(() => localStorage.getItem('ttt_accent') || 'indigo');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ttt_theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent);
    localStorage.setItem('ttt_accent', accent);
  }, [accent]);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Go to move #${move}`;
    } else {
      description = 'Go to game start';
    }

    const isCurrent = move === currentMove;

    return (
      <li key={move}>
        <button
          className={`history-btn ${isCurrent ? 'active-move' : ''}`}
          onClick={() => jumpTo(move)}
        >
          {isCurrent ? `👉 You are at #${move === 0 ? 'start' : move}` : description}
        </button>
      </li>
    );
  });

  const accentColors = [
    { id: 'indigo', name: 'Indigo', color: '#6366f1' },
    { id: 'blue', name: 'Ocean', color: '#0284c7' },
    { id: 'emerald', name: 'Emerald', color: '#10b981' },
    { id: 'rose', name: 'Rose', color: '#f43f5e' },
    { id: 'violet', name: 'Purple', color: '#8b5cf6' },
  ];

  return (
    <div className="game-wrapper">
      {/* Theme Toolbar */}
      <div className="theme-toolbar">
        <div className="theme-toggle-group">
          <span className="theme-label">Theme:</span>
          <button
            type="button"
            className={`theme-mode-btn ${theme === 'light' ? 'active' : ''}`}
            onClick={() => setTheme('light')}
            title="Light (White) Theme"
          >
            ☀️ White
          </button>
          <button
            type="button"
            className={`theme-mode-btn ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => setTheme('dark')}
            title="Dark Theme"
          >
            🌙 Dark
          </button>
        </div>

        <div className="accent-picker-group">
          <span className="theme-label">Accent:</span>
          <div className="accent-dots">
            {accentColors.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`accent-dot ${accent === item.id ? 'active' : ''}`}
                style={{ backgroundColor: item.color }}
                onClick={() => setAccent(item.id)}
                title={item.name}
              />
            ))}
          </div>
        </div>
      </div>

      <header className="game-header">
        <h1 className="game-title">React Tic-Tac-Toe</h1>
        <p className="game-subtitle">Official React Tutorial Implementation with Time Travel</p>
      </header>

      <div className="game-layout">
        <div className="game-board-section">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />

          <button className="reset-btn" onClick={resetGame}>
            🔄 Restart Game
          </button>
        </div>

        <div className="game-info-section">
          <div className="history-card">
            <h2 className="history-title">⏱️ Move History</h2>
            <ol className="history-list">{moves}</ol>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 8: Game Logic - Winner calculation function
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: lines[i],
      };
    }
  }
  return null;
}
