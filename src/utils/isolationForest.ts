import { FeatureContribution } from '../types/telemetry';

// Baseline reference statistics from UCI MetroPT-3 training distribution (Normal APU operation)
export const METROPT3_BASELINES = {
  TP2: { mean: 8.5, std: 1.6, min: 0.0, max: 10.5, unit: 'bar', label: 'Compressor Pressure' },
  TP3: { mean: 8.2, std: 1.3, min: 0.0, max: 10.2, unit: 'bar', label: 'Pneumatic Panel' },
  H1: { mean: 0.15, std: 0.12, min: -0.05, max: 1.8, unit: 'bar', label: 'Dryer Filter ΔP' },
  DV_pressure: { mean: 0.2, std: 0.4, min: 0.0, max: 3.5, unit: 'bar', label: 'Exhaust Valve' },
  Reservoirs: { mean: 8.9, std: 0.7, min: 5.0, max: 10.4, unit: 'bar', label: 'Main Reservoir' },
  Motor_Current: { mean: 5.6, std: 1.1, min: 0.0, max: 11.5, unit: 'A', label: 'Motor Current' },
  Oil_Temperature: { mean: 63.5, std: 6.8, min: 25.0, max: 98.0, unit: '°C', label: 'Oil Temperature' },
};

/**
 * Average path length of unsuccessful search in a Binary Search Tree (BST)
 * c(n) = 2 * (ln(n - 1) + 0.5772156649) - (2 * (n - 1) / n)
 * Standard benchmark equation from Liu, Ting, Zhou (2008) "Isolation Forest"
 */
export function calculateAveragePathLength(n: number): number {
  if (n <= 1) return 0;
  if (n === 2) return 1;
  const eulerMascheroni = 0.5772156649;
  return 2 * (Math.log(n - 1) + eulerMascheroni) - (2 * (n - 1) / n);
}

/**
 * Predict anomaly score and average isolation tree depth for given telemetry input
 * Based on Isolation Forest logic: anomalous points have short path lengths h(x),
 * leading to score s(x, n) = 2^(-E(h(x)) / c(n)) approaching 1.0.
 */
export function scoreIsolationForest(
  point: {
    TP2: number;
    TP3: number;
    H1: number;
    Reservoirs: number;
    Motor_Current: number;
    Oil_Temperature: number;
  },
  subsampleSize: number = 256
): {
  score: number;
  treeDepth: number;
  maxExpectedDepth: number;
  contributions: FeatureContribution[];
  dominantFeature: string;
} {
  const c_n = calculateAveragePathLength(subsampleSize); // ~10.4 for n=256
  
  // Calculate standardized z-scores and relative multi-sensor deviations
  const zTP2 = Math.abs((point.TP2 - METROPT3_BASELINES.TP2.mean) / METROPT3_BASELINES.TP2.std);
  const zTP3 = Math.abs((point.TP3 - METROPT3_BASELINES.TP3.mean) / METROPT3_BASELINES.TP3.std);
  const zH1 = Math.max(0, (point.H1 - METROPT3_BASELINES.H1.mean) / METROPT3_BASELINES.H1.std);
  
  // For Reservoirs, low pressure is critical (air leak / failing to charge)
  const zReservoir = point.Reservoirs < 8.0 
    ? Math.abs(8.8 - point.Reservoirs) / 0.7 * 1.5 
    : Math.abs(point.Reservoirs - 8.9) / 0.7;
    
  // High motor current indicates mechanical resistance / overheating / heavy load
  const zMotor = point.Motor_Current > 6.8 
    ? Math.pow((point.Motor_Current - 5.6) / 1.1, 1.25)
    : Math.abs((point.Motor_Current - 5.6) / 1.1);

  // High oil temperature indicates heat dissipation failure / friction
  const zOil = point.Oil_Temperature > 70 
    ? Math.pow((point.Oil_Temperature - 63.5) / 6.8, 1.3)
    : Math.abs((point.Oil_Temperature - 63.5) / 6.8);

  // Combined multidimensional isolation factor
  const compositeDeviation = Math.sqrt(
    Math.pow(zTP2 * 0.7, 2) +
    Math.pow(zTP3 * 0.7, 2) +
    Math.pow(zH1 * 1.4, 2) +
    Math.pow(zReservoir * 1.8, 2) +
    Math.pow(zMotor * 1.6, 2) +
    Math.pow(zOil * 1.9, 2)
  );

  // Simulated average tree path length h(x):
  // Points near centroid have deep path lengths (~12 - 14)
  // Anomalies in sparse outer hyperspace are isolated with few cuts (~2 - 5)
  const estimatedPathLength = Math.max(
    1.8,
    Math.min(14.5, c_n * (1.15 - 0.18 * compositeDeviation))
  );

  // Standard Isolation Forest Score equation: s = 2^(-h / c)
  const rawScore = Math.pow(2, -estimatedPathLength / c_n);
  
  // Scale and calibrate between 0.15 and 0.98 for intuitive UI interpretation
  const calibratedScore = Math.min(0.98, Math.max(0.12, Math.round(rawScore * 100) / 100));

  // Feature attributions
  const weights = [
    { key: 'Oil_Temperature', label: 'Oil Temperature', val: point.Oil_Temperature, z: zOil * 1.9, range: '55°C - 75°C' },
    { key: 'Reservoirs', label: 'Main Reservoir Pressure', val: point.Reservoirs, z: zReservoir * 1.8, range: '8.2 - 9.8 bar' },
    { key: 'Motor_Current', label: 'Motor Current Draw', val: point.Motor_Current, z: zMotor * 1.6, range: '4.5 - 7.0 A' },
    { key: 'H1', label: 'Dryer Filter Pressure Drop', val: point.H1, z: zH1 * 1.4, range: '0.05 - 0.35 bar' },
    { key: 'TP2', label: 'Compressor Output Pressure', val: point.TP2, z: zTP2 * 0.7, range: '7.0 - 10.0 bar' },
    { key: 'TP3', label: 'Pneumatic Panel Pressure', val: point.TP3, z: zTP3 * 0.7, range: '7.0 - 9.8 bar' },
  ];

  const totalZ = weights.reduce((acc, curr) => acc + curr.z, 0) || 1;

  const contributions: FeatureContribution[] = weights.map(w => {
    const contributionRatio = w.z / totalZ;
    let impact: 'low' | 'moderate' | 'high' | 'critical' = 'low';
    if (contributionRatio > 0.45) impact = 'critical';
    else if (contributionRatio > 0.28) impact = 'high';
    else if (contributionRatio > 0.15) impact = 'moderate';

    return {
      feature: w.key,
      name: w.label,
      value: w.val,
      normalRange: w.range,
      contribution: Math.round(contributionRatio * 100) / 100,
      impact,
    };
  }).sort((a, b) => b.contribution - a.contribution);

  return {
    score: calibratedScore,
    treeDepth: Math.round(estimatedPathLength * 10) / 10,
    maxExpectedDepth: Math.round(c_n * 10) / 10,
    contributions,
    dominantFeature: contributions[0]?.name || 'Nominal',
  };
}
