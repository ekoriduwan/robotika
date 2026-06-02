/**
 * Robotika Dashboard Core Controller
 * Lumina Precision v2.4
 */

// Global Application State
let currentRoute = "simulator";
let currentRobot = "articulated";
let jointValues = [45, -15, 95, 0, 45, 15]; // Holds active values w.r.t chosen robot
let kinematicMode = "fk"; // 'fk' or 'ik'
let isAnimating = false;
let pathPlotCanvas, ctx;

// Page initialization
window.addEventListener('DOMContentLoaded', () => {
    // Canvas setup
    pathPlotCanvas = document.getElementById("path-plot-canvas");
    if (pathPlotCanvas) {
        ctx = pathPlotCanvas.getContext("2d");
        setupCanvasResolution();
    }

    // Initialize 3D Viewport
    init3DVisualizer("canvas-container");

    // Load initial robot configuration
    deployRobotModel(currentRobot);

    // Initial routing setup
    switchRoute("simulator");
});

function setupCanvasResolution() {
    if (!pathPlotCanvas) return;
    const rect = pathPlotCanvas.getBoundingClientRect();
    pathPlotCanvas.width = rect.width * window.devicePixelRatio;
    pathPlotCanvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}

/**
 * Switch SPA Routes & Layouts
 */
function switchRoute(route) {
    currentRoute = route;

    // Toggle navigation active classes in Sidebar
    const items = document.querySelectorAll(".sidebar-item");
    items.forEach(item => {
        const itemRoute = item.getAttribute("data-route");
        if (itemRoute === route) {
            item.className = "sidebar-item flex items-center gap-3 p-3 text-primary bg-white shadow-sm border border-outline-variant/20 transition-all rounded-lg cursor-pointer";
            const icon = item.querySelector(".material-symbols-outlined");
            if (icon) icon.className = "material-symbols-outlined text-primary font-bold";
            const text = item.querySelector(".font-label-md");
            if (text) text.className = "font-label-md font-bold";
        } else {
            item.className = "sidebar-item flex items-center gap-3 p-3 text-on-surface-variant hover:bg-white hover:text-primary transition-all rounded-lg cursor-pointer";
            const icon = item.querySelector(".material-symbols-outlined");
            if (icon) icon.className = "material-symbols-outlined";
            const text = item.querySelector(".font-label-md");
            if (text) text.className = "font-label-md";
        }
    });

    // Toggle Dynamic Control Panels Visibility
    const panelSim = document.getElementById("panel-simulator");
    const panelWork = document.getElementById("panel-workspace");
    const panelPath = document.getElementById("panel-path");
    const panelLib = document.getElementById("panel-library");
    const panelDocs = document.getElementById("panel-docs");
    const panelHome = document.getElementById("panel-home");

    // Toggle Shared 3D Viewport visibility
    const simViewport = document.getElementById("simulation-viewport");
    const wsBento = document.getElementById("workspace-bento");

    // Default: Hide all
    panelSim.classList.add("hidden");
    panelWork.classList.add("hidden");
    panelPath.classList.add("hidden");
    panelLib.classList.add("hidden");
    panelDocs.classList.add("hidden");
    panelHome.classList.add("hidden");
    wsBento.classList.add("hidden");
    simViewport.classList.add("hidden");

    // Show appropriate structures
    if (route === "simulator") {
        panelSim.classList.remove("hidden");
        simViewport.classList.remove("hidden");
        document.getElementById("simulator-bottom-panel").classList.remove("hidden");
        clearWorkspaceCloudMesh();
        clearTrajectoryPath();
    } else if (route === "workspace") {
        panelWork.classList.remove("hidden");
        wsBento.classList.remove("hidden");
        simViewport.classList.remove("hidden");
        document.getElementById("simulator-bottom-panel").classList.add("hidden"); // hide joint streams
        clearTrajectoryPath();
        triggerMonteCarloWorkspace(); // pre-generate
    } else if (route === "path") {
        panelPath.classList.remove("hidden");
        simViewport.classList.remove("hidden");
        document.getElementById("simulator-bottom-panel").classList.add("hidden");
        clearWorkspaceCloudMesh();
        setupCanvasResolution();
        drawDummyChart();
    } else if (route === "library") {
        panelLib.classList.remove("hidden");
    } else if (route === "docs") {
        panelDocs.classList.remove("hidden");
    } else if (route === "home") {
        panelHome.classList.remove("hidden");
        document.getElementById("home-active-model-name").innerText = ROBOT_CONFIGS[currentRobot].name;
    }

    // Force canvas resize on layout transitions
    setTimeout(onWindowResize, 50);
}

