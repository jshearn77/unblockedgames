import { Play } from 'lucide-react';
import { motion } from 'motion/react';

export default function GameCard({ game, onSelect }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden group cursor-pointer"
      onClick={() => onSelect(game)}
      id={`game-card-${game.id}`}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-emerald-500 p-3 rounded-full text-black shadow-lg shadow-emerald-500/20">
            <Play size={24} fill="currentColor" />
          </div>
        </div>
        <div className="absolute top-2 left-2">
          <span className="bg-zinc-900/80 backdrop-blur-sm text-zinc-300 text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md border border-white/10">
            {game.category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-zinc-100 font-semibold text-lg mb-1 group-hover:text-emerald-400 transition-colors">
          {game.title}
        </h3>
        <p className="text-zinc-500 text-sm line-clamp-2">
          {game.description}
        </p>
      </div>
    </motion.div>
  );
}
