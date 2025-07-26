
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Board from './components/Board';
import Scoreboard from './components/Scoreboard';
import Modal from './components/Modal';
import ThemeToggle from './components/ThemeToggle';
import { useTheme } from './hooks/useTheme';
import { calculateWinner } from './utils/calculateWinner';
import { getComputerMove } from './utils/computerMove'; 
import { PLAYERS, GAME_MODES, GAME_SCREENS, WINNING_SCORE } from './constants';

const App = () => {
  const [theme, toggleTheme] = useTheme();
  const [screen, setScreen] = useState(GAME_SCREENS.HOME);
  const [gameMode, setGameMode] = useState(null);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [isPaused, setIsPaused] = useState(false);
  const [roundWinner, setRoundWinner] = useState(null);
  const [gameWinner, setGameWinner] = useState(null);

  const currentPlayer = xIsNext ? PLAYERS.X : PLAYERS.O;

  
  useEffect(() => {
    if (gameMode === GAME_MODES.PLAYER_VS_COMPUTER && !xIsNext && !roundWinner) {
      const timer = setTimeout(() => {
        const computerMove = getComputerMove(board);
        if (computerMove !== null) {
          handlePlay(computerMove);
        }
      }, 500); 
      return () => clearTimeout(timer);
    }
  }, [xIsNext, board, gameMode, roundWinner]);

  
  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      setRoundWinner(winner);
      if (winner !== 'draw') {
        const newScores = { ...scores, [winner]: scores[winner] + 1 };
        setScores(newScores);
        if (newScores[winner] >= WINNING_SCORE) {
          setGameWinner(winner);
          setScreen(GAME_SCREENS.WINNER);
        }
      }
    }
  }, [board]);

  const handlePlay = (i) => {
    if (board[i] || roundWinner) return;

    const newBoard = board.slice();
    newBoard[i] = currentPlayer;
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const handleStartGame = (mode) => {
    setGameMode(mode);
    setScreen(GAME_SCREENS.GAME);
    resetGame();
  };

  const resetRound = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setRoundWinner(null);
  };
  
  const resetGame = () => {
    resetRound();
    setScores({ X: 0, O: 0 });
    setGameWinner(null);
  };

  const handleGoHome = () => {
    resetGame();
    setIsPaused(false);
    setScreen(GAME_SCREENS.HOME);
  };
  
  const handleReplay = () => {
    resetGame();
    setScreen(GAME_SCREENS.GAME);
  };

  const renderScreen = () => {
    const pageTransition = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.5 }
    };

    switch (screen) {
      case GAME_SCREENS.HOME:
        return (
          <motion.div key="home" {...pageTransition} className="flex flex-col items-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center">Welcome to the Gauntlet</h2>
            <p className="text-lg text-center text-gray-400">- By Shubhi Sharma -</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="btn-primary" onClick={() => handleStartGame(GAME_MODES.PLAYER_VS_PLAYER)}>Play with a Player</button>
              <button className="btn-secondary" onClick={() => handleStartGame(GAME_MODES.PLAYER_VS_COMPUTER)}>Play with Computer</button>
            </div>
          </motion.div>
        );

      case GAME_SCREENS.GAME:
        return (
          <motion.div key="game" {...pageTransition} className="flex flex-col items-center">
            <div className="flex justify-between w-full max-w-md items-center mb-4">
              <p className="text-2xl font-bold">
                Turn: <span className={currentPlayer === 'X' ? 'text-neon-blue' : 'text-neon-pink'}>{currentPlayer}</span>
              </p>
              <button onClick={() => setIsPaused(true)} className="px-4 py-2 bg-white/10 rounded-md hover:bg-white/20">PAUSE</button>
            </div>
            <Board squares={board} onClick={handlePlay} />
            <Scoreboard scores={scores} />
            {roundWinner && (
              <div className="mt-4 text-center">
                <h3 className="text-3xl font-bold">
                  {roundWinner === 'draw' ? 'It\'s a Draw!' : `Round Winner: ${roundWinner}`}
                </h3>
                <button onClick={resetRound} className="mt-4 btn-primary">Next Round</button>
              </div>
            )}
          </motion.div>
        );

      case GAME_SCREENS.WINNER:
        return (
          <motion.div key="winner" {...pageTransition} className="text-center">
             <h2 className="text-5xl font-bold mb-4">
               <span className={gameWinner === 'X' ? 'text-neon-blue' : 'text-neon-pink'}>
                 {gameWinner}
               </span> WINS THE GAUNTLET!
             </h2>
             <p className="text-xl mb-8">Final Score: {scores.X} - {scores.O}</p>
             <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
               <button onClick={handleReplay} className="btn-primary">Replay</button>
               <button onClick={handleGoHome} className="btn-secondary">Back to Home</button>
             </div>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between font-sans overflow-hidden">
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {renderScreen()}
        </AnimatePresence>
      </main>
      <Footer />

      {/* Pause Modal */}
      <Modal isOpen={isPaused}>
        <h2 className="text-4xl font-bold mb-8 text-shadow-neon-blue">PAUSED</h2>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button onClick={() => setIsPaused(false)} className="btn-primary">Resume</button>
          <button onClick={handleGoHome} className="btn-secondary">Back to Home</button>
        </div>
      </Modal>
    </div>
  );
};

export default App;