import React from 'react';
import { Activity, ShieldAlert, Cpu, ExternalLink } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  anomalyScore: number;
  status: 'OPTIMAL' | 'DEGRADED' | 'CRITICAL';
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  anomalyScore,
  status,
}) => {
  const tabs = [
    { id: 'overview', label: 'Dashboard & Telemetry' },
    { id: 'simulator', label: 'Fault Injection Simulator' },
    { id: 'isolation-forest', label: 'Isolation Forest Mechanics' },
    { id: 'roi', label: 'Financial ROI Engine' },
    { id: 'resume', label: 'Resume & Architecture Guide' },
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/30 text-cyan-400">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white m-0">
                MetroPT-3 <span className="text-cyan-400 font-semibold">Predictive Maintenance</span>
              </h1>
              <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
                APU Train Unit #03
              </span>
            </div>
            <p className="text-xs text-slate-400 m-0">
              UCI Industrial Telemetry Anomaly Detection & Financial ROI Quantification
            </p>
          </div>
        </div>

        {/* Live Status Indicator */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
            <div className="flex flex-col">
              <span className="text-slate-400">APU Asset Health</span>
              <div className="flex items-center gap-1.5 font-mono font-medium">
                <span
                  className={`w-2 h-2 rounded-full ${
                    status === 'OPTIMAL'
                      ? 'bg-emerald-400 shadow-[0_0_8px_#10b981]'
                      : status === 'DEGRADED'
                      ? 'bg-amber-400 shadow-[0_0_8px_#f59e0b]'
                      : 'bg-rose-500 shadow-[0_0_8px_#f43f5e] animate-ping'
                  }`}
                />
                <span
                  className={
                    status === 'OPTIMAL'
                      ? 'text-emerald-400'
                      : status === 'DEGRADED'
                      ? 'text-amber-400'
                      : 'text-rose-400'
                  }
                >
                  {status}
                </span>
                <span className="text-slate-500">|</span>
                <span className="text-slate-300">Score: {anomalyScore.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <a
            href="https://archive.ics.uci.edu/dataset/791/metropt+3+dataset+a+dataset+for+predictive+maintenance+benchmarks"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-300 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 transition"
          >
            <span>UCI Dataset</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-900/80">
        <div className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 border border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
