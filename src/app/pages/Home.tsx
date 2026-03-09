import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Sparkles, Send } from 'lucide-react';
import { motion } from 'motion/react';

const suggestionChips = [
  'Show me revenue trends',
  'Analyze customer churn',
  'Compare Q4 performance',
  'What are top products?',
];

export function Home() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate('/chat');
    }
  };

  const handleChipClick = (suggestion: string) => {
    setQuery(suggestion);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6"
      style={{
        background: 'radial-gradient(ellipse at top, rgba(59, 130, 246, 0.08) 0%, transparent 50%)',
      }}
    >
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-[24px] p-6 md:p-12"
          style={{
            boxShadow: 'var(--shadow-xl)',
          }}
        >
          {/* Hero Content */}
          <div className="text-center mb-6 md:mb-8">
            <motion.div 
              className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-[20px] gradient-primary mb-4 md:mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)',
              }}
            >
              <Sparkles size={28} className="text-white md:w-8 md:h-8" />
            </motion.div>
            
            <h1 className="bg-gradient-to-r from-[#5B5FEF] via-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent mb-2 md:mb-3 text-[28px] md:text-[32px]">
              Welcome to eNLIGht AI
            </h1>
            <p className="text-text-secondary max-w-md mx-auto text-sm md:text-base">
              Ask questions and generate insights from your curated datasets.
            </p>
          </div>

          {/* AI Input Field */}
          <form onSubmit={handleSubmit} className="mb-4 md:mb-6">
            <div 
              className={`
                relative flex items-center gap-3 p-4 rounded-[16px] 
                border-2 transition-all duration-200
                ${isFocused 
                  ? 'border-transparent bg-card' 
                  : 'border-border-light bg-background'
                }
              `}
              style={{
                height: '64px',
                ...(isFocused && {
                  boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.3)',
                }),
              }}
            >
              <Sparkles 
                size={20} 
                className={`flex-shrink-0 transition-colors ${isFocused ? 'text-gradient-primary-mid' : 'text-text-muted'}`} 
              />
              
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Ask anything about your data…"
                className="flex-1 bg-transparent border-none outline-none text-text-primary placeholder:text-text-muted"
              />

              <button
                type="submit"
                disabled={!query.trim()}
                className={`
                  flex items-center justify-center w-10 h-10 rounded-full 
                  transition-all duration-200
                  ${query.trim()
                    ? 'gradient-primary text-white hover:scale-105 shadow-lg'
                    : 'bg-card-elevated text-text-muted cursor-not-allowed'
                  }
                `}
              >
                <Send size={18} />
              </button>
            </div>
          </form>

          {/* Suggestion Chips */}
          <div className="flex flex-wrap gap-2 justify-center">
            {suggestionChips.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleChipClick(suggestion)}
                className="px-4 py-2 rounded-full bg-card-elevated text-text-secondary hover:text-text-primary hover:bg-border-light transition-all duration-150 border border-border"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Floating Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-primary-start opacity-10 blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-primary-end opacity-10 blur-3xl"
          />
        </div>
      </div>
    </div>
  );
}