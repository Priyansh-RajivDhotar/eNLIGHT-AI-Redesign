import { useState } from 'react';
import { ChevronRight, Database, Share2, Copy, Download, RefreshCw, Send, Sparkles, ChevronDown } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

const mockData = [
  { month: 'Jan', revenue: 45000, customers: 120 },
  { month: 'Feb', revenue: 52000, customers: 145 },
  { month: 'Mar', revenue: 48000, customers: 135 },
  { month: 'Apr', revenue: 61000, customers: 168 },
  { month: 'May', revenue: 55000, customers: 152 },
  { month: 'Jun', revenue: 67000, customers: 189 },
];

const followUpSuggestions = [
  'Show me by product category',
  'Compare with last year',
  'What drove the increase in April?',
];

export function Chat() {
  const [messages, setMessages] = useState([
    { role: 'user', content: 'Show me revenue trends for the last 6 months' },
    { 
      role: 'assistant', 
      content: 'Here is your revenue trend analysis for the past 6 months. Revenue shows an overall upward trend with notable growth in April and June.',
      hasChart: true,
    },
  ]);
  const [input, setInput] = useState('');
  const [showSQL, setShowSQL] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }]);
      setInput('');
      
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'I\'ve analyzed your request. Here are the insights...',
          hasChart: false,
        }]);
      }, 1000);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="glass-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <span>Chat</span>
            <ChevronRight size={16} />
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-card-elevated border border-border">
              <Database size={14} />
              <span className="text-text-primary font-medium">Sales Dataset</span>
            </div>
          </div>
          <button className="p-2 hover:bg-card-elevated rounded-lg transition-colors">
            <Share2 size={18} className="text-text-secondary" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'user' ? (
              <div className="max-w-xl px-5 py-3 rounded-[20px] gradient-primary text-white shadow-lg">
                {message.content}
              </div>
            ) : (
              <div className="max-w-3xl w-full glass-card rounded-[20px] p-6 space-y-4"
                style={{ boxShadow: 'var(--shadow-md)' }}
              >
                {/* AI Response Text */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                    <Sparkles size={16} className="text-white" />
                  </div>
                  <p className="flex-1 text-text-primary pt-1">{message.content}</p>
                </div>

                {message.hasChart && (
                  <>
                    {/* SQL Accordion */}
                    <div className="border border-border rounded-[16px] overflow-hidden">
                      <button
                        onClick={() => setShowSQL(!showSQL)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-card-elevated hover:bg-border-light transition-colors"
                      >
                        <span className="font-medium text-sm">View SQL Query</span>
                        <ChevronDown 
                          size={16} 
                          className={`transition-transform ${showSQL ? 'rotate-180' : ''}`}
                        />
                      </button>
                      <AnimatePresence>
                        {showSQL && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 py-3 bg-background font-mono text-sm text-text-secondary border-t border-border">
                              SELECT month, SUM(revenue) as revenue<br />
                              FROM sales_data<br />
                              WHERE date &gt;= DATE_SUB(NOW(), INTERVAL 6 MONTH)<br />
                              GROUP BY month
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Chart */}
                    <div className="p-6 bg-background rounded-[20px] border border-border">
                      <h4 className="mb-4">Revenue Trend (Last 6 Months)</h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={mockData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                          <XAxis 
                            dataKey="month" 
                            stroke="var(--text-secondary)"
                            style={{ fontSize: '12px' }}
                          />
                          <YAxis 
                            stroke="var(--text-secondary)"
                            style={{ fontSize: '12px' }}
                          />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: 'var(--card)',
                              border: '1px solid var(--border)',
                              borderRadius: '12px',
                              boxShadow: 'var(--shadow-lg)',
                            }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="revenue" 
                            stroke="#3B82F6" 
                            strokeWidth={3}
                            dot={{ fill: '#3B82F6', r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-card-elevated transition-colors text-sm text-text-secondary">
                        <Download size={16} />
                        Export
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-card-elevated transition-colors text-sm text-text-secondary">
                        <Copy size={16} />
                        Copy
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-card-elevated transition-colors text-sm text-text-secondary">
                        <Share2 size={16} />
                        Share
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-card-elevated transition-colors text-sm text-text-secondary ml-auto">
                        <RefreshCw size={16} />
                        Regenerate
                      </button>
                    </div>

                    {/* Follow-up Suggestions */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {followUpSuggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => setInput(suggestion)}
                          className="px-3 py-1.5 rounded-full bg-card-elevated text-text-secondary hover:text-text-primary hover:bg-border-light transition-all duration-150 text-sm border border-border"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Input Bar */}
      <div className="glass-card border-t border-border px-4 md:px-6 py-4 sticky bottom-0 md:relative">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 p-3 rounded-[16px] bg-background border-2 border-border-light focus-within:border-transparent focus-within:shadow-[0_0_0_2px_rgba(59,130,246,0.2)]">
            <Sparkles size={20} className="text-text-muted flex-shrink-0" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a follow-up question..."
              className="flex-1 bg-transparent border-none outline-none text-text-primary placeholder:text-text-muted"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className={`
                flex items-center justify-center w-10 h-10 rounded-full 
                transition-all duration-200
                ${input.trim()
                  ? 'gradient-primary text-white hover:scale-105 shadow-lg'
                  : 'bg-card-elevated text-text-muted cursor-not-allowed'
                }
              `}
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}