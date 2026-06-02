/**
 * Robotika Three.js 3D Visualizer
 * Lumina Precision v2.4
 */

let scene, camera, renderer, controls;
let robotGroup;
let jointGroups = []; // Array of nested THREE.Group objects for hierarchical rotation
let robotLinks = [];  // Array of link meshes for styling
let targetAnchor;     // 3D mesh showing the current IK Target coordinate
let workspacePointsMesh; // Points cloud for workspace sampling visualization
let trajectoryLine;      // Line showing path planning trajectory
let gridHelper;

// Initialize WebGL Scene inside container
function init3DVisualizer(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Create Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf7f9fc);
    scene.fog = new THREE.FogExp2(0xf7f9fc, 0.0008);

    // Create Camera
    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 1, 10000);
    camera.position.set(600, 500, 600);

    // Create WebGL Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Camera Orbit Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.01; // Don't orbit below ground
    controls.minDistance = 200;
    controls.maxDistance = 2500;

    // Atmospheric Grid & Ground
    gridHelper = new THREE.GridHelper(2000, 40, 0x0050cb, 0xe6e8eb);
    gridHelper.position.y = -1;
    scene.add(gridHelper);

    // Coordinate Axes (RGB = XYZ)
    const axesHelper = new THREE.AxesHelper(150);
    axesHelper.position.set(0, 0.5, 0);
    scene.add(axesHelper);

    // Ambient Lighting (Soft general illumination)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Directional Lighting + Soft Shadows
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(400, 800, 400);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 10;
    dirLight.shadow.camera.far = 2500;
    const d = 500;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);

    // Soft Blue-tinted secondary light for glow aesthetic
    const pointLight = new THREE.PointLight(0xdae1ff, 0.5, 1000);
    pointLight.position.set(-300, 400, -300);
    scene.add(pointLight);

    // Add Draggable/Visual IK Target Anchor
    const anchorGeo = new THREE.SphereGeometry(8, 16, 16);
    const anchorMat = new THREE.MeshBasicMaterial({ color: 0xba1a1a, transparent: true, opacity: 0.8 });
    targetAnchor = new THREE.Mesh(anchorGeo, anchorMat);
    targetAnchor.position.set(0, 150, 300);
    scene.add(targetAnchor);

    // Ring overlay around Target Anchor
    const ringGeo = new THREE.RingGeometry(12, 14, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xba1a1a, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    targetAnchor.add(ring);

    // Initialize Empty Robot Group
    robotGroup = new THREE.Group();
    scene.add(robotGroup);

    // Resize Handler
    window.addEventListener('resize', onWindowResize);

    // Start Rendering Loop
    animate();
}

function onWindowResize() {
    const container = document.getElementById('canvas-container');
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

// Reset Camera Orbit view orientation
function resetCamera() {
    controls.reset();
    camera.position.set(600, 500, 600);
    controls.target.set(0, 150, 0);
    controls.update();
}

// Toggle grid visibility
function toggleGrid() {
    gridHelper.visible = !gridHelper.visible;
    const btn = document.getElementById('toggle-grid-btn');
    if (btn) {
        if (gridHelper.visible) {
            btn.className = "w-10 h-10 flex items-center justify-center bg-primary text-white transition-all rounded-lg shadow-md shadow-primary/20";
        } else {
            btn.className = "w-10 h-10 flex items-center justify-center hover:bg-primary-container/20 text-on-surface-variant hover:text-primary transition-all rounded-lg";
        }
    }
}

// Render and Control loops
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    
    // Slow subtle rotation for target anchor ring
    if (targetAnchor && targetAnchor.children[0]) {
        targetAnchor.children[0].rotation.z += 0.01;
    }
    
    renderer.render(scene, camera);
}

// Establishes custom styling materials
const Materials = {
    metal: new THREE.MeshStandardMaterial({
        color: 0xe6e8eb,
        roughness: 0.15,
        metalness: 0.85,
        bumpScale: 0.05
    }),
    joint: new THREE.MeshPhysicalMaterial({
        color: 0x0050cb,
        emissive: 0x001849,
        roughness: 0.1,
        metalness: 0.2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transparent: true,
        opacity: 0.9
    }),
    dark: new THREE.MeshStandardMaterial({
        color: 0x2d3133,
        roughness: 0.6,
        metalness: 0.4
    }),
    nominalLed: new THREE.MeshBasicMaterial({
        color: 0x32d74b
    }),
    plannedPath: new THREE.LineBasicMaterial({
        color: 0x006e1c,
        linewidth: 4 // Note: linewidth > 1 usually not supported by WebGL implementations, but kept as parameter
    })
};

