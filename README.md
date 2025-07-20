# NNNN_ClassChangeSystem 統一轉職系統

## 插件基本資訊 / プラグイン基本情報 / Plugin Basic Information

**插件名稱:** NNNN_ClassChangeSystem  
**版本:** v1.3.0
**作者:** NeNeNeNeTai  
**類型:** 統一轉職系統解決方案  
**更新狀態:** 正式版本，功能完整  
**GitHub:** https://github.com/tomwu2021/NeNeNeNeTaiPlugin

---

## 1. 插件主要功能簡述

### 繁體中文

採用插件管理器參數配置，無需修改職業備註。
提供完整轉職多標籤界面。
支援金錢和道具消耗、詳細條件檢查、客製腳本條件。
預設介面語言檢測(中英日)。
職業圖像顯示、職業重複控制等功能。

### 日本語

プラグインマネージャーのパラメータ設定を採用し、職業メモの変更は不要。
完全な転職マルチタブインターフェースを提供。
金銭とアイテム消費、詳細な条件チェック、カスタムスクリプト条件をサポート。
デフォルトインターフェース言語検出（中英日）。
職業画像表示、職業重複制御などの機能。

### English

Adopts plugin manager parameter configuration, no need to modify class notes.
Provides complete class change multi-tab interface.
Supports gold and item consumption, detailed condition checking, custom script conditions.
Default interface language detection (Chinese, English, Japanese).
Class image display, class duplication control and other features.

---

## 2. 參數使用說明

### 基本參數 / 基本パラメータ / Basic Parameters

#### ShowMenuCommand (在菜單中顯示)

- **類型:** Boolean
- **預設值:** true
- **說明:** 是否在主菜單中顯示轉職命令

#### MenuCommandPosition (菜單命令位置)

- **類型:** Number
- **預設值:** 3
- **說明:** 轉職命令在菜單中的位置（0=頂部）

#### ClassListWidth (職業列表寬度)

- **類型:** Number
- **預設值:** 300
- **說明:** 職業選擇窗口的寬度

#### AllowDuplicate (允許重複職業)

- **類型:** Boolean
- **預設值:** true
- **說明:** 是否允許多個角色轉職為相同職業

#### KeepSkills (保留技能)

- **類型:** Boolean
- **預設值:** false
- **說明:** 轉職時是否保留已學會的技能

#### KeepExp (保留經驗值)

- **類型:** Boolean
- **預設值:** true
- **說明:** 轉職時是否保留當前等級和經驗值

#### HideUnchangeableClassName (隱藏不可轉職職業名稱)

- **類型:** Boolean
- **預設值:** false
- **說明:** 是否隱藏無法轉職的職業名稱

#### HideUnchangeableClassDescription (隱藏不可轉職職業描述)

- **類型:** Boolean
- **預設值:** false
- **說明:** 是否隱藏無法轉職的職業描述

### 結構化職業配置 / 構造化職業設定 / Structured Class Configuration

#### ClassList (可用職業列表)

使用結構化參數配置職業，每個職業包含以下設定：

##### 基本設定

- **Class:** 職業 ID
- **Description:** 職業描述文字
- **Enabled:** 是否啟用此職業

##### 轉職條件設定

- **AllowedActors:** 允許轉職的角色 ID（逗號分隔）
- **FromClasses:** 允許轉職的來源職業 ID（逗號分隔）
- **RequiredLevel:** 需要的最低等級
- **RequiredHp/Mp/Atk/Def/Mat/Mdf/Agi/Luk:** 各項參數需求
- **RequiredSwitches:** 需要的開關 ID（逗號分隔）
- **GoldCost:** 轉職所需金錢
- **ItemCosts:** 轉職所需道具（格式：道具 ID/數量,道具 ID/數量）
- **CustomScript:** 自定義條件腳本
- **CustomScriptErrorMessage:** 自定義腳本錯誤訊息

##### 顯示設定

