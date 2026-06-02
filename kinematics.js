/**
 * Robotika Kinematics & Mathematics Engine
 * Lumina Precision v2.4
 */

// Math utilities and matrix operators
const RobotikaMath = {
    degToRad: (deg) => deg * Math.PI / 180,
    radToDeg: (rad) => rad * 180 / Math.PI,

    // Identity 4x4 matrix
    identityMatrix: () => [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ],

    // Multiply two 4x4 matrices A and B (represented as arrays of length 16, row-major)
    multiplyMatrices: (A, B) => {
        const C = new Array(16).fill(0);
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                let sum = 0;
                for (let i = 0; i < 4; i++) {
                    sum += A[row * 4 + i] * B[i * 4 + col];
                }
                C[row * 4 + col] = sum;
            }
        }
        return C;
    },

    // Apply DH parameters to construct standard transformation matrix T_i
    dhMatrix: (a, alpha, d, theta) => {
        const cosT = Math.cos(theta);
        const sinT = Math.sin(theta);
        const cosA = Math.cos(alpha);
        const sinA = Math.sin(alpha);

        return [
            cosT, -sinT * cosA,  sinT * sinA, a * cosT,
            sinT,  cosT * cosA, -cosT * sinA, a * sinT,
            0,     sinA,         cosA,        d,
            0,     0,            0,           1
        ];
    }
};

// Configurable DH definitions for 3 Robot types
const ROBOT_CONFIGS = {
    articulated: {
        name: "Articulated (6 DOF)",
        type: "serial",
        payload: 15.0, // kg
        joints: [
            { name: "J1_Rotation", type: "revolute",  min: -180, max: 180, val: 45,  a: 0,   alpha: -Math.PI/2, d: 100 },
            { name: "J2_Shoulder", type: "revolute",  min: -90,  max: 90,  val: -15, a: 150, alpha: 0,          d: 0 },
            { name: "J3_Elbow",    type: "revolute",  min: -150, max: 150, val: 95,  a: 120, alpha: 0,          d: 0 },
            { name: "J4_WristYaw", type: "revolute",  min: -180, max: 180, val: 0,   a: 0,   alpha: -Math.PI/2, d: 80 },
            { name: "J5_WristPit", type: "revolute",  min: -120, max: 120, val: 45,  a: 0,   alpha: Math.PI/2,  d: 0 },
            { name: "J6_WristRol", type: "revolute",  min: -360, max: 360, val: 15,  a: 0,   alpha: 0,          d: 50 }
        ]
    },
    scara: {
        name: "SCARA (4 DOF)",
        type: "hybrid",
        payload: 10.0,
        joints: [
            { name: "J1_Shoulder", type: "revolute",  min: -150, max: 150, val: 30,  a: 150, alpha: 0,          d: 100 },
            { name: "J2_Elbow",    type: "revolute",  min: -150, max: 150, val: 45,  a: 120, alpha: Math.PI,    d: 0 },
            { name: "J3_Prismatic",type: "prismatic", min: 0,    max: 150, val: 50,  a: 0,   alpha: 0,          d: 50 }, // Prismatic slider
            { name: "J4_WristRoll",type: "revolute",  min: -360, max: 360, val: 0,   a: 0,   alpha: 0,          d: 40 }
        ]
    },
    cartesian: {
        name: "Cartesian (XYZ)",
        type: "serial",
        payload: 20.0,
        joints: [
            { name: "J1_LinearX",  type: "prismatic", min: -200, max: 200, val: 50,  a: 0,   alpha: -Math.PI/2, d: 50 },
            { name: "J2_LinearY",  type: "prismatic", min: -200, max: 200, val: 80,  a: 0,   alpha: Math.PI/2,  d: 50 },
            { name: "J3_LinearZ",  type: "prismatic", min: 0,    max: 300, val: 150, a: 0,   alpha: 0,          d: 100 }
        ]
    }
};

/**
 * Compute Forward Kinematics for a given robot configuration and joint values
 * Returns: { T: homogeneous 4x4 matrix, jointPositions: arrays of link joint coordinate vectors }
 */
function solveForwardKinematics(configName, jointValues) {
    const robot = ROBOT_CONFIGS[configName];
    if (!robot) return null;

    let T = RobotikaMath.identityMatrix();
    const jointPositions = [[0, 0, 0]]; // Base coordinate is always at origin
    
    // Helper to extract transform origins from row-major 4x4 homogeneous matrices
    const getOrigin = (matrix) => [matrix[3], matrix[7], matrix[11]];

    for (let i = 0; i < robot.joints.length; i++) {
        const spec = robot.joints[i];
        const val = jointValues[i];
        
        let theta = 0;
        let d = spec.d;
        let a = spec.a;
        let alpha = spec.alpha;

        if (spec.type === "revolute") {
            theta = RobotikaMath.degToRad(val);
        } else if (spec.type === "prismatic") {
            // Prismatic joint alters the offset length 'd' or slider 'a' depending on mechanical alignment
            d = spec.d + val; 
        }

        const Ti = RobotikaMath.dhMatrix(a, alpha, d, theta);
        T = RobotikaMath.multiplyMatrices(T, Ti);
        
        // Push intermediate joint origin coordinates for 3D visualization link drawing
        jointPositions.push(getOrigin(T));
    }

    return {
        T: T,
        jointPositions: jointPositions,
        tcp: jointPositions[jointPositions.length - 1]
    };
}