/**
 * Robot Deployer
 */
function deployRobotModel(robotKey) {
    const config = ROBOT_CONFIGS[robotKey];
    if (!config) return;

    currentRobot = robotKey;
    
    // Set default initial joint values
    jointValues = config.joints.map(j => j.val);

    // Build the dynamic 3D meshes in Three.js
    build3DRobotModel(robotKey);

    // Set Active Indicator Header text
    document.getElementById("active-robot-name").innerText = config.name;

    // Redraw Dynamic FK Sliders inside controls panel
    const fkContainer = document.getElementById("fk-controls-container");
    fkContainer.innerHTML = ""; // clear previous

    config.joints.forEach((joint, idx) => {
        const unit = joint.type === "prismatic" ? "mm" : "°";
        const valFormatted = jointValues[idx].toFixed(2) + unit;

        const sliderBlock = document.createElement("div");
        sliderBlock.className = "space-y-2";
        sliderBlock.innerHTML = `
            <div class="flex justify-between items-center">
                <span class="font-label-md text-on-surface font-semibold text-xs">${joint.name}</span>
                <span id="slide-val-lbl-${idx}" class="font-data-sm text-[11px] text-primary font-bold bg-primary/5 px-2.5 py-1 rounded-full border border-primary/10">${valFormatted}</span>
            </div>
            <input type="range" 
                   class="custom-slider" 
                   id="slider-joint-${idx}" 
                   min="${joint.min}" 
                   max="${joint.max}" 
                   value="${jointValues[idx]}"
                   step="0.5" 
                   oninput="onJointSliderInput(${idx}, this.value)"/>
        `;
        fkContainer.appendChild(sliderBlock);
    });

    // Populate joint streams panel entries at bottom
    const streamContainer = document.getElementById("joint-streams-container");
    streamContainer.innerHTML = "";
    
    config.joints.forEach((joint, idx) => {
        const unit = joint.type === "prismatic" ? "mm" : "°";
        const entry = document.createElement("div");
        entry.id = `stream-entry-${idx}`;
        entry.className = "flex justify-between items-center px-4 py-2 bg-surface-container-lowest rounded-xl border border-outline-variant/30 text-xs";
        entry.innerHTML = `
            <span class="font-label-md text-on-surface-variant">${joint.name}</span>
            <span id="stream-val-lbl-${idx}" class="font-data-sm text-primary font-bold">${jointValues[idx].toFixed(2)}${unit}</span>
        `;
        streamContainer.appendChild(entry);
    });

    // Populate DH Parameters table entries
    const tableBody = document.getElementById("dh-table-body");
    tableBody.innerHTML = "";
    
    config.joints.forEach((joint, idx) => {
        const twistRad = joint.alpha.toFixed(2);
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="p-2 font-bold">${joint.name.split('_')[0]}</td>
            <td class="p-2">${joint.a}</td>
            <td class="p-2">${twistRad} rad</td>
            <td class="p-2">${joint.d}</td>
            <td class="p-2" id="dh-theta-lbl-${idx}">${jointValues[idx].toFixed(1)}°</td>
        `;
        tableBody.appendChild(row);
    });

    // Sync views
    updateSimulationState();

    // Visual updates for library buttons
    const libCards = document.querySelectorAll(".lib-card-item");
    libCards.forEach(card => {
        const btn = card.querySelector("button");
        const title = card.querySelector("h3").innerText;
        
        if (title.includes(config.name.split(' (')[0])) {
            card.classList.add("border-primary");
            btn.className = "w-full bg-primary text-white py-3 rounded-xl font-label-md text-xs font-bold transition-all flex items-center justify-center gap-2 group/btn shadow-sm";
            btn.innerHTML = `DEPLOYED & SIMULATING <span class="material-symbols-outlined text-[18px]">done</span>`;
        } else {
            card.classList.remove("border-primary");
            btn.className = "w-full bg-surface-container-low hover:bg-primary hover:text-white text-on-surface py-3 rounded-xl font-label-md text-xs font-bold transition-all flex items-center justify-center gap-2 group/btn shadow-sm";
            btn.innerHTML = `OPEN SIMULATOR <span class="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>`;
        }
    });
}

