# SK1 游戏工作站（Game Workstation）

一个跑在浏览器里的 **3D 武侠 FPS 游戏合集 + 战绩排行服务**。
技术栈：**Next.js 16（App Router）+ React 19 + Three.js（WebGL）+ Tailwind CSS 4 + Drizzle ORM + PostgreSQL**。

在线玩：打开首页即可，无需下载、无需插件（需要桌面端浏览器 + 键鼠）。

---

## 游戏阵容（6 款）

| # | 游戏 | 玩法 | 关键词 |
|---|------|------|--------|
| 1 | **侠影求生 / Wuxia Royale** | 3D 第一人称武侠大逃杀：12 名 AI 高手、持续收缩毒圈、三种武器（长刀 / 袖箭连弩 / 御剑飞刃）、掉落疗伤药与金丝软甲，活到最后吃鸡 | `FPS` `吃鸡` `缩圈` |
| 2 | **轻功·屋脊疾行 / Qinggong Rooftop Run** | 屋顶跑酷计时赛：二段轻功、Shift 空中突进、弹跳地板、朽木坠落、存档点、琉璃珠收集 | `3D` `跑酷` `计时` |
| 3 | **箭守孤城 / Arrow Sanctum** | 守城塔防：长按蓄力放箭，箭矢带重力下坠，八波魔兵冲击中央灵柱，飞魔自杀式撞击 | `FPS` `弹道` `波次防守` |
| 4 | **刀影乱斗 / Blade Arena** | 无尽竞技场：连弩 + 长刀 + F 突进斩，连击倍率最高 x3，十波之后称霸斗剑台 | `FPS` `连击` `无尽` |
| 5 | **迷踪宝窟 / Dungeon of Scrolls** | 程序生成迷宫：火把动态光照、地刺陷阱、巡逻精怪、找齐八尊金佛后从对角石门逃出 | `FPS` `随机地牢` `潜行` |
| 6 | **飞镖试炼 / Dart Trial** | 62 秒极限靶场：弹出/移动木靶、眉心红点三倍分、连击倍率最高 x5、命中率统计 | `FPS` `限时` `精准` |

全部六款游戏共用同一套自研内核 `src/games/engine.ts`：

- 指针锁定鼠标视角 + WASD 第一人称控制器
- AABB 碰撞（含自动上台阶、地面吸附、二段跳）
- 射线检测 hitscan、带重力抛物线弹道投射物
- 通用 AI 骨架（追击/游走/侧移/远程压制/跳障碍）+ 可插拔 `customBotUpdate`
- 粒子爆裂、曳光、震屏、WebAudio 合成音效（零音频资源）
- 程序化生成天空盒渐变、阴影、雾效

## 目录结构

```
src/
├─ app/
│  ├─ page.tsx                 # 工作站首页（游戏库 / 统计 / 最新战绩）
│  ├─ play/[slug]/page.tsx     # 游戏页（游戏画布 + 操作说明 + TOP10 排行榜）
│  └─ api/
│     ├─ health/route.ts       # 健康检查
│     ├─ plays/route.ts        # POST 开局计数（upsert）
│     └─ scores/route.ts       # GET 排行榜 / POST 提交战绩（返回名次）
├─ components/
│  ├─ GamePlayer.tsx           # 客户端：挂载引擎 + HUD + 开始/暂停/结算浮层 + 提交战绩
│  └─ GameLibrary.tsx          # 首页游戏库（分类筛选 + 搜索）
├─ games/
│  ├─ engine.ts                # 自研 Three.js 游戏内核
│  ├─ registry.ts              # slug -> 懒加载游戏工厂
│  ├─ types.ts                 # HUD / 结算 / 挂载类型
│  └─ <六款游戏>.ts             # 每款游戏一个文件，纯 TS，无 React 依赖
├─ db/{index.ts,schema.ts}     # Drizzle 连接与表结构
└─ lib/games.ts                # 游戏元数据（服务端与客户端共用）
```

## 本地开发

```bash
npm install
cp .env.example .env           # 或直接设置 DATABASE_URL
npx drizzle-kit push           # 建表
npm run dev                    # http://localhost:3000
```

`.env`：

```
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/app_db
```

## 部署（推到 github.com/flin33129-maker/SK1）

```bash
git init
git remote add origin https://github.com/flin33129-maker/SK1.git
git add .
git commit -m "feat: SK1 game workstation (6 three.js games + leaderboard)"
git branch -M main
git push -u origin main
```

之后两种上线方式任选：

1. **Vercel**：导入该仓库，环境变量填 `DATABASE_URL`（Neon / Supabase / Vercel Postgres），Build 命令默认 `npm run build`。
2. **自托管**：`npm ci && npm run build && npm run start`，反向代理指向 3000 端口，数据库执行过 `npx drizzle-kit push` 即可。

## API 一览

| 方法 | 路径 | 说明 |
|------|------|------|
| `GET` | `/api/health` | 服务 + 数据库健康检查 |
| `GET` | `/api/scores?game=wuxia-royale&limit=10` | 某游戏排行榜（不传 game 则返回最新战绩） |
| `POST` | `/api/scores` | `{ gameSlug, playerName, score, kills, wave, durationSec, won, note }` |
| `POST` | `/api/plays` | `{ slug }` 开局计数 +1 |

## 表结构

- `scores`：`id, game_slug, player_name, score, kills, wave, duration_sec, won, note, created_at`（`scores_game_score_idx` 支撑排行榜查询）
- `plays`：`slug (PK), count, last_played_at`

## 操作提示

- 鼠标点击画布会请求 **指针锁定**，`Esc` 解锁并暂停。
- 建议 Chrome / Edge / Firefox 桌面端；核显也能跑（默认 2x pixel ratio 上限 + 1024 阴影贴图）。
- 战绩提交后排行榜立即刷新（服务端组件重新渲染）。
