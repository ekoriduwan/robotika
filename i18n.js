/**
 * Robotika i18n Translation Engine
 */

const translations = {
    en: {
        "nav.home": "Home Dashboard",
        "nav.library": "Robot Library",
        "nav.simulator": "3D Simulator",
        "nav.workspace": "Workspace Analysis",
        "nav.path": "Path Planning",
        "nav.docs": "Documentation",
        "nav.settings": "Settings",
        
        "btn.exportPdf": "Export Report PDF",
        "btn.exportCsv": "Export Data CSV",
        
        "status.nominal": "Nominal",
        "status.active": "Active",
        "status.connected": "Connected",
        "status.prefix": "Status:",
        
        "print.report": "Kinematic Simulation and Workspace Diagnostics Report",
        "print.date": "Date Generated:",
        "print.engine": "Engine Version:",
        
        "home.title": "Robotika Dashboard",
        "home.subtitle": "Real-time status overview, diagnostic feeds, and gantry assets analytics of active simulation structures.",
        
        "home.card1.title": "Kinematic Solver Engine",
        "home.card1.desc": "Active numerical inverse kinematics matrices running on local client browser with sub-millisecond converge speeds.",
        "home.card1.btn": "Configure Solver",
        
        "home.card2.title": "Active Configuration",
        "home.card2.desc": "Default serial revolute configurations active. Current reach status: Nominal workspace tolerances.",
        "home.card2.btn": "Change Robot",
        
        "home.card3.title": "Active Diagnostic Stream",
        "home.card3.desc": "GPU-accelerated vector computations enabled. Vertex loading: Minimal",
        "home.card3.btn": "View Diagnostics",
        
        "home.icc": "Industrial Control Center",
        "home.quick.title1": "Quick Deploy 3D Simulator",
        "home.quick.desc1": "Instantly open coordinate slider configurations, customize joints lengths offsets values dynamically, and simulate Denavit-Hartenberg transformation matrices in an interactive three-dimensional viewer.",
        "home.quick.btn1": "Launch Simulator View",
        "home.quick.title2": "Spline Path Planning & Scenarios",
        "home.quick.desc2": "Test cubic and quintic joint spline trajectories calculations. Run industrial presets like welding tracing paths with dynamic graphs plotting velocity and acceleration values in real-time.",
        "home.quick.btn2": "Plan Trajectory Paths",

        "sim.title": "Kinematics Control",
        "sim.subtitle": "Configure multi-DOF articulation values",
        "sim.tab.fk": "Forward",
        "sim.tab.ik": "Inverse",
        "sim.ik.target": "Target Cartesian Coordinate",
        "sim.ik.x": "Position X",
        "sim.ik.y": "Position Y",
        "sim.ik.z": "Position Z",
        "sim.ik.unit": "UNIT: MILLIMETERS",
        "sim.ik.constraintsTitle": "IK Solver Constraints",
        "sim.ik.constraintsDesc": "The numerical solver convergent path respects individual rotational limits of joints (J1 to J6) and checks workspace bounds.",
        "sim.dhParams": "DENAVIT-HARTENBERG PARAMS",
        "sim.btn.compute": "Compute System",
        "sim.btn.solve": "Solve Coordinates",
        
        "matrix.title": "Transformation Matrix (T)",
        "matrix.realtime": "REALTIME",
        "telemetry.title": "Live Joint Telemetry",
        "telemetry.streaming": "STREAMING",
        
        "ws.title": "Workspace Analysis",
        "ws.subtitle": "Analyze physical spatial reach structures",
        "ws.density": "Point Sampling Density",
        "ws.draft": "Draft (500)",
        "ws.dense": "Dense (5000)",
        "ws.slices": "Workspace Projection Slices",
        "ws.slice.3d": "3D Volume Cloud",
        "ws.slice.xy": "XY Plane - Horizontal Slice",
        "ws.slice.xz": "XZ Plane - Frontal Slice",
        "ws.tcp": "TCP Centerpoint Matrix",
        "ws.reach": "Reach",
        "ws.btn.generate": "Generate Point Cloud",
        
        "ws.bento.reach": "Reach Volume",
        "ws.bento.radius": "Max Radius",
        "ws.bento.payload": "Max Payload",
        "ws.bento.singularities": "Singularities",
        
        "path.title": "Path Planning",
        "path.subtitle": "Calculate spline trajectories",
        "path.interp": "Interpolation Parameters",
        "path.start": "START",
        "path.goal": "GOAL",
        "path.algo": "Trajectory Spline Algorithm",
        "path.algo.linear": "Linear Cartesian Path",
        "path.algo.cubic": "Cubic Spline Joint Path",
        "path.algo.quintic": "Quintic Spline (Zero Jolt) Joint Path",
        "path.presets": "Industrial Preset Scenarios",
        "path.preset.welding": "Welding Tracing",
        "path.preset.pick": "Pick & Place",
        "path.graph": "Live Dynamic Plot Graph",
        "path.btn.run": "Animate Path",
        
        "settings.title": "System Settings",
        "settings.subtitle": "Application preferences and configuration",
        "settings.lang": "Application Language",
        "settings.theme": "Theme Interface",
        
        "alert.outOfReach": "Out of Reach / Singularity",
        "alert.activeBounds": "ACTIVE BOUNDS",
        "alert.none": "NONE",
        
        "lib.title": "System Assets",
        "lib.catalog": "Robot Library Catalog",
        "lib.catalogDesc": "Browse and deploy standard industrial kinematics configurations for high-fidelity interactive simulation.",
        "lib.filter.all": "ALL ROBOTS",
        "lib.filter.serial": "SERIAL LINK",
        "lib.filter.parallel": "PARALLEL",
        
        "btn.deployed": "DEPLOYED & SIMULATING",
        "btn.openSim": "OPEN SIMULATOR",
        
        "lib.dof": "DOF CONFIG",
        "lib.app": "PRIMARY APP",
        
        "lib.card.cartesian.title": "Cartesian Robot (XYZ)",
        "lib.card.cartesian.desc": "Standard gantry-style configuration with 3 linear axes. Ideal for high-precision pick and place, CNC, and linear automated lines.",
        "lib.card.cartesian.dof": "3 x Linear Link",
        "lib.card.cartesian.app": "Gantry Assembly",
        
        "lib.card.scara.title": "SCARA Robot (4 DOF)",
        "lib.card.scara.desc": "Selective Compliance Assembly Robot Arm. Exceptionally fast for small component pick & place, vertical insertions, and packaging.",
        "lib.card.scara.dof": "3 Revolute / 1 Pris",
        "lib.card.scara.app": "Fast Picking",
        
        "lib.card.articulated.title": "Articulated Robot (6 DOF)",
        "lib.card.articulated.desc": "Standard industrial multi-link arm with human-like flexibility. High capability for complex welding, painting, and assembly.",
        "lib.card.articulated.dof": "6 x Revolute Joint",
        "lib.card.articulated.app": "Welding & Painting",
        
        "lib.card.delta.title": "Delta Spider Robot",
        "lib.card.delta.desc": "High-speed parallel coordinate configuration. Excels at ultra-high-speed packing and sorting of light products.",
        "lib.card.delta.dof": "3 x Parallel Link",
        "lib.card.delta.app": "High-speed Sorting",
        
        "lib.card.cylindrical.title": "Cylindrical Robot",
        "lib.card.cylindrical.desc": "Rotary base with two linear axes, tracing a cylindrical working boundary. Specialised for machine tool loading operations.",
        "lib.card.cylindrical.dof": "1 Rotational / 2 Lin",
        "lib.card.cylindrical.app": "Machine CNC Loading",
        
        "lib.card.spherical.title": "Spherical Robot (Polar)",
        "lib.card.spherical.desc": "Two rotary joints and one telescoping linear joint. Historical precursor to modern industrial arms, used in casting.",
        "lib.card.spherical.dof": "2 Rotational / 1 Lin",
        "lib.card.spherical.app": "Polar Workspace Handling",
        
        "docs.ref": "Academic Reference",
        "docs.manual": "Robotics Kinematics Manual",
        "docs.desc": "Comprehensive mathematical formulas and specifications of the Lumina Precision simulator.",
        "docs.fk.title": "1. Forward Kinematics (Denavit-Hartenberg Convention)",
        "docs.fk.desc1": "Forward Kinematics (FK) computes the homogeneous matrix transformation $T$ mapping the robot coordinates from local Tool Center Point frame (TCP) back to the base reference coordinates.",
        "docs.fk.desc2": "Each joint $i$ defines a local coordinate transformation matrix $A_i$ dependent on four structural Denavit-Hartenberg (DH) Parameters:",
        "docs.fk.eqTitle": "DH Transformation Matrix Transformation Equation:",
        "docs.fk.eqExpand": "Which expands into the standard matrix format:",
        
        "docs.ik.title": "2. Numerical Inverse Kinematics (CCD Solver)",
        "docs.ik.desc1": "Inverse Kinematics (IK) computes appropriate set of joint parameters necessary to locate the robot tip at desired coordinates $(X, Y, Z)$ in 3D Cartesian coordinates.",
        "docs.ik.desc2": "Our real-time engine implements the highly convergent Cyclic Coordinate Descent (CCD) algorithm. This algorithm traverses backwards from wrist joints down to the base joint, minimizing the coordinate error vector iteratively:",
        "docs.ik.eqTitle": "CCD Angular Step Rotation Vector Update Formula:",
        "docs.ik.where": "Where:",
        "docs.ik.list1": "$V_c$ is the vector pointing from active joint origin to active TCP location.",
        "docs.ik.list2": "$V_t$ is the vector pointing from active joint origin to goal coordinate position target.",
        "docs.ik.list3": "Joint angles are clamped inside safe limits: $J_i^{min} \\le \\theta_i \\le J_i^{max}$.",
        
        "docs.mc.title": "3. Workspace Monte Carlo Sampling",
        "docs.mc.desc1": "The total envelope workspace boundary represents all coordinate points in 3D space which are physically within the reach range of the robot gripper.",
        "docs.mc.desc2": "We compute this dynamically using a Monte Carlo probabilistic model generator. Given random joints rotations vectors generated evenly:",
        "docs.mc.desc3": "A set of $N = 1000$ to $5000$ points are computed using Forward Kinematics (FK). Reach volume $V$ is approximated by measuring the coordinates limits:"
    },
    id: {
        "nav.home": "Dasbor Utama",
        "nav.library": "Pustaka Robot",
        "nav.simulator": "Simulator 3D",
        "nav.workspace": "Analisis Ruang Kerja",
        "nav.path": "Perencanaan Jalur",
        "nav.docs": "Dokumentasi",
        "nav.settings": "Pengaturan",
        
        "btn.exportPdf": "Ekspor Laporan PDF",
        "btn.exportCsv": "Ekspor Data CSV",
        
        "status.nominal": "Normal",
        "status.active": "Aktif",
        "status.connected": "Terhubung",
        "status.prefix": "Status:",

        "print.report": "Laporan Simulasi Kinematik dan Diagnostik Ruang Kerja",
        "print.date": "Tanggal Dihasilkan:",
        "print.engine": "Versi Mesin:",
        
        "home.title": "Dasbor Robotika",
        "home.subtitle": "Tinjauan status waktu nyata, umpan diagnostik, dan analitik aset gantry dari struktur simulasi aktif.",
        
        "home.card1.title": "Mesin Solusi Kinematik",
        "home.card1.desc": "Matriks Kinematika Invers numerik aktif berjalan pada browser klien lokal dengan kecepatan konvergensi sub-milidetik.",
        "home.card1.btn": "Konfigurasi Solver",
        
        "home.card2.title": "Konfigurasi Aktif",
        "home.card2.desc": "Konfigurasi standar revolute serial aktif. Status jangkauan saat ini: Toleransi ruang kerja normal.",
        "home.card2.btn": "Ganti Robot",
        
        "home.card3.title": "Aliran Diagnostik Aktif",
        "home.card3.desc": "Komputasi vektor dengan akselerasi GPU diaktifkan. Pemuatan verteks: Minimal",
        "home.card3.btn": "Lihat Diagnostik",
        
        "home.icc": "Pusat Kontrol Industri",
        "home.quick.title1": "Simulator 3D Penyebaran Cepat",
        "home.quick.desc1": "Buka secara instan konfigurasi slider koordinat, sesuaikan nilai offset panjang sendi secara dinamis, dan simulasikan matriks transformasi Denavit-Hartenberg dalam penampil tiga dimensi interaktif.",
        "home.quick.btn1": "Luncurkan Tampilan Simulator",
        "home.quick.title2": "Perencanaan Jalur Spline & Skenario",
        "home.quick.desc2": "Uji perhitungan lintasan spline sendi kubik dan kuintik. Jalankan prasetel industri seperti jalur pelacakan pengelasan dengan grafik dinamis yang memplot nilai kecepatan dan akselerasi secara waktu-nyata.",
        "home.quick.btn2": "Rencanakan Jalur Lintasan",

        "sim.title": "Kontrol Kinematika",
        "sim.subtitle": "Konfigurasi nilai artikulasi multi-DOF",
        "sim.tab.fk": "Maju (Forward)",
        "sim.tab.ik": "Terbalik (Inverse)",
        "sim.ik.target": "Target Koordinat Kartesius",
        "sim.ik.x": "Posisi X",
        "sim.ik.y": "Posisi Y",
        "sim.ik.z": "Posisi Z",
        "sim.ik.unit": "SATUAN: MILIMETER",
        "sim.ik.constraintsTitle": "Batasan Solver IK",
        "sim.ik.constraintsDesc": "Jalur konvergen solver numerik menghormati batas putaran individu sendi (J1 ke J6) dan memeriksa batas ruang kerja.",
        "sim.dhParams": "PARAMETER DENAVIT-HARTENBERG",
        "sim.btn.compute": "Hitung Sistem",
        "sim.btn.solve": "Pecahkan Koordinat",
        
        "matrix.title": "Matriks Transformasi (T)",
        "matrix.realtime": "WAKTU NYATA",
        "telemetry.title": "Telemetri Sendi Langsung",
        "telemetry.streaming": "MENGALIR",
        
        "ws.title": "Analisis Ruang Kerja",
        "ws.subtitle": "Analisis struktur jangkauan spasial fisik",
        "ws.density": "Kepadatan Sampel Titik",
        "ws.draft": "Rendah (500)",
        "ws.dense": "Tinggi (5000)",
        "ws.slices": "Potongan Proyeksi Ruang Kerja",
        "ws.slice.3d": "Awan Volume 3D",
        "ws.slice.xy": "Bidang XY - Potongan Horizontal",
        "ws.slice.xz": "Bidang XZ - Potongan Frontal",
        "ws.tcp": "Matriks Titik Tengah TCP",
        "ws.reach": "Jangkauan",
        "ws.btn.generate": "Hasilkan Awan Titik",
        
        "ws.bento.reach": "Volume Jangkauan",
        "ws.bento.radius": "Radius Maksimum",
        "ws.bento.payload": "Beban Maksimum",
        "ws.bento.singularities": "Singularitas",
        
        "path.title": "Perencanaan Jalur",
        "path.subtitle": "Hitung lintasan spline",
        "path.interp": "Parameter Interpolasi",
        "path.start": "MULAI",
        "path.goal": "TUJUAN",
        "path.algo": "Algoritma Spline Lintasan",
        "path.algo.linear": "Jalur Kartesius Linear",
        "path.algo.cubic": "Jalur Sendi Spline Kubik",
        "path.algo.quintic": "Jalur Sendi Spline Kuintik (Tanpa Sentakan)",
        "path.presets": "Skenario Prasetel Industri",
        "path.preset.welding": "Penelusuran Pengelasan",
        "path.preset.pick": "Ambil & Letakkan",
        "path.graph": "Grafik Plot Dinamis Langsung",
        "path.btn.run": "Animasikan Jalur",
        
        "settings.title": "Pengaturan Sistem",
        "settings.subtitle": "Preferensi dan konfigurasi aplikasi",
        "settings.lang": "Bahasa Aplikasi",
        "settings.theme": "Antarmuka Tema",
        
        "alert.outOfReach": "Di Luar Jangkauan / Singularitas",
        "alert.activeBounds": "BATAS AKTIF",
        "alert.none": "TIDAK ADA",
        
        "lib.title": "Aset Sistem",
        "lib.catalog": "Katalog Pustaka Robot",
        "lib.catalogDesc": "Telusuri dan terapkan konfigurasi kinematika industri standar untuk simulasi interaktif presisi tinggi.",
        "lib.filter.all": "SEMUA ROBOT",
        "lib.filter.serial": "LINK SERIAL",
        "lib.filter.parallel": "PARALEL",
        
        "btn.deployed": "DITERAPKAN & DISIMULASIKAN",
        "btn.openSim": "BUKA SIMULATOR",
        
        "lib.dof": "KONFIGURASI DOF",
        "lib.app": "APLIKASI UTAMA",
        
        "lib.card.cartesian.title": "Cartesian Robot (XYZ)",
        "lib.card.cartesian.desc": "Konfigurasi bergaya gantry standar dengan 3 sumbu linier. Ideal untuk pick and place presisi tinggi, CNC, dan jalur otomatis linier.",
        "lib.card.cartesian.dof": "3 x Link Linier",
        "lib.card.cartesian.app": "Perakitan Gantry",
        
        "lib.card.scara.title": "SCARA Robot (4 DOF)",
        "lib.card.scara.desc": "Lengan Robot Perakitan Kepatuhan Selektif. Sangat cepat untuk pengambilan & penempatan komponen kecil, penyisipan vertikal, dan pengemasan.",
        "lib.card.scara.dof": "3 Revolute / 1 Pris",
        "lib.card.scara.app": "Pengambilan Cepat",
        
        "lib.card.articulated.title": "Articulated Robot (6 DOF)",
        "lib.card.articulated.desc": "Lengan multi-link industri standar dengan fleksibilitas seperti manusia. Kemampuan tinggi untuk pengelasan, pengecatan, dan perakitan yang kompleks.",
        "lib.card.articulated.dof": "6 x Sendi Revolute",
        "lib.card.articulated.app": "Pengelasan & Pengecatan",
        
        "lib.card.delta.title": "Delta Spider Robot",
        "lib.card.delta.desc": "Konfigurasi koordinat paralel berkecepatan tinggi. Unggul dalam pengepakan dan penyortiran produk ringan dengan kecepatan sangat tinggi.",
        "lib.card.delta.dof": "3 x Link Paralel",
        "lib.card.delta.app": "Penyortiran Kecepatan Tinggi",
        
        "lib.card.cylindrical.title": "Cylindrical Robot",
        "lib.card.cylindrical.desc": "Basis putar dengan dua sumbu linier, melacak batas kerja silinder. Khusus untuk operasi pemuatan alat berat.",
        "lib.card.cylindrical.dof": "1 Rotasional / 2 Linier",
        "lib.card.cylindrical.app": "Pemuatan CNC Mesin",
        
        "lib.card.spherical.title": "Spherical Robot (Polar)",
        "lib.card.spherical.desc": "Dua sendi putar dan satu sendi linier teleskopis. Prekursor historis untuk lengan industri modern, digunakan dalam pengecoran.",
        "lib.card.spherical.dof": "2 Rotasional / 1 Linier",
        "lib.card.spherical.app": "Penanganan Ruang Kerja Polar",
        
        "docs.ref": "Referensi Akademik",
        "docs.manual": "Manual Kinematika Robotika",
        "docs.desc": "Rumus matematika komprehensif dan spesifikasi dari simulator Lumina Precision.",
        "docs.fk.title": "1. Forward Kinematics (Konvensi Denavit-Hartenberg)",
        "docs.fk.desc1": "Forward Kinematics (FK) menghitung transformasi matriks homogen $T$ yang memetakan koordinat robot dari kerangka titik pusat alat lokal (TCP) kembali ke koordinat referensi dasar.",
        "docs.fk.desc2": "Setiap sendi $i$ mendefinisikan matriks transformasi koordinat lokal $A_i$ yang bergantung pada empat Parameter Denavit-Hartenberg (DH) struktural:",
        "docs.fk.eqTitle": "Persamaan Transformasi Matriks DH:",
        "docs.fk.eqExpand": "Yang meluas ke format matriks standar:",
        
        "docs.ik.title": "2. Inverse Kinematics Numerik (CCD Solver)",
        "docs.ik.desc1": "Inverse Kinematics (IK) menghitung kumpulan parameter sendi yang sesuai yang diperlukan untuk menempatkan ujung robot pada koordinat yang diinginkan $(X, Y, Z)$ dalam koordinat Kartesius 3D.",
        "docs.ik.desc2": "Mesin waktu-nyata kami mengimplementasikan algoritma Cyclic Coordinate Descent (CCD) yang sangat konvergen. Algoritma ini melintasi ke belakang dari sendi pergelangan tangan ke sendi dasar, meminimalkan vektor kesalahan koordinat secara iteratif:",
        "docs.ik.eqTitle": "Rumus Pembaruan Vektor Rotasi Langkah Sudut CCD:",
        "docs.ik.where": "Dimana:",
        "docs.ik.list1": "$V_c$ adalah vektor yang menunjuk dari asal sendi aktif ke lokasi TCP aktif.",
        "docs.ik.list2": "$V_t$ adalah vektor yang menunjuk dari asal sendi aktif ke target posisi koordinat tujuan.",
        "docs.ik.list3": "Sudut sendi dijepit di dalam batas aman: $J_i^{min} \\le \\theta_i \\le J_i^{max}$.",
        
        "docs.mc.title": "3. Pengambilan Sampel Monte Carlo Ruang Kerja",
        "docs.mc.desc1": "Batas amplop ruang kerja total mewakili semua titik koordinat dalam ruang 3D yang secara fisik berada dalam jangkauan jangkauan gripper robot.",
        "docs.mc.desc2": "Kami menghitung ini secara dinamis menggunakan generator model probabilistik Monte Carlo. Diberikan vektor rotasi sendi acak yang dihasilkan secara merata:",
        "docs.mc.desc3": "Seperangkat $N = 1000$ hingga $5000$ titik dihitung menggunakan Forward Kinematics (FK). Volume jangkauan $V$ didekati dengan mengukur batas koordinat:"
    },
    es: {
        "nav.home": "Panel de Inicio",
        "nav.library": "Biblioteca de Robots",
        "nav.simulator": "Simulador 3D",
        "nav.workspace": "Análisis de Espacio",
        "nav.path": "Planificación de Rutas",
        "nav.docs": "Documentación",
        "nav.settings": "Ajustes",
        
        "btn.exportPdf": "Exportar PDF",
        "btn.exportCsv": "Exportar Datos CSV",
        
        "status.nominal": "Nominal",
        "status.active": "Activo",
        "status.connected": "Conectado",
        "status.prefix": "Estado:",

        "print.report": "Informe de Simulación Cinemática y Diagnóstico de Espacio de Trabajo",
        "print.date": "Fecha de Generación:",
        "print.engine": "Versión del Motor:",
        
        "home.title": "Panel Robotika",
        "home.subtitle": "Resumen de estado en tiempo real, diagnósticos y análisis de activos de las estructuras de simulación activas.",
        
        "home.card1.title": "Motor Cinemático",
        "home.card1.desc": "Matrices de Cinemática Inversa numérica ejecutándose localmente con velocidades de convergencia sub-milisegundo.",
        "home.card1.btn": "Configurar Motor",
        
        "home.card2.title": "Configuración Activa",
        "home.card2.desc": "Configuración de revolución en serie por defecto activa. Tolerancias de espacio de trabajo nominales.",
        "home.card2.btn": "Cambiar Robot",
        
        "home.card3.title": "Flujo de Diagnóstico",
        "home.card3.desc": "Cálculos vectoriales acelerados por GPU habilitados. Carga de vértices: Mínima",
        "home.card3.btn": "Ver Diagnósticos",
        
        "home.icc": "Centro de Control Industrial",
        "home.quick.title1": "Simulador 3D de Despliegue Rápido",
        "home.quick.desc1": "Abra instantáneamente configuraciones de controles deslizantes de coordenadas, personalice los valores de compensaciones de longitudes de articulaciones dinámicamente y simule matrices de transformación Denavit-Hartenberg en un visor tridimensional interactivo.",
        "home.quick.btn1": "Iniciar Vista del Simulador",
        "home.quick.title2": "Planificación de Rutas Spline y Escenarios",
        "home.quick.desc2": "Pruebe los cálculos de trayectorias spline articulares cúbicas y quínticas. Ejecute preajustes industriales como rutas de seguimiento de soldadura con gráficos dinámicos que trazan los valores de velocidad y aceleración en tiempo real.",
        "home.quick.btn2": "Planificar Rutas de Trayectoria",

        "sim.title": "Control Cinemático",
        "sim.subtitle": "Configurar valores de articulación multi-DOF",
        "sim.tab.fk": "Directa",
        "sim.tab.ik": "Inversa",
        "sim.ik.target": "Coordenada Cartesiana Objetivo",
        "sim.ik.x": "Posición X",
        "sim.ik.y": "Posición Y",
        "sim.ik.z": "Posición Z",
        "sim.ik.unit": "UNIDAD: MILÍMETROS",
        "sim.ik.constraintsTitle": "Restricciones IK",
        "sim.ik.constraintsDesc": "La ruta respeta los límites rotacionales individuales (J1 a J6) y comprueba los límites de alcance.",
        "sim.dhParams": "PARÁMETROS DENAVIT-HARTENBERG",
        "sim.btn.compute": "Calcular Sistema",
        "sim.btn.solve": "Resolver Coordenadas",
        
        "matrix.title": "Matriz de Transformación (T)",
        "matrix.realtime": "TIEMPO REAL",
        "telemetry.title": "Telemetría de Articulaciones",
        "telemetry.streaming": "TRANSMITIENDO",
        
        "ws.title": "Espacio de Trabajo",
        "ws.subtitle": "Analizar estructuras de alcance espacial físico",
        "ws.density": "Densidad de Puntos",
        "ws.draft": "Borrador (500)",
        "ws.dense": "Denso (5000)",
        "ws.slices": "Planos de Proyección",
        "ws.slice.3d": "Nube de Volumen 3D",
        "ws.slice.xy": "Plano XY - Corte Horizontal",
        "ws.slice.xz": "Plano XZ - Corte Frontal",
        "ws.tcp": "Matriz de Punto Central TCP",
        "ws.reach": "Alcance",
        "ws.btn.generate": "Generar Nube de Puntos",
        
        "ws.bento.reach": "Volumen de Alcance",
        "ws.bento.radius": "Radio Máximo",
        "ws.bento.payload": "Carga Máxima",
        "ws.bento.singularities": "Singularidades",
        
        "path.title": "Planificación de Rutas",
        "path.subtitle": "Calcular trayectorias spline",
        "path.interp": "Parámetros de Interpolación",
        "path.start": "INICIO",
        "path.goal": "META",
        "path.algo": "Algoritmo de Trayectoria Spline",
        "path.algo.linear": "Ruta Cartesiana Lineal",
        "path.algo.cubic": "Ruta de Articulación Spline Cúbica",
        "path.algo.quintic": "Ruta Spline Quíntica (Sin Tirones)",
        "path.presets": "Escenarios Industriales Preestablecidos",
        "path.preset.welding": "Rastreo de Soldadura",
        "path.preset.pick": "Recoger y Colocar",
        "path.graph": "Gráfico de Trazado Dinámico",
        "path.btn.run": "Animar Ruta",
        
        "settings.title": "Ajustes del Sistema",
        "settings.subtitle": "Preferencias y configuración de la aplicación",
        "settings.lang": "Idioma de la Aplicación",
        "settings.theme": "Tema de la Interfaz",
        
        "alert.outOfReach": "Fuera de Alcance / Singularidad",
        "alert.activeBounds": "LÍMITES ACTIVOS",
        "alert.none": "NINGUNO",
        
        "lib.title": "Activos del Sistema",
        "lib.catalog": "Catálogo de Biblioteca de Robots",
        "lib.catalogDesc": "Navegue y despliegue configuraciones cinemáticas industriales estándar para simulación interactiva de alta fidelidad.",
        "lib.filter.all": "TODOS LOS ROBOTS",
        "lib.filter.serial": "ENLACE EN SERIE",
        "lib.filter.parallel": "PARALELO",
        
        "btn.deployed": "DESPLEGADO Y SIMULANDO",
        "btn.openSim": "ABRIR SIMULADOR",
        
        "lib.dof": "CONFIGURACIÓN DOF",
        "lib.app": "APLICACIÓN PRINCIPAL",
        
        "lib.card.cartesian.title": "Cartesian Robot (XYZ)",
        "lib.card.cartesian.desc": "Configuración de pórtico estándar con 3 ejes lineales. Ideal para pick and place de alta precisión, CNC y líneas automatizadas.",
        "lib.card.cartesian.dof": "3 x Enlace Lineal",
        "lib.card.cartesian.app": "Ensamblaje de Pórtico",
        
        "lib.card.scara.title": "SCARA Robot (4 DOF)",
        "lib.card.scara.desc": "Brazo robótico de ensamblaje de cumplimiento selectivo. Excepcionalmente rápido para pick & place de componentes pequeños.",
        "lib.card.scara.dof": "3 Revolutas / 1 Pris",
        "lib.card.scara.app": "Recogida Rápida",
        
        "lib.card.articulated.title": "Articulated Robot (6 DOF)",
        "lib.card.articulated.desc": "Brazo industrial estándar de múltiples enlaces. Alta capacidad para soldadura compleja, pintura y ensamblaje.",
        "lib.card.articulated.dof": "6 x Junta Revoluta",
        "lib.card.articulated.app": "Soldadura y Pintura",
        
        "lib.card.delta.title": "Delta Spider Robot",
        "lib.card.delta.desc": "Configuración de coordenadas paralelas de alta velocidad. Destaca en el envasado y clasificación de ultra alta velocidad.",
        "lib.card.delta.dof": "3 x Enlace Paralelo",
        "lib.card.delta.app": "Clasificación Rápida",
        
        "lib.card.cylindrical.title": "Cylindrical Robot",
        "lib.card.cylindrical.desc": "Base giratoria con dos ejes lineales. Especializado para operaciones de carga de máquinas herramienta.",
        "lib.card.cylindrical.dof": "1 Rotacional / 2 Lin",
        "lib.card.cylindrical.app": "Carga de Máquinas CNC",
        
        "lib.card.spherical.title": "Spherical Robot (Polar)",
        "lib.card.spherical.desc": "Dos articulaciones giratorias y una articulación lineal telescópica. Precursor histórico de los brazos industriales modernos.",
        "lib.card.spherical.dof": "2 Rotacional / 1 Lin",
        "lib.card.spherical.app": "Manejo Espacio Polar",
        
        "docs.ref": "Referencia Académica",
        "docs.manual": "Manual de Cinemática Robótica",
        "docs.desc": "Fórmulas matemáticas completas y especificaciones del simulador Lumina Precision.",
        "docs.fk.title": "1. Forward Kinematics (Convención Denavit-Hartenberg)",
        "docs.fk.desc1": "La Forward Kinematics (FK) calcula la transformación de matriz homogénea $T$ que mapea las coordenadas del robot desde el marco local (TCP) de vuelta a las coordenadas base.",
        "docs.fk.desc2": "Cada articulación $i$ define una matriz de transformación de coordenadas local $A_i$ que depende de cuatro Parámetros Denavit-Hartenberg (DH):",
        "docs.fk.eqTitle": "Ecuación de Transformación de Matriz DH:",
        "docs.fk.eqExpand": "Lo que se expande en el formato de matriz estándar:",
        
        "docs.ik.title": "2. Inverse Kinematics Numérica (CCD Solver)",
        "docs.ik.desc1": "La Inverse Kinematics (IK) calcula el conjunto apropiado de parámetros articulares necesarios para ubicar la punta del robot en las coordenadas deseadas $(X, Y, Z)$.",
        "docs.ik.desc2": "Nuestro motor en tiempo real implementa el algoritmo Cyclic Coordinate Descent (CCD). Este algoritmo se desplaza hacia atrás minimizando el vector de error iterativamente:",
        "docs.ik.eqTitle": "Fórmula de Actualización del Vector de Rotación Angular CCD:",
        "docs.ik.where": "Dónde:",
        "docs.ik.list1": "$V_c$ es el vector que apunta desde el origen de la articulación activa a la ubicación TCP activa.",
        "docs.ik.list2": "$V_t$ es el vector que apunta desde el origen de la articulación activa al objetivo de posición de coordenadas.",
        "docs.ik.list3": "Los ángulos de articulación se sujetan dentro de límites seguros: $J_i^{min} \\le \\theta_i \\le J_i^{max}$.",
        
        "docs.mc.title": "3. Muestreo Monte Carlo de Espacio",
        "docs.mc.desc1": "El límite total de la envoltura de trabajo representa todos los puntos coordenados que están físicamente dentro del alcance.",
        "docs.mc.desc2": "Calculamos esto dinámicamente usando un generador de modelo probabilístico Monte Carlo. Dado vectores de rotaciones articulares aleatorias:",
        "docs.mc.desc3": "Se calcula un conjunto de $N = 1000$ a $5000$ puntos usando Forward Kinematics (FK). El volumen de alcance $V$ se aproxima midiendo los límites:"
    },
    zh: {
        "nav.home": "主控仪表板",
        "nav.library": "机器人库",
        "nav.simulator": "3D 模拟器",
        "nav.workspace": "工作空间分析",
        "nav.path": "路径规划",
        "nav.docs": "数学文档",
        "nav.settings": "系统设置",
        
        "btn.exportPdf": "导出 PDF 报告",
        "btn.exportCsv": "导出 CSV 数据",
        
        "status.nominal": "正常",
        "status.active": "活跃",
        "status.connected": "已连接",
        "status.prefix": "状态：",

        "print.report": "运动学模拟和工作空间诊断报告",
        "print.date": "生成日期：",
        "print.engine": "引擎版本：",
        
        "home.title": "Robotika 仪表板",
        "home.subtitle": "活动模拟结构的实时状态概览，诊断数据流和资产分析。",
        
        "home.card1.title": "运动学求解引擎",
        "home.card1.desc": "在本地浏览器上运行的活动数值逆运动学矩阵，具有亚毫秒级收敛速度。",
        "home.card1.btn": "配置求解器",
        
        "home.card2.title": "活动配置",
        "home.card2.desc": "默认串联旋转配置处于活动状态。 当前达到状态：正常公差。",
        "home.card2.btn": "更改机器人",
        
        "home.card3.title": "活动诊断流",
        "home.card3.desc": "已启用 GPU 加速矢量计算。 顶点加载：最小",
        "home.card3.btn": "查看诊断",
        
        "home.icc": "工业控制中心",
        "home.quick.title1": "快速部署 3D 模拟器",
        "home.quick.desc1": "即时打开坐标滑块配置，动态自定义关节长度偏移值，并在交互式 3D 视图中模拟 Denavit-Hartenberg 变换矩阵。",
        "home.quick.btn1": "启动模拟器视图",
        "home.quick.title2": "样条路径规划和场景",
        "home.quick.desc2": "测试三次和五次关节样条轨迹计算。 运行工业预设，如焊接追踪路径，带有动态图形实时绘制速度和加速度值。",
        "home.quick.btn2": "计划轨迹路径",

        "sim.title": "运动学控制",
        "sim.subtitle": "配置多自由度关节值",
        "sim.tab.fk": "正向",
        "sim.tab.ik": "逆向",
        "sim.ik.target": "目标笛卡尔坐标",
        "sim.ik.x": "位置 X",
        "sim.ik.y": "位置 Y",
        "sim.ik.z": "位置 Z",
        "sim.ik.unit": "单位：毫米",
        "sim.ik.constraintsTitle": "IK 求解器约束",
        "sim.ik.constraintsDesc": "数值求解器收敛路径遵循关节的各个旋转极限（J1 到 J6），并检查工作空间边界。",
        "sim.dhParams": "DENAVIT-HARTENBERG 参数",
        "sim.btn.compute": "计算系统",
        "sim.btn.solve": "求解坐标",
        
        "matrix.title": "变换矩阵 (T)",
        "matrix.realtime": "实时",
        "telemetry.title": "实时关节遥测",
        "telemetry.streaming": "传输中",
        
        "ws.title": "工作空间分析",
        "ws.subtitle": "分析物理空间范围结构",
        "ws.density": "点采样密度",
        "ws.draft": "草稿 (500)",
        "ws.dense": "密集 (5000)",
        "ws.slices": "工作空间投影切片",
        "ws.slice.3d": "3D 体积云",
        "ws.slice.xy": "XY 平面 - 水平切片",
        "ws.slice.xz": "XZ 平面 - 额状切片",
        "ws.tcp": "TCP 中心点矩阵",
        "ws.reach": "达到距离",
        "ws.btn.generate": "生成点云",
        
        "ws.bento.reach": "范围体积",
        "ws.bento.radius": "最大半径",
        "ws.bento.payload": "最大有效载荷",
        "ws.bento.singularities": "奇异点",
        
        "path.title": "路径规划",
        "path.subtitle": "计算样条轨迹",
        "path.interp": "插值参数",
        "path.start": "起点",
        "path.goal": "终点",
        "path.algo": "轨迹样条算法",
        "path.algo.linear": "线性笛卡尔路径",
        "path.algo.cubic": "三次样条关节路径",
        "path.algo.quintic": "五次样条 (无跳跃) 关节路径",
        "path.presets": "工业预设场景",
        "path.preset.welding": "焊接追踪",
        "path.preset.pick": "拾取和放置",
        "path.graph": "实时动态绘图",
        "path.btn.run": "动画路径",
        
        "settings.title": "系统设置",
        "settings.subtitle": "应用程序首选项和配置",
        "settings.lang": "应用程序语言",
        "settings.theme": "界面主题",
        
        "alert.outOfReach": "超出范围 / 奇异点",
        "alert.activeBounds": "活动边界",
        "alert.none": "无",
        
        "lib.title": "系统资产",
        "lib.catalog": "机器人库目录",
        "lib.catalogDesc": "浏览并部署标准工业运动学配置，以进行高保真交互式模拟。",
        "lib.filter.all": "所有机器人",
        "lib.filter.serial": "串联连杆",
        "lib.filter.parallel": "并联",
        
        "btn.deployed": "已部署并正在模拟",
        "btn.openSim": "打开模拟器",
        
        "lib.dof": "DOF 配置",
        "lib.app": "主要应用",
        
        "lib.card.cartesian.title": "Cartesian Robot (XYZ)",
        "lib.card.cartesian.desc": "标准龙门式配置，具有 3 个线性轴。 非常适合高精度取放、CNC 和线性自动化生产线。",
        "lib.card.cartesian.dof": "3 x 线性链接",
        "lib.card.cartesian.app": "龙门装配",
        
        "lib.card.scara.title": "SCARA Robot (4 DOF)",
        "lib.card.scara.desc": "选择性顺应装配机械臂。 对于小型组件的取放、垂直插入和包装来说，速度极快。",
        "lib.card.scara.dof": "3 个旋转 / 1 个棱柱",
        "lib.card.scara.app": "快速拾取",
        
        "lib.card.articulated.title": "Articulated Robot (6 DOF)",
        "lib.card.articulated.desc": "具有类似人类灵活性的标准工业多连杆臂。在复杂的焊接、喷漆和组装方面具有很高的能力。",
        "lib.card.articulated.dof": "6 x 旋转关节",
        "lib.card.articulated.app": "焊接与喷漆",
        
        "lib.card.delta.title": "Delta Spider Robot",
        "lib.card.delta.desc": "高速平行坐标配置。 在轻质产品的超高速包装和分拣方面表现出色。",
        "lib.card.delta.dof": "3 x 平行链接",
        "lib.card.delta.app": "高速分拣",
        
        "lib.card.cylindrical.title": "Cylindrical Robot",
        "lib.card.cylindrical.desc": "带有两个线性轴的旋转底座，追踪圆柱形工作边界。 专门用于机床装载操作。",
        "lib.card.cylindrical.dof": "1 个旋转 / 2 个线性",
        "lib.card.cylindrical.app": "数控机床装载",
        
        "lib.card.spherical.title": "Spherical Robot (Polar)",
        "lib.card.spherical.desc": "两个旋转接头和一个伸缩线性接头。 现代工业武器的历史前身，用于铸造。",
        "lib.card.spherical.dof": "2 个旋转 / 1 个线性",
        "lib.card.spherical.app": "极地工作空间处理",
        
        "docs.ref": "学术参考",
        "docs.manual": "机器人运动学手册",
        "docs.desc": "Lumina Precision 模拟器的综合数学公式和规格。",
        "docs.fk.title": "1. Forward Kinematics (Denavit-Hartenberg 公约)",
        "docs.fk.desc1": "Forward Kinematics (FK) 计算齐次矩阵变换 $T$，将机器人坐标从局部工具中心点系 (TCP) 映射回基本参考坐标。",
        "docs.fk.desc2": "每个关节 $i$ 定义一个局部坐标变换矩阵 $A_i$，取决于四个结构 Denavit-Hartenberg (DH) 参数：",
        "docs.fk.eqTitle": "DH 变换矩阵变换方程：",
        "docs.fk.eqExpand": "它扩展为标准矩阵格式：",
        
        "docs.ik.title": "2. 数值 Inverse Kinematics (CCD Solver)",
        "docs.ik.desc1": "Inverse Kinematics (IK) 计算在 3D 笛卡尔坐标中将机器人尖端定位在所需坐标 $(X, Y, Z)$ 处所需的适当关节参数集。",
        "docs.ik.desc2": "我们的实时引擎实现了高度收敛的 Cyclic Coordinate Descent (CCD) 算法。 该算法从腕关节向后遍历至基关节，迭代地最小化坐标误差向量：",
        "docs.ik.eqTitle": "CCD 角步长旋转矢量更新公式：",
        "docs.ik.where": "其中：",
        "docs.ik.list1": "$V_c$ 是从主动关节原点指向主动 TCP 位置的向量。",
        "docs.ik.list2": "$V_t$ 是从主动关节原点指向目标坐标位置的向量。",
        "docs.ik.list3": "关节角度被夹紧在安全极限内：$J_i^{min} \\le \\theta_i \\le J_i^{max}$。",
        
        "docs.mc.title": "3. 工作空间 Monte Carlo Sampling",
        "docs.mc.desc1": "工作空间包络线总边界代表了三维空间中在机器人抓手触及范围内的所有坐标点。",
        "docs.mc.desc2": "我们使用 Monte Carlo 概率模型生成器动态计算。给定均匀生成的随机关节旋转向量：",
        "docs.mc.desc3": "使用 Forward Kinematics (FK) 计算一组 $N = 1000$ 到 $5000$ 个点。体积 $V$ 的近似计算方法是测量坐标极限："
    }
};