/**
 * Kinematic Toggle Switches
 */
function setKinematicMode(mode) {
    kinematicMode = mode;
    const tabFk = document.getElementById("tab-fk");
    const tabIk = document.getElementById("tab-ik");
    const fkPanel = document.getElementById("fk-controls-container");
    const ikPanel = document.getElementById("ik-controls-container");
    const label = document.getElementById("compute-btn-label");

    if (mode === "fk") {
        tabFk.className = "flex-1 py-2 font-label-md text-primary bg-white rounded-lg shadow-sm transition-all border border-outline-variant/10 font-bold";
        tabIk.className = "flex-1 py-2 font-label-md text-on-surface-variant hover:text-on-surface transition-all font-semibold";
        fkPanel.classList.remove("hidden");
        ikPanel.classList.add("hidden");
        label.innerText = "Compute System";
    } else {
        tabIk.className = "flex-1 py-2 font-label-md text-primary bg-white rounded-lg shadow-sm transition-all border border-outline-variant/10 font-bold";
        tabFk.className = "flex-1 py-2 font-label-md text-on-surface-variant hover:text-on-surface transition-all font-semibold";
        ikPanel.classList.remove("hidden");
        fkPanel.classList.add("hidden");
        label.innerText = "Solve Coordinates";

        // Prepopulate IK form coordinates from current TCP coordinates
        const fk = solveForwardKinematics(currentRobot, jointValues);
        if (fk) {
            document.getElementById("ik-x").value = fk.tcp[0].toFixed(1);
            document.getElementById("ik-y").value = fk.tcp[1].toFixed(1);
            document.getElementById("ik-z").value = fk.tcp[2].toFixed(1);
        }
    }
}

/**
 * Slider input listeners
 */
function onJointSliderInput(idx, val) {
    const numVal = parseFloat(val);
    jointValues[idx] = numVal;

    // Sync labels
    const unit = ROBOT_CONFIGS[currentRobot].joints[idx].type === "prismatic" ? "mm" : "°";
    const valStr = numVal.toFixed(2) + unit;
    
    document.getElementById(`slide-val-lbl-${idx}`).innerText = valStr;
    document.getElementById(`stream-val-lbl-${idx}`).innerText = valStr;
    
    const dhTheta = document.getElementById(`dh-theta-lbl-${idx}`);
    if (dhTheta) dhTheta.innerText = numVal.toFixed(1) + "°";

    updateSimulationState();
}

/**
 * Sync math models with graphics visualizer
 */
function updateSimulationState() {
    // Solve FK
    const fk = solveForwardKinematics(currentRobot, jointValues);
    if (!fk) return;

    // Update 3D Rotations
    update3DRobotPositions(currentRobot, jointValues);

    // Update Transformation matrix cells display
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            const val = fk.T[r * 4 + c];
            const cell = document.getElementById(`m${r}${c}`);
            if (cell) {
                // Style columns differently
                if (c === 3) {
                    cell.innerText = val.toFixed(1); // translation millimeters
                } else {
                    cell.innerText = val.toFixed(3); // rotation projection values
                }
            }
        }
    }

    // Sync Workspace Analysis Coordinates
    const wsX = document.getElementById("ws-tcp-x");
    const wsY = document.getElementById("ws-tcp-y");
    const wsZ = document.getElementById("ws-tcp-z");
    const wsDist = document.getElementById("ws-tcp-dist");
    
    if (wsX) wsX.innerText = fk.tcp[0].toFixed(1);
    if (wsY) wsY.innerText = fk.tcp[1].toFixed(1);
    if (wsZ) wsZ.innerText = fk.tcp[2].toFixed(1);
    
    if (wsDist) {
        const dist = Math.sqrt(fk.tcp[0]*fk.tcp[0] + fk.tcp[1]*fk.tcp[1] + fk.tcp[2]*fk.tcp[2]);
        wsDist.innerText = dist.toFixed(1) + " mm";
    }

    // Reset warnings
    resetWarningState();
}

