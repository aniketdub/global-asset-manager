import React, { useState } from 'react';
import { scoreIsolationForest } from '../utils/isolationForest';
import { Sliders, Wrench, AlertTriangle, CheckCircle, RefreshCw, Sparkles } from 'lucide-react';

export const FaultSimulator: React.FC = () => {
  // Simulator input state
  const [oilTemp, setOilTemp] = useState<number>(63.5);
  const [reservoirPress, setReservoirPress] = useState<number>(8.9);
  const [motorCurrent, setMotorCurrent] = useState<number>(5.6);
  const [h1Drop, setH1Drop] = useState<number>(0.15);
  const [tp2Press, setTp2Press] = useState<number>(8.5);
  const [tp3Press, setTp3Press] = useState<number>(8.2);

  // Compute live Isolation Forest score
  const result = scoreIsolationForest({
    Oil_Temperature: oilTemp,
    Reservoirs: reservoirPress,
    Motor_Current: motorCurrent,
    H1: h1Drop,
    TP2: tp2Press,
    TP3: tp3Press,
  });

  const applyPreset = (preset: string) => {
    switch (preset) {
      case 'nominal':
        setOilTemp(62.5);
        setReservoirPress(9.1);
        setMotorCurrent(5.4);
        setH1Drop(0.14);
        setTp2Press(8.6);
        setTp3Press(8.3);
        break;
      case 'leak':
        setOilTemp(68.0);
        setReservoirPress(6.8); // Major pressure deficit
        setMotorCurrent(7.2);
        setH1Drop(0.22);
        setTp2Press(7.2);
        setTp3Press(6.7);
        break;
      case 'dryer_clog':
        setOilTemp(66.5);
        setReservoirPress(7.9);
        setMotorCurrent(6.5);
        setH1Drop(1.25); // Critical pressure drop across dryer
        setTp2Press(8.9);
        setTp3Press(7.4);
        break;
      case 'thermal':
        setOilTemp(89.5); // Thermal limit breach
        setReservoirPress(7.3);
        setMotorCurrent(9.4); // High motor load from friction
        setH1Drop(0.45);
        setTp2Press(7.8);
        setTp3Press(7.0);
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-base font-semibold text-white flex items-center gap-2 m-0">
              <Sliders className="w-5 h-5 text-cyan-400" />
              Interactive Telemetry Fault Injection Playground
            </h2>
            <p className="text-xs text-slate-400 m-0">
              Perturb APU sensor parameters to observe real-time Isolation Forest scoring, tree depth contraction, and feature attributions.
            </p>
          </div>

          {/* Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400">Failure Presets:</span>
            <button
              onClick={() => applyPreset('nominal')}
              className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              Nominal Baseline
            </button>
            <button
              onClick={() => applyPreset('leak')}
              className="px-2.5 py-1 text-xs rounded-lg bg-sky-950/80 hover:bg-sky-900/80 text-sky-300 border border-sky-800/60 transition"
            >
              Air Leak
            </button>
            <button
              onClick={() => applyPreset('dryer_clog')}
              className="px-2.5 py-1 text-xs rounded-lg bg-amber-950/80 hover:bg-amber-900/80 text-amber-300 border border-amber-800/60 transition"
            >
              Dryer Filter Clog
            </button>
            <button
              onClick={() => applyPreset('thermal')}
              className="px-2.5 py-1 text-xs rounded-lg bg-rose-950/80 hover:bg-rose-900/80 text-rose-300 border border-rose-800/60 transition"
            >
              Thermal Runaway
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Interactive Telemetry Controls */}
          <div className="lg:col-span-7 space-y-4">
            {/* Oil Temperature Slider */}
            <div className="bg-slate-950/50 p-3.5 rounded-lg border border-slate-800/80">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-slate-300">
                  Oil Temperature (Compressor Head)
                </label>
                <span className={`text-xs font-mono font-bold ${oilTemp > 80 ? 'text-rose-400' : 'text-cyan-400'}`}>
                  {oilTemp.toFixed(1)} °C
                </span>
              </div>
              <input
                type="range"
                min={30}
                max={100}
                step={0.5}
                value={oilTemp}
                onChange={(e) => setOilTemp(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>30°C (Cold Start)</span>
                <span>Normal: 55 - 70°C</span>
                <span className="text-rose-400">100°C (Thermal Seizure)</span>
              </div>
            </div>

            {/* Reservoir Pressure Slider */}
            <div className="bg-slate-950/50 p-3.5 rounded-lg border border-slate-800/80">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-slate-300">
                  Main Reservoir Pressure (Storage Tank)
                </label>
                <span className={`text-xs font-mono font-bold ${reservoirPress < 7.5 ? 'text-rose-400' : 'text-cyan-400'}`}>
                  {reservoirPress.toFixed(2)} bar
                </span>
              </div>
              <input
                type="range"
                min={4.5}
                max={11.0}
                step={0.1}
                value={reservoirPress}
                onChange={(e) => setReservoirPress(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span className="text-rose-400">4.5 bar (Train Stoppage)</span>
                <span>Normal: 8.2 - 10.0 bar</span>
                <span>11.0 bar (Relief Valve)</span>
              </div>
            </div>

            {/* Motor Current Slider */}
            <div className="bg-slate-950/50 p-3.5 rounded-lg border border-slate-800/80">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-slate-300">
                  Electric Motor Current Draw
                </label>
                <span className={`text-xs font-mono font-bold ${motorCurrent > 7.5 ? 'text-rose-400' : 'text-cyan-400'}`}>
                  {motorCurrent.toFixed(2)} A
                </span>
              </div>
              <input
                type="range"
                min={1.0}
                max={12.0}
                step={0.1}
                value={motorCurrent}
                onChange={(e) => setMotorCurrent(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>1.0 A (Idle / Unloaded)</span>
                <span>Normal: 4.8 - 6.5 A</span>
                <span className="text-rose-400">12.0 A (Motor Overload)</span>
              </div>
            </div>

            {/* Dryer Filter Pressure Drop (H1) */}
            <div className="bg-slate-950/50 p-3.5 rounded-lg border border-slate-800/80">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-slate-300">
                  Dryer Differential Pressure Drop (H1)
                </label>
                <span className={`text-xs font-mono font-bold ${h1Drop > 0.6 ? 'text-rose-400' : 'text-cyan-400'}`}>
                  {h1Drop.toFixed(2)} bar
                </span>
              </div>
              <input
                type="range"
                min={0.0}
                max={2.0}
                step={0.05}
                value={h1Drop}
                onChange={(e) => setH1Drop(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>0.0 bar (Clean Core)</span>
                <span>Normal: 0.10 - 0.35 bar</span>
                <span className="text-rose-400">2.0 bar (Full Clog)</span>
              </div>
            </div>
          </div>

          {/* Right: Isolation Forest Inference Engine Response */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-slate-400">Isolation Forest Output</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  Subsample n=256
                </span>
              </div>

              {/* Anomaly Gauge */}
              <div className="text-center py-2">
                <div className="text-3xl font-extrabold font-mono tracking-tight text-white mb-1">
                  {result.score.toFixed(2)}
                </div>
                <div className="text-xs text-slate-400 mb-3">
                  Average Tree Path Length: <strong className="text-cyan-300">{result.treeDepth} splits</strong> (Expected: {result.maxExpectedDepth})
                </div>

                {/* Score bar */}
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden mb-2 relative">
                  <div
                    className={`h-full transition-all duration-300 ${
                      result.score < 0.55
                        ? 'bg-emerald-500'
                        : result.score < 0.75
                        ? 'bg-amber-500'
                        : 'bg-rose-500 animate-pulse'
                    }`}
                    style={{ width: `${result.score * 100}%` }}
                  />
                  {/* Threshold mark */}
                  <div className="absolute top-0 bottom-0 left-[58%] w-0.5 bg-white/70" title="Threshold: 0.58" />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>0.00 (Normal)</span>
                  <span className="text-amber-400">0.58 (Threshold)</span>
                  <span>1.00 (Anomaly)</span>
                </div>
              </div>

              {/* Risk Banner */}
              <div
                className={`mt-3 p-3 rounded-lg border text-xs flex items-center gap-2.5 ${
                  result.score < 0.55
                    ? 'bg-emerald-950/40 border-emerald-800/50 text-emerald-300'
                    : result.score < 0.75
                    ? 'bg-amber-950/40 border-amber-800/50 text-amber-300'
                    : 'bg-rose-950/40 border-rose-800/50 text-rose-300'
                }`}
              >
                {result.score < 0.55 ? (
                  <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                )}
                <div>
                  <strong>
                    {result.score < 0.55
                      ? 'APU System Status: Nominal'
                      : result.score < 0.75
                      ? 'APU System Status: Incipient Degradation Detected'
                      : 'APU System Status: CATASTROPHIC FAILURE RISK IMMINENT'}
                  </strong>
                  <div className="text-[11px] opacity-80 mt-0.5">
                    {result.score < 0.55
                      ? 'Sensor multi-variate trajectory is within the centroid of the training distribution.'
                      : result.score < 0.75
                      ? 'Divergence detected in early warning window. Preemptive depot inspection recommended.'
                      : 'Severe abnormal isolation in shallow cuts. Immediate safety lockout & technician dispatch.'}
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Attribution Breakdown */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
              <span className="text-xs font-medium text-slate-300 block mb-2">
                Sensor Anomaly Contribution (Feature Importance)
              </span>
              <div className="space-y-2">
                {result.contributions.slice(0, 4).map((item) => (
                  <div key={item.feature} className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">{item.name}</span>
                      <span className="font-mono text-slate-200">
                        {(item.contribution * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          item.impact === 'critical'
                            ? 'bg-rose-500'
                            : item.impact === 'high'
                            ? 'bg-amber-500'
                            : 'bg-cyan-500'
                        }`}
                        style={{ width: `${Math.max(5, item.contribution * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