let currentLang = localStorage.getItem("robotika_lang") || "en";

function t(key) {
    if (translations[currentLang] && translations[currentLang][key]) {
        return translations[currentLang][key];
    }
    return translations["en"][key] || key;
}

function updateDOMTranslations() {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(el => {
        const key = el.getAttribute("data-i18n");
        el.innerText = t(key);
    });

    // Also update dynamic labels that might need explicit refresh
    const computeBtnLabel = document.getElementById("compute-btn-label");
    if (computeBtnLabel && window.kinematicMode) {
        computeBtnLabel.innerText = window.kinematicMode === 'fk' ? t('sim.btn.compute') : t('sim.btn.solve');
    }
    
    // Dispatch custom event for app.js to re-render any active dynamic state
    window.dispatchEvent(new Event('languageChanged'));
}

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("robotika_lang", lang);
    updateDOMTranslations();
    
    // Update active dropdown UI indicator
    updateLanguageDropdownUI(lang);
}

function updateLanguageDropdownUI(lang) {
    const selector = document.getElementById("lang-selector-btn");
    if (!selector) return;
    
    let flag = "🇺🇸";
    let text = "English";
    
    if (lang === "id") { flag = "🇮🇩"; text = "Bahasa Indonesia"; }
    else if (lang === "es") { flag = "🇪🇸"; text = "Español"; }
    else if (lang === "zh") { flag = "🇨🇳"; text = "中文"; }
    
    selector.innerHTML = `${flag} <span class="font-bold text-xs uppercase ml-1">${text}</span> <span class="material-symbols-outlined text-sm ml-auto">expand_more</span>`;
}

function toggleLangMenu() {
    const menu = document.getElementById("lang-dropdown-menu");
    if (menu) {
        menu.classList.toggle("hidden");
    }
}

// Close dropdown on outside click
document.addEventListener('click', (e) => {
    const menu = document.getElementById("lang-dropdown-menu");
    const btn = document.getElementById("lang-selector-btn");
    if (menu && btn && !menu.classList.contains("hidden") && !menu.contains(e.target) && !btn.contains(e.target)) {
        menu.classList.add("hidden");
    }
});

// Init on load
document.addEventListener("DOMContentLoaded", () => {
    updateLanguageDropdownUI(currentLang);
    updateDOMTranslations();
});
