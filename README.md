<div align="center">
  <h1>🤖 Robotika: Interactive Industrial Robotics Simulator</h1>

  <p>
    <strong>A high-fidelity, interactive 3D kinematic simulator running locally in your browser.</strong>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Version-v2.4_Lumina_Precision-blue?style=for-the-badge&logo=appveyor" alt="Version" />
    <img src="https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
    <img src="https://img.shields.io/badge/Render-Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js" />
    <img src="https://img.shields.io/badge/Style-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  </p>
</div>

<br />

## 🌟 Overview

**Robotika** is a comprehensive tool for visualizing, analyzing, and controlling industrial robotic arms in real-time. Built entirely with pure Web Technologies (`HTML`, `JS`, `CSS`), it provides a blazing-fast, sub-millisecond convergence engine for complex mathematical kinematics right in the browser. 

Whether you are an engineer planning industrial scenarios or an academic studying robotics, Robotika offers an accessible and powerful suite of features.

---

## 🚀 Key Features

### 🧮 Real-Time Kinematics Engine
- **Forward Kinematics (FK)**: Calculates tool center point matrices dynamically based on Denavit-Hartenberg (DH) Parameters.
- **Inverse Kinematics (IK)**: Uses a highly convergent **Cyclic Coordinate Descent (CCD)** solver with sub-millisecond precision.
- **Dynamic DH Matrices**: Live evaluation of joints transformations.

### 🦾 Interactive 3D Robot Library
Extensive support for industrial standard geometries:
- 🛠️ **Articulated Arm (6 DOF)** - Welding & Painting
- 🕷️ **Delta Spider Robot** - High-speed sorting
- 🏗️ **Cartesian Gantry (XYZ)** - Precision assembly
- 🏎️ **SCARA Robot (4 DOF)** - Fast picking
- 🔄 **Cylindrical & Spherical** - Machine tending and casting

### 📊 Workspace & Spatial Analysis
- **Monte Carlo Sampling**: Dynamic generation of 3D volume clouds to map physical reach boundaries.
- **Dimensional Slices**: Horizontal (XY) and Frontal (XZ) projection views.
- **Metrics**: Max Radius, Reach Volume, Payload Capacity, and Singularity Detection.

### 🛤️ Path Planning & Trajectories
- **Spline Algorithms**: Linear Cartesian, Cubic Spline, and Quintic (Zero Jolt) Joint paths.
- **Industrial Scenarios**: Real-time animation of presets like *Welding Tracing* and *Pick & Place*.
- **Live Plotting**: Telemetry graphs displaying position, velocity, and acceleration against time.

### 🌍 Multilingual Interface
Ready for global teams with localization in:
🇺🇸 English | 🇮🇩 Bahasa Indonesia | 🇪🇸 Español | 🇨🇳 中文

---

## 🛠️ Technology Stack

* **Core Logic & Simulation**: Vanilla JavaScript (ES6+)
* **3D Graphics Engine**: [Three.js](https://threejs.org/) (WebGL)
* **User Interface & Styling**: [Tailwind CSS](https://tailwindcss.com/) (Responsive & Dark Mode ready)
* **Fonts**: Inter & JetBrains Mono (Google Fonts)

---

## 🏃 Getting Started

No heavy installations required. Just clone and run in any modern web browser!

```bash
# 1. Clone the repository
git clone https://github.com/ekoriduwan/robotika.git

# 2. Navigate to the directory
cd robotika

# 3. Serve the directory
# You can use any local server, for example python:
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your web browser.

---

## 📖 Documentation

Comprehensive mathematical documentation is embedded directly within the app (`Docs` menu).
It includes:
- Structural formulations of **Denavit-Hartenberg** conventions.
- Vector equations for the **CCD algorithm**.
- Integration formulas for **Monte Carlo** volume approximation.

---

<div align="center">
  <br/>
  <i>Engineered for precision. Built for the web.</i>
</div>
