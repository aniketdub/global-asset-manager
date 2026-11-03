import React, { useState } from 'react';
import { Header } from './components/Header';
import { ExecutiveMetrics } from './components/ExecutiveMetrics';
import { TelemetryCharts } from './components/TelemetryCharts';
import { FaultSimulator } from './components/FaultSimulator';
import { IsolationForestExplainer } from './components/IsolationForestExplainer';
import { RoiCalculator } from './components/RoiCalculator';
import { SystemArchitectureFAQ } from './components/SystemArchitectureFAQ';
import { METROPT3_TELEMETRY } from './data/metropt3Data';
import { Activity, GitBranch, Shield, Heart } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  // Default to step 68 where the model triggers the early warning window
  const [currentIndex, setCurrentIndex] = useState<number>(68);
  const [contaminationThreshold, setContaminationThreshold] = useState<number>(0.58);

  const currentPoint = METROPT3_TELEMETRY[currentIndex] || METROPT3_TELEMETRY[0];

  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        anomalyScore={currentPoint.anomalyScore}
        status={currentPoint.status}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Executive Metrics Top Bar (always visible) */}
        <ExecutiveMetrics
          currentScore={currentPoint.anomalyScore}
          currentRisk={currentPoint.failureRisk}
          netSavings={498200}
          roiPercentage={4290}
          earlyWarningLeadHours={18.5}
          preventedFailures={8}
        />

        {/* Tab Routing */}
        {activeTab === 'overview' && (
          <TelemetryCharts
            data={METROPT3_TELEMETRY}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            contaminationThreshold={contaminationThreshold}
            setContaminationThreshold={setContaminationThreshold}
          />
        )}

        {activeTab === 'simulator' && <FaultSimulator />}

        {activeTab === 'isolation-forest' && <IsolationForestExplainer />}

        {activeTab === 'roi' && <RoiCalculator />}

        {activeTab === 'architecture' && <SystemArchitectureFAQ />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 mt-12 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">MetroPT-3 Predictive Maintenance Platform</span>
            <span>•</span>
            <span>UCI Machine Learning Benchmark</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Air Production Unit (APU) Telemetry</span>
            <span>•</span>
            <span>Isolation Forest Anomaly Detection</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
