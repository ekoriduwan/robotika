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
        
        "ws.title": "Workspace",
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
        
        "lib.title": "Robot Model Library",
        "lib.subtitle": "Select active kinematics configurations",
        "lib.filter.all": "ALL ROBOTS",
        "lib.filter.serial": "SERIAL LINK",
        "lib.filter.parallel": "PARALLEL",
        
        "btn.deployed": "DEPLOYED & SIMULATING",
        "btn.openSim": "OPEN SIMULATOR"
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
        
        "home.title": "Dasbor Robotika",
        "home.subtitle": "Tinjauan status waktu nyata, umpan diagnostik, dan analitik aset gantry dari struktur simulasi aktif.",
        
        "home.card1.title": "Mesin Solusi Kinematik",
        "home.card1.desc": "Matriks kinematika invers numerik aktif berjalan pada browser klien lokal dengan kecepatan konvergensi sub-milidetik.",
        "home.card1.btn": "Konfigurasi Solver",
        
        "home.card2.title": "Konfigurasi Aktif",
        "home.card2.desc": "Konfigurasi standar revolute serial aktif. Status jangkauan saat ini: Toleransi ruang kerja normal.",
        "home.card2.btn": "Ganti Robot",
        
        "home.card3.title": "Aliran Diagnostik Aktif",
        "home.card3.desc": "Komputasi vektor dengan akselerasi GPU diaktifkan. Pemuatan verteks: Minimal",
        "home.card3.btn": "Lihat Diagnostik",
        
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
        
        "ws.title": "Ruang Kerja",
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
        
        "lib.title": "Pustaka Model Robot",
        "lib.subtitle": "Pilih konfigurasi kinematika aktif",
        "lib.filter.all": "SEMUA ROBOT",
        "lib.filter.serial": "LINK SERIAL",
        "lib.filter.parallel": "PARALEL",
        
        "btn.deployed": "DITERAPKAN & DISIMULASIKAN",
        "btn.openSim": "BUKA SIMULATOR"
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
        
        "home.title": "Panel Robotika",
        "home.subtitle": "Resumen de estado en tiempo real, diagnósticos y análisis de activos de las estructuras de simulación activas.",
        
        "home.card1.title": "Motor Cinemático",
        "home.card1.desc": "Matrices de cinemática inversa numérica ejecutándose localmente con velocidades de convergencia sub-milisegundo.",
        "home.card1.btn": "Configurar Motor",
        
        "home.card2.title": "Configuración Activa",
        "home.card2.desc": "Configuración de revolución en serie por defecto activa. Tolerancias de espacio de trabajo nominales.",
        "home.card2.btn": "Cambiar Robot",
        
        "home.card3.title": "Flujo de Diagnóstico",
        "home.card3.desc": "Cálculos vectoriales acelerados por GPU habilitados. Carga de vértices: Mínima",
        "home.card3.btn": "Ver Diagnósticos",
        
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
        
        "lib.title": "Biblioteca de Modelos",
        "lib.subtitle": "Seleccione configuraciones cinemáticas activas",
        "lib.filter.all": "TODOS LOS ROBOTS",
        "lib.filter.serial": "ENLACE EN SERIE",
        "lib.filter.parallel": "PARALELO",
        
        "btn.deployed": "DESPLEGADO Y SIMULANDO",
        "btn.openSim": "ABRIR SIMULADOR"
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
        
        "ws.title": "工作空间",
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
        
        "lib.title": "机器人模型库",
        "lib.subtitle": "选择活动的运动学配置",
        "lib.filter.all": "所有机器人",
        "lib.filter.serial": "串联连杆",
        "lib.filter.parallel": "并联",
        
        "btn.deployed": "已部署并正在模拟",
        "btn.openSim": "打开模拟器"
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
