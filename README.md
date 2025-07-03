# NNNN_Enhanced_ClassChangeSystem 增強版轉職系統

## 插件基本資訊 / プラグイン基本情報 / Plugin Basic Information

**插件名稱:** NNNN_Enhanced_ClassChangeSystem  
**版本:** v1.000 (Beta)  
**作者:** NeNeNeNeTai  
**類型:** 原創插件 (非改寫)  
**更新狀態:** Beta版本，持續開發中  
**GitHub:** https://github.com/tomwu2021/NeNeNeNeTaiPlugin

---

## 1. 插件主要功能簡述

### 繁體中文
增強版轉職系統提供完整的資源消耗機制和詳細的轉職流程控制，主要功能包括：
- 支援金錢和道具消耗的轉職系統
- 詳細的職業轉換條件檢查（等級、參數需求）
- 能力值變化預覽和比較功能
- 技能變化預覽系統
- 靈活的轉職限制設定（職業白名單）
- 完整的確認流程和用戶介面

### 日本語
強化版転職システムは完全なリソース消費メカニズムと詳細な転職フロー制御を提供します：
- 金銭とアイテム消費をサポートする転職システム
- 詳細な職業転換条件チェック（レベル、パラメータ要求）
- 能力値変化プレビューと比較機能
- スキル変化プレビューシステム
- 柔軟な転職制限設定（職業ホワイトリスト）
- 完全な確認フローとユーザーインターフェース

### English
Enhanced Class Change System provides comprehensive resource cost mechanics and detailed class change flow control:
- Class change system supporting gold and item consumption
- Detailed class conversion condition checking (level, parameter requirements)
- Parameter change preview and comparison functionality
- Skill change preview system
- Flexible class change restrictions (class whitelist)
- Complete confirmation flow and user interface

---

## 2. 參數使用說明

### 主要參數 / メインパラメータ / Main Parameters

#### ShowMenuCommand (在菜單中顯示)
- **類型:** Boolean
- **預設值:** true
- **說明:** 是否在主菜單中顯示轉職命令

#### MenuCommandText (菜單命令文字)
- **預設值:** "職業転換"
- **說明:** 在菜單中顯示的轉職命令文字

#### KeepSkills (保留技能)
- **類型:** Boolean
- **預設值:** false
- **說明:** 轉職時是否保留已學會的技能

#### KeepExp (保留經驗值)
- **類型:** Boolean
- **預設值:** true
- **說明:** 轉職時是否保留當前等級和經驗值

### 職業標籤設定 / クラスタグ設定 / Class Tag Settings

#### 轉職限制標籤：
```
<allowedFromClass:1,2,3>    # 允許從職業ID 1,2,3 轉職到此職業
<allowedFromClass:0>        # 包含0則忽略限制，允許所有職業轉職
```

#### 資源消耗標籤：
```
<changeClassCost:5000>      # 轉職需要 5000 金錢
<changeClassItems:3/2,5/1>  # 轉職需要道具ID 3×2個 和道具ID 5×1個
```

#### 能力需求標籤：
```
<requiredLevel:10>          # 需要等級 10
<requiredHP:100>            # 需要 HP ≥ 100
<requiredATK:30>            # 需要攻擊力 ≥ 30
<requiredDEF:25>            # 需要防禦力 ≥ 25
<requiredMAT:20>            # 需要魔法攻擊 ≥ 20
<requiredMDF:20>            # 需要魔法防禦 ≥ 20
<requiredAGI:35>            # 需要敏捷度 ≥ 35
<requiredLUK:15>            # 需要幸運值 ≥ 15
```

---

## 3. 使用步驟

### 步驟1: 插件管理器設置
1. 在插件管理器中啟用 `NNNN_Enhanced_ClassChangeSystem`
2. 設定 `ShowMenuCommand` 為 true（顯示在主選單）
3. 自定義 `MenuCommandText`（如："轉職"）
4. 根據遊戲需求設定 `KeepSkills` 和 `KeepExp`

### 步驟2: 資料庫設置職業
在職業的備註欄中設定轉職條件，範例：

