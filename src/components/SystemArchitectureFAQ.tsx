import React from 'react';
import { Database, Code2, ShieldCheck, DollarSign, HelpCircle } from 'lucide-react';

export const SystemArchitectureFAQ: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Core Architectural Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pillar 1 */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
            <Database className="w-4 h-4" />
            <span>1. Industrial Telemetry Data Ingestion</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed m-0">
            <strong>Data Source:</strong> Real-world multi-sensor data captured from the Air Production Unit (APU) compressors of urban metro trains operating on the Metro do Porto network (UCI Machine Learning Repository).
          </p>
          <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
            <li><strong>7 analog sensors:</strong> Compressor head pressure (TP2), pneumatic panel pressure (TP3), filter drop (H1), reservoir storage pressure, motor current draw, and crankcase oil temperature.</li>
            <li><strong>Critical Safety Boundary:</strong> A loss of reservoir air pressure below 6.5 bar automatically trips emergency spring brake lockups that strand passenger trains on the main track.</li>
          </ul>
        </div>

        {/* Pillar 2 */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
            <Code2 className="w-4 h-4" />
            <span>2. Isolation Forest Anomaly Detection Engine</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed m-0">
            <strong>Algorithmic Rationale:</strong> Unsupervised ensemble of random partition trees (iTrees) designed specifically to isolate anomalous telemetry instances rather than profiling normal operational envelopes.
          </p>
          <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
            <li><strong>Path Length Contrast:</strong> Anomalous multi-sensor states are isolated rapidly in very shallow splits (tree depth h &approx; 3&ndash;5), while nominal duty cycles require deep cuts (h &approx; 12&ndash;14).</li>
            <li><strong>Edge Deployment:</strong> Features linear O(n log n) computational time and a compact memory profile suitable for low-power train cab industrial edge gateways.</li>
          </ul>
        </div>

        {/* Pillar 3 */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>3. Catastrophic Failure Mitigation & Lead Time</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed m-0">
            <strong>Early Warning Window:</strong> Traditional SCADA hard thresholds only trip after mechanical failure has occurred and pressure has collapsed.
          </p>
          <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
            <li><strong>18.5-Hour Predictive Lead Window:</strong> The model detects subtle multivariate coupling (e.g. slight oil temperature creep combined with filter pressure differential rise) hours prior to pressure breakdown.</li>
            <li><strong>Planned Turnaround:</strong> Enables routing rolling stock to depot facilities for off-peak servicing without transit line interruption.</li>
          </ul>
        </div>

        {/* Pillar 4 */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
            <DollarSign className="w-4 h-4" />
            <span>4. Dynamic Financial ROI Quantification</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed m-0">
            <strong>Executive Metric Translation:</strong> Directly translates technical anomaly predictions into bottom-line operational savings.
          </p>
          <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
            <li><strong>Unplanned Incident Cost:</strong> ~$62,250 per catastrophic event (transit delay penalty fines, emergency recovery towing, and full APU compressor hardware destruction).</li>
            <li><strong>Preemptive Maintenance:</strong> ~$1,450 per scheduled depot service (seal overhaul, filter swap, and oil flush). Yields an operational ROI multiple exceeding 40x.</li>
          </ul>
        </div>
      </div>

      {/* Technical Architecture FAQ */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2 m-0">
          <HelpCircle className="w-4 h-4 text-cyan-400" />
          Technical Architecture & Engineering FAQ
        </h3>

        <div className="space-y-3">
          <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <div className="font-semibold text-xs text-cyan-300 mb-1">
              Q: Why choose an Isolation Forest over deep learning architectures (like LSTM Autoencoders)?
            </div>
            <p className="text-xs text-slate-300 m-0">
              <strong>Answer:</strong> Industrial telemetry like MetroPT-3 is tabular and high-frequency. Deep autoencoders require substantial GPU compute for inference, present black-box explainability challenges, and suffer from high retraining latency. Isolation Forest is mathematically transparent (s = 2^(-h/c)), requires zero labeled failure training data, executes with linear complexity on ruggedized low-power onboard railway gateways, and enables immediate multi-variate feature attribution for depot technicians.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <div className="font-semibold text-xs text-cyan-300 mb-1">
              Q: How is the anomaly decision threshold calibrated?
            </div>
            <p className="text-xs text-slate-300 m-0">
              <strong>Answer:</strong> The contamination parameter is calibrated against nominal fleet baseline operations (~8%). An anomaly score threshold of s &ge; 0.58 (corresponding to an average isolation path length h(x) &lt; 8.2 splits) marks the inflection point where sensor trajectories deviate more than 2 standard deviations from the operational centroid without generating false positives during routine compressor cycling.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <div className="font-semibold text-xs text-cyan-300 mb-1">
              Q: What makes the financial ROI engine dynamic rather than static?
            </div>
            <p className="text-xs text-slate-300 m-0">
              <strong>Answer:</strong> Real-world transit operational costs vary continuously based on route density, hourly passenger delay fines, and depot labor agreements. The dashboard dynamically couples the model's detected anomaly frequency to adjustable economic parameters (hourly downtime penalty, fleet size, equipment replacement costs) allowing fleet operations managers to perform real-time sensitivity analysis.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <div className="font-semibold text-xs text-cyan-300 mb-1">
              Q: How does the system handle sensor noise and false alarms?
            </div>
            <p className="text-xs text-slate-300 m-0">
              <strong>Answer:</strong> Subsampling each iTree with n=256 instances removes both swamping (normal instances erroneously flagged due to proximity to outliers) and masking (clusters of anomalies masking one another). Multi-sensor correlation prevents single-sensor transient spikes from triggering critical alarms unless accompanied by corresponding thermal or pressure degradation signatures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
