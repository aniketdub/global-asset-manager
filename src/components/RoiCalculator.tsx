import React, { useState } from 'react';
import { DollarSign, TrendingUp, ShieldAlert, CheckCircle2, Calculator, ArrowRight } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export const RoiCalculator: React.FC = () => {
  // Configurable Financial ROI parameters
  const [fleetSize, setFleetSize] = useState<number>(24);
  const [preventedFailures, setPreventedFailures] = useState<number>(8);
  const [unplannedDowntimeHours, setUnplannedDowntimeHours] = useState<number>(4.5);
  const [hourlyDowntimeCost, setHourlyDowntimeCost] = useState<number>(8500);
  const [catastrophicReplacementCost, setCatastrophicReplacementCost] = useState<number>(24000);
  const [preemptiveMaintenanceCost, setPreemptiveMaintenanceCost] = useState<number>(1450);

  // Calculations
  const costPerUnplannedIncident =
    unplannedDowntimeHours * hourlyDowntimeCost + catastrophicReplacementCost;
  const grossLossAvoided = preventedFailures * costPerUnplannedIncident;
  const totalPreemptiveInvestment = preventedFailures * preemptiveMaintenanceCost;
  const netFinancialSavings = grossLossAvoided - totalPreemptiveInvestment;
  const roiPercentage =
    totalPreemptiveInvestment > 0
      ? (netFinancialSavings / totalPreemptiveInvestment) * 100
      : 0;
  const costRatio = Math.round(costPerUnplannedIncident / preemptiveMaintenanceCost);

  // Chart data
  const comparisonData = [
    {
      name: 'Cost Per Incident',
      'Unplanned Catastrophic Failure': costPerUnplannedIncident,
      'Preemptive Planned Maintenance': preemptiveMaintenanceCost,
    },
    {
      name: 'Annual Fleet Total (8 Incidents)',
      'Unplanned Catastrophic Failure': grossLossAvoided,
      'Preemptive Planned Maintenance': totalPreemptiveInvestment,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white m-0">
              Dynamic Financial ROI Quantification Engine
            </h2>
            <p className="text-xs text-slate-400 m-0">
              Real-time cost modeling comparing preemptive maintenance against catastrophic unplanned transit downtime
            </p>
          </div>
        </div>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
          <span className="text-xs text-slate-400 font-medium">Net Financial Savings</span>
          <div className="text-3xl font-extrabold text-white tracking-tight mt-1 font-mono">
            ${netFinancialSavings.toLocaleString()}
          </div>
          <p className="text-[11px] text-emerald-400 mt-1">
            Total capital retained after paying maintenance overhead
          </p>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
          <span className="text-xs text-slate-400 font-medium">Financial ROI Multiple</span>
          <div className="text-3xl font-extrabold text-cyan-400 tracking-tight mt-1 font-mono">
            +{roiPercentage.toFixed(0)}%
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Preemptive maintenance returns <strong className="text-cyan-300">{costRatio}x</strong> every dollar invested
          </p>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
          <span className="text-xs text-slate-400 font-medium">Single Incident Cost Delta</span>
          <div className="text-3xl font-extrabold text-purple-400 tracking-tight mt-1 font-mono">
            ${(costPerUnplannedIncident - preemptiveMaintenanceCost).toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            ${costPerUnplannedIncident.toLocaleString()} unplanned vs ${preemptiveMaintenanceCost.toLocaleString()} planned
          </p>
        </div>
      </div>

      {/* Sliders and Visual Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders */}
        <div className="lg:col-span-6 bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-white m-0">
            Interactive Cost Model Assumptions
          </h3>

          {/* Prevented Failures */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Annual Prevented Catastrophic Failures</span>
              <span className="font-mono text-cyan-400 font-bold">{preventedFailures} incidents</span>
            </div>
            <input
              type="range"
              min={1}
              max={25}
              value={preventedFailures}
              onChange={(e) => setPreventedFailures(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* Hourly Downtime Penalty */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Unplanned Downtime Cost Per Hour</span>
              <span className="font-mono text-cyan-400 font-bold">
                ${hourlyDowntimeCost.toLocaleString()}/hr
              </span>
            </div>
            <input
              type="range"
              min={2000}
              max={20000}
              step={500}
              value={hourlyDowntimeCost}
              onChange={(e) => setHourlyDowntimeCost(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <span className="text-[10px] text-slate-500">
              Includes train delay fines, track clearance, and operator penalties
            </span>
          </div>

          {/* Downtime Hours per Incident */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Average Unplanned Downtime Duration</span>
              <span className="font-mono text-cyan-400 font-bold">{unplannedDowntimeHours} hours</span>
            </div>
            <input
              type="range"
              min={1.0}
              max={12.0}
              step={0.5}
              value={unplannedDowntimeHours}
              onChange={(e) => setUnplannedDowntimeHours(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* Catastrophic Replacement Cost */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Emergency APU Replacement / Overhaul Hardware Cost</span>
              <span className="font-mono text-cyan-400 font-bold">
                ${catastrophicReplacementCost.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={10000}
              max={50000}
              step={1000}
              value={catastrophicReplacementCost}
              onChange={(e) => setCatastrophicReplacementCost(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* Preemptive Maintenance Cost */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Preemptive Depot Maintenance Cost</span>
              <span className="font-mono text-cyan-400 font-bold">
                ${preemptiveMaintenanceCost.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={500}
              max={5000}
              step={100}
              value={preemptiveMaintenanceCost}
              onChange={(e) => setPreemptiveMaintenanceCost(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <span className="text-[10px] text-slate-500">
              Scheduled off-peak seal overhaul, oil flush, and replacement filter cartridge
            </span>
          </div>
        </div>

        {/* Comparison Chart */}
        <div className="lg:col-span-6 bg-slate-900/70 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white mb-1 m-0">
              Financial Cost Comparison
            </h3>
            <p className="text-xs text-slate-400 mb-4 m-0">
              Unplanned Catastrophic Equipment Failure vs Preemptive Maintenance Intervention
            </p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 10 }} tickFormatter={(val) => `$${val / 1000}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                    formatter={(val) => [`$${Number(val).toLocaleString()}`, '']}
                  />
                  <Legend />
                  <Bar dataKey="Unplanned Catastrophic Failure" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Preemptive Planned Maintenance" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-slate-300">
            <span className="font-semibold text-cyan-300 block mb-1">Key Takeaway for Leadership:</span>
            A single catastrophic failure of the Air Production Unit costs <strong className="text-rose-400">${costPerUnplannedIncident.toLocaleString()}</strong> in line delays, recovery towing, and hardware destruction. Preemptive maintenance costs just <strong className="text-emerald-400">${preemptiveMaintenanceCost.toLocaleString()}</strong>.
          </div>
        </div>
      </div>
    </div>
  );
};