- **EnabledPicture:** 是否啟用圖片顯示
- **Picture:** 職業圖片檔案名稱（放在 img/pictures 資料夾）

### 多語言文字自定義 / 多言語テキストカスタマイズ / Multi-language Text Customization

系統支援自動語言檢測，同時允許自定義幾乎所有界面文字：

- **menuCommand:** 菜單命令文字
- **confirmMessage:** 確認訊息
- **successMessage:** 成功訊息
- **各種錯誤訊息和界面標籤**

---

## 3. 使用步驟

### 步驟 1: 插件管理器基本設置

1. 在插件管理器中啟用 `NNNN_ClassChangeSystem`
2. 設定基本參數：
   - `ShowMenuCommand`: true（根據遊戲需求決定）
   - `AllowDuplicate`: false（根據遊戲需求決定）
   - `KeepSkills`: false（根據遊戲需求決定）
   - `KeepExp`: true（根據遊戲需求決定）

### 步驟 2: 結構化職業配置

在插件參數的 `ClassList` 中配置可轉職的職業，範例：

#### 高級戰士職業配置：

```javascript
{
  "Class": "2",
  "Description": "擁有強大攻擊力的進階戰士",
  "Enabled": "true",
  "FromClasses": "1",
  "RequiredLevel": "15",
  "RequiredAtk": "40",
  "RequiredDef": "35",
  "GoldCost": "10000",
  "ItemCosts": "1/5,2/3",
  "Picture": "warrior_advanced"
}
```

#### 魔法師職業配置：

```javascript
{
  "Class": "3",
  "Description": "掌握神秘魔法力量的法師",
  "Enabled": "true",
  "FromClasses": "1",
  "RequiredLevel": "10",
  "RequiredMat": "25",
  "RequiredMp": "80",
  "GoldCost": "8000",
  "Picture": "mage"
}
```

### 步驟 3: 開啟轉職系統

使用以下方式之一開啟轉職畫面：

- 從主選單選擇轉職命令
- 使用插件命令 "OpenClassChange"
- 使用插件命令 "ForceClassChange"（強制轉職）
- 腳本調用：`SceneManager.push(Scene_ActorSelection)`

### 步驟 4: 轉職流程操作

1. 選擇要轉職的角色（使用 T/E 鍵快速切換角色）
2. 瀏覽可用的職業列表
3. 使用 ← → 鍵切換標籤頁查看：
   - **職業介紹頁籤**：職業描述和基本資訊
   - **轉職條件頁籤**：詳細的轉職條件和資源需求
   - **能力比較頁籤**：轉職前後能力值變化對比(去除裝備)
   - **技能變化頁籤**：技能獲得和失去的預覽
4. 使用 R/F 鍵滾動查看詳細資訊
5. 確認轉職並消耗資源

---

## 4. 測試方式

### 測試典型設置範例

#### 測試職業配置（在插件參數 ClassList 中設定）：

1. **基礎戰士 (ID: 1)**

   ```javascript
   {
     "Class": "1",
     "Description": "基礎的戰士職業",
     "Enabled": "true",
     "FromClasses": "",
     "RequiredLevel": "1"
   }
   ```

2. **高級戰士 (ID: 2)**

   ```javascript
   {
     "Class": "2",
     "Description": "擁有強大攻擊力的進階戰士",
     "Enabled": "true",
     "FromClasses": "1",
     "RequiredLevel": "8",
     "RequiredAtk": "25",
     "GoldCost": "5000",
     "ItemCosts": "1/3",
     "Picture": "warrior_advanced"
   }
   ```

3. **魔法師 (ID: 3)**
   ```javascript
   {
     "Class": "3",
     "Description": "掌握神秘魔法力量的法師",
     "Enabled": "true",
     "FromClasses": "1",
     "RequiredLevel": "10",
     "RequiredMat": "20",
     "RequiredMp": "50",
     "GoldCost": "8000",
     "Picture": "mage"
   }
   ```

#### 測試資源準備：

