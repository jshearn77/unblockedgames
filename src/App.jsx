import { useState, useMemo } from 'react';
import { Search, Gamepad2, Filter, Info, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './games.json';
import GameCard from './components/GameCard';
import GamePlayer from './components/GamePlayer';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGame, setSelectedGame] = useState(null);

  const categories = useMemo(() => {
    const cats = new Set(gamesData.map(g => g.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-emerald-500/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-zinc-800 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}>
            <div className="bg-emerald-500 p-2 rounded-xl text-black rotate-[-10deg] group-hover:rotate-0 transition-transform">
              <Gamepad2 size={24} />
            </div>
            <h1 className="text-xl font-black tracking-tighter uppercase italic">
              Unblocked<span className="text-emerald-500">Hub</span>
            </h1>
          </div>

          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all text-sm"
              id="search-input"
            />
          </div>

          <div className="hidden md:flex items-center gap-6 text-zinc-400 text-sm font-medium">
            <a href="#" className="hover:text-emerald-400 transition-colors">Home</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">New</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Popular</a>
            <div className="h-4 w-[1px] bg-zinc-800" />
            <button className="p-2 hover:bg-zinc-900 rounded-lg transition-colors">
              <Info size={18} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Categories */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
          <Filter size={16} className="text-zinc-500 mr-2 shrink-0" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border shrink-0 ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-black border-emerald-500 shadow-lg shadow-emerald-500/20'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Game Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <GameCard game={game} onSelect={setSelectedGame} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
            <Search size={48} className="mb-4 opacity-20" />
            <p className="text-lg font-medium">No games found matching your search</p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
              className="mt-4 text-emerald-500 hover:underline text-sm"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 mt-20 py-12 px-4 md:px-8 bg-zinc-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <Gamepad2 className="text-emerald-500" size={20} />
              <span className="font-black tracking-tighter uppercase italic text-lg">Unblocked<span className="text-emerald-500">Hub</span></span>
            </div>
            <p className="text-zinc-500 text-xs">© 2026 UnblockedHub. All rights reserved.</p>
          </div>
          
          <div className="flex gap-8 text-zinc-500 text-xs font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Contact Us</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-zinc-500 hover:text-zinc-100 transition-colors">
              <Github size={20} />
            </button>
          </div>
        </div>
      </footer>

      {/* Game Player Modal */}
      <AnimatePresence>
        {selectedGame && (
          <GamePlayer
            game={selectedGame}
            onClose={() => setSelectedGame(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