/**
 * Builds 3D Hierarchical Mesh structure w.r.t chosen Robot type
 */
function build3DRobotModel(configName) {
    // Clear existing meshes
    while (robotGroup.children.length > 0) {
        robotGroup.remove(robotGroup.children[0]);
    }
    jointGroups = [];
    robotLinks = [];

    const robot = ROBOT_CONFIGS[configName];
    if (!robot) return;

    let parentGroup = robotGroup;

    // Helper to add segments
    const addLinkMesh = (group, geometry, material, posY = 0, rotX = 0, rotZ = 0) => {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.position.y = posY;
        mesh.rotation.x = rotX;
        mesh.rotation.z = rotZ;
        group.add(mesh);
        robotLinks.push(mesh);
        return mesh;
    };

    if (configName === "articulated") {
        /**
         * 6-DOF Serial Articulated Robot Assembly
         */
        
        // Link 0: Heavy Base Stand
        const baseGeo = new THREE.CylinderGeometry(50, 60, 40, 32);
        const baseMesh = new THREE.Mesh(baseGeo, Materials.dark);
        baseMesh.position.y = 20;
        baseMesh.receiveShadow = true;
        robotGroup.add(baseMesh);

        // LED Indicator rings on base
        const ledGeo = new THREE.CylinderGeometry(51, 51, 4, 32);
        const ledMesh = new THREE.Mesh(ledGeo, Materials.nominalLed);
        ledMesh.position.y = 10;
        robotGroup.add(ledMesh);

        // Assemble joints step-by-step hierarchically
        // J1 Group: Rotates around base vertical Axis (Y)
        const j1Group = new THREE.Group();
        j1Group.position.set(0, 40, 0); // At top of base
        parentGroup.add(j1Group);
        jointGroups.push(j1Group);

        // J1 Joint sphere representation
        const j1SphereGeo = new THREE.SphereGeometry(30, 16, 16);
        addLinkMesh(j1Group, j1SphereGeo, Materials.joint, 0);
        
        // Link 1 Column: Rises upward to J2
        const link1Height = 80;
        const link1Geo = new THREE.CylinderGeometry(20, 25, link1Height, 16);
        addLinkMesh(j1Group, link1Geo, Materials.metal, link1Height/2 + 10);

        // J2 Group: Rotates around pitch axis (X) at top of column
        const j2Group = new THREE.Group();
        j2Group.position.set(0, link1Height + 10, 0);
        j1Group.add(j2Group);
        jointGroups.push(j2Group);

        // J2 Cylinder rotating element
        const j2CylGeo = new THREE.CylinderGeometry(25, 25, 40, 16);
        addLinkMesh(j2Group, j2CylGeo, Materials.joint, 0, Math.PI/2); // Rotated pitchwise

        // Link 2 Upper Arm: Extends to J3
        const link2Length = 150;
        const link2Geo = new THREE.BoxGeometry(24, link2Length, 24);
        addLinkMesh(j2Group, link2Geo, Materials.metal, link2Length/2 + 15);

        // J3 Group: Rotates around pitch axis (X) at elbow
        const j3Group = new THREE.Group();
        j3Group.position.set(0, link2Length + 20, 0);
        j2Group.add(j3Group);
        jointGroups.push(j3Group);

        // J3 Joint cylinder
        const j3CylGeo = new THREE.CylinderGeometry(20, 20, 36, 16);
        addLinkMesh(j3Group, j3CylGeo, Materials.joint, 0, Math.PI/2);

        // Link 3 Forearm: Extends to wrist J4
        const link3Length = 120;
        const link3Geo = new THREE.CylinderGeometry(15, 18, link3Length, 16);
        addLinkMesh(j3Group, link3Geo, Materials.metal, link3Length/2 + 10);

        // J4 Group: Rotates around roll axis (Y/Z local offset) w.r.t wrist
        const j4Group = new THREE.Group();
        j4Group.position.set(0, link3Length + 10, 0);
        j3Group.add(j4Group);
        jointGroups.push(j4Group);

        // J4 joint sphere
        const j4SphereGeo = new THREE.SphereGeometry(18, 16, 16);
        addLinkMesh(j4Group, j4SphereGeo, Materials.joint, 0);

        // Link 4 Wrist segment: Extends to J5
        const link4Length = 30;
        const link4Geo = new THREE.CylinderGeometry(12, 12, link4Length, 16);
        addLinkMesh(j4Group, link4Geo, Materials.metal, link4Length/2 + 5);

        // J5 Group: Rotates around pitch axis (X)
        const j5Group = new THREE.Group();
        j5Group.position.set(0, link4Length + 5, 0);
        j4Group.add(j5Group);
        jointGroups.push(j5Group);

        // J5 Joint cylinder
        const j5CylGeo = new THREE.CylinderGeometry(12, 12, 24, 16);
        addLinkMesh(j5Group, j5CylGeo, Materials.joint, 0, Math.PI/2);

        // J6 Group: Rotates around Roll axis (Z) at tip
        const j6Group = new THREE.Group();
        j6Group.position.set(0, 15, 0);
        j5Group.add(j6Group);
        jointGroups.push(j6Group);

        // J6 Flange Plate
        const j6PlateGeo = new THREE.CylinderGeometry(16, 16, 8, 16);
        addLinkMesh(j6Group, j6PlateGeo, Materials.dark, 0);

        // Tool: End Effector Red laser pointer tip
        const toolGeo = new THREE.ConeGeometry(8, 20, 16);
        const toolMat = new THREE.MeshBasicMaterial({ color: 0xba1a1a });
        const toolMesh = new THREE.Mesh(toolGeo, toolMat);
        toolMesh.position.y = 12;
        toolMesh.rotation.x = Math.PI; // point downwards relative to flange
        j6Group.add(toolMesh);

    } else if (configName === "scara") {
        /**
         * 4-DOF Hybrid SCARA Robot Assembly
         */
        
        // Base Pillar
        const baseHeight = 120;
        const baseGeo = new THREE.CylinderGeometry(30, 40, baseHeight, 16);
        const baseMesh = new THREE.Mesh(baseGeo, Materials.dark);
        baseMesh.position.y = baseHeight/2;
        robotGroup.add(baseMesh);

        // J1 Group: Shoulder rotate (around Y)
        const j1Group = new THREE.Group();
        j1Group.position.set(0, baseHeight, 0);
        parentGroup.add(j1Group);
        jointGroups.push(j1Group);

        // J1 cylinder
        const j1CylGeo = new THREE.CylinderGeometry(25, 25, 30, 16);
        addLinkMesh(j1Group, j1CylGeo, Materials.joint, 0);

        // Link 1: Upper arm horizontal cantilever beam
        const link1Len = 150;
        const link1Geo = new THREE.BoxGeometry(link1Len, 20, 30);
        // Box origin is center, offset horizontally
        const link1Mesh = addLinkMesh(j1Group, link1Geo, Materials.metal, 20);
        link1Mesh.position.x = link1Len/2 - 10;
        link1Mesh.position.y = 15;

        // J2 Group: Elbow rotate (around Y) at end of Link 1
        const j2Group = new THREE.Group();
        j2Group.position.set(link1Len - 20, 30, 0);
        j1Group.add(j2Group);
        jointGroups.push(j2Group);

        // J2 cylinder
        const j2CylGeo = new THREE.CylinderGeometry(20, 20, 24, 16);
        addLinkMesh(j2Group, j2CylGeo, Materials.joint, 0);

        // Link 2: Forearm horizontal cantilever
        const link2Len = 120;
        const link2Geo = new THREE.BoxGeometry(link2Len, 16, 24);
        const link2Mesh = addLinkMesh(j2Group, link2Geo, Materials.metal, 0);
        link2Mesh.position.x = link2Len/2 - 10;
        link2Mesh.position.y = 15;

        // J3 Group: Prismatic Slider axis (Vertical translation Z)
        const j3Group = new THREE.Group();
        j3Group.position.set(link2Len - 20, 15, 0);
        j2Group.add(j3Group);
        jointGroups.push(j3Group);

        // J3 slide collar housing
        const collarGeo = new THREE.CylinderGeometry(15, 15, 25, 16);
        addLinkMesh(j3Group, collarGeo, Materials.dark, 10);

        // Slide shaft mesh: Prismatic slider (slides down as value increases)
        // THREE.Group will hold the shaft so we can translate it downward based on joint value
        const j3ShaftGroup = new THREE.Group();
        j3Group.add(j3ShaftGroup);

        const shaftLen = 100;
        const shaftGeo = new THREE.CylinderGeometry(6, 6, shaftLen, 16);
        const shaftMesh = new THREE.Mesh(shaftGeo, Materials.metal);
        shaftMesh.castShadow = true;
        j3ShaftGroup.add(shaftMesh);
        
        // J4 Group: Wrist Roll (around Y) at base of shaft
        const j4Group = new THREE.Group();
        j4Group.position.set(0, -shaftLen/2, 0);
        j3ShaftGroup.add(j4Group);
        jointGroups.push(j4Group);

        const tipGeo = new THREE.ConeGeometry(5, 12, 16);
        const tipMat = new THREE.MeshBasicMaterial({ color: 0xba1a1a });
        const tipMesh = new THREE.Mesh(tipGeo, tipMat);
        tipMesh.position.y = -6;
        j4Group.add(tipMesh);

    } else if (configName === "cartesian") {
        /**
         * 3-DOF Gantry Prismatic Cartesian Assembly
         */
        
        // Horizontal Rail X
        const railXGeo = new THREE.BoxGeometry(400, 12, 20);
        const railX = new THREE.Mesh(railXGeo, Materials.dark);
        railX.position.set(0, 6, 0);
        robotGroup.add(railX);

        // Support columns
        const col1Geo = new THREE.CylinderGeometry(8, 8, 120, 16);
        const col1 = new THREE.Mesh(col1Geo, Materials.dark);
        col1.position.set(-190, 60, 0);
        robotGroup.add(col1);
        const col2 = col1.clone();
        col2.position.x = 190;
        robotGroup.add(col2);

        // Slide block X
        const j1Group = new THREE.Group();
        j1Group.position.set(0, 12, 0);
        parentGroup.add(j1Group);
        jointGroups.push(j1Group);

        const blockXGeo = new THREE.BoxGeometry(40, 20, 30);
        addLinkMesh(j1Group, blockXGeo, Materials.joint, 10);

        // Horizontal Rail Y mounted perpendicular on block X
        const railYGeo = new THREE.BoxGeometry(20, 12, 300);
        const railYMesh = addLinkMesh(j1Group, railYGeo, Materials.metal, 20);
        
        // Slide block Y
        const j2Group = new THREE.Group();
        j2Group.position.set(0, 20, 0);
        j1Group.add(j2Group);
        jointGroups.push(j2Group);

        const blockYGeo = new THREE.BoxGeometry(32, 16, 40);
        addLinkMesh(j2Group, blockYGeo, Materials.joint, 8);

        // Vertical plunge slider shaft Z
        const j3Group = new THREE.Group();
        j3Group.position.set(0, 16, 0);
        j2Group.add(j3Group);
        jointGroups.push(j3Group);

        // Z Collar
        const collarGeo = new THREE.BoxGeometry(24, 40, 24);
        addLinkMesh(j3Group, collarGeo, Materials.dark, 20);

        const shaftZGroup = new THREE.Group();
        j3Group.add(shaftZGroup);

        const shaftZGeo = new THREE.CylinderGeometry(5, 5, 120, 16);
        const shaftZMesh = new THREE.Mesh(shaftZGeo, Materials.metal);
        shaftZMesh.position.y = 60;
        shaftZGroup.add(shaftZMesh);

        // Target pointer
        const tipGeo = new THREE.ConeGeometry(4, 10, 16);
        const tipMat = new THREE.MeshBasicMaterial({ color: 0xba1a1a });
        const tipMesh = new THREE.Mesh(tipGeo, tipMat);
        tipMesh.position.y = 0;
        tipMesh.rotation.x = Math.PI;
        shaftZGroup.add(tipMesh);
    }
}