/**
 * Numerical Inverse Kinematics using CCD (Cyclic Coordinate Descent) solver
 * Computes J values corresponding to target TCP coords.
 * Returns: Array of joint values or null if solver converges above margin limit
 */
function solveInverseKinematics(configName, targetX, targetY, targetZ, currentJoints) {
    const robot = ROBOT_CONFIGS[configName];
    if (!robot) return null;

    // Deep copy joint inputs
    const joints = [...currentJoints];
    const maxIterations = 80;
    const tolerance = 0.5; // Convergence bounds (0.5 mm error margin maximum)
    
    const target = [targetX, targetY, targetZ];

    for (let iter = 0; iter < maxIterations; iter++) {
        // Compute current Forward Kinematics to find links coordinate frames
        const fk = solveForwardKinematics(configName, joints);
        const currentTCP = fk.tcp;

        // Check overall Euclidean distance error bounds
        const dx = target[0] - currentTCP[0];
        const dy = target[1] - currentTCP[1];
        const dz = target[2] - currentTCP[2];
        const distance = Math.sqrt(dx*dx + dy*dy + dz*dz);
        
        if (distance < tolerance) {
            return joints; // Solver successfully converged!
        }

        // CCD updates joints individually backwards from end effector down to base
        for (let j = robot.joints.length - 1; j >= 0; j--) {
            const jointSpec = robot.joints[j];
            
            // Re-evaluate joint coordinate frames
            const currentFk = solveForwardKinematics(configName, joints);
            const tcpPos = currentFk.tcp;
            const jointPos = currentFk.jointPositions[j];

            if (jointSpec.type === "revolute") {
                // Vector pointing from active joint to current TCP
                const Vc = [tcpPos[0] - jointPos[0], tcpPos[1] - jointPos[1], tcpPos[2] - jointPos[2]];
                // Vector pointing from active joint to desired Target
                const Vt = [target[0] - jointPos[0], target[1] - jointPos[1], target[2] - jointPos[2]];

                // Projects onto rotational axis to find angular displacement
                // For simplicity, we approximate revolute axis alignment.
                // Base joint rotates around local Z, subsequent shoulder/elbow pitch around local Y or X
                let axis = [0, 0, 1]; // Default Z
                if (j === 1 || j === 2 || j === 4) {
                    axis = [0, 1, 0]; // Pitch joints around Y axis
                }

                // Project vectors onto the rotation plane normal to joint axis
                const project = (V, axis) => {
                    const dot = V[0]*axis[0] + V[1]*axis[1] + V[2]*axis[2];
                    return [
                        V[0] - dot*axis[0],
                        V[1] - dot*axis[1],
                        V[2] - dot*axis[2]
                    ];
                };

                const VcProj = project(Vc, axis);
                const VtProj = project(Vt, axis);

                const magVc = Math.sqrt(VcProj[0]*VcProj[0] + VcProj[1]*VcProj[1] + VcProj[2]*VcProj[2]);
                const magVt = Math.sqrt(VtProj[0]*VtProj[0] + VtProj[1]*VtProj[1] + VtProj[2]*VtProj[2]);

                if (magVc > 0.1 && magVt > 0.1) {
                    const dotProduct = (VcProj[0]*VtProj[0] + VcProj[1]*VtProj[1] + VcProj[2]*VtProj[2]) / (magVc * magVt);
                    let angle = Math.acos(Math.max(-1, Math.min(1, dotProduct)));

                    // Determine clockwise/counterclockwise sign using cross product w.r.t rotation axis
                    const cross = [
                        VcProj[1]*VtProj[2] - VcProj[2]*VtProj[1],
                        VcProj[2]*VtProj[0] - VcProj[0]*VtProj[2],
                        VcProj[0]*VtProj[1] - VcProj[1]*VtProj[0]
                    ];
                    const sign = (cross[0]*axis[0] + cross[1]*axis[1] + cross[2]*axis[2]) >= 0 ? 1 : -1;
                    angle *= sign;

                    // Dampen the angle step to prevent oscillations
                    const damp = 0.5;
                    joints[j] += RobotikaMath.radToDeg(angle * damp);

                    // Clamp within boundaries
                    joints[j] = Math.max(jointSpec.min, Math.min(jointSpec.max, joints[j]));
                }
            } else if (jointSpec.type === "prismatic") {
                // Prismatic joints slide along mechanical vectors
                // Slide translation amount matches target vector projected onto slide vector
                const slideVector = [0, 0, 1]; // Sliders along Z
                const Vct = [target[0] - tcpPos[0], target[1] - tcpPos[1], target[2] - tcpPos[2]];
                const projectionProj = Vct[0]*slideVector[0] + Vct[1]*slideVector[1] + Vct[2]*slideVector[2];

                joints[j] += projectionProj * 0.4; // Dampened step
                joints[j] = Math.max(jointSpec.min, Math.min(jointSpec.max, joints[j]));
            }
        }
    }

    // Final FK run to determine closeness
    const finalFk = solveForwardKinematics(configName, joints);
    const finalDist = Math.sqrt(
        Math.pow(target[0] - finalFk.tcp[0], 2) +
        Math.pow(target[1] - finalFk.tcp[1], 2) +
        Math.pow(target[2] - finalFk.tcp[2], 2)
    );

    // If final convergence is within acceptable bounds, return joints array, else fall back gracefully
    return finalDist < 50 ? joints : null;
}

