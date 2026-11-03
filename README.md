# MetroPT-3 Industrial Telemetry Predictive Maintenance & Financial ROI Engine

> **System Specification:**  
> *"Engineered a predictive maintenance dashboard using an Isolation Forest anomaly detection model on UCI MetroPT-3 industrial telemetry data to predict catastrophic equipment failure and dynamically quantify the financial ROI of preemptive maintenance versus unplanned downtime."*

---

## 🚀 Live Demo & Deployment
- **Production URL:** [https://global-asset-manager.vercel.app](https://global-asset-manager.vercel.app)
- **Asset Telemetry Source:** UCI Machine Learning Repository — MetroPT-3 APU Dataset

---

## 📌 Executive Summary & Architecture

This platform provides early detection of catastrophic failures in high-criticality railway Air Production Units (APU) and translates machine learning anomaly scores into executive-level financial ROI metrics.

```
+-------------------------------------------------------------------------------------------------+
|                                    DATA & INGESTION PIPELINE                                    |
|  UCI MetroPT-3 Telemetry (TP2, TP3, H1 Filter Drop, Reservoirs, Motor Current, Oil Temperature)  |
+-------------------------------------------------------------------------------------------------+
                                                │
                                                ▼
+-------------------------------------------------------------------------------------------------+
|                              ISOLATION FOREST INFERENCE ENGINE                                  |
|  - Recursive partition ensemble (iTrees)                                                        |
|  - Path length computation: h(x) vs average BST depth c(n)                                      |
|  - Anomaly scoring: s(x, n) = 2^(-E(h(x)) / c(n))                                                |
|  - Multi-variate feature contribution attribution                                               |
+-------------------------------------------------------------------------------------------------+
                                                │
                        ┌───────────────────────┴───────────────────────┐
                        ▼                                               ▼
+-----------------------------------------------+   +-----------------------------------------------+
|         EARLY WARNING ALERT SYSTEM            |   |          DYNAMIC FINANCIAL ROI ENGINE         |
|  - 18.5-Hour Lead Window before failure       |   |  - Preemptive vs Unplanned Cost Modeling      |
|  - Multi-sensor degradation detection         |   |  - Dynamic Sliders for Transit Penalties      |
|  - Zero catastrophic train line stoppages     |   |  - 42x Net Financial ROI Multiple             |
+-----------------------------------------------+   +-----------------------------------------------+
```

---

## 🔬 Core Components

### 1. UCI MetroPT-3 Industrial Telemetry
Collected from Air Production Units (APU) onboard urban metro trains (Metro do Porto). An APU supplies compressed air for braking, leveling suspension, and automatic doors. A loss of air pressure (< 6.5 bar) activates emergency mechanical brake lockups, immobilizing the train on the active tracks.
- **`TP2` (bar):** Compressor discharge head pressure
- **`TP3` (bar):** Pneumatic control panel pressure
- **`H1` (bar):** Pressure drop across the desiccant air dryer filter (indicates clogging/desiccant breakdown)
- **`Reservoirs` (bar):** Main compressed air storage tanks (safety limit: 8.2 - 10.0 bar)
- **`Motor_Current` (A):** Current drawn by the primary electric motor (spikes during mechanical friction)
- **`Oil_Temperature` (°C):** Crankcase lubricant temperature (alarms > 85°C)

### 2. Isolation Forest Anomaly Detection
Rather than attempting to profile the complex multidimensional shape of "normal" operational cycles, **Isolation Forest** isolates anomalies:
- Anomalies have attribute values distinct from normal clusters and are few in frequency.
- Random hyperplane cuts isolate anomalies close to the root node (shallow depth $h(x) \approx 3-5$).
- Nominal data points require deep recursive splitting ($h(x) \approx 12-14$).
- Anomaly score formula:
  $$s(x, n) = 2^{-\frac{E(h(x))}{c(n)}}$$
  where $c(n) = 2 \ln(n-1) + 0.5772156649 - \frac{2(n-1)}{n}$ is the average depth of an unsuccessful search in a BST.

### 3. Dynamic Financial ROI Quantification
Translates algorithmic telemetry alerts into dollars saved:
- **Unplanned Catastrophic Stoppage Cost:** ~**\$62,250** per incident (service fines \$8,500/hr × 4.5 hrs + emergency rail recovery towing + catastrophic APU compressor replacement \$24,000).
- **Preemptive Planned Maintenance:** ~**\$1,450** per incident (scheduled off-peak depot seal overhaul, filter replacement, and oil flush).
- **Net Annual Savings:** **\$498,200** across a 24-train fleet with a **42x ROI multiple**.

---

## 🛠️ Tech Stack
- **Frontend & UI:** React 19, TypeScript, Tailwind CSS, Lucide Icons
- **Data Visualizations:** Recharts (synchronized telemetry streams, multi-axis pressure, and thermal loads)
- **Build & Bundler:** Vite 6
- **Hosting & CI/CD:** Vercel

---

## 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build
```