// Compute triggers
function triggerSolve() {
    if (kinematicMode === "fk") {
        updateSimulationState();
    } else {
        // Inverse Kinematics Trigger
        const tx = parseFloat(document.getElementById("ik-x").value);
        const ty = parseFloat(document.getElementById("ik-y").value);
        const tz = parseFloat(document.getElementById("ik-z").value);

        if (isNaN(tx) || isNaN(ty) || isNaN(tz)) return;

        const solution = solveInverseKinematics(currentRobot, tx, ty, tz, jointValues);
        
        if (solution) {
            // Apply IK joints values
            jointValues = solution;
            
            // Sync all FK UI slider elements
            const joints = ROBOT_CONFIGS[currentRobot].joints;
            joints.forEach((joint, idx) => {
                const slider = document.getElementById(`slider-joint-${idx}`);
                if (slider) {
                    slider.value = jointValues[idx];
                    onJointSliderInput(idx, jointValues[idx]);
                }
            });

            updateSimulationState();
            resetWarningState();
        } else {
            // No Convergent path found: trigger Singularity alert!
            triggerWarningState();
        }
    }
}

// Resets joint parameters to defaults
function resetJoints() {
    deployRobotModel(currentRobot);
    resetWarningState();
}

/**
 * Singularity and out of reach bounds alert panels management
 */
function triggerWarningState() {
    const indicator = document.getElementById("active-robot-indicator");
    indicator.className = "px-3 h-10 font-label-md flex items-center gap-1 bg-error/15 text-error rounded-lg transition-all border border-error/20";
    indicator.children[0].className = "w-2 h-2 bg-error rounded-full inline-block animate-pulse";
    document.getElementById("active-robot-name").innerText = "Out of Reach / Singularity";

    // Workspace Bento alerts
    const wsBentoAlert = document.getElementById("singularity-alert-card");
    if (wsBentoAlert) {
        wsBentoAlert.className = "stat-card glass-panel p-4 rounded-xl shadow-sm flex items-center gap-4 border-l-4 border-l-error";
        document.getElementById("singularity-indicator-icon").className = "w-12 h-12 rounded-lg bg-error/10 flex items-center justify-center text-error";
        document.getElementById("singularity-icon-name").innerText = "warning";
        document.getElementById("singularity-icon-name").className = "material-symbols-outlined text-2xl animate-pulse-warning";
        document.getElementById("singularity-status").innerText = "ACTIVE BOUNDS";
        document.getElementById("singularity-status").className = "font-data-sm text-lg font-bold text-error";
    }
}

function resetWarningState() {
    const indicator = document.getElementById("active-robot-indicator");
    if (indicator) {
        indicator.className = "px-3 h-10 font-label-md flex items-center gap-1 hover:bg-primary/5 text-primary rounded-lg transition-all border border-primary/20 bg-white";
        indicator.children[0].className = "w-2 h-2 bg-primary rounded-full inline-block animate-ping";
        document.getElementById("active-robot-name").innerText = ROBOT_CONFIGS[currentRobot].name;
    }

    const wsBentoAlert = document.getElementById("singularity-alert-card");
    if (wsBentoAlert) {
        wsBentoAlert.className = "stat-card glass-panel p-4 rounded-xl shadow-sm flex items-center gap-4 border-l-4 border-l-secondary";
        document.getElementById("singularity-indicator-icon").className = "w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary";
        document.getElementById("singularity-icon-name").innerText = "check_circle";
        document.getElementById("singularity-icon-name").className = "material-symbols-outlined text-2xl";
        document.getElementById("singularity-status").innerText = "NONE";
        document.getElementById("singularity-status").className = "font-data-sm text-lg font-bold text-secondary";
    }
}

/**
 * Expandable/collapsible Panels
 */
function toggleDHParameters() {
    const panel = document.getElementById("dh-table-container");
    const icon = document.getElementById("dh-toggle-icon");
    if (panel.classList.contains("hidden")) {
        panel.classList.remove("hidden");
        icon.innerText = "expand_less";
    } else {
        panel.classList.add("hidden");
        icon.innerText = "expand_more";
    }
}

/**
 * Library filter selector sorting
 */
