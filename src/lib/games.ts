export interface ControlItem {
  key: string;
  action: string;
}

export interface GameMeta {
  slug: string;
  name: string;
  en: string;
  tagline: string;
  description: string;
  category: string;
  tags: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  players: string;
  engine: string;
  cover: string;
  accent: string;
  glow: string;
  emoji: string;
  controls: ControlItem[];
  scoring: string;
  /** If set, loads the locally deployed GitHub open-source 3D WebGL build */
  ossUrl?: string;
  /** Upstream GitHub repository URL */
  repoUrl?: string;
}

export const GAMES: GameMeta[] = [
  {
    slug: "claude-of-tanks",
    name: "装甲狂潮 · 钢铁苍穹",
    en: "Claude of Tanks (170 Tanks · 30 Maps)",
    tagline: "GitHub 开源 3D 装甲战争巨作 · 170 辆全尺寸 3D 战车 + 30 张可破坏战场",
    description:
      "完整移植部署自 GitHub 热门开源 3D 装甲模拟大作（Kevin-Liu-01/Claude-of-Tanks）。纯 Three.js r185 打造的浏览器级《坦克世界 / 战争雷霆》：170 辆精细三维建模主战坦克与装甲车、30 张可破坏地形战场、真实装甲倾角与等效穿深弹道解算、X-Ray 击穿回放镜头、AI 装甲集群对战与电影级机库工坊！",
    category: "开源 3A 巨作",
    tags: ["GitHub 开源", "170辆3D坦克", "30张战场", "X-Ray 穿甲回放"],
    difficulty: 4,
    players: "单人战役 / 装甲集群",
    engine: "Three.js r185 · 真实穿甲弹道与悬挂物理",
    cover: "/images/covers/claude-of-tanks.jpg",
    accent: "from-amber-500/30 via-orange-600/20 to-slate-900/40",
    glow: "#f59e0b",
    emoji: "🛡️",
    ossUrl: "/oss-games/claude-of-tanks/index.html",
    repoUrl: "https://github.com/Kevin-Liu-01/Claude-of-Tanks",
    controls: [
      { key: "W A S D", action: "坦克履带前进 / 转向 / 倒车" },
      { key: "鼠标 / 左键", action: "炮塔旋转瞄准 / 主炮开火" },
      { key: "Shift / 滚轮", action: "切换车长镜 / 炮手狙击倍镜" },
      { key: "空格 / R", action: "手刹急停 / 弹种切换" },
    ],
    scoring: "击毁敌方主战坦克 1500 分 + 装甲等效伤害加成 + 战场胜利奖励",
  },
  {
    slug: "wuxia-royale",
    name: "侠影求生 · 永劫孤岛",
    en: "Wuxia Royale: Bladepoint (glTF + Ocean)",
    tagline: "3D 第一人称武侠吃鸡 · glTF 骨骼角色 + 真实海浪着色器 + 飞索钩锁",
    description:
      "聚窟百丈海岛，搭载真实 Three.js Water 法线反射海浪、Preetham 大气散射晚霞天光与 glTF 骨骼动画武者模型（Soldier.glb）。配备《永劫无间》式 E 键飞索钩锁，瞄准任何屋檐、古树或敌人即可飞身突进；1/2/3 切换雁翎太刀（带三维弧光剑气）、诸葛连弩与太虚御剑飞刃，Q 键释放奥义「万剑归宗」十剑齐发！",
    category: "FPS 大逃杀",
    tags: ["glTF 骨骼动画", "飞索钩锁", "Three.Water 海浪", "UnrealBloom"],
    difficulty: 4,
    players: "单人 vs 12 AI 武者",
    engine: "Three.js glTF + Water/Sky Shaders + Bloom",
    cover: "/images/covers/wuxia-royale.jpg",
    accent: "from-rose-500/30 via-amber-500/20 to-emerald-500/25",
    glow: "#f43f5e",
    emoji: "🗡️",
    controls: [
      { key: "W A S D", action: "前后左右移动（Shift 疾跑）" },
      { key: "E / 鼠标中键", action: "飞索钩锁（抓建筑上房 / 突脸敌人）" },
      { key: "Q", action: "奥义·万剑归宗（十剑自动索敌+回甲）" },
      { key: "左键 / 右键", action: "武器攻击 / 烈阳霸体剑气斩" },
      { key: "1 / 2 / 3", action: "雁翎太刀 · 诸葛连弩 · 太虚飞剑" },
      { key: "空格 ×2", action: "踏云二段轻功" },
    ],
    scoring: "斩杀 1000~1500 分 + 存活每秒 8 分 + 天选吃鸡大奖 3000 分",
  },
  {
    slug: "hexgl",
    name: "反重力狂飙 · 霓虹天际",
    en: "HexGL: Futuristic Anti-Gravity Racing",
    tagline: "GitHub 殿堂级开源 3D 科幻反重力竞速（致敬 Wipeout）",
    description:
      "完整本地化部署自 GitHub 知名开源 3D 竞速大作（BKcore/HexGL）。驾驶超音速反重力飞船穿梭于未来大都会的高空峡谷赛道，搭载完整 3D 城市与飞船网格模型、太阳眩光着色器、涡轮加速带、左右空气制动尾翼与护盾碰撞损耗系统！",
    category: "开源 3A 巨作",
    tags: ["GitHub 开源", "3D 反重力赛车", "科幻赛道", "高速光影"],
    difficulty: 3,
    players: "单人圈速挑战",
    engine: "Three.js WebGL + 自定义反重力物理引擎",
    cover: "/images/covers/hexgl.jpg",
    accent: "from-cyan-500/30 via-blue-600/20 to-indigo-900/40",
    glow: "#38bdf8",
    emoji: "🚀",
    ossUrl: "/oss-games/hexgl/index.html",
    repoUrl: "https://github.com/BKcore/HexGL",
    controls: [
      { key: "↑ / W", action: "离子引擎推进加速" },
      { key: "← / →", action: "飞船反重力转向" },
      { key: "A / D", action: "左 / 右空气制动侧倾过弯（Airbrakes）" },
      { key: "点击画面菜单", action: "选择画质与赛道直接发车" },
    ],
    scoring: "三圈总用时越短得分越高（突破 1 分 30 秒可获传奇评级）",
  },
  {
    slug: "server-survival",
    name: "云境防线 · 3D 赛博塔防",
    en: "Server Survival (6,420★ Open Source)",
    tagline: "GitHub 6400+ 星开源爆款 · 3D 立体数据流与架构塔防（原生中文）",
    description:
      "完整部署自 GitHub 6,420 星现象级开源 3D 游戏（pshenok/server-survival）。支持原生简体中文界面与 25 个战役关卡：在全 3D 等轴测赛博空间中部署防火墙、负载均衡器、Redis 缓存集群、弹性算力节点与数据库分片，抵御海量流量洪峰与 DDoS 入侵狂潮！",
    category: "开源 3A 巨作",
    tags: ["GitHub 6420★", "3D 赛博塔防", "25个战役关", "原生中文"],
    difficulty: 3,
    players: "25 关战役 / 无尽沙盒",
    engine: "Three.js 3D 实时数据流渲染引擎",
    cover: "/images/covers/server-survival.jpg",
    accent: "from-emerald-500/30 via-teal-600/20 to-slate-900/40",
    glow: "#10b981",
    emoji: "🌐",
    ossUrl: "/oss-games/server-survival/index.html",
    repoUrl: "https://github.com/pshenok/server-survival",
    controls: [
      { key: "鼠标左键", action: "放置 3D 防御节点 / 连接数据光纤" },
      { key: "鼠标右键拖动", action: "旋转 / 平移 3D 全息沙盘视角" },
      { key: "滚轮", action: "缩放 3D 战场镜头" },
      { key: "右上角语言", action: "可切换简体中文（ZH）界面" },
    ],
    scoring: "存活波次 × 系统可用率 SLA + 拦截攻击数",
  },
  {
    slug: "jungle-trail",
    name: "幽林秘境 · 次世代程序化丛林",
    en: "Jungle Trail: Procedural 3D World",
    tagline: "GitHub 开源次世代 3D 第一人称程序化热带雨林探索",
    description:
      "完整部署自 GitHub 开源纯代码生成式 3D 第一人称丛林工程（StarKnightt/jungle-trail）。零外部贴图依赖，完全通过实时着色器与几何算法构建出极具沉浸感的雨林树冠、丁达尔体积光束、随风摆动的蕨类植被、地形起伏与空间环境立体声场。",
    category: "开源 3A 巨作",
    tags: ["GitHub 开源", "程序化3D雨林", "体积光渲染", "第一人称"],
    difficulty: 2,
    players: "单人沉浸探索",
    engine: "Three.js r185 自定义着色器与风场植被系统",
    cover: "/images/covers/jungle-trail.jpg",
    accent: "from-lime-500/30 via-emerald-600/20 to-slate-900/40",
    glow: "#84cc16",
    emoji: "🌿",
    ossUrl: "/oss-games/jungle-trail/index.html",
    repoUrl: "https://github.com/StarKnightt/jungle-trail",
    controls: [
      { key: "W A S D / 方向键", action: "在 3D 热带雨林小径中自由漫步" },
      { key: "鼠标拖动 / 视角", action: "环顾四周雨林树冠与光影" },
      { key: "Shift", action: "林间疾行" },
      { key: "F3", action: "打开实时渲染管线与帧率监控面板" },
    ],
    scoring: "探索里程与发现隐藏秘境坐标积分",
  },
  {
    slug: "qinggong-run",
    name: "轻功·幽都疾行",
    en: "Qinggong: Cyber-Chang'an Run",
    tagline: "3D 第一人称 · 飞索屋脊竞速跑酷",
    description:
      "长安夜色如墨，飞檐连绵百里。结合二段轻功、Shift 凌波空中突进与 E 键飞索钩锁，在高低错落的琉璃瓦屋顶间高速穿梭，踩青玉弹跳阵直冲云霄，收集夜明琉璃珠直抵终点龙旗。",
    category: "3D 跑酷",
    tags: ["3D", "飞索跑酷", "二段轻功", "竞速"],
    difficulty: 3,
    players: "单人竞速",
    engine: "Three.js PBR + UnrealBloom 后处理",
    cover: "/images/covers/qinggong-run.jpg",
    accent: "from-sky-500/30 via-indigo-500/20 to-fuchsia-500/25",
    glow: "#38bdf8",
    emoji: "🏮",
    controls: [
      { key: "W A S D", action: "沿屋脊高速奔跑" },
      { key: "E", action: "飞索钩锁（直接抓向远处屋顶！）" },
      { key: "空格 ×2", action: "踏雪二段轻功" },
      { key: "Shift", action: "凌波空中突进" },
    ],
    scoring: "琉璃珠 150 分 + 剩余时间每秒 22 分 + 通关奖励 800 分",
  },
  {
    slug: "arrow-sanctum",
    name: "箭守孤城 · 破阵曲",
    en: "Arrow Sanctum: Siege Defense",
    tagline: "3D 第一人称 · 实时三维弹道神弓守城 + glTF 攻城军团",
    description:
      "魔军八波围攻孤城中央护城灵柱。手持神臂长弓，长按左键蓄力时会在三维空间实时绘出抛物线弹道预测线，指哪打哪；按 Q 或右键释放绝技「流星火雨」七箭齐发，配合 E 键飞索随时登上城头制高点。",
    category: "FPS 守城",
    tags: ["3D FPS", "3D弹道线", "glTF 军团", "流星箭雨"],
    difficulty: 3,
    players: "单人 vs 8 波军团",
    engine: "Three.js glTF + 3D 弹道 + UnrealBloom",
    cover: "/images/covers/arrow-sanctum.jpg",
    accent: "from-emerald-500/30 via-teal-500/20 to-cyan-500/25",
    glow: "#34d399",
    emoji: "🏹",
    controls: [
      { key: "左键长按", action: "蓄力拉弓（实时显示3D抛物线弹道）" },
      { key: "Q / 右键", action: "绝技·流星火雨（七箭扇形齐射）" },
      { key: "E", action: "飞索钩锁（一键飞上城墙瞭望塔）" },
      { key: "W A S D", action: "城头走位" },
    ],
    scoring: "击杀 130 分 + 命中加成 + 灵柱剩余灵力 + 守城大奖 1500 分",
  },
  {
    slug: "blade-arena",
    name: "刀影乱斗 · 修罗剑台",
    en: "Blade Arena: Shura Colosseum",
    tagline: "3D 第一人称 · 高速剑气斩杀竞技场 + glTF 修罗武者",
    description:
      "环形修罗斗剑台，十波刺客、暗影弩手与重甲统领轮番围剿。手持百炼妖刀挥出炫目光弧剑气，按 F 或右键发动「流光瞬步斩」化作残影穿透群敌，搭配 E 键飞索与修罗暴雨连弩打出华丽连击。",
    category: "FPS 竞技场",
    tags: ["3D FPS", "剑气波", "瞬步一闪", "glTF 骨骼角色"],
    difficulty: 4,
    players: "单人 vs 十波修罗",
    engine: "Three.js glTF + UnrealBloom 后处理",
    cover: "/images/covers/blade-arena.jpg",
    accent: "from-orange-500/30 via-red-500/20 to-purple-500/25",
    glow: "#fb923c",
    emoji: "⚔️",
    controls: [
      { key: "左键", action: "妖刀剑气斩 / 暴雨连弩射击" },
      { key: "F / 右键", action: "流光瞬步斩（高速突进穿透群敌）" },
      { key: "E", action: "飞索钩锁（拉近距离或飞上高台）" },
      { key: "1 / 2", action: "切换百炼妖刀 · 修罗连弩" },
    ],
    scoring: "击杀 × 连击倍率（最高 3 倍）+ 修罗统领悬赏 + 通关 2500 分",
  },
];

export function getGame(slug: string): GameMeta | undefined {
  return GAMES.find((g) => g.slug === slug);
}

export const CATEGORIES = [
  "全部",
  "开源 3A 巨作",
  "FPS 大逃杀",
  "FPS 守城",
  "FPS 竞技场",
  "3D 跑酷",
];
