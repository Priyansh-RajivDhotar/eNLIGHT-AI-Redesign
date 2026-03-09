import { useState } from 'react';
import { Search, Database, Eye, Trash2, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';

interface HistoryItem {
  id: string;
  query: string;
  dataset: string;
  timestamp: string;
  date: string;
}

const mockHistory: HistoryItem[] = [
  {
    id: '1',
    query: 'Show me revenue trends for the last 6 months',
    dataset: 'Sales Dataset',
    timestamp: '2:30 PM',
    date: 'Today',
  },
  {
    id: '2',
    query: 'What is the customer churn rate by region?',
    dataset: 'Customer Analytics',
    timestamp: '11:45 AM',
    date: 'Today',
  },
  {
    id: '3',
    query: 'Compare product performance across categories',
    dataset: 'Product Performance',
    timestamp: '9:15 AM',
    date: 'Today',
  },
  {
    id: '4',
    query: 'Analyze conversion rates by traffic source',
    dataset: 'Sales Dataset',
    timestamp: '4:20 PM',
    date: 'Yesterday',
  },
  {
    id: '5',
    query: 'Show top performing sales representatives',
    dataset: 'Sales Dataset',
    timestamp: '2:10 PM',
    date: 'Yesterday',
  },
  {
    id: '6',
    query: 'What are the seasonal trends in revenue?',
    dataset: 'Sales Dataset',
    timestamp: '10:30 AM',
    date: 'Feb 14, 2026',
  },
];

const filterTabs = ['All', 'Sales Dataset', 'Customer Analytics', 'Product Performance'];

export function History() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const navigate = useNavigate();

  const filteredHistory = mockHistory.filter(item => {
    const matchesSearch = item.query.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || item.dataset === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Group by date
  const groupedHistory = filteredHistory.reduce((acc, item) => {
    if (!acc[item.date]) {
      acc[item.date] = [];
    }
    acc[item.date].push(item);
    return acc;
  }, {} as Record<string, HistoryItem[]>);

  const handleViewClick = (id: string) => {
    navigate('/chat');
  };

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="mb-1">History</h1>
        <p className="text-text-secondary">Your recent AI conversations and queries</p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-2xl">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search history..."
            className="w-full pl-11 pr-4 py-3 rounded-[16px] bg-card border border-border focus:border-gradient-primary-mid focus:outline-none focus:ring-2 focus:ring-gradient-primary-mid/20"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`
                px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200
                ${activeFilter === tab
                  ? 'gradient-primary text-white shadow-lg'
                  : 'bg-card-elevated text-text-secondary hover:text-text-primary hover:bg-border-light border border-border'
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-8 max-w-4xl">
        {Object.entries(groupedHistory).map(([date, items]) => (
          <div key={date}>
            {/* Date Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2 text-text-secondary">
                <Clock size={16} />
                <span className="font-medium">{date}</span>
              </div>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* History Items */}
            <div className="space-y-3 relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden md:block" />

              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card rounded-[20px] p-5 hover:shadow-lg transition-all duration-200 relative"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-[-34px] top-6 w-3 h-3 rounded-full bg-gradient-primary-mid border-4 border-background hidden md:block" />

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {/* Query */}
                      <p className="font-medium mb-2">{item.query}</p>

                      {/* Metadata */}
                      <div className="flex items-center gap-3 text-sm text-text-secondary flex-wrap">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-card-elevated border border-border">
                          <Database size={12} />
                          <span>{item.dataset}</span>
                        </div>
                        <span>{item.timestamp}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleViewClick(item.id)}
                        className="p-2 rounded-lg hover:bg-card-elevated transition-colors group"
                        title="View conversation"
                      >
                        <Eye size={18} className="text-text-secondary group-hover:text-text-primary" />
                      </button>
                      <button
                        className="p-2 rounded-lg hover:bg-error/10 transition-colors group"
                        title="Delete"
                      >
                        <Trash2 size={18} className="text-text-secondary group-hover:text-error" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {/* Empty State */}
        {filteredHistory.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 rounded-[20px] bg-card-elevated flex items-center justify-center mx-auto mb-4">
              <Clock size={32} className="text-text-muted" />
            </div>
            <h3 className="mb-2">No history found</h3>
            <p className="text-text-secondary">
              {searchQuery ? 'Try adjusting your search terms' : 'Start a conversation to see your history'}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
