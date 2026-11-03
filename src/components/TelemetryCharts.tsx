import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart,
} from 'recharts';
import { TelemetryPoint } from '../types/telemetry';
import { Gauge, AlertCircle, Play, Pause, RotateCcw, Info } from 'lucide-react';

interface TelemetryChartsProps {
  data: TelemetryPoint[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  contaminationThreshold: number;
  setContaminationThreshold: (val: number) => void;
}

export const TelemetryCharts: React.FC<TelemetryChartsProps> = ({
  data,
  currentIndex,
  setCurrentIndex,
  contaminationThreshold,
  setContaminationThreshold,
}) => {
  const [chartMode, setChartMode] = useState<'anomaly' | 'pressures' | 'thermal'>('anomaly');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Auto-play interval
  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev >= data.length - 1 ? 0 : prev + 1));
      }, 350);
    }
    return () => clearInterval(interval);
  }, [isPlaying, data.length, setCurrentIndex]);

  const current = data[currentIndex] || data[0];

  return (
    <div className="space-y-6">
      {/* Time Scrubber and Controls */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-medium transition"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause Replay' : 'Replay Telemetry'}</span>
            </button>
            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentIndex(0);
              }}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
              title="Reset to t=0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-mono text-slate-400">
              Time Step: <strong className="text-white">{current.timestamp}</strong> ({currentIndex + 1}/{data.length})
            </span>
          </div>

          {/* Phase Badge */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Operating Phase:</span>
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                current.phase === 'Normal Cycling'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : current.phase === 'Incipient Leak'
                  ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                  : current.phase === 'Thermal Runaway'
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/30 animate-pulse'
              }`}
            >
              {current.phase}
            </span>
          </div>
        </div>

        {/* Timeline Slider */}
        <input
          type="range"
          min={0}
          max={data.length - 1}
          value={currentIndex}
          onChange={(e) => setCurrentIndex(Number(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />
        <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
          <span>08:00 (Nominal APU Start)</span>
          <span>15:30 (Incipient Leak)</span>
          <span>21:45 (Early Warning Anomaly)</span>
          <span>09:00 (Catastrophic Stoppage)</span>
        </div>
      </div>

      {/* Real-time Telemetry Readout Cards at Current Index */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-3">
          <div className="text-[11px] text-slate-400">Reservoir Pressure</div>
          <div className={`text-lg font-bold font-mono ${current.Reservoirs < 7.5 ? 'text-rose-400' : 'text-white'}`}>
            {current.Reservoirs.toFixed(2)} <span className="text-xs text-slate-400 font-normal">bar</span>
          </div>
          <div className="text-[10px] text-slate-500">Normal: 8.2 - 10.0</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-3">
          <div className="text-[11px] text-slate-400">Oil Temperature</div>
          <div className={`text-lg font-bold font-mono ${current.Oil_Temperature > 80 ? 'text-rose-400' : current.Oil_Temperature > 72 ? 'text-amber-400' : 'text-white'}`}>
            {current.Oil_Temperature.toFixed(1)} <span className="text-xs text-slate-400 font-normal">°C</span>
          </div>
          <div className="text-[10px] text-slate-500">Normal: 55 - 70°C</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-3">
          <div className="text-[11px] text-slate-400">Motor Current</div>
          <div className={`text-lg font-bold font-mono ${current.Motor_Current > 7.5 ? 'text-rose-400' : 'text-white'}`}>
            {current.Motor_Current.toFixed(2)} <span className="text-xs text-slate-400 font-normal">A</span>
          </div>
          <div className="text-[10px] text-slate-500">Normal: 4.8 - 6.5A</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-3">
          <div className="text-[11px] text-slate-400">Filter Drop (H1)</div>
          <div className={`text-lg font-bold font-mono ${current.H1 > 0.6 ? 'text-rose-400' : 'text-white'}`}>
            {current.H1.toFixed(2)} <span className="text-xs text-slate-400 font-normal">bar</span>
          </div>
          <div className="text-[10px] text-slate-500">Normal: 0.1 - 0.35</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-3">
          <div className="text-[11px] text-slate-400">Compressor Pressure</div>
          <div className="text-lg font-bold font-mono text-white">
            {current.TP2.toFixed(2)} <span className="text-xs text-slate-400 font-normal">bar</span>
          </div>
          <div className="text-[10px] text-slate-500">Panel (TP3): {current.TP3.toFixed(2)}</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-3">
          <div className="text-[11px] text-slate-400">Isolation Forest Score</div>
          <div className={`text-lg font-bold font-mono ${current.anomalyScore >= 0.75 ? 'text-rose-400' : current.anomalyScore >= 0.58 ? 'text-amber-400' : 'text-emerald-400'}`}>
            {current.anomalyScore.toFixed(2)}
          </div>
          <div className="text-[10px] text-slate-400 truncate">
            Driver: {current.dominantFeature}
          </div>
        </div>
      </div>

      {/* Main Charts Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-base font-semibold text-white m-0">
              UCI MetroPT-3 Telemetry Waveforms & Failure Progression
            </h2>
            <p className="text-xs text-slate-400 m-0">
              Synchronized 100-step time horizon tracking air unit degradation toward catastrophic stoppage
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 mr-1">View:</span>
            <button
              onClick={() => setChartMode('anomaly')}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition ${
                chartMode === 'anomaly'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Anomaly Score & Lead Time
            </button>
            <button
              onClick={() => setChartMode('pressures')}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition ${
                chartMode === 'pressures'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Pressure Dynamics (TP2/TP3/Res)
            </button>
            <button
              onClick={() => setChartMode('thermal')}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition ${
                chartMode === 'thermal'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Thermal & Electrical Load
            </button>
          </div>
        </div>

        {/* Chart Container */}
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartMode === 'anomaly' ? (
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                    <stop offset="50%" stopColor="#f59e0b" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="timestamp" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis domain={[0, 1]} stroke="#64748b" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                  labelStyle={{ color: '#94a3b8', fontSize: '11px' }}
                />
                <ReferenceLine
                  y={contaminationThreshold}
                  stroke="#ef4444"
                  strokeDasharray="4 4"
                  label={{
                    value: `Threshold (${contaminationThreshold})`,
                    fill: '#ef4444',
                    fontSize: 10,
                    position: 'insideTopRight',
                  }}
                />
                <ReferenceLine
                  x={data[currentIndex]?.timestamp}
                  stroke="#38bdf8"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="anomalyScore"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#scoreGradient)"
                  name="Isolation Forest Anomaly Score"
                />
              </AreaChart>
            ) : chartMode === 'pressures' ? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="timestamp" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis domain={[0, 11]} stroke="#64748b" tick={{ fontSize: 10 }} unit=" bar" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                />
                <ReferenceLine y={6.5} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Emergency Brake Lock Limit (6.5 bar)', fill: '#ef4444', fontSize: 10 }} />
                <ReferenceLine x={data[currentIndex]?.timestamp} stroke="#38bdf8" strokeWidth={2} />
                <Line type="monotone" dataKey="Reservoirs" stroke="#10b981" strokeWidth={2} dot={false} name="Main Reservoir" />
                <Line type="monotone" dataKey="TP2" stroke="#38bdf8" strokeWidth={1.5} dot={false} name="Compressor (TP2)" />
                <Line type="monotone" dataKey="TP3" stroke="#a855f7" strokeWidth={1.5} dot={false} name="Pneumatic Panel (TP3)" />
                <Line type="monotone" dataKey="H1" stroke="#f59e0b" strokeWidth={2} dot={false} name="Dryer Drop (H1)" />
              </LineChart>
            ) : (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="timestamp" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis yAxisId="temp" domain={[40, 100]} stroke="#f43f5e" tick={{ fontSize: 10 }} unit=" °C" orientation="left" />
                <YAxis yAxisId="curr" domain={[0, 12]} stroke="#38bdf8" tick={{ fontSize: 10 }} unit=" A" orientation="right" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                />
                <ReferenceLine yAxisId="temp" y={85} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Thermal Cutout Alarm (85°C)', fill: '#ef4444', fontSize: 10 }} />
                <ReferenceLine x={data[currentIndex]?.timestamp} stroke="#38bdf8" strokeWidth={2} />
                <Line yAxisId="temp" type="monotone" dataKey="Oil_Temperature" stroke="#f43f5e" strokeWidth={2} dot={false} name="Oil Temperature (°C)" />
                <Line yAxisId="curr" type="monotone" dataKey="Motor_Current" stroke="#38bdf8" strokeWidth={2} dot={false} name="Motor Current (A)" />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Explainability Note below Chart */}
        <div className="mt-4 p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs flex items-start gap-2.5 text-slate-300">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-cyan-300">Predictive Lead Time Advantage:</strong> At time step <strong>18:30</strong> (Phase 3), the Isolation Forest anomaly score breaches the <strong>0.58 threshold</strong> due to subtle multi-variate coupling (oil temperature creeping to 74°C while dryer differential pressure $H_1$ climbs to 0.72 bar). 
            Traditional thresholding does not trip until hours later at <strong>08:45</strong> when reservoir pressure critically collapses below 6.5 bar, stranding the train on the line. The model delivers an <strong>18.5-hour lead window</strong> to dispatch a depot technician before catastrophic failure occurs.
          </div>
        </div>
      </div>
    </div>
  );
};