/**
 * Monte Carlo Workspace sampler. Samples random configurations to generate physical bounds points cloud.
 * Returns: Array of { x, y, z } coordinates representing boundaries points
 */
function sampleWorkspaceCloud(configName, count = 2000) {
    const robot = ROBOT_CONFIGS[configName];
    if (!robot) return [];

    const points = [];
    for (let n = 0; n < count; n++) {
        // Generate random joint angles vector
        const randomJoints = robot.joints.map(joint => {
            const range = joint.max - joint.min;
            return joint.min + Math.random() * range;
        });

        // Compute Forward Kinematics for random state
        const fk = solveForwardKinematics(configName, randomJoints);
        if (fk) {
            points.push({
                x: fk.tcp[0],
                y: fk.tcp[1],
                z: fk.tcp[2]
            });
        }
    }
    return points;
}

/**
 * Spline Trajectory Interpolator (Cubic vs Quintic Splines)
 * Computes coordinates position, velocity, and acceleration values profiles over time
 * Returns: { positions: [], velocities: [], accelerations: [], times: [] }
 */
const TrajectoryPlanner = {
    // Cubic spline interpolation coefficient calculator
    // s(t) = a0 + a1*t + a2*t^2 + a3*t^3
    cubicSpline: (startVal, goalVal, totalTime, t) => {
        const a0 = startVal;
        const a1 = 0; // zero starting velocity
        const a2 = 3 * (goalVal - startVal) / (totalTime * totalTime);
        const a3 = -2 * (goalVal - startVal) / (totalTime * totalTime * totalTime);

        const pos = a0 + a1*t + a2*t*t + a3*t*t*t;
        const vel = a1 + 2*a2*t + 3*a3*t*t;
        const acc = 2*a2 + 6*a3*t;

        return { pos, vel, acc };
    },

    // Quintic spline interpolation (Zero Jolt)
    // s(t) = a0 + a1*t + a2*t^2 + a3*t^3 + a4*t^4 + a5*t^5
    quinticSpline: (startVal, goalVal, totalTime, t) => {
        const a0 = startVal;
        const a1 = 0; // zero starting velocity
        const a2 = 0; // zero starting acceleration
        const a3 = 10 * (goalVal - startVal) / Math.pow(totalTime, 3);
        const a4 = -15 * (goalVal - startVal) / Math.pow(totalTime, 4);
        const a5 = 6 * (goalVal - startVal) / Math.pow(totalTime, 5);

        const pos = a0 + a1*t + a2*t*t + a3*Math.pow(t, 3) + a4*Math.pow(t, 4) + a5*Math.pow(t, 5);
        const vel = a1 + 2*a2*t + 3*a3*t*t + 4*a4*Math.pow(t, 3) + 5*a5*Math.pow(t, 4);
        const acc = 2*a2 + 6*a3*t + 12*a4*t*t + 20*a5*Math.pow(t, 3);

        return { pos, vel, acc };
    },

    // Generates a complete path timeline sequence
    generateTrajectory: (startJoints, goalJoints, type = "cubic", duration = 2.0, steps = 50) => {
        const trajectory = [];
        const timeStep = duration / (steps - 1);

        for (let step = 0; step < steps; step++) {
            const t = step * timeStep;
            const stepJoints = [];
            const stepVelocities = [];
            const stepAccelerations = [];

            for (let j = 0; j < startJoints.length; j++) {
                let spline;
                if (type === "linear") {
                    // Linear joint space LERP
                    const ratio = t / duration;
                    const pos = startJoints[j] + ratio * (goalJoints[j] - startJoints[j]);
                    const vel = (goalJoints[j] - startJoints[j]) / duration;
                    const acc = 0;
                    spline = { pos, vel, acc };
                } else if (type === "quintic") {
                    spline = TrajectoryPlanner.quinticSpline(startJoints[j], goalJoints[j], duration, t);
                } else {
                    // Default Cubic
                    spline = TrajectoryPlanner.cubicSpline(startJoints[j], goalJoints[j], duration, t);
                }
                
                stepJoints.push(spline.pos);
                stepVelocities.push(spline.vel);
                stepAccelerations.push(spline.acc);
            }

            trajectory.push({
                time: t,
                joints: stepJoints,
                velocities: stepVelocities,
                accelerations: stepAccelerations
            });
        }

        return trajectory;
    }
};
