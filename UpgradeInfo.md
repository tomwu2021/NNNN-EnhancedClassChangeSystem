# Unified ClassChangeSystem Design

打造高度彈性、可視化、多條件驗證的 RPG 角色轉職系統。

---

## 🧭 Architectural Overview

### 🔨 Clean Architecture Layer Mapping

| Layer | Modules | Description |
|-------|---------|-------------|
| Entities | ClassChangeRule, ResourceValidator, PreviewSimulator | 定義職業轉換邏輯與驗證條件 |
| Use Cases | ChangeClassUseCase, LoadPreviewData, StartClassChangeFlow | 控管轉職流程、調用策略模組 |
| Interface Adapters | Window_ClassList, Window_ClassInfo, Window_Confirmation, NotesParser, PluginParameterGateway | UI 呈現、參數解析、資料轉換橋樑 |
| Frameworks & Drivers | RPG Maker MZ, PluginManager, RPG System Structures | 執行環境與核心資料來源 |

---

## 🧪 Functional Features

### 🎯 Core Capabilities

- 轉職條件整合：職業、等級、道具、Switch、Script 驗證
- 職業預覽模擬：能力與技能變化 DeepCopy 模擬（不影響角色本體）
- 習得技能呈現：分頁顯示，未習得技能可設定為遮罩或明示
- Notes + Plugin Parameters 混合設定，條件判斷集中於 Notes
- 角色圖像綁定：Face / SV Battler / Character / Picture 可綁定職業與角色 ID
- 視覺流程控制：角色選擇 → 可轉職職業列表 → 預覽 → 確認 → 執行轉職 → 顯示成功訊息
- UI 可配置性高：參數列高度、字體大小、圖片透明度皆可調整
- 動態職業清單更新指令
- 語系自動切換與集中式文字資源設計

---

## 🔀 Class Selection Logic

### 📌 顯示職業清單控制

- 使用 Plugin Parameter `VisibleClassList: class[]` 控制清單可見職業
- 只有出現在此清單中的職業會被列入 UI 列表

### 🔒 轉職條件由 Notes 控制

範例標籤如下：

```xml
<ClassMessage>
進階火焰職，需完成試煉任務並達成指定等級。
</ClassMessage>

<requiredLevel:15>
<allowedFromClass:2,5>
<requiredItem:3>
<requiredSwitch:12>
<requiredScript:$gameVariables.value(6) >= 5>
```

- 所有條件皆由 Notes 驅動
- UI 可顯示「禁用職業」並提示原因（例如「等級不足」「缺少道具」）

---

## 🧑‍🎨 UI Layout

### Window_ClassList

- 顯示可轉職職業名稱、等級、解鎖狀態
- 支援排序與灰階顯示不可轉職項目

### Window_ClassInfo

- 顯示職業詳細能力、技能、圖片、說明文字
- 習得技能可分頁顯示、遮罩未解鎖技能名稱
- 支援圖片左右切換、滾動控制、透明度調整

### Window_Confirmation

- 顯示「%1 轉職為 %2！」訊息
- 可播放音效或跳轉劇情

---

## ⚙️ Plugin Parameters

### 可視職業清單

```json
@param VisibleClassList
@type class[]
@desc 正向表列職業清單，只有這些會在 UI 中列出
```

### UI 顯示設定

```json
@param SortClassId
@type boolean
@default true
@desc 是否依 Class ID 排序

@param ReverseImagePos
@type boolean
@default false
@desc 是否左右顯示位置反轉

@param PictureOpacity
@type number
@default 128
@desc 圖像透明度（0~255）

@param ParamFontSize
@param SkillFontSize
@param MessageFontSize
@type number
@desc 各區塊字體大小
```

### 行為控制設定

```json
@param KeepExp
@type boolean
@desc 是否保留經驗值轉職

@param NoDuplicate
@type boolean
@desc 是否禁止重複職業轉職

@param ShowUnlearnedSkills
@type select
@option none
@option show
@option mask
@desc 未習得技能是否顯示
```

---

## 🧪 Plugin Commands

### UpdateVisibleClassList

動態更新可見職業清單

```yaml
@command UpdateVisibleClassList

@arg ClassIdArray
@type number[]
@desc 要加入或移除的職業 ID

@arg Mode
@type select
@option add
@option remove
@desc 操作模式
```

- `add` 模式：將新職業加入清單（避免重複）
- `remove` 模式：將職業 ID 從清單中移除

---

### ChangeActorClass

讓指定角色轉職成指定職業

```yaml
@command ChangeActorClass

@arg ActorId
@type actor
@desc 目標角色 ID

@arg ClassId
@type class
@desc 目標職業 ID

@arg IsForce
@type boolean
@desc 是否強制轉職（跳過條件與資源消耗）
```

- 若 `IsForce = true` → 立即轉職
- 若 `IsForce = false` → 執行條件判斷與驗證，若不符合則不執行

---

## 🌐 Text Resource Strategy

### 語系自動切換機制

系統根據玩家語言自動載入 UI 文字：

```js
function getSystemLang() {
  const lang = navigator.language || "en";
  if (lang.startsWith("zh")) return "zhTW";
  if (lang.startsWith("ja")) return "jaJP";
  return "enUS";
}
const UI_TEXTS = LANG_TEXTS[getSystemLang()];
```

### UI_TEXTS 字典結構

```js
const LANG_TEXTS = {
  zhTW: {
    selectClassTitle: "選擇職業",
    confirmMessage: "%1 轉職為 %2！",
    skillLabel: "習得技能",
    cancelButton: "取消"
  },
  enUS: {
    selectClassTitle: "Choose Class",
    confirmMessage: "%1 changed class to %2!",
    skillLabel: "Learnable Skills",
    cancelButton: "Cancel"
  },
  jaJP: {
    selectClassTitle: "職業を選択",
    confirmMessage: "%1は%2に転職しました！",
    skillLabel: "習得スキル",
    cancelButton: "キャンセル"
  }
};
```

### 字串覆寫機制（可選）

```json
@param TextOverrides
@type struct<TextOverride>[]
@desc 覆寫 UI 顯示文字內容
```

```js
/*~struct~TextOverride:
@param key
@type string
@desc 要覆寫的文字 key（例如 confirmMessage）

@param value
@type string
@desc 替換後的文字內容
*/
```

---

## 📋 Supported Notes Tags

### 顯示用

```xml
<ClassMessage>
職業敘述文字，支援控制字元與換行。
</ClassMessage>
```

### 轉職條件用

```xml
<requiredLevel:10>
<allowedFromClass:1,2>
<requiredItem:3>
<requiredSwitch:21>
<requiredScript:$gameVariables.value(5) >= 2>
```

---

## 💡 Suggested Enhancements

- 多人角色同步轉職流程
- 職業技能預覽加入效果說明 Tooltip
- UI 解鎖提示：「此職業尚未解鎖，需完成任務」
- 職業樹視覺化（Graph Layout）
- UI_TEXTS 整合本地化翻譯系統