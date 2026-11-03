import React from 'react';
import { DollarSign, Clock, ShieldCheck, Zap, AlertTriangle, TrendingUp } from 'lucide-react';

interface ExecutiveMetricsProps {
  currentScore: number;
  currentRisk: number;
  netSavings: number;
  roiPercentage: number;
  earlyWarningLeadHours: number;
  preventedFailures: number;
}

export const ExecutiveMetrics: React.FC<ExecutiveMetricsProps> = ({
  currentScore,
  currentRisk,
  netSavings,
  roiPercentage,
  earlyWarningLeadHours,
  preventedFailures,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Metric 1: Financial ROI */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 relative overflow-hidden group hover:border-cyan-500/40 transition">
        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl group-hover:bg-cyan-500/10 transition" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-400">Net Quantified ROI</span>
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <div className="text-2xl font-bold text-white tracking-tight">
            ${(netSavings / 1000).toFixed(1)}k
          </div>
          <span className="text-xs font-semibold text-emerald-400 flex items-center">
            <TrendingUp className="w-3 h-3 mr-0.5" />+{roiPercentage.toFixed(0)}%
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">
          Dynamic savings vs {preventedFailures} catastrophic train stoppages
        </p>
      </div>

      {/* Metric 2: Early Warning Lead Time */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 relative overflow-hidden group hover:border-cyan-500/40 transition">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl group-hover:bg-blue-500/10 transition" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-400">Early Warning Lead Time</span>
          <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <div className="text-2xl font-bold text-white tracking-tight">
            {earlyWarningLeadHours} Hours
          </div>
          <span className="text-xs text-blue-300 font-mono">Advance Alert</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">
          Flags multi-sensor divergence before pressure breach
        </p>
      </div>

      {/* Metric 3: Anomaly Detection Score */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 relative overflow-hidden group hover:border-cyan-500/40 transition">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/10 transition" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-400">Isolation Forest Score</span>
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Zap className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <div className="text-2xl font-bold text-white tracking-tight">
            {currentScore.toFixed(2)}
          </div>
          <span className="text-xs text-slate-400 font-mono">/ 1.00</span>
          <span
            className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
              currentScore < 0.55
                ? 'bg-emerald-500/10 text-emerald-400'
                : currentScore < 0.75
                ? 'bg-amber-500/10 text-amber-400'
                : 'bg-rose-500/10 text-rose-400'
            }`}
          >
            {currentRisk}% Risk
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">
          Threshold: 0.58 (iTree path depth &lt; 8.2 splits)
        </p>
      </div>

      {/* Metric 4: Asset Uptime & Reliability */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 relative overflow-hidden group hover:border-cyan-500/40 transition">
        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl group-hover:bg-purple-500/10 transition" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-400">APU Fleet Uptime</span>
          <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <div className="text-2xl font-bold text-white tracking-tight">
            99.64%
          </div>
          <span className="text-xs text-emerald-400 font-mono">+1.8% vs Reactive</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">
          Preemptive depot turnaround within scheduled off-peak window
        </p>
      </div>
    </div>
  );
};
