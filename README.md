# 看股工具 · Stock Tools

手機優先的看股小工具站。**股號就是一切**——不選券商、不背中文全名，加到主畫面就是離線 App。

🔗 https://zonal0223tw-max.github.io/stock-tools/

## 工具

### 相對大盤比較 · `/compare`
把你關心的標的全部 rebase 到同一起點，跟 **0050 大盤**疊成一張圖：

- **超越大盤**：個股減掉 0050，大盤被拉平成一條零基準線——誰跑贏、誰**累積落後大盤**一眼看穿（MoneyDJ 藏起來找不到的那張圖）。
- **漲幅**：各檔自己漲多少。
- 揭穿：絕對漲幅會騙人——台積電半年 +67% 看似很棒，疊上大盤其實還**落後 5.5 pts**。

輸入只要股號（自動補 `.TW` / 上櫃 `.TWO`、自動補中文名）。報價走公開 CORS proxy 直打 Yahoo chart API，**只送股號出門**。沒網路自動退 demo（seeded 走勢，真假不混）。

## 外觀
首頁主題控制台，**全站同步**：

- 亮 / 暗
- 漲跌配色：台股（紅漲綠跌）⇄ 國際（綠漲紅跌）
- 6 色主題

設定存手機本機 localStorage。

## 技術
零相依單檔 · localStorage · PWA（manifest + service worker，加主畫面離線）· 報價 Yahoo via corsproxy.io → allorigins fallback。

每個工具都是 self-contained 的 `{folder}/index.html`，支援 `?embed=1`（首頁活縮圖用）。加工具＝首頁 `TOOLS` 陣列加一筆 + 一個子資料夾。

---
製作：Claude Code · design-architect（generative-lab）