function filterLibrary(type) {
    const btnAll = document.getElementById("lib-filter-all");
    const btnSerial = document.getElementById("lib-filter-serial");
    const btnParallel = document.getElementById("lib-filter-parallel");

    btnAll.className = "text-on-surface-variant hover:bg-surface-container-low px-4 py-2 rounded-lg font-label-caps text-xs font-semibold transition-all";
    btnSerial.className = "text-on-surface-variant hover:bg-surface-container-low px-4 py-2 rounded-lg font-label-caps text-xs font-semibold transition-all";
    btnParallel.className = "text-on-surface-variant hover:bg-surface-container-low px-4 py-2 rounded-lg font-label-caps text-xs font-semibold transition-all";

    if (type === "all") {
        btnAll.className = "bg-primary text-white px-4 py-2 rounded-lg font-label-caps text-xs font-bold shadow-sm";
    } else if (type === "serial") {
        btnSerial.className = "bg-primary text-white px-4 py-2 rounded-lg font-label-caps text-xs font-bold shadow-sm";
    } else {
        btnParallel.className = "bg-primary text-white px-4 py-2 rounded-lg font-label-caps text-xs font-bold shadow-sm";
    }

    const cards = document.querySelectorAll(".lib-card-item");
    cards.forEach(card => {
        const cardType = card.getAttribute("data-type");
        if (type === "all" || cardType === type) {
            card.classList.remove("hidden");
        } else {
            card.classList.add("hidden");
        }
    });
}

/**
 * Monte Carlo Workspace sampler trigger
 */
let workspacePoints = [];
let activeProjection = "3d";

function triggerMonteCarloWorkspace() {
    const slider = document.getElementById("point-density-slider");
    const densityVal = parseInt(slider.value);
    document.getElementById("density-val").innerText = densityVal + " pts";

    // Run Monte Carlo math calculations
    workspacePoints = sampleWorkspaceCloud(currentRobot, densityVal);

    // Compute bounding statistics
    let maxDist = 0;
    workspacePoints.forEach(pt => {
        const dist = Math.sqrt(pt.x*pt.x + pt.y*pt.y + pt.z*pt.z);
        if (dist > maxDist) maxDist = dist;
    });

    // Approx Reach Volume in cubic meters (approximating sphere shell bounds)
    const volume = (4/3) * Math.PI * Math.pow(maxDist / 1000, 3) * 0.7; // 70% efficiency envelope

    // Update stats labels
    document.getElementById("reach-volume-val").innerText = volume.toFixed(2);
    document.getElementById("max-radius-val").innerText = Math.round(maxDist);
    document.getElementById("payload-val").innerText = ROBOT_CONFIGS[currentRobot].payload.toFixed(1);

    // Draw the point cloud particles in WebGL
    applyProjectionFilter();
}

// Binds slider to generator updates
const densitySlider = document.getElementById("point-density-slider");
if (densitySlider) {
    densitySlider.addEventListener('input', (e) => {
        document.getElementById("density-val").innerText = e.target.value + " pts";
    });
    densitySlider.addEventListener('change', triggerMonteCarloWorkspace);
}

/**
 * Slice filtering projection planes
 */
function filterProjection(plane) {
    activeProjection = plane;

    // Reset button indicators styles
    const p3d = document.getElementById("plane-3d");
    const pxy = document.getElementById("plane-xy");
    const pxz = document.getElementById("plane-xz");

    const styleActive = "w-full flex items-center justify-between p-3 bg-primary-fixed/40 border border-primary text-primary rounded-lg active-glow transition-all font-semibold text-xs";
    const styleInactive = "w-full flex items-center justify-between p-3 bg-surface-container-high border border-outline-variant text-on-surface-variant rounded-lg hover:bg-white transition-all text-xs";

    p3d.className = styleInactive;
    pxy.className = styleInactive;
    pxz.className = styleInactive;

    p3d.querySelector(".material-symbols-outlined").classList.add("opacity-0");
    pxy.querySelector(".material-symbols-outlined").classList.add("opacity-0");
    pxz.querySelector(".material-symbols-outlined").classList.add("opacity-0");

    const activeBtn = document.getElementById(`plane-${plane}`);
    activeBtn.className = styleActive;
    activeBtn.querySelector(".material-symbols-outlined").classList.remove("opacity-0");

    applyProjectionFilter();
}

