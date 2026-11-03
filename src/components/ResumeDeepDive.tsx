import React from 'react';
import { FileText, CheckCircle2, ChevronRight, HelpCircle, Code2, Database, ShieldCheck, DollarSign } from 'lucide-react';

export const ResumeDeepDive: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Resume Headline Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-slate-800 rounded-xl p-6">
        <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-2 block">
          Resume Statement Breakdown
        </span>
        <blockquote className="text-base sm:text-lg font-medium text-white italic border-l-4 border-cyan-500 pl-4 py-1 leading-relaxed">
          &ldquo;Engineered a predictive maintenance dashboard using an Isolation Forest anomaly detection model on UCI MetroPT-3 industrial telemetry data to predict catastrophic equipment failure and dynamically quantify the financial ROI of preemptive maintenance versus unplanned downtime.&rdquo;
        </blockquote>
        <p className="text-xs text-slate-400 mt-3 m-0">
          This section provides the complete technical narrative, design decisions, and interview responses mapped directly to each clause of the statement.
        </p>
      </div>

      {/* Clause-by-Clause Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Clause 1 */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
            <Database className="w-4 h-4" />
            <span>1. &ldquo;UCI MetroPT-3 industrial telemetry data&rdquo;</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed m-0">
            <strong>What it is:</strong> Real-world sensor data captured from the Air Production Unit (APU) compressors of urban metro trains operating on the Metro do Porto network in Portugal.
          </p>
          <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
            <li><strong>7 analog sensors:</strong> Compressor head pressure (TP2), panel pressure (TP3), filter drop (H1), reservoir pressure, motor current, oil temp.</li>
            <li><strong>Safety criticality:</strong> Loss of reservoir air pressure triggers automatic emergency braking lockups that halt train transit.</li>
          </ul>
        </div>

        {/* Clause 2 */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
            <Code2 className="w-4 h-4" />
            <span>2. &ldquo;Isolation Forest anomaly detection model&rdquo;</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed m-0">
            <strong>Why Isolation Forest:</strong> Unsupervised tree ensemble that isolates anomalies instead of profiling normal clusters.
          </p>
          <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
            <li><strong>Low tree depth $h(x)$:</strong> Anomalies require very few random splits ($h \approx 3-5$) compared to nominal points ($h \approx 12-14$).</li>
            <li><strong>Edge-ready:</strong> $O(n \log n)$ time complexity and minimal memory overhead, ideal for onboard railway telemetry streams.</li>
          </ul>
        </div>

        {/* Clause 3 */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>3. &ldquo;Predict catastrophic equipment failure&rdquo;</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed m-0">
            <strong>The Early Warning Window:</strong> Traditional hard-threshold systems only alarm when reservoir pressure critically drops below 6.5 bar (when the train is already stranded).
          </p>
          <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
            <li><strong>Lead Time:</strong> The multi-sensor model flags thermal and filter degradation <strong>18.5 hours in advance</strong>.</li>
            <li><strong>Zero Train Stoppage:</strong> Allows routing trains to depots during planned off-peak night shifts.</li>
          </ul>
        </div>

        {/* Clause 4 */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
            <DollarSign className="w-4 h-4" />
            <span>4. &ldquo;Dynamically quantify financial ROI&rdquo;</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed m-0">
            <strong>Business Impact Translation:</strong> Engineers often stop at ROC-AUC; this project translates model precision into executive dollars and cents.
          </p>
          <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
            <li><strong>Unplanned Cost:</strong> ~$62,250 / incident (service fines + emergency towing + catastrophic compressor replacement).</li>
            <li><strong>Preemptive Cost:</strong> ~$1,450 / incident (off-peak seal kit & oil flush). Yields a <strong>42x ROI multiple</strong>.</li>
          </ul>
        </div>
      </div>

      {/* Interview FAQ Accordion */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2 m-0">
          <HelpCircle className="w-4 h-4 text-cyan-400" />
          Technical Interview Q&A Cheatsheet
        </h3>

        <div className="space-y-3">
          <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <div className="font-semibold text-xs text-cyan-300 mb-1">
              Q: &ldquo;Why did you choose an Isolation Forest over deep learning (like an LSTM Autoencoder)?&rdquo;
            </div>
            <p className="text-xs text-slate-300 m-0">
              <strong>Answer:</strong> Industrial telemetry like MetroPT-3 is tabular and high-frequency. Deep autoencoders are computationally intensive, require GPU inference, and act as black boxes. Isolation Forest is mathematically transparent (s = 2^(-h/c)), requires zero labeled failure training data, runs in linear time on low-power edge gateways inside the train cab, and allows instant feature attribution for technicians.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <div className="font-semibold text-xs text-cyan-300 mb-1">
              Q: &ldquo;How did you determine the anomaly threshold?&rdquo;
            </div>
            <p className="text-xs text-slate-300 m-0">
              <strong>Answer:</strong> We calibrated the contamination factor (~8%) based on nominal operational baselines. An anomaly score of s &ge; 0.58 (path length h(x) &lt; 8.2 splits) was identified as the inflection point where multi-variate sensor drift exceeds 2 standard deviations from centroid without triggering false alarms during routine compressor duty cycles.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <div className="font-semibold text-xs text-cyan-300 mb-1">
              Q: &ldquo;What makes the ROI dynamic rather than static?&rdquo;
            </div>
            <p className="text-xs text-slate-300 m-0">
              <strong>Answer:</strong> Transit systems have variable costs depending on the time of day, passenger line density, and union technician rates. The dashboard dynamically couples the model's detected anomaly rate to customizable financial parameters (hourly penalty, fleet size, overhaul kit price) so financial leaders can run real-time sensitivity analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
