import { X, Maximize2, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useRef } from 'react';

export default function GamePlayer({ game, onClose }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef(null);

  const toggleFullscreen = () => {
    if (!iframeRef.current) return;
    
    if (!isFullscreen) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const reloadGame = () => {
    if (iframeRef.current) {
      iframeRef.current.src = game.iframeUrl;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8"
      id="game-player-overlay"
    >
      <div className="relative w-full max-w-6xl h-full flex flex-col bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-zinc-700">
              <img src={game.thumbnail} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <h2 className="text-zinc-100 font-bold leading-none">{game.title}</h2>
              <span className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">{game.category}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={reloadGame}
              className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-colors"
              title="Reload Game"
            >
              <RotateCcw size={20} />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-colors"
              title="Fullscreen"
            >
              <Maximize2 size={20} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors ml-2"
              title="Close"
              id="close-game-button"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Game Area */}
        <div className="flex-1 bg-black relative">
          <iframe
            ref={iframeRef}
            src={game.iframeUrl}
            className="w-full h-full border-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Footer info */}
        <div className="p-4 bg-zinc-900/50 border-t border-zinc-800 hidden md:block">
          <p className="text-zinc-400 text-sm">
            {game.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