/**
 * Updates visual joint rotations/translations in 3D scene from active state values array
 */
function update3DRobotPositions(configName, jointValues) {
    if (jointGroups.length === 0) return;

    if (configName === "articulated") {
        // Articulated is pure revolute.
        // Rotates joints hierarchically
        // J1 around local Y
        jointGroups[0].rotation.y = RobotikaMath.degToRad(jointValues[0]);
        // J2 Shoulder pitch around X
        jointGroups[1].rotation.z = RobotikaMath.degToRad(jointValues[1]);
        // J3 Elbow pitch around X
        jointGroups[2].rotation.z = RobotikaMath.degToRad(jointValues[2]);
        // J4 Wrist Yaw around local Y
        jointGroups[3].rotation.y = RobotikaMath.degToRad(jointValues[3]);
        // J5 Wrist Pitch around X
        jointGroups[4].rotation.z = RobotikaMath.degToRad(jointValues[4]);
        // J6 Wrist Roll around Z
        jointGroups[5].rotation.x = RobotikaMath.degToRad(jointValues[5]);

    } else if (configName === "scara") {
        // SCARA joints: J1: rev, J2: rev, J3: prismatic vertical, J4: rev roll
        jointGroups[0].rotation.y = RobotikaMath.degToRad(jointValues[0]);
        jointGroups[1].rotation.y = RobotikaMath.degToRad(jointValues[1]);
        
        // Prismatic slider translating shaft downwards
        // Clamp slider value inside bounds to render
        const slideVal = jointValues[2]; // prismatic 0 to 150 mm
        // shaft shaftGroup is child of jointGroups[2] collar. Move shaftGroup downwards relative to collar
        const shaftGroup = jointGroups[2].children[1]; // index 1 is shaftGroup
        if (shaftGroup) {
            shaftGroup.position.y = -slideVal;
        }
        
        // J4 tool rotation
        jointGroups[3].rotation.y = RobotikaMath.degToRad(jointValues[3]);

    } else if (configName === "cartesian") {
        // Cartesian joints: J1 X (linear), J2 Y (linear), J3 Z (linear)
        // Sliders correspond to translation of coordinates
        jointGroups[0].position.x = jointValues[0]; // Translation X
        
        // block Y is child of block X. Translate it along Z (Y rails perpendicular)
        jointGroups[1].position.z = jointValues[1]; // Translation Y
        
        // shaft Z is child of block Y. Translate Z group downwards
        const shaftGroup = jointGroups[2].children[1];
        if (shaftGroup) {
            shaftGroup.position.y = 80 - jointValues[2]; // slides down relative to block Y
        }
    }

    // Move Target Anchor red indicator directly onto computed FK tip coords
    const fk = solveForwardKinematics(configName, jointValues);
    if (fk && targetAnchor) {
        // Visualizer coordinates mapping: DH model Z is vertical. Three.js coordinates Y is vertical.
        // Map DH model X -> Three.js X
        // Map DH model Y -> Three.js Z
        // Map DH model Z -> Three.js Y
        targetAnchor.position.set(fk.tcp[0], fk.tcp[2], fk.tcp[1]);
    }
}