function applyProjectionFilter() {
    if (workspacePoints.length === 0) return;

    let filtered = [];
    const fk = solveForwardKinematics(currentRobot, jointValues);
    const tcp = fk ? fk.tcp : [0, 150, 200];

    if (activeProjection === "3d") {
        filtered = workspacePoints;
    } else if (activeProjection === "xy") {
        // Horizontal slice (filter around current TCP Z height)
        filtered = workspacePoints.filter(pt => Math.abs(pt.z - tcp[2]) < 25);
    } else if (activeProjection === "xz") {
        // Frontal slice (filter around current TCP Y depth)
        filtered = workspacePoints.filter(pt => Math.abs(pt.y - tcp[1]) < 25);
    }

    drawWorkspaceCloudMesh(filtered);
}

/**
 * Trajectory planning path generation
 */
let plannedTrajectoryPoints = [];
let activeTrajectoryData = [];

function executeTrajectoryAnimation() {
    if (isAnimating) return;

    // Retrieve input values coordinates
    const sx = parseFloat(document.getElementById("path-start-x").value);
    const sy = parseFloat(document.getElementById("path-start-y").value);
    const sz = parseFloat(document.getElementById("path-start-z").value);
    const gx = parseFloat(document.getElementById("path-goal-x").value);
    const gy = parseFloat(document.getElementById("path-goal-y").value);
    const gz = parseFloat(document.getElementById("path-goal-z").value);
    const algorithm = document.getElementById("path-algorithm").value;

    if (isNaN(sx) || isNaN(sy) || isNaN(sz) || isNaN(gx) || isNaN(gy) || isNaN(gz)) return;

    // Use IK solver to determine joint angles for start and goal states
    const startJoints = solveInverseKinematics(currentRobot, sx, sy, sz, jointValues);
    const goalJoints = solveInverseKinematics(currentRobot, gx, gy, gz, jointValues);

    if (!startJoints || !goalJoints) {
        triggerWarningState();
        alert("Path endpoints are out of structural reach envelopes.");
        return;
    }

    resetWarningState();
    isAnimating = true;

    // Generate spline trajectory timeline array
    const duration = 2.5;
    const steps = 60;
    activeTrajectoryData = TrajectoryPlanner.generateTrajectory(startJoints, goalJoints, algorithm, duration, steps);

    // Build the planned path 3D visual coordinates
    plannedTrajectoryPoints = [];
    activeTrajectoryData.forEach(step => {
        const fk = solveForwardKinematics(currentRobot, step.joints);
        if (fk) plannedTrajectoryPoints.push(fk.tcp);
    });

    // Draw planned path 3D ribbon in WebGL
    drawTrajectoryPath(plannedTrajectoryPoints);

    // Disable Animate Button during playback
    const runBtn = document.getElementById("run-path-btn");
    runBtn.className = "flex-1 bg-outline text-white font-label-md h-12 rounded-xl cursor-not-allowed flex items-center justify-center gap-1 font-bold";
    runBtn.innerHTML = `<span class="material-symbols-outlined text-lg animate-spin">autorenew</span> Simulating...`;

    // Start playback sequence
    let currentStep = 0;
    const intervalTime = (duration * 1000) / steps;
    
    // Position/Velocity arrays to feed canvas drawing
    const positionHistory = [];
    const velocityHistory = [];
    const accelerationHistory = [];

    const playbackInterval = setInterval(() => {
        if (currentStep >= steps) {
            clearInterval(playbackInterval);
            isAnimating = false;
            
            // Re-enable trigger
            runBtn.className = "flex-1 bg-secondary text-on-primary font-label-md h-12 rounded-xl hover:bg-secondary-container shadow-lg shadow-secondary/15 active:scale-[0.98] transition-all flex items-center justify-center gap-1 font-bold";
            runBtn.innerHTML = `<span class="material-symbols-outlined text-lg">play_circle</span> Animate Path`;
            return;
        }

        const stepData = activeTrajectoryData[currentStep];
        
        // Update joint values
        jointValues = stepData.joints;
        
        // Sync sliders in panel
        jointValues.forEach((val, idx) => {
            const slider = document.getElementById(`slider-joint-${idx}`);
            if (slider) slider.value = val;
            
            // Sync text label
            const unit = ROBOT_CONFIGS[currentRobot].joints[idx].type === "prismatic" ? "mm" : "°";
            const valLbl = document.getElementById(`slide-val-lbl-${idx}`);
            if (valLbl) valLbl.innerText = val.toFixed(2) + unit;
        });

        // Update graphics
        updateSimulationState();

        // Feed spline details into drawing values (tracking joint 0 primary parameters)
        positionHistory.push(stepData.joints[0]);
        velocityHistory.push(stepData.velocities[0]);
        accelerationHistory.push(stepData.accelerations[0]);

        // Redraw plotting canvas graph
        drawPlotChart(positionHistory, velocityHistory, accelerationHistory, steps);

        currentStep++;
    }, intervalTime);
}