#### 高級戰士職業設置：
```
<allowedFromClass:1,2>
<changeClassCost:10000>
<changeClassItems:1/5,2/3>
<requiredLevel:15>
<requiredATK:40>
<requiredDEF:35>
```

#### 魔法師職業設置：
```
<allowedFromClass:1>
<changeClassCost:8000>
<requiredLevel:10>
<requiredMAT:25>
<requiredMP:80>
```

### 步驟3: 開啟轉職系統
使用以下方式之一開啟轉職畫面：
- 從主選單選擇轉職命令
- 使用插件命令 "OpenClassChange"
- 腳本調用：`SceneManager.push(Scene_EnhancedClassChange)`

### 步驟4: 轉職流程操作
1. 選擇要轉職的角色
2. 瀏覽可用的職業列表
3. 使用 ← → 鍵切換頁籤查看：
   - 轉職條件頁籤
   - 能力比較頁籤  
   - 技能變化頁籤
4. 確認轉職並消耗資源

---

## 4. 測試方式

### 測試典型設置範例

#### 測試職業配置：
1. **基礎戰士 (ID: 1)**
   - 備註欄：`<allowedFromClass:0>` (允許所有職業轉入)

2. **高級戰士 (ID: 2)**
   - 備註欄：
   ```
   <allowedFromClass:1>
   <changeClassCost:5000>
   <changeClassItems:1/3>
   <requiredLevel:8>
   <requiredATK:25>
   ```

3. **魔法師 (ID: 3)**
   - 備註欄：
   ```
   <allowedFromClass:1>
   <changeClassCost:8000>
   <requiredLevel:10>
   <requiredMAT:20>
   <requiredMP:50>
   ```

#### 測試道具準備：
- 確保有道具ID 1 至少3個
- 準備充足的金錢（建議 20000 以上）

#### 測試步驟：
1. 創建等級10以上的角色，職業為基礎戰士
2. 確保角色參數滿足轉職需求
3. 從選單開啟轉職畫面
4. 測試轉職條件檢查
5. 測試能力值預覽功能
6. 執行轉職並確認資源消耗

#### 期望結果：
- 滿足條件的職業顯示為可轉職
- 不滿足條件的職業顯示為灰色不可選
- 能力值變化正確顯示（綠色↑紅色↓）
- 技能變化正確預覽
- 轉職成功後正確消耗資源

//TODO:圖檔說明 - 需要添加轉職界面、頁籤切換、能力比較和技能變化的螢幕截圖

---

## 5. 版權聲明

**授權條款:** MIT License  
**商業使用:** ✅ 允許  
**二次開發:** ✅ 允許  
**轉售權限:** ❌ 禁止轉售原插件  
**署名要求:** 建議保留原作者資訊  

---

## 頁籤功能詳解

### 轉職條件頁籤
- 顯示職業轉職所需的條件
- 金錢和道具消耗需求
- 等級和參數需求檢查
- 轉職限制說明

### 能力比較頁籤
- 轉職前後基本能力值對比
- 綠色箭頭表示能力提升
- 紅色箭頭表示能力下降
- 數值變化量顯示

### 技能變化頁籤
- 會失去的技能列表
- 會獲得的技能列表
- 技能學會等級資訊

---

## 操作提示 / 操作ヒント / Operation Tips

**鍵盤操作:**
- ← → : 切換頁籤
- ↑ ↓ : 選擇職業/滾動內容
- Enter/Z : 確認選擇
- Esc/X : 取消/返回

**滑鼠操作:**
- 點擊職業名稱選擇
- 點擊頁籤標題切換
- 滾輪滾動內容

---

## 注意事項 / 注意事項 / Notes

- 此插件為Beta版本，建議在測試環境中充分驗證
- 轉職會永久改變角色職業，建議提前備份存檔
- 職業限制設定可能影響遊戲平衡，請謹慎配置
- 資源消耗是永久性的，轉職前請確認資源充足
- 建議為重要職業設定合理的轉職條件和成本 