/**
 * Workspace sampler points cloud renderer in WebGL
 */
function drawWorkspaceCloudMesh(points) {
    // Clear previous points cloud mesh if any
    if (workspacePointsMesh) {
        scene.remove(workspacePointsMesh);
        workspacePointsMesh = null;
    }

    if (points.length === 0) return;

    // Create custom particle geometry buffers
    const geometry = new THREE.BufferGeometry();
    const positions = [];

    for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        // DH coordinate space mapping: Y is depth, Z is vertical -> Map to Three.js (X, Z, Y)
        positions.push(pt.x, pt.z, pt.y);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    // Glow blue particle shader material
    const material = new THREE.PointsMaterial({
        color: 0x00d1ff,
        size: 3.5,
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true
    });

    workspacePointsMesh = new THREE.Points(geometry, material);
    scene.add(workspacePointsMesh);

    // Show workspace legend badge
    const badge = document.getElementById('legend-reach');
    if (badge) badge.classList.remove('hidden');
}

// Hides workspace points cloud
function clearWorkspaceCloudMesh() {
    if (workspacePointsMesh) {
        scene.remove(workspacePointsMesh);
        workspacePointsMesh = null;
    }
    const badge = document.getElementById('legend-reach');
    if (badge) badge.classList.add('hidden');
}

/**
 * Draws planned trajectory curves as 3D path line ribbon
 */
function drawTrajectoryPath(pointsList) {
    if (trajectoryLine) {
        scene.remove(trajectoryLine);
        trajectoryLine = null;
    }

    if (pointsList.length === 0) return;

    const material = new THREE.LineBasicMaterial({
        color: 0x006e1c,
        linewidth: 4
    });

    const points = [];
    for (let i = 0; i < pointsList.length; i++) {
        const pt = pointsList[i];
        points.push(new THREE.Vector3(pt[0], pt[2], pt[1])); // map DH coordinates to WebGL axes
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    trajectoryLine = new THREE.Line(geometry, material);
    scene.add(trajectoryLine);

    const badge = document.getElementById('legend-path');
    if (badge) badge.classList.remove('hidden');
}

function clearTrajectoryPath() {
    if (trajectoryLine) {
        scene.remove(trajectoryLine);
        trajectoryLine = null;
    }
    const badge = document.getElementById('legend-path');
    if (badge) badge.classList.add('hidden');
}
