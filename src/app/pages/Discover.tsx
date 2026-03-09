import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Activity, Download, Filter, Calendar } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'motion/react';

const kpiData = [
  {
    title: 'Total Revenue',
    value: '$328,500',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: '#3B82F6',
    sparklineData: [40, 45, 42, 48, 50, 55, 52, 58],
  },
  {
    title: 'Active Users',
    value: '12,459',
    change: '+8.2%',
    trend: 'up',
    icon: Users,
    color: '#10B981',
    sparklineData: [100, 105, 108, 112, 118, 122, 120, 125],
  },
  {
    title: 'Conversion Rate',
    value: '3.24%',
    change: '-2.1%',
    trend: 'down',
    icon: Activity,
    color: '#F59E0B',
    sparklineData: [3.5, 3.4, 3.3, 3.2, 3.1, 3.3, 3.2, 3.24],
  },
  {
    title: 'Total Orders',
    value: '8,234',
    change: '+15.3%',
    trend: 'up',
    icon: ShoppingCart,
    color: '#8B5CF6',
    sparklineData: [70, 75, 73, 78, 80, 82, 81, 83],
  },
];

const barChartData = [
  { category: 'Electronics', sales: 45000 },
  { category: 'Clothing', sales: 38000 },
  { category: 'Home', sales: 32000 },
  { category: 'Sports', sales: 28000 },
  { category: 'Books', sales: 22000 },
];

const lineChartData = [
  { month: 'Jan', value: 45000 },
  { month: 'Feb', value: 52000 },
  { month: 'Mar', value: 48000 },
  { month: 'Apr', value: 61000 },
  { month: 'May', value: 55000 },
  { month: 'Jun', value: 67000 },
];

const pieChartData = [
  { name: 'Direct', value: 4500, color: '#3B82F6' },
  { name: 'Organic', value: 3200, color: '#10B981' },
  { name: 'Referral', value: 2100, color: '#F59E0B' },
  { name: 'Social', value: 1800, color: '#8B5CF6' },
];

function KPICard({ data }: { data: typeof kpiData[0] }) {
  const Icon = data.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass-card rounded-[20px] p-6 cursor-pointer"
      style={{ boxShadow: 'var(--shadow-md)' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm text-text-secondary mb-1">{data.title}</p>
          <h3 className="text-[28px] font-semibold">{data.value}</h3>
        </div>
        <div 
          className="w-12 h-12 rounded-[14px] flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${data.color}15, ${data.color}25)`,
          }}
        >
          <Icon size={24} style={{ color: data.color }} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {data.trend === 'up' ? (
            <TrendingUp size={16} className="text-success" />
          ) : (
            <TrendingDown size={16} className="text-error" />
          )}
          <span className={`text-sm font-medium ${data.trend === 'up' ? 'text-success' : 'text-error'}`}>
            {data.change}
          </span>
        </div>
        
        {/* Mini Sparkline */}
        <div className="flex items-end gap-0.5 h-8">
          {data.sparklineData.map((value, i) => (
            <div
              key={i}
              className="w-1 rounded-full"
              style={{
                height: `${(value / Math.max(...data.sparklineData)) * 100}%`,
                backgroundColor: data.color,
                opacity: 0.6 + (i / data.sparklineData.length) * 0.4,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Discover() {
  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="mb-1">Discover</h1>
          <p className="text-text-secondary">Analytics and insights dashboard</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-[14px] bg-card border border-border hover:bg-card-elevated transition-colors">
            <Calendar size={18} />
            <span className="hidden sm:inline">Last 30 days</span>
            <span className="sm:hidden">30d</span>
          </button>
          <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-[14px] bg-card border border-border hover:bg-card-elevated transition-colors">
            <Filter size={18} />
            <span>Filters</span>
          </button>
          <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-[14px] text-text-secondary hover:text-text-primary hover:bg-card-elevated transition-colors">
            <Download size={18} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="overflow-x-auto md:overflow-visible -mx-6 px-6 md:mx-0 md:px-0">
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 min-w-max md:min-w-0">
          {kpiData.map((kpi, index) => (
            <div key={index} className="w-72 md:w-auto">
              <KPICard data={kpi} />
            </div>
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-[20px] p-6"
          style={{ boxShadow: 'var(--shadow-md)' }}
        >
          <h3 className="mb-6">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
              <XAxis 
                dataKey="category" 
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
                cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
              />
              <Bar 
                dataKey="sales" 
                fill="url(#barGradient)" 
                radius={[8, 8, 0, 0]}
              />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-[20px] p-6"
          style={{ boxShadow: 'var(--shadow-md)' }}
        >
          <h3 className="mb-6">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineChartData}>
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
                dataKey="value" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Full Width Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-[20px] p-6"
        style={{ boxShadow: 'var(--shadow-md)' }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h3>Traffic Sources</h3>
          <div className="flex items-center gap-3 md:gap-4 flex-wrap">
            {pieChartData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-text-secondary">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  boxShadow: 'var(--shadow-lg)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}