function clearPlannedPath() {
    clearTrajectoryPath();
    plannedTrajectoryPoints = [];
    activeTrajectoryData = [];
    drawDummyChart();
}

/**
 * Spline trajectory plotting canvas charts
 */
function drawDummyChart() {
    if (!ctx) return;
    ctx.clearRect(0, 0, pathPlotCanvas.width, pathPlotCanvas.height);
    
    // Draw background grid lines
    ctx.strokeStyle = "rgba(0, 80, 203, 0.05)";
    ctx.lineWidth = 1;
    const w = pathPlotCanvas.width / window.devicePixelRatio;
    const h = pathPlotCanvas.height / window.devicePixelRatio;

    for (let i = 20; i < w; i += 30) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, h);
        ctx.stroke();
    }
    for (let i = 20; i < h; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(w, i);
        ctx.stroke();
    }

    ctx.fillStyle = "rgba(0, 80, 203, 0.4)";
    ctx.font = "10px JetBrains Mono";
    ctx.fillText("Awaiting spline trajectory calculations feed...", 32, h / 2 + 4);
}

function drawPlotChart(positions, velocities, accelerations, maxSteps) {
    if (!ctx) return;
    const w = pathPlotCanvas.width / window.devicePixelRatio;
    const h = pathPlotCanvas.height / window.devicePixelRatio;
    
    ctx.clearRect(0, 0, w, h);

    // Draw grids
    ctx.strokeStyle = "rgba(0, 80, 203, 0.05)";
    ctx.lineWidth = 1;
    for (let i = 20; i < w; i += 30) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, h);
        ctx.stroke();
    }
    for (let i = 15; i < h; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(w, i);
        ctx.stroke();
    }

    const stepWidth = w / maxSteps;

    // Helper to draw lines
    const drawLine = (data, color, minVal, maxVal) => {
        if (data.length === 0) return;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        
        const scaleVal = (val) => {
            const range = maxVal - minVal;
            if (range === 0) return h / 2;
            // map val within range to pixels bounds
            return h - 15 - ((val - minVal) / range) * (h - 30);
        };

        ctx.moveTo(0, scaleVal(data[0]));
        for (let i = 1; i < data.length; i++) {
            ctx.lineTo(i * stepWidth, scaleVal(data[i]));
        }
        ctx.stroke();
    };

    // Calculate ranges
    const getMinMax = (arr) => {
        let min = Math.min(...arr);
        let max = Math.max(...arr);
        if (min === max) { min -= 1; max += 1; }
        return { min, max };
    };

    const pRange = getMinMax(positions);
    const vRange = getMinMax(velocities);
    const aRange = getMinMax(accelerations);

    // Plot curves
    // Position (Blue)
    drawLine(positions, "#0050cb", pRange.min, pRange.max);
    // Velocity (Lime Green)
    drawLine(velocities, "#006e1c", vRange.min, vRange.max);
    // Acceleration (Cyan)
    drawLine(accelerations, "#006278", aRange.min, aRange.max);

    // Add legend texts
    ctx.font = "8.5px JetBrains Mono";
    ctx.fillStyle = "#0050cb";
    ctx.fillText(`Pos: ${positions[positions.length - 1].toFixed(1)}`, 8, 12);
    ctx.fillStyle = "#006e1c";
    ctx.fillText(`Vel: ${velocities[velocities.length - 1].toFixed(1)}`, 90, 12);
    ctx.fillStyle = "#006278";
    ctx.fillText(`Acc: ${accelerations[accelerations.length - 1].toFixed(1)}`, 172, 12);
}

/**
 * Industrial Preset Scenarios triggers
 */
