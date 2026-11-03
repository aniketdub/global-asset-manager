export interface TelemetryPoint {
  timestamp: string;
  timeIndex: number;
  // Sensors from UCI MetroPT-3
  TP2: number;          // Compressor head pressure (bar)
  TP3: number;          // Pneumatic panel pressure (bar)
  H1: number;           // Air dryer differential pressure drop (bar)
  DV_pressure: number;  // Exhaust/drain valve pressure (bar)
  Reservoirs: number;   // Main reservoir storage pressure (bar)
  Motor_Current: number;// Electric motor current (A)
  Oil_Temperature: number; // Compressor oil temperature (°C)
  COMP: number;         // Compressor cycle state (0 = idle, 1 = active)
  DV_electric: number;  // Solenoid purge valve signal (0 = off, 1 = on)
  TOW: number;          // Active dryer desiccant tower (1 or 2)
  
  // Model inference
  anomalyScore: number; // Isolation Forest normalized anomaly score [0, 1]
  isAnomaly: boolean;   // True if anomalyScore > threshold
  treeDepth: number;    // Average isolation path length
  dominantFeature: string; // Sensor with highest contribution
  status: 'OPTIMAL' | 'DEGRADED' | 'CRITICAL';
  failureRisk: number;  // 0 - 100%
  phase: 'Normal Cycling' | 'Incipient Leak' | 'Filter Saturation' | 'Thermal Runaway' | 'Catastrophic Failure';
}

export interface RoiParameters {
  fleetSize: number;
  preventedFailuresPerYear: number;
  unplannedDowntimeHours: number;
  hourlyDowntimePenalty: number;
  catastrophicReplacementCost: number;
  preemptiveMaintenanceCost: number;
  technicianHourlyRate: number;
  inspectionHours: number;
}

export interface FeatureContribution {
  feature: string;
  name: string;
  value: number;
  normalRange: string;
  contribution: number; // 0 to 1
  impact: 'low' | 'moderate' | 'high' | 'critical';
}