- 確保有道具 ID 1 至少 3 個
- 準備充足的金錢（建議 20000 以上）
- 在 img/pictures 資料夾放置職業圖片（warrior_advanced.png, mage.png）

#### 測試步驟：

1. 創建等級 10 以上的角色，職業為基礎戰士
2. 確保角色參數滿足轉職需求
3. 從選單開啟轉職畫面或使用插件命令
4. 測試角色選擇和切換功能（T/E 鍵）
5. 測試職業列表顯示和圖片顯示
6. 測試四個標籤頁的功能：
   - 職業介紹頁籤：查看職業描述
   - 轉職條件頁籤：檢查條件顯示
   - 能力比較頁籤：預覽能力變化
   - 技能變化頁籤：預覽技能變化
7. 測試禁止重複功能（設定 AllowDuplicate 為 false）
8. 執行轉職並確認資源消耗

#### 期望結果：

- 滿足條件的職業顯示為可轉職，有職業圖片
- 不滿足條件的職業顯示為灰色不可選
- 四個標籤頁正確顯示相應資訊
- 能力值變化正確顯示（綠色 ↑ 紅色 ↓）
- 技能變化正確預覽
- 禁止重複功能正常工作
- 轉職成功後正確消耗資源
- 多語言顯示正確（根據系統語言自動切換）

#### 插件命令測試：

1. **OpenClassChange** - 開啟轉職畫面
2. **ForceClassChange** - 強制轉職指定角色到指定職業
3. **BatchUpdateClassList** - 批量啟用/停用職業

---

---

## 5. 頁籤功能詳解

### 職業介紹頁籤

- 顯示職業的詳細描述
- 職業基本資訊和特色說明
- 職業圖片顯示（如果有設定）
- 職業的基礎參數資訊

### 轉職條件頁籤

- 顯示職業轉職所需的完整條件
- 金錢和道具消耗需求
- 等級和各項參數需求檢查
- 開關條件和自定義腳本條件
- 轉職限制說明（來源職業、允許角色等）
- 條件滿足狀態的即時顯示

### 能力比較頁籤

- 轉職前後基本能力值詳細對比
- 綠色箭頭表示能力提升
- 紅色箭頭表示能力下降
- 精確的數值變化量顯示
- 表格化的清晰對比界面

### 技能變化頁籤

- 會失去的技能完整列表
- 會獲得的技能完整列表
- 技能學會等級資訊
- 技能效果預覽
- 技能變化的詳細說明

---

## 操作提示 / 操作ヒント / Operation Tips

**鍵盤操作:**

- ← → : 切換頁籤
- ↑ ↓ : 選擇職業
- T/E : 切換角色
- R/F : 資訊頁面上下滾動內容
- Enter : 確認選擇
- Esc : 取消/返回

**滑鼠操作:**

- 點擊職業名稱選擇
- 點擊頁籤標題切換
- 滾輪滾動內容

---

## 注意事項 / 注意事項 / Notes

### 注意事項

1. 資源消耗是永久性的，轉職前請確認資源充足
2. 職業圖片檔案需放置在 img/pictures 資料夾中
3. 自定義腳本條件需要 JavaScript 基礎知識
4. 兼容 RPG Maker MZ 標準功能

---

## 版權聲明 / 著作権 / Copyright

**授權條款:** MIT License  
**商業使用:** ✅ 允許  
**二次開發:** ✅ 允許  
**轉售權限:** ❌ 禁止轉售原插件  
**署名要求:** 建議保留原作者資訊

---

## 更新日誌 / 更新履歴 / Changelog

### v2.0.0 (2025-07-19)

- ✅ 轉職系統發布
- ✅ 結合多個優秀轉職插件的優勢
- ✅ 完整的結構化參數配置系統
- ✅ 智能多語言支持
- ✅ 職業圖像顯示系統
- ✅ 職業重複控制功能
- ✅ 批量管理和強制轉職命令
- ✅ 完整的錯誤處理和用戶體驗優化

---
