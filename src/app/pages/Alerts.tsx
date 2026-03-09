import { useState } from 'react';
import { Plus, Search, MoreVertical, Play, Pause, Bell } from 'lucide-react';
import { motion } from 'motion/react';
import * as Switch from '@radix-ui/react-switch';
import { toast } from 'sonner';

interface Alert {
  id: string;
  title: string;
  frequency: string;
  status: 'active' | 'paused';
  lastTriggered: string;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'Revenue drops below $50k',
    frequency: 'Daily',
    status: 'active',
    lastTriggered: '2 hours ago',
  },
  {
    id: '2',
    title: 'Customer churn exceeds 5%',
    frequency: 'Weekly',
    status: 'active',
    lastTriggered: 'Yesterday',
  },
  {
    id: '3',
    title: 'New user signups spike',
    frequency: 'Daily',
    status: 'paused',
    lastTriggered: '3 days ago',
  },
];

const frequencies = ['Daily', 'Weekly', 'Monthly'];

export function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  // Form state
  const [selectedFrequency, setSelectedFrequency] = useState('Daily');
  const [thresholdEnabled, setThresholdEnabled] = useState(false);

  const filteredAlerts = alerts.filter(alert =>
    alert.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Alert List */}
      <div className="lg:w-1/2 border-b lg:border-b-0 lg:border-r border-border p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2>Alerts</h2>
            <p className="text-sm text-text-secondary">Manage your alert notifications</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-[14px] gradient-primary text-white hover:scale-105 transition-transform shadow-lg"
          >
            <Plus size={18} />
            <span>Create Alert</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search alerts..."
            className="w-full pl-11 pr-4 py-3 rounded-[16px] bg-background border border-border focus:border-gradient-primary-mid focus:outline-none focus:ring-2 focus:ring-gradient-primary-mid/20"
          />
        </div>

        {/* Alert List */}
        <div className="space-y-3">
          {filteredAlerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`
                glass-card rounded-[20px] p-5 cursor-pointer transition-all duration-200
                ${selectedAlert === alert.id ? 'ring-2 ring-gradient-primary-mid' : ''}
                hover:shadow-lg
              `}
              onClick={() => setSelectedAlert(alert.id)}
              style={{
                borderLeft: alert.status === 'active' ? '4px solid #3B82F6' : '4px solid transparent',
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="mb-1">{alert.title}</h4>
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <span>{alert.frequency}</span>
                    <span>•</span>
                    <span className={alert.status === 'active' ? 'text-success' : 'text-text-muted'}>
                      {alert.status === 'active' ? (
                        <span className="flex items-center gap-1">
                          <Play size={12} />
                          Active
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Pause size={12} />
                          Paused
                        </span>
                      )}
                    </span>
                  </div>
                </div>
                <button className="p-1 hover:bg-card-elevated rounded-lg transition-colors">
                  <MoreVertical size={18} className="text-text-secondary" />
                </button>
              </div>
              <p className="text-sm text-text-muted">Last triggered: {alert.lastTriggered}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Panel - Alert Configuration */}
      <div className="lg:w-1/2 p-6">
        {!showForm ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-sm">
              <div className="w-16 h-16 rounded-[20px] bg-card-elevated flex items-center justify-center mx-auto mb-4">
                <Bell size={32} className="text-text-muted" />
              </div>
              <h3 className="mb-2">Create or Select an Alert</h3>
              <p className="text-text-secondary mb-6">
                Set up automated alerts to monitor your KPIs and get notified when thresholds are met.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 rounded-[14px] gradient-primary text-white hover:scale-105 transition-transform shadow-lg"
              >
                Create New Alert
              </button>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3>Configure Alert</h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                Cancel
              </button>
            </div>

            {/* Step 1: KPI Setup */}
            <div className="glass-card rounded-[20px] p-6 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg gradient-primary text-white flex items-center justify-center font-semibold">
                  1
                </div>
                <h4>KPI Setup</h4>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm">Topic</label>
                  <select className="w-full px-4 py-3 rounded-[16px] bg-background border border-border focus:border-gradient-primary-mid focus:outline-none focus:ring-2 focus:ring-gradient-primary-mid/20">
                    <option>Sales Dataset</option>
                    <option>Customer Analytics</option>
                    <option>Product Performance</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm">KPI Metric</label>
                  <select className="w-full px-4 py-3 rounded-[16px] bg-background border border-border focus:border-gradient-primary-mid focus:outline-none focus:ring-2 focus:ring-gradient-primary-mid/20">
                    <option>Total Revenue</option>
                    <option>Customer Churn Rate</option>
                    <option>Conversion Rate</option>
                    <option>Active Users</option>
                  </select>
                </div>

                <button className="w-full px-4 py-2.5 rounded-[14px] border border-border hover:bg-card-elevated transition-colors">
                  Validate
                </button>
              </div>
            </div>

            {/* Step 2: Frequency */}
            <div className="glass-card rounded-[20px] p-6 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg gradient-primary text-white flex items-center justify-center font-semibold">
                  2
                </div>
                <h4>Alert Frequency</h4>
              </div>

              <div className="flex gap-2">
                {frequencies.map((freq) => (
                  <button
                    key={freq}
                    onClick={() => setSelectedFrequency(freq)}
                    className={`
                      flex-1 px-4 py-2.5 rounded-[14px] transition-all duration-200
                      ${selectedFrequency === freq
                        ? 'gradient-primary text-white shadow-lg'
                        : 'bg-card-elevated text-text-secondary hover:bg-border-light'
                      }
                    `}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Threshold */}
            <div className="glass-card rounded-[20px] p-6 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg gradient-primary text-white flex items-center justify-center font-semibold">
                  3
                </div>
                <h4>Threshold Settings</h4>
              </div>

              <div className="flex items-center justify-between p-4 bg-background rounded-[16px]">
                <div>
                  <p className="font-medium mb-1">Enable Threshold</p>
                  <p className="text-sm text-text-secondary">Trigger alert when condition is met</p>
                </div>
                <Switch.Root
                  checked={thresholdEnabled}
                  onCheckedChange={setThresholdEnabled}
                  className="w-12 h-7 rounded-full bg-card-elevated data-[state=checked]:bg-gradient-primary-mid transition-colors relative"
                >
                  <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-1 data-[state=checked]:translate-x-6 shadow-md" />
                </Switch.Root>
              </div>

              {thresholdEnabled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-3"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block mb-2 text-sm">Condition</label>
                      <select className="w-full px-4 py-3 rounded-[16px] bg-background border border-border focus:border-gradient-primary-mid focus:outline-none">
                        <option>Greater than</option>
                        <option>Less than</option>
                        <option>Equal to</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm">Value</label>
                      <input
                        type="number"
                        placeholder="50000"
                        className="w-full px-4 py-3 rounded-[16px] bg-background border border-border focus:border-gradient-primary-mid focus:outline-none focus:ring-2 focus:ring-gradient-primary-mid/20"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 px-6 py-3 rounded-[14px] border border-border hover:bg-card-elevated transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  toast.success('Alert saved successfully!');
                  setShowForm(false);
                }}
                className="flex-1 px-6 py-3 rounded-[14px] gradient-primary text-white hover:scale-105 transition-transform shadow-lg"
              >
                Save Alert
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}