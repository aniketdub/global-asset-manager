import React, { useState } from 'react';
import { GitBranch, BookOpen, Check, Layers, Cpu, Compass, HelpCircle } from 'lucide-react';

export const IsolationForestExplainer: React.FC = () => {
  const [subsampleN, setSubsampleN] = useState<number>(256);
  const [simulatedPathLength, setSimulatedPathLength] = useState<number>(4.2);

  // Calculate c(n)
  const euler = 0.5772156649;
  const c_n = 2 * (Math.log(subsampleN - 1) + euler) - (2 * (subsampleN - 1) / subsampleN);
  const anomalyScore = Math.pow(2, -simulatedPathLength / c_n);

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white m-0">
              Isolation Forest (iTree) Anomaly Detection Engine
            </h2>
            <p className="text-xs text-slate-400 m-0">
              Theoretical Foundation, Mathematical Equations & Practical Execution on UCI MetroPT-3 Telemetry
            </p>
          </div>
        </div>
      </div>

      {/* 2-Column Core Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: How it works in Plain English */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2 m-0">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            Core Intuition: Why "Isolating" is Better Than "Profiling"
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed m-0">
            Traditional industrial anomaly detectors (like Gaussian Mixture Models, Autoencoders, or One-Class SVMs) attempt to build a complex mathematical boundary around <strong className="text-cyan-300">"normal"</strong> operations. In high-speed railway telemetry, this causes false alarms due to weather, passenger load changes, and differing driver braking cycles.
          </p>

          <div className="space-y-2.5">
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
              <span className="font-semibold text-emerald-400 block mb-1">1. Normal Telemetry Points:</span>
              Normal operation (e.g. compressor pressure 8.5 bar, oil temp 62°C) is tightly clustered in high-density regions. To isolate a normal point by random splitting requires <strong className="text-white">many recursive cuts</strong> (deep path length, $h(x) \approx 12-14$).
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
              <span className="font-semibold text-rose-400 block mb-1">2. Catastrophic Anomaly Points:</span>
              Anomalies (e.g. pressure collapsing to 6.2 bar while motor current spikes to 9.8A and oil reaches 89°C) are sparse and isolated. Random hyperplane cuts separate them in <strong className="text-white">very few recursive splits</strong> (shallow path length, $h(x) \approx 2-5$).
            </div>
          </div>

          <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-300 flex items-start gap-2">
            <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong>Why Subsampling (n=256) Works Best:</strong> By building each iTree on a small random subsample of 256 data points, the model eliminates <em>masking</em> (multiple anomalies hiding each other) and <em>swamping</em> (normal points mistaken for outliers).
            </div>
          </div>
        </div>

        {/* Right: The Mathematics & Live Calculator */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2 m-0">
            <Cpu className="w-4 h-4 text-cyan-400" />
            Mathematical Formulation
          </h3>

          <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 font-mono text-xs text-slate-200 space-y-2">
            <div className="text-[11px] text-slate-400">// Average BST path length reference c(n):</div>
            <div className="text-cyan-300">
              c(n) = 2 · (ln(n - 1) + 0.5772) - [2 · (n - 1) / n]
            </div>
            <div className="text-[11px] text-slate-400 mt-2">// Anomaly Score Equation:</div>
            <div className="text-emerald-300">
              s(x, n) = 2^( -E(h(x)) / c(n) )
            </div>
          </div>

          {/* Interactive Path Depth to Score Mapper */}
          <div className="p-3.5 rounded-lg bg-slate-950/40 border border-slate-800 space-y-3">
            <div className="text-xs font-semibold text-slate-300">
              Interactive Path Depth Simulator:
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Observed Tree Depth E(h(x)):</span>
                <span className="font-mono text-cyan-300 font-bold">{simulatedPathLength.toFixed(1)} splits</span>
              </div>
              <input
                type="range"
                min={1}
                max={14}
                step={0.1}
                value={simulatedPathLength}
                onChange={(e) => setSimulatedPathLength(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span className="text-rose-400">1.0 (Root Isolation = Immediate Anomaly)</span>
                <span>c(256) ≈ {c_n.toFixed(1)}</span>
                <span className="text-emerald-400">14.0 (Deep Centroid = Normal)</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded bg-slate-900 border border-slate-800 text-xs">
              <span className="text-slate-400">Resulting Score s(x, n):</span>
              <div className="flex items-center gap-2 font-mono">
                <span
                  className={`font-bold text-sm ${
                    anomalyScore >= 0.7
                      ? 'text-rose-400'
                      : anomalyScore >= 0.55
                      ? 'text-amber-400'
                      : 'text-emerald-400'
                  }`}
                >
                  {anomalyScore.toFixed(3)}
                </span>
                <span className="text-slate-500">
                  {anomalyScore > 0.6
                    ? '-> Anomaly Confirmed'
                    : anomalyScore >= 0.5
                    ? '-> Marginal / Borderline'
                    : '-> Normal Operation'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sensor Mapping Table for MetroPT-3 */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-3 m-0">
          UCI MetroPT-3 Sensor Feature Dictionary & Physical Meaning
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-medium">
                <th className="py-2 px-3">Sensor Tag</th>
                <th className="py-2 px-3">Physical Measurement</th>
                <th className="py-2 px-3">Units</th>
                <th className="py-2 px-3">Nominal Operating Range</th>
                <th className="py-2 px-3">Catastrophic Failure Indicator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2 px-3 font-mono font-bold text-cyan-400">TP2</td>
                <td className="py-2 px-3">Compressor Head Pressure</td>
                <td className="py-2 px-3">bar</td>
                <td className="py-2 px-3 font-mono">7.5 - 10.2</td>
                <td className="py-2 px-3 text-slate-400">Fails to build pressure despite continuous motor operation</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono font-bold text-cyan-400">TP3</td>
                <td className="py-2 px-3">Pneumatic Panel Output Pressure</td>
                <td className="py-2 px-3">bar</td>
                <td className="py-2 px-3 font-mono">7.0 - 9.8</td>
                <td className="py-2 px-3 text-slate-400">Divergence between TP2 and TP3 indicates line constriction</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono font-bold text-cyan-400">H1</td>
                <td className="py-2 px-3">Air Dryer Filter Differential ΔP</td>
                <td className="py-2 px-3">bar</td>
                <td className="py-2 px-3 font-mono">0.05 - 0.35</td>
                <td className="py-2 px-3 text-amber-300">ΔP &gt; 0.8 bar indicates saturated desiccant or blocked filter element</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono font-bold text-cyan-400">Reservoirs</td>
                <td className="py-2 px-3">Main Air Reservoir Storage</td>
                <td className="py-2 px-3">bar</td>
                <td className="py-2 px-3 font-mono">8.2 - 10.0</td>
                <td className="py-2 px-3 text-rose-400">Drops &lt; 6.5 bar: Automatic Emergency Spring Brake lockup</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono font-bold text-cyan-400">Motor_Current</td>
                <td className="py-2 px-3">Electric Drive Motor Load</td>
                <td className="py-2 px-3">Amperes (A)</td>
                <td className="py-2 px-3 font-mono">4.8 - 6.5</td>
                <td className="py-2 px-3 text-rose-400">&gt; 8.5 A indicates severe mechanical friction or compressor seizure</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono font-bold text-cyan-400">Oil_Temperature</td>
                <td className="py-2 px-3">Compressor Crankcase Lubricant</td>
                <td className="py-2 px-3">°C</td>
                <td className="py-2 px-3 font-mono">55.0 - 72.0</td>
                <td className="py-2 px-3 text-rose-400">&gt; 85°C triggers hardware thermal trip and oil breakdown</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