function runScenario(type) {
    if (isAnimating) return;

    if (type === "welding") {
        // Setup Welding coordinate trajectory path (circular tracing)
        document.getElementById("path-algorithm").value = "quintic";
        document.getElementById("path-start-x").value = "-120";
        document.getElementById("path-start-y").value = "100";
        document.getElementById("path-start-z").value = "200";
        document.getElementById("path-goal-x").value = "120";
        document.getElementById("path-goal-y").value = "160";
        document.getElementById("path-goal-z").value = "250";

        executeTrajectoryAnimation();
    } else if (type === "pickplace") {
        // Pick & Place Sequence: Start position -> Decend -> Pick -> Ascend -> Move -> Decend -> Place
        isAnimating = true;
        const runBtn = document.getElementById("run-path-btn");
        
        const notifyState = (msg, bgClass) => {
            runBtn.className = `flex-1 ${bgClass} text-white font-label-md h-12 rounded-xl cursor-not-allowed flex items-center justify-center gap-1 font-bold`;
            runBtn.innerHTML = `<span class="material-symbols-outlined text-lg animate-spin">autorenew</span> ${msg}`;
        };

        // Pick & Place key coordinates steps
        const steps = [
            { name: "Hovering Pick (A)", coords: [-120, 100, 220] },
            { name: "Descending to Pick", coords: [-120, 100, 140] },
            { name: "Picking item up", coords: [-120, 100, 220] },
            { name: "Moving to Place (B)", coords: [120, 150, 220] },
            { name: "Descending to Place", coords: [120, 150, 140] },
            { name: "Placing Item", coords: [120, 150, 220] }
        ];

        let stepIdx = 0;
        const runNextPickStep = () => {
            if (stepIdx >= steps.length) {
                isAnimating = false;
                runBtn.className = "flex-1 bg-secondary text-on-primary font-label-md h-12 rounded-xl hover:bg-secondary-container shadow-lg shadow-secondary/15 active:scale-[0.98] transition-all flex items-center justify-center gap-1 font-bold";
                runBtn.innerHTML = `<span class="material-symbols-outlined text-lg">play_circle</span> Animate Path`;
                clearTrajectoryPath();
                return;
            }

            const step = steps[stepIdx];
            notifyState(step.name, stepIdx < 3 ? "bg-primary" : "bg-secondary");

            // Solve joints
            const targetJ = solveInverseKinematics(currentRobot, step.coords[0], step.coords[1], step.coords[2], jointValues);
            if (targetJ) {
                // Generate path trajectory
                const dur = 1.0;
                const pathSteps = 25;
                const traj = TrajectoryPlanner.generateTrajectory(jointValues, targetJ, "cubic", dur, pathSteps);
                
                // Draw path visual line
                const ribbon = [];
                traj.forEach(s => {
                    const fk = solveForwardKinematics(currentRobot, s.joints);
                    if (fk) ribbon.push(fk.tcp);
                });
                drawTrajectoryPath(ribbon);

                let pIdx = 0;
                const tInterval = (dur * 1000) / pathSteps;
                const playback = setInterval(() => {
                    if (pIdx >= pathSteps) {
                        clearInterval(playback);
                        jointValues = targetJ;
                        stepIdx++;
                        setTimeout(runNextPickStep, 250); // Pause briefly before next sequence step
                        return;
                    }

                    jointValues = traj[pIdx].joints;
                    updateSimulationState();
                    pIdx++;
                }, tInterval);
            } else {
                isAnimating = false;
                alert("Unreachable coordinate sequence inside pick & place presets.");
            }
        };

        runNextPickStep();
    }
}

/**
 * CSV and JSON Reports Export
 */
function exportCSV() {
    const config = ROBOT_CONFIGS[currentRobot];
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Joint,Type,Min Boundary,Max Boundary,Current Value\n";

    config.joints.forEach((joint, idx) => {
        const unit = joint.type === "prismatic" ? "mm" : "deg";
        csvContent += `${joint.name},${joint.type},${joint.min}${unit},${joint.max}${unit},${jointValues[idx].toFixed(2)}${unit}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `robotika_${currentRobot}_simulation_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// PDF Print Export
function exportPDF() {
    document.getElementById("print-date").innerText = new Date().toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    window.print();
}
