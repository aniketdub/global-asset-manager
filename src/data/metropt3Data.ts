import { TelemetryPoint } from '../types/telemetry';
import { scoreIsolationForest } from '../utils/isolationForest';

function generateMetroPT3Series(): TelemetryPoint[] {
  const points: TelemetryPoint[] = [];
  const baseTime = new Date('2026-05-18T08:00:00Z');

  for (let i = 0; i <= 100; i++) {
    const curTime = new Date(baseTime.getTime() + i * 15 * 60 * 1000); // 15-minute intervals
    const timeStr = curTime.toISOString().substring(11, 16); // "HH:MM"
    
    let TP2 = 8.6;
    let TP3 = 8.3;
    let H1 = 0.16;
    let DV_pressure = 0.1;
    let Reservoirs = 9.0;
    let Motor_Current = 5.4;
    let Oil_Temperature = 61.5;
    let COMP = (i % 6 < 4) ? 1 : 0; // Compressor running duty cycle
    let phase: TelemetryPoint['phase'] = 'Normal Cycling';

    if (i < 30) {
      // PHASE 1: Normal Nominal Operation
      phase = 'Normal Cycling';
      const noise = (Math.sin(i * 0.7) * 0.2);
      TP2 = COMP ? 8.8 + noise : 0.2;
      TP3 = COMP ? 8.4 + noise : 0.3;
      H1 = 0.15 + (Math.sin(i * 0.5) * 0.03);
      Reservoirs = 8.6 + (Math.sin(i * 0.3) * 0.6);
      Motor_Current = COMP ? 5.3 + (Math.sin(i * 0.4) * 0.3) : 0.1;
      Oil_Temperature = 60.0 + (i * 0.12) + (Math.sin(i * 0.6) * 1.5);
    } else if (i < 55) {
      // PHASE 2: Incipient Air Leak & Dryer Filter Clog
      phase = 'Incipient Leak';
      const progress = (i - 30) / 25;
      COMP = 1; // Compressor forced to run longer to maintain pressure
      TP2 = 8.4 - (progress * 0.6);
      TP3 = 7.9 - (progress * 0.8);
      H1 = 0.18 + (progress * 0.48); // Rising pressure drop across filter
      Reservoirs = 8.4 - (progress * 0.7);
      Motor_Current = 5.8 + (progress * 0.9);
      Oil_Temperature = 64.0 + (progress * 6.5);
    } else if (i < 80) {
      // PHASE 3: Mechanical Friction & Thermal Overload (Early Warning Threshold Breached)
      phase = 'Thermal Runaway';
      const progress = (i - 55) / 25;
      COMP = 1;
      TP2 = 7.7 - (progress * 0.8);
      TP3 = 7.1 - (progress * 0.9);
      H1 = 0.66 + (progress * 0.45);
      Reservoirs = 7.7 - (progress * 1.1); // Reservoir dropping towards safety threshold
      Motor_Current = 6.8 + (progress * 1.6); // Current drawn increases significantly
      Oil_Temperature = 71.0 + (progress * 13.0); // Oil temperature climbing rapidly
    } else {
      // PHASE 4: Catastrophic Breakdown State
      phase = 'Catastrophic Failure';
      const progress = (i - 80) / 20;
      COMP = (i % 2 === 0) ? 1 : 0; // Compressor erratic tripping
      TP2 = 6.8 - (progress * 2.2);
      TP3 = 6.1 - (progress * 2.4);
      H1 = 1.15 + (progress * 0.35);
      Reservoirs = 6.5 - (progress * 1.6); // Dangerous low pressure < 6 bar (train immobilized)
      Motor_Current = 8.5 + (progress * 2.1); // Motor current peaking near 10.6 A
      Oil_Temperature = 84.0 + (progress * 12.0); // Thermal limit breach > 92°C
    }

    // Rounding for realism
    TP2 = Math.round(TP2 * 100) / 100;
    TP3 = Math.round(TP3 * 100) / 100;
    H1 = Math.round(H1 * 100) / 100;
    Reservoirs = Math.round(Reservoirs * 100) / 100;
    Motor_Current = Math.round(Motor_Current * 100) / 100;
    Oil_Temperature = Math.round(Oil_Temperature * 10) / 10;

    // Run through Isolation Forest model
    const ifResult = scoreIsolationForest({
      TP2,
      TP3,
      H1,
      Reservoirs,
      Motor_Current,
      Oil_Temperature,
    });

    const isAnomaly = ifResult.score >= 0.58;
    let status: TelemetryPoint['status'] = 'OPTIMAL';
    if (ifResult.score >= 0.75) status = 'CRITICAL';
    else if (ifResult.score >= 0.55) status = 'DEGRADED';

    const failureRisk = Math.min(100, Math.round(Math.max(5, (ifResult.score - 0.3) / 0.65 * 100)));

    points.push({
      timestamp: timeStr,
      timeIndex: i,
      TP2,
      TP3,
      H1,
      DV_pressure,
      Reservoirs,
      Motor_Current,
      Oil_Temperature,
      COMP,
      DV_electric: (i % 4 === 0) ? 1 : 0,
      TOW: (i % 20 < 10) ? 1 : 2,
      anomalyScore: ifResult.score,
      isAnomaly,
      treeDepth: ifResult.treeDepth,
      dominantFeature: ifResult.dominantFeature,
      status,
      failureRisk,
      phase,
    });
  }

  return points;
}

export const METROPT3_TELEMETRY: TelemetryPoint[] = generateMetroPT3Series();
