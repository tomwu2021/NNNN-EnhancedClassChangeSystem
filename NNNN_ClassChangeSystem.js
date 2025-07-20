//=============================================================================
// NNNN_ClassChangeSystem.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.000 Enhanced Class Change System
 * @author NeNeNeNeTai
 * @url https://github.com/tomwu2021/NeNeNeNeTaiPlugin
 * @help NNNN_ClassChangeSystem.js
 * 
 * ◆主要功能 (Main Features)
 * - 統一轉職系統，結合資源消耗和豐富UI體驗
 * - 支援金錢和道具消耗
 * - 詳細的職業轉換條件檢查
 * - 多語言支持（繁體中文、英文、日文）
 * - 現代化的用戶界面設計
 * - 能力值變化預覽
 * - 技能變化預覽
 * - 職業圖像系統
 * 
 * @param ShowMenuCommand
 * @text Show Menu Command / メニューに表示 / 在菜單中顯示
 * @desc Whether to show class change command in main menu
 * @type boolean
 * @default true
 * 
 * @param MenuCommandPosition
 * @text Menu Command Position / メニューコマンド位置 / 菜單命令位置
 * @desc Position to insert command in menu (0 = top)
 * @type number
 * @default 3
 * 
 * @param ClassListWidth
 * @text Class List Width / 職業リスト幅 / 職業列表寬度
 * @desc Width of the class selection window
 * @type number
 * @default 300
 * 
 * @param AllowDuplicate
 * @text Allow Duplicate / 允許重複轉職 / 允許重複職業
 * @desc Whether to allow multiple actors to change to the same class
 * @type boolean
 * @default true
 * 
 * @param HideUnchangeableClassName
 * @text Hide Unchangeable Class Name / 隱藏不可轉職職業名稱 / 隱藏不可轉職職業名稱
 * @desc Whether to hide the name of classes that cannot be changed
 * @type boolean
 * @default false
 * 
 * @param HideUnchangeableClassDescription
 * @text Hide Unchangeable Class Description / 隱藏不可轉職職業描述 / 隱藏不可轉職職業描述
 * @desc Whether to hide the description of classes that cannot be changed
 * @type boolean
 * @default false
 * 
 * @param KeepSkills
 * @text Keep Skills / スキル保持 / 保留技能
 * @desc Whether to keep learned skills when changing class
 * @type boolean
 * @default false
 * 
 * @param KeepExp
 * @text Keep Experience / 経験値保持 / 保留經驗值
 * @desc Whether to keep current level and experience when changing class
 * @type boolean
 * @default true
 * 
 * @param ClassList
 * @text Available Classes / 利用可能職業 / 可用職業列表
 * @type struct<ClassData>[]
 * @desc List of classes available for change
 * 
 * 
 * @param <DisplayText>
 * @desc The display texts for changing classes.
 * 
 * @param menuCommand
 * @text Menu Command Text / メニューコマンドテキスト / 菜單命令文字
 * @parent <DisplayText>
 * @desc Text for the class change command in menu
 * @type string
 * 
 * @param confirmMessage
 * @text Confirm Message / 確認メッセージ / 確認訊息
 * @parent <DisplayText>
 * @desc Confirmation message for class change
 * @type string
 * 
 * @param classText
 * @text Class Text / 職業文字 / 職業文字
 * @parent <DisplayText>
 * @desc Text for the class name
 * @type string
 * 
 * @param successMessage
 * @text Success Message / 成功メッセージ / 成功訊息
 * @parent <DisplayText>
 * @desc Message shown when class change succeeds
 * @type string
     * 
 * @param insufficientResources
 * @text Insufficient Resources / 不足リソース / 資源不足
 * @parent <DisplayText>
 * @desc Message for insufficient resources
 * @type string
 * 
 * @param selectCharacterFirst
 * @text Select Character First / キャラクター選択 / 請先選擇角色
 * @parent <DisplayText>
 * @desc Message to select character first
 * @type string
 * 
 * @param selectClassForConditions
 * @text Select Class for Conditions / 条件用職業選択 / 選擇職業查看條件
 * @parent <DisplayText>
 * @desc Message to select class for viewing conditions
 * @type string
 * 
 * @param selectClassForStats
 * @text Select Class for Stats / ステータス用職業選択 / 選擇職業查看數值
 * @parent <DisplayText>
 * @desc Message to select class for viewing stats
 * @type string
 * 
 * @param selectClassForSkills
 * @text Select Class for Skills / スキル用職業選択 / 選擇職業查看技能
 * @parent <DisplayText>
 * @desc Message to select class for viewing skills
 * @type string
 * 
 * @param selectClassForIntro
 * @text Select Class for Intro / 紹介用職業選択 / 選擇職業查看介紹
 * @parent <DisplayText>
 * @desc Message to select class for viewing introduction
 * @type string
 * 
 * @param classDescription
 * @text Class Description / 職業説明 / 職業描述
 * @parent <DisplayText>
 * @desc Label for class description section
 * @type string
 * 
 * @param noClassDescription
 * @text No Class Description / 職業説明なし / 無職業描述
 * @parent <DisplayText>
 * @desc Message when no class description available
 * @type string
 * 
 * @param classBasicInfo
 * @text Class Basic Info / 職業基本情報 / 職業基本資訊
 * @parent <DisplayText>
 * @desc Label for class basic information
 * @type string
 * 
 * @param baseParams
 * @text Base Parameters / 基本パラメータ / 基本參數
 * @parent <DisplayText>
 * @desc Label for base parameters
 * @type string
 * 
 * @param targetClass
 * @text Target Class / 対象職業 / 目標職業
 * @parent <DisplayText>
 * @desc Label for target class
 * @type string
 * 
 * @param changeConditions
 * @text Change Conditions / 転職条件 / 轉職條件
 * @parent <DisplayText>
 * @desc Label for class change conditions
 * @type string
 * 
 * @param allConditionsMet
 * @text All Conditions Met / 全条件満足 / 符合所有條件
 * @parent <DisplayText>
 * @desc Message when all conditions are met
 * @type string
 * 
 * @param changeCost
 * @text Change Cost / 転職コスト / 轉職費用
 * @parent <DisplayText>
 * @desc Label for class change cost
 * @type string
 * 
 * @param goldCost
 * @text Gold Cost / ゴールドコスト / 金錢費用
 * @parent <DisplayText>
 * @type string
 * 
 * @param forceMode
 * @text Force Mode / 強制模式 / 強制模式
 * @parent <DisplayText>
 * @desc Label for force mode
 * @type string
 * 
 * @param paramRequirements
 * @text Parameter Requirements / パラメータ要件 / 參數需求
 * @parent <DisplayText>
 * @desc Label for parameter requirements
 * @type string
 * 
 * @param baseStatsChange
 * @text Base Stats Change / 基本ステータス変化 / 基本數值變化
 * @parent <DisplayText>
 * @desc Label for base stats change
 * @type string
 * 
 * @param skillChangePreview
 * @text Skill Change Preview / スキル変化プレビュー / 技能變化預覽
 * @parent <DisplayText>
 * @desc Label for skill change preview
 * @type string
 * 
 * @param skillsLost
 * @text Skills Lost / 失うスキル / 失去技能
 * @parent <DisplayText>
 * @desc Label for skills that will be lost
 * @type string
 * 
 * @param skillsGained
 * @text Skills Gained / 得るスキル / 獲得技能
 * @parent <DisplayText>
 * @desc Label for skills that will be gained
 * @type string
 * 
 * @param noSkillChanges
 * @text No Skill Changes / スキル変化なし / 無技能變化
 * @parent <DisplayText>
 * @desc Message when no skill changes
 * @type string
 * 
 * @param noNewSkills
 * @text No New Skills / 新スキルなし / 無新技能
 * @parent <DisplayText>
 * @desc Message when no new skills
 * @type string
 * 
 * @param confirmChange
 * @text Confirm Change / 変更確認 / 確認變更
 * @parent <DisplayText>
 * @desc Text for confirm button
 * @type string
 * 
 * @param cancel
 * @text Cancel / キャンセル / 取消
 * @parent <DisplayText>
 * @desc Text for cancel button
 * @type string
 * 
 * @param classIntro
 * @text Class Introduction Tab / 職業紹介タブ / 職業介紹頁籤
 * @parent <DisplayText>
 * @desc Text for class introduction tab
 * @type string
 * 
 * @param conditions
 * @text Conditions Tab / 条件タブ / 條件頁籤
 * @parent <DisplayText>
 * @desc Text for conditions tab
 * @type string
 * 
 * @param statsComparison
 * @text Stats Comparison Tab / ステータス比較タブ / 數值比較頁籤
 * @parent <DisplayText>
 * @desc Text for stats comparison tab
 * @type string
 * 
 * @param skillChanges
 * @text Skill Changes Tab / スキル変化タブ / 技能變化頁籤
 * @parent <DisplayText>
 * @desc Text for skill changes tab
 * @type string
 * 
 * @param item
 * @text Item Header / アイテムヘッダー / 項目標題
 * @parent <DisplayText>
 * @desc Header text for item column
 * @type string
 * 
 * @param before
 * @text Before Header / 変更前ヘッダー / 變更前標題
 * @parent <DisplayText>
 * @desc Header text for before column
 * @type string
     * 
 * @param after
 * @text After Header / 変更後ヘッダー / 變更後標題
 * @parent <DisplayText>
 * @desc Header text for after column
 * @type string
 * 
 * @param change
 * @text Change Header / 変化ヘッダー / 變化標題
 * @parent <DisplayText>
 * @desc Header text for change column
 * @type string
 * 
 * @param operationHint
 * @text Operation Hint / 操作ヒント / 操作提示
 * @parent <DisplayText>
 * @desc Text for operation hints
 * @type string
 * 
 * @param cannotPreviewStats
 * @text Cannot Preview Stats / ステータスプレビュー不可 / 無法預覽數值
 * @parent <DisplayText>
 * @desc Error message for stats preview failure
 * @type string
 * 
 * @param invalidClass
 * @text Invalid Class / 無效職業 / 無效職業
 * @parent <DisplayText>
 * @desc Error message for invalid class
 * @type string
 * 
 * @param cannotChangeFromCurrentClass
 * @text Cannot Change From Current Class / 現職業から転職不可 / 無法從當前職業轉職
 * @parent <DisplayText>
 * @desc Error message for class change restriction
 * @type string
 * 
 * @param actorCannotChange
 * @text Actor Cannot Change / アクター転職不可 / 角色無法轉職
 * @parent <DisplayText>
 * @desc Error message when actor cannot change to class
 * @type string
 * 
 * @param insufficientParam
 * @text Insufficient Parameter / 不足パラメータ / 參數不足
 * @parent <DisplayText>
 * @desc Error message for insufficient parameters
 * @type string
 * 
 * @param insufficientGold
 * @text Insufficient Gold / 不足ゴールド / 金錢不足
 * @parent <DisplayText>
 * @desc Error message for insufficient gold
 * @type string
 * 
 * @param insufficientItem
 * @text Insufficient Item / 不足アイテム / 道具不足
 * @parent <DisplayText>
 * @desc Error message for insufficient items
 * @type string
 * 
 * @param unknownItem
 * @text Unknown Item / 未知アイテム / 未知道具
 * @parent <DisplayText>
 * @desc Error message for unknown items
 * @type string
 * 
 * @param current
 * @text Current / 現在 / 目前
 * @parent <DisplayText>
 * @desc Text for current value display
 * @type string
 * 
 * @param switchOff
 * @text Switch Off / 過關 / 關閉
 * @parent <DisplayText>
 * @desc Switch off the class change system
 * @type switch
 * 
 * @param customScript
 * @text Custom Script / カスタムスクリプト / 自訂腳本
 * @parent <DisplayText>
 * @desc Custom script for class change system
 * @type string
 * 
 * @param unchangeableClassNameReplacement
 * @text Unchangeable Class Name Replacement / 不可轉職職業名稱替代 / 不可轉職職業名稱替代
 * @parent <DisplayText>
 * @desc Text to replace unchangeable class names
 * @type string
 * @default ????
 * 
 * 
 * @command OpenClassChange
 * @text 開啟轉職畫面
 * @desc 開啟職業轉換畫面
 * 
 * @arg actorId
 * @text 指定角色ID
 * @desc 直接指定要轉職的角色ID
 * @type actor
 * 
 * @arg variableActorId
 * @text 角色ID變數
 * @desc 用變數指定角色ID
 * @type variable
 * 
 * @arg isForce
 * @text 強制轉職
 * @desc 是否忽略條件強制轉職
 * @type boolean
 * @default false
 * 
 * @command ForceClassChange
 * @text 強制轉職
 * @desc 強制角色轉職到指定職業
 * 
 * @arg actorId
 * @text 角色ID
 * @desc 要轉職的角色ID
 * @type actor
 * @required
 * 
 * @arg classId
 * @text 職業ID
 * @desc 目標職業ID
 * @type class
 * @required
 * 
 * @arg isForce
 * @text 忽略條件
 * @desc 是否忽略轉職條件
 * @type boolean
 * @default true
 * 
 * @command BatchUpdateClassList
 * @text 批量更新職業列表
 * @desc 批量啟用或停用指定職業
 * 
 * @arg xClassList
 * @text 職業 ID 列表
 * @desc 要更新的職業 ID，用逗號分隔（例：1,2,3）
 * @type string
 * @required
 * 
 * @arg enabled
 * @text 啟用狀態
 * @desc 設定為 true 啟用，設定為 false 停用
 * @type boolean
 * @default true
 */


/*~struct~ClassData:
 * @param Class
 * @text Class / 職業 / 職業
 * @type class
 * @desc Class ID
 * 
 * @param Description
 * @text Description / 描述 / 説明
 * @desc Class description text
 * @type string
 * 
 * @param Enabled
 * @text Enabled / 啟用 / 有効
 * @desc Whether this class appears in the change list
 * @type boolean
 * @default true
 * 
 * @param <Condition>
 * @desc The conditions for changing classes.
 * 
 * @param AllowedActors
 * @parent <Condition>
 * @text Allowed Actors / 允許角色 / 許可アクター
 * @desc Actor IDs that can change to this class (comma separated)
 * @type string
 * 
 * @param FromClasses
 * @parent <Condition>
 * @text From Classes / 來源職業 / 元職業
 * @desc Classes that can change to this class (comma separated)
 * @type string
 * 
 * @param RequiredLevel
 * @parent <Condition>
 * @text Required Level / 需要等級 / 必要レベル
 * @desc Minimum level required
 * @type number
 * @default 1
 * 
 * @param RequiredHp
 * @parent <Condition>
 * @text Required HP / 需要HP / 必要HP
 * @desc Minimum HP parameter required
 * @type number
 * @default 0
 * 
 * @param RequiredMp
 * @parent <Condition>
 * @text Required MP / 需要MP / 必要MP
 * @desc Minimum MP parameter required
 * @type number
 * @default 0
 * 
 * @param RequiredAtk
 * @parent <Condition>
 * @text Required ATK / 需要攻擊力 / 必要攻撃力
 * @desc Minimum ATK parameter required
 * @type number
 * @default 0
 * 
 * @param RequiredDef
 * @parent <Condition>
 * @text Required DEF / 需要防禦力 / 必要防御力
 * @desc Minimum DEF parameter required
 * @type number
 * @default 0
 * 
 * @param RequiredMat
 * @parent <Condition>
 * @text Required MAT / 需要魔攻 / 必要魔法攻撃
 * @desc Minimum MAT parameter required
 * @type number
 * @default 0
 * 
 * @param RequiredMdf
 * @parent <Condition>
 * @text Required MDF / 需要魔防 / 必要魔法防御
 * @desc Minimum MDF parameter required
 * @type number
 * @default 0
 * 
 * @param RequiredAgi
 * @parent <Condition>
 * @text Required AGI / 需要敏捷 / 必要敏捷性
 * @desc Minimum AGI parameter required
 * @type number
 * @default 0
 * 
 * @param RequiredLuk
 * @parent <Condition>
 * @text Required LUK / 需要運氣 / 必要運
 * @desc Minimum LUK parameter required
 * @type number
 * @default 0
 * 
 * @param RequiredSwitches
 * @parent <Condition>
 * @text Required Switches / 需要開關 / 必要スイッチ
 * @desc Required switches (comma separated)
 * @type string
 * 
 * @param GoldCost
 * @parent <Condition>
     * @text Gold Cost / 金錢消耗 / ゴールド消費
 * @desc Gold required for class change
 * @type number
 * @default 0
 * 
 * @param ItemCosts
 * @parent <Condition>
 * @text Item Costs / 道具消耗 / アイテム消費
 * @desc Items required (format: itemId/quantity,itemId/quantity)
 * @type string
 * 
 * @param CustomScript
 * @parent <Condition>
 * @text Custom Script / 自定義腳本 / カスタムスクリプト
 * @desc Custom condition script
 * @type string
 * 
 * @param CustomScriptErrorMessage
 * @parent <Condition>
 * @text Custom Script Error Message / 不符合自定義腳本條件時要出現的錯誤訊息 / カスタムスクリプトエラーメッセージ
 * @desc Custom condition script error message
 * @type string
 * 
 * @Param<Display>
 * @desc The display settings for the class.
 * 
 * @param EnabledPicture
 * @parent <Display>
 * @text Enable Picture / 啟用圖片 / 画像有効
 * @desc Whether to display picture in list
 * @type boolean
 * @default true
 * 
 * @param Picture
 * @parent <Display>
 * @text Class Picture / 職業示意圖片 / 職業画像
 * @desc Picture file for this class
 * @type file
 * @dir img/pictures
 * 
 */

(() => {
    'use strict';
    
    //=============================================================================
    // Constants and Initialization / 常數和初始化 / 定数と初期化
    //=============================================================================

    const pluginName = "NNNN_ClassChangeSystem";
    const parameters = PluginManager.parameters(pluginName);
    
    // Language detection / 語言檢測 / 言語検出
    const isJapanese = () => Game_System.prototype.isJapanese.call(this);
    const isChinese = () => Game_System.prototype.isChinese.call(this);
    const getCurrentLanguage = () => {
        if (isChinese()) return 'zh';
        if (isJapanese()) return 'ja';
        return 'en';
    };
    
    // Multi-language text configuration / 多語言文字配置 / 多言語テキスト設定
    const TEXTS = {
        input: {
            menuCommand:parameters['menuCommand'],
            classText:parameters['classText'],
            confirmMessage:parameters['confirmMessage'],
            successMessage:parameters['successMessage'],
            insufficientResources:parameters['insufficientResources'],
            selectCharacterFirst:parameters['selectCharacterFirst'],
            selectClassForConditions:parameters['selectClassForConditions'],
            selectClassForStats:parameters['selectClassForStats'],
            selectClassForSkills:parameters['selectClassForSkills'],
            selectClassForIntro:parameters['selectClassForIntro'],
            classDescription:parameters['classDescription'],
            noClassDescription:parameters['noClassDescription'],
            classBasicInfo:parameters['classBasicInfo'],
            baseParams:parameters['baseParams'],
            targetClass:parameters['targetClass'],
            changeConditions:parameters['changeConditions'],
            allConditionsMet:parameters['allConditionsMet'],
            changeCost:parameters['changeCost'],
            goldCost:parameters['goldCost'],
            forceMode:parameters['forceMode'],  
            paramRequirements:parameters['paramRequirements'],
            baseStatsChange:parameters['baseStatsChange'],
            skillChangePreview:parameters['skillChangePreview'],
            skillsLost:parameters['skillsLost'],
            skillsGained:parameters['skillsGained'],
            noSkillChanges:parameters['noSkillChanges'],
            noNewSkills:parameters['noNewSkills'],
            confirmChange:parameters['confirmChange'],
            cancel:parameters['cancel'],
            tabs:{
                classIntro:parameters['classIntro'],
                conditions:parameters['conditions'],
                statsComparison:parameters['statsComparison'],
                skillChanges:parameters['skillChanges']
            },
            statHeaders:{
                item:parameters['item'],
                before:parameters['before'],
                after:parameters['after'],
                change:parameters['change']
            },
            operationHint:parameters['operationHint'],
            errors:{
                cannotPreviewStats:parameters['cannotPreviewStats'],
                invalidClass:parameters['invalidClass'],
                cannotChangeFromCurrentClass:parameters['cannotChangeFromCurrentClass'],
                actorCannotChange:parameters['actorCannotChange'],
                insufficientParam:parameters['insufficientParam'],
                insufficientGold:parameters['insufficientGold'],
                insufficientItem:parameters['insufficientItem'],
                unknownItem:parameters['unknownItem'],
                current:parameters['current'],
                switchOff:parameters['switchOff'],
                customScript:parameters['customScript']
            }
        }, // External input texts / 外部輸入文字 / 外部入力テキスト
        zh: {
            menuCommand: '轉職',
            confirmMessage: '確認要進行轉職嗎？',
            classText:'職業',
            successMessage: '%1 成功轉職為 %2！',
            insufficientResources: '資源不足或條件未滿足，無法進行轉職！',
            selectCharacterFirst: '請先選擇角色',
            selectClassForConditions: '選擇職業查看轉職條件',
            selectClassForStats: '選擇職業查看能力比較',
            selectClassForSkills: '選擇職業查看技能變化',
            selectClassForIntro: '選擇職業查看介紹',
            classDescription: '職業描述',
            noClassDescription: '此職業暫無描述',
            classBasicInfo: '基本資訊',
            baseParams: '基礎參數',
            targetClass: '目標職業：',
            changeConditions: '轉職條件：',
            allConditionsMet: '✓ 符合所有條件',
            changeCost: '轉職消耗：',
            goldCost: '金錢：',
            forceMode: '✓ 強制轉職模式，忽略條件與消耗需求',
            paramRequirements: '參數需求：',
            baseStatsChange: '基礎能力值變化：',
            skillChangePreview: '技能變化預覽',
            skillsLost: '■ 失去技能：',
            skillsGained: '■ 獲得技能：',
            noSkillChanges: '沒有技能變化',
            noNewSkills: '沒有新技能可學習',
            confirmChange: '確認轉職',
            cancel: '取消',
            tabs: {
                classIntro: '職業介紹',
                conditions: '轉職條件',
                statsComparison: '能力比較',
                skillChanges: '技能變化'
            },
            statHeaders: {
                item: '項目',
                before: '轉職前',
                after: '轉職後',
                change: '變化'
            },
            operationHint: '← → 切換頁籤  R/F 滾動  T/E 切換角色',
            errors: {
                cannotPreviewStats: '無法預覽數值變化',
                invalidClass: '無效職業',
                cannotChangeFromCurrentClass: '無法從當前職業轉職到此職業',
                actorCannotChange: '此角色無法轉職為此職業',
                insufficientParam: '不足的參數',
                insufficientGold: '不足的金錢',
                insufficientItem: '不足的道具',
                unknownItem: '未知的道具',
                current: '目前',
                switchOff: '未觸發事件-'
            }
        },
        ja: {
            menuCommand: '転職',
            confirmMessage: '転職を実行しますか？',
            classText:'職業',
            successMessage: '%1 は %2 に転職しました！',
            insufficientResources: 'リソース不足又は条件を満たしていないため、転職できません！',
            selectCharacterFirst: 'まずキャラクターを選択してください',
            selectClassForConditions: '職業を選択して転職条件を確認',
            selectClassForStats: '職業を選択して能力変化を確認',
            selectClassForSkills: '職業を選択してスキル変化を確認',
            selectClassForIntro: '職業を選択して基本情報を確認',
            classDescription: '職業説明',
            noClassDescription: 'この職業には説明がありません',
            classBasicInfo: '基本情報',
            baseParams: '基礎パラメータ',
            targetClass: '対象職業：',
            changeConditions: '転職条件：',
            allConditionsMet: '〇 すべての条件を満たしています',
            changeCost: '転職コスト：',
            goldCost: 'お金：',
            forceMode: '〇 強制転職モード、条件とコストを無視',
            paramRequirements: 'パラメータ要件：',
            baseStatsChange: '基本ステータス変化：',
            skillChangePreview: 'スキル変化プレビュー',
            skillsLost: '■ 失うスキル：',
            skillsGained: '■ 獲得スキル：',
            noSkillChanges: 'スキル変化なし',
            noNewSkills: '新しいスキルなし',
            confirmChange: '転職確認',
            cancel: 'キャンセル',
            tabs: {
                classIntro: '職業紹介',
                conditions: '転職条件',
                statsComparison: 'ステータス比較',
                skillChanges: 'スキル変化'
            },
            statHeaders: {
                item: '項目',
                before: '変更前',
                after: '変更後',
                change: '変化'
            },
            operationHint: '← → タブ切替  R/F スクロール  T/E アクター切替',
            errors: {
                cannotPreviewStats: 'ステータス変化をプレビューできません',
                invalidClass: '無効な職業',
                cannotChangeFromCurrentClass: '現在の職業からこの職業に転職できません',
                actorCannotChange: 'アクターがこの職業に転職できません',
                insufficientParam: '不足のパラメータ',
                insufficientGold: '不足のお金',
                insufficientItem: '不足のアイテム',
                unknownItem: '未知のアイテム',
                current: '現在',
                switchOff: '特定のイベントで解放-'
            }
        },
        en: {
            menuCommand: 'Class Change',
            confirmMessage: 'Confirm class change?',
            classText:'Class',
            successMessage: '%1 changed class to %2!',
            insufficientResources: 'Insufficient resources or conditions not met for class change!',
            selectCharacterFirst: 'Please select a character first',
            selectClassForConditions: 'Select a class to view change conditions',
            selectClassForStats: 'Select a class to view stat changes',
            selectClassForSkills: 'Select a class to view skill changes',
            selectClassForIntro: 'Select a class to view class introduction',
            classDescription: 'Class Description',
            noClassDescription: 'No description available for this class',
            classBasicInfo: 'Basic Information',
            baseParams: 'Base Parameters',
            targetClass: 'Target Class:',
            changeConditions: 'Change Conditions:',
            allConditionsMet: '✓ All conditions met',
            changeCost: 'Change Cost:',
            goldCost: 'Gold:',
            forceMode: '✓ Force Mode, ignore conditions and cost',
            paramRequirements: 'Parameter Requirements:',
            baseStatsChange: 'Base Stat Changes:',
            skillChangePreview: 'Skill Change Preview',
            skillsLost: '■ Skills Lost:',
            skillsGained: '■ Skills Gained:',
            noSkillChanges: 'No skill changes',
            noNewSkills: 'No new skills to learn',
            confirmChange: 'Confirm Change',
            cancel: 'Cancel',
            tabs: {
                classIntro: 'Class Info',
                conditions: 'Conditions',
                statsComparison: 'Stats Comparison',
                skillChanges: 'Skill Changes'
            },
            statHeaders: {
                item: 'Item',
                before: 'Before',
                after: 'After',
                change: 'Change'
            },
            operationHint: '← → Switch Tabs  R/F Scroll  T/E Switch Actor',
            errors: {
                cannotPreviewStats: 'Cannot preview stat changes',
                invalidClass: 'Invalid class',
                cannotChangeFromCurrentClass: 'Cannot change from current class to this class',
                actorCannotChange: 'Actor cannot change to this class',
                insufficientParam: 'Insufficient parameter',
                insufficientGold: 'Insufficient gold',
                insufficientItem: 'Insufficient item',
                unknownItem: 'Unknown item',
                current: 'Current',
                switchOff: "Unlocked after specific event",
            }
        }
    };
    
    // Custom key mappings for class change system / 轉職系統自定義按鍵映射 / クラスチェンジシステムのカスタムキーマッピング
    Input.keyMapper[69] = 'actorLeft';    // E key - 切換角色 (左)
    Input.keyMapper[84] = 'actorRight';   // T key - 切換角色 (右)
    Input.keyMapper[82] = 'infoUp';       // R key - 資訊頁面向上捲動
    Input.keyMapper[70] = 'infoDown';     // F key - 資訊頁面向下捲動
    
    // Get current language texts with external input support / 獲取當前語言文字並支援外部輸入 / 外部入力サポート付きの現在の言語テキストを取得
    const getText = (key) => {
        // Check external input first / 首先檢查外部輸入 / まず外部入力をチェック
        if (TEXTS.input[key]) {
            return TEXTS.input[key];
        }
        
        const lang = getCurrentLanguage();
        const keys = key.split('.');
        let text = TEXTS[lang];
        for (const k of keys) {
            text = text[k];
            if (!text) break;
        }
        return text || key;
    };
    
    // Function to set external text / 設定外部文字的函數 / 外部テキスト設定関数
    window.setClassChangeText = (key, value) => {
        TEXTS.input[key] = value;
    };
    
    // Plugin parameters / 插件參數 / プラグインパラメータ
    const showMenuCommand = parameters['ShowMenuCommand'] === 'true';
    const menuCommandPosition = parseInt(parameters['MenuCommandPosition']) || 3;
    const classListWidth = parseInt(parameters['ClassListWidth']) || 300;
    const keepSkills = parameters['KeepSkills'] === 'true';
    const keepExp = parameters['KeepExp'] === 'true';
    const allowDuplicate = parameters["AllowDuplicate"] === 'true';
    const hideUnchangeableClassDescription = parameters["HideUnchangeableClassDescription"] === 'true';
    const hideUnchangeableClassName = parameters["HideUnchangeableClassName"] === 'true';
    const unchangeableClassNameReplacement = parameters["UnchangeableClassNameReplacement"] || '????';
    // Parse structured parameters / 解析結構化參數 / 構造化パラメータの解析
    const parseStruct = (param) => {
        if (!param) return [];
        try {
            return JSON.parse(param).map(item => JSON.parse(item));
        } catch (e) {
            return [];
        }
    };
    
    const classList = parseStruct(parameters['ClassList']);
    
    // Global variables / 全局變數 / グローバル変数
    let selectedActor = null;
    let selectedClass = null;
    let isForceMode = false;    
    const classBitmaps = [];
    for(const c of classList){
        const classBitmap = {
            pictureName: c.Picture,
            bitmap: ImageManager.loadPicture(c.Picture)
        };
        classBitmaps.push(classBitmap);
    }
    //-----------------------------------------------------------------------------
    // Plugin Commands / 插件命令 / プラグインコマンド
    //-----------------------------------------------------------------------------
    
    PluginManager.registerCommand(pluginName, 'OpenClassChange', args => {
        let actorId = null;
        
        if (args.variableActorId) {
            actorId = $gameVariables.value(parseInt(args.variableActorId));
        } else if (args.actorId) {
            actorId = parseInt(args.actorId);
        }
        
        isForceMode = args.isForce === 'true';
        selectedActor = null;
        SceneManager.push(Scene_ActorSelection);
    });
    
    PluginManager.registerCommand(pluginName, 'ForceClassChange', args => {
        const actorId = parseInt(args.actorId);
        const classId = parseInt(args.classId);
        const isForce = args.isForce === 'true';
        
        const actor = $gameActors.actor(actorId);
        const targetClass = $dataClasses[classId];
        const currentClassId = actor.currentClass().id;
        const sameClass = currentClassId === classId;
        if(sameClass){
            $gameMessage.add(getText('errors.cannotChangeFromCurrentClass'));
            return;
        }
        if (actor && targetClass) {
            if (isForce || checkClassChangeConditions(actor, classId).canChange) {
                executeClassChange(actor, classId, isForce);
            } else {
                $gameMessage.add(getText('insufficientResources'));
            }
        }
    });

    PluginManager.registerCommand(pluginName, 'BatchUpdateClassList', args => {
        const xClassList = args.xClassList || '';
        const enabled = args.enabled === 'true';
        const classIds = xClassList.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
        if (classIds.length === 0) {
            return;
        }
        classList.forEach(classData => {
            if (classData && classIds.includes(parseInt(classData.Class))) {
                classData.Enabled = enabled;
            } 
        });
    });
    
    //-----------------------------------------------------------------------------
    // Utility Functions / 工具函數 / ユーティリティ関数
    //-----------------------------------------------------------------------------
    function getClassName(actor,classData,checkResult){
        if(!classData){
            return '';
        }
        if(checkResult === undefined || checkResult === null){
            const check = checkClassChangeConditions(actor, classData.id);
            checkResult = check.some(check => !check.canChange);
        }
        if(hideUnchangeableClassName && !checkResult){
            return unchangeableClassNameReplacement??'';
        }
        return classData.name;
    }

    function getClassConditions(classId) {
        // Find class data from plugin parameters / 從插件參數中查找職業數據 / プラグインパラメータから職業データを検索

        const classData = classList.find(data => parseInt(data.Class) === classId);

        const conditions = {};
                    

        if (classData) {
            // Parse from ClassData parameters / 從ClassData參數解析 / ClassDataパラメータから解析
            const classDataCopy = JsonEx.makeDeepCopy(classData); 
            Object.keys(classDataCopy).forEach(key => {
                if(!paramFields.includes(key)){
                    delete classDataCopy[key];
                    return;
                }
                if(!classDataCopy[key] || classDataCopy[key] === 0 ||
                     classDataCopy[key] === '0' || classDataCopy[key] === ''){
                    delete classDataCopy[key];
                    return;
                }
                conditions[key] = classDataCopy[key];
            });
            if (classData.Description) {
                conditions.Description = classData.Description;
            }
            if (classData.CustomScript && classData.CustomScriptErrorMessage) {
                conditions.CustomScriptErrorMessage = classData.CustomScriptErrorMessage;
            }
        }
        return conditions;
    }
    const paramFields = [
        'AllowedActors',
        'FromClasses',
        'RequiredLevel',
        'RequiredHp',
        'RequiredMp',
        'RequiredAtk',
        'RequiredDef',
        'RequiredMat',
        'RequiredMdf',
        'RequiredAgi',
        'RequiredLuk',
        'GoldCost',
        'ItemCosts',
        'RequiredSwitches',
        'CustomScript'
    ];
    const requiredParamNames = {
        'AllowedActors':paramFields[0],
        'FromClasses':paramFields[1],
        'RequiredLevel':paramFields[2],
        'RequiredHp':paramFields[3],
        'RequiredMp':paramFields[4],
        'RequiredAtk':paramFields[5],
        'RequiredDef':paramFields[6],
        'RequiredMat':paramFields[7],
        'RequiredMdf':paramFields[8],
        'RequiredAgi':paramFields[9],
        'RequiredLuk':paramFields[10],
        'GoldCost':paramFields[11],
        'ItemCosts':paramFields[12],
        'RequiredSwitches':paramFields[13],
        'CustomScript':paramFields[14]
    }
    function getParamName(paramKey) {
        const paramMap = {};
        paramMap[requiredParamNames.RequiredLevel] = TextManager.basic(0); // 等級
        paramMap[requiredParamNames.RequiredHp] = TextManager.param(0);    // 最大 HP
        paramMap[requiredParamNames.RequiredMp] = TextManager.param(1);    // 最大 MP
        paramMap[requiredParamNames.RequiredAtk] = TextManager.param(2);   // 攻擊
        paramMap[requiredParamNames.RequiredDef] = TextManager.param(3);   // 防禦
        paramMap[requiredParamNames.RequiredMat] = TextManager.param(4);   // 魔法攻擊
        paramMap[requiredParamNames.RequiredMdf] = TextManager.param(5);   // 魔法防禦
        paramMap[requiredParamNames.RequiredAgi] = TextManager.param(6);   // 敏捷度
        paramMap[requiredParamNames.RequiredLuk] = TextManager.param(7);   // 運氣
        paramMap[requiredParamNames.GoldCost] = getText('goldCost');    // 金錢
        paramMap[requiredParamNames.ItemCosts] = getText('itemCost');    // 道具
        paramMap[requiredParamNames.RequiredSwitches] = getText('requireSwitches');    // 開關
        paramMap[requiredParamNames.CustomScript] = getText('customScript');    // 自定義腳本
        return paramMap[paramKey] || paramKey;
    };
    function getCurrentValue(actor, paramKey) {
        const valueMap = {};
        valueMap[requiredParamNames.AllowedActors] = actor.actorId();
        valueMap[requiredParamNames.FromClasses] = actor.currentClass().id;
        valueMap[requiredParamNames.RequiredLevel] = actor.level;
        valueMap[requiredParamNames.RequiredHp] = actor.param(0);
        valueMap[requiredParamNames.RequiredMp] = actor.param(1);
        valueMap[requiredParamNames.RequiredAtk] = actor.param(2);
        valueMap[requiredParamNames.RequiredDef] = actor.param(3);
        valueMap[requiredParamNames.RequiredMat] = actor.param(4);
        valueMap[requiredParamNames.RequiredMdf] = actor.param(5);
        valueMap[requiredParamNames.RequiredAgi] = actor.param(6);
        valueMap[requiredParamNames.RequiredLuk] = actor.param(7);
        valueMap[requiredParamNames.GoldCost] = $gameParty.gold();
        valueMap[requiredParamNames.ItemCosts] = (id) => $gameParty.numItems($dataItems[id]);
        valueMap[requiredParamNames.RequiredSwitches] = (id) => $gameSwitches.value(id);
        valueMap[requiredParamNames.CustomScript] = (script,classId) => {
            const a = actor;
            const b = $dataClasses[classId];
            const scriptResult = eval(script);
            return scriptResult;
        };
        return valueMap[paramKey] || 0;
    };
    function checkConditionResult(actor,classId,checkResult){
        if(!checkResult){
            checkResult = checkClassChangeConditions(actor,classId);
        }
        const checkFalse = checkResult.some(c => !c.canChange);
        return !checkFalse;
    }

    function checkClassChangeConditions(actor, targetClassId) {
        const targetClass = $dataClasses[targetClassId];
        let finalResult = [];
        if (!targetClass) finalResult.push({ canChange: false, reason: getText('errors.invalidClass') });
        const conditions = getClassConditions(targetClassId);

        for(const key in conditions){
            const condition = conditions[key];
            if (key === requiredParamNames.AllowedActors){
                if(conditions.AllowedActors && conditions.AllowedActors.split(',').length > 0) {
                    const allowedActors = conditions.AllowedActors.split(',').map(x => parseInt(x.trim()));
                    if (!allowedActors.includes(actor.actorId()) && !allowedActors.includes(0)) {
                        finalResult.push({ canChange: false, reason: getText('errors.actorCannotChange') });
                    }
                }
            }else if (key === requiredParamNames.FromClasses){
                if(conditions.FromClasses && conditions.FromClasses.split(',').length > 0) {
                    const allowedClasses = conditions.FromClasses.split(',').map(x => parseInt(x.trim()));
                    if (!allowedClasses.includes(actor.currentClass().id) && !allowedClasses.includes(0)) {
                        finalResult.push({ canChange: false, reason: getText('errors.cannotChangeFromCurrentClass') });
                    }
                }
            }else if(key === requiredParamNames.ItemCosts){
                if (conditions.ItemCosts && conditions.ItemCosts.split(',').length > 0) {
                    const itemCost = conditions.ItemCosts.split(',');
                    for (const itemString of itemCost) {
                        const [id, amount] = itemString.split('/').map(x => parseInt(x.trim()));
                        if (id && amount) {  
                            const valueMapItemCosts = getCurrentValue(actor, key);
                            const currentAmount = valueMapItemCosts(id) ?? 0;
                            const item = $dataItems[id];
                            if (currentAmount < amount) {
                                finalResult.push({ 
                                    canChange: false, 
                                    reason: `${getText('errors.insufficientItem')} ${item ? item.name : getText('errors.unknownItem')} x${amount} (${getText('errors.current')}: ${currentAmount})`
                                });
                            }
                        }
                    }
                }
            } else if(key === requiredParamNames.GoldCost){
                if (condition && parseInt(condition) > 0) {
                    const requiredGold = parseInt(conditions.GoldCost);
                    const currentGold = $gameParty.gold();
                    if (currentGold < requiredGold) {
                        finalResult.push({ 
                            canChange: false, 
                            reason: `${getText('errors.insufficientGold')}${requiredGold}${TextManager.currencyUnit} (${getText('errors.current')}: ${currentGold}${TextManager.currencyUnit})`
                        });
                    }
                }
            }else if(key === requiredParamNames.RequiredSwitches){
                if(condition && condition.split(',').length > 0){
                    const requiredSwitches = condition.split(',').map(x => parseInt(x.trim()));
                    for (const switchId of requiredSwitches) {
                        const valueMapRequiredSwitches = getCurrentValue(actor, key);
                        const switchValue = valueMapRequiredSwitches(switchId);

                        const switchName = $dataSystem['switches'][switchId]??"";
                        if (!switchValue) {
                            finalResult.push({ 
                                canChange: false, 
                                reason: `${getText('errors.switchOff')} ${switchName}`
                            });
                        }
                    }
                }
            }else if(key === requiredParamNames.CustomScript){
                if(condition && condition !== "0" && condition.trim() !== ""){
                    const customScript = condition;
                    const valueMapCustomScript = getCurrentValue(actor, key);
                    const scriptResult = valueMapCustomScript(customScript,targetClassId);
                    if (!scriptResult) {
                        const customScriptErrorMessage = conditions.CustomScriptErrorMessage;
                        finalResult.push({ 
                            canChange: false, 
                            reason: `${customScriptErrorMessage}`
                        });
                    }
                }
            }else{
                if (condition && parseInt(condition) > 0) {
                    const requiredValue = parseInt(condition);
                    const currentValue = getCurrentValue(actor, key);
                    if (currentValue < requiredValue) {
                        const paramName = getParamName(key);
                        const error = {
                            canChange: false,
                            reason: `${getText('errors.insufficientParam')} ${paramName}: ${requiredValue} (${getText('errors.current')}: ${currentValue})`
                        };
                        finalResult.push(error);
                    }
                }
            }

        }
        return finalResult;
    }
    
    function executeClassChange(actor, targetClassId, force = false) {
        const targetClass = $dataClasses[targetClassId];
        const conditions = getClassConditions(targetClassId);
        
        // Consume resources / 消耗資源 / リソース消費
        if (!force) {
            if (conditions.goldCost) {
                $gameParty.loseGold(conditions.goldCost);
            }
            
            if (conditions.itemCosts) {
                for (const cost of conditions.itemCosts) {
                    const item = $dataItems[cost.id];
                    if (item) {
                        $gameParty.loseItem(item, cost.amount);
                    }
                }
            }
        }
        
        // Handle skill changes / 處理技能轉換 / スキル変更の処理
        if (!keepSkills) {
            const currentClass = actor.currentClass();
            const currentLevel = actor.level;
            
            const oldClassSkills = currentClass.learnings
                .filter(learning => learning.level <= currentLevel)
                .map(learning => learning.skillId);
            
            const newClassSkills = targetClass.learnings
                .filter(learning => learning.level <= currentLevel)
                .map(learning => learning.skillId);
            
            actor._skills = actor._skills.filter(skillId => !oldClassSkills.includes(skillId));
            
            for (const skillId of newClassSkills) {
                if (!actor._skills.includes(skillId)) {
                    actor._skills.push(skillId);
                }
            }
            
            actor._skills.sort((a, b) => a - b);
        }
        
        // Execute class change / 執行轉職 / 転職実行
        actor.changeClass(targetClassId, keepExp);
        
        // Show success message / 顯示成功訊息 / 成功メッセージ表示
        const message = getText('successMessage').replace('%1', actor.name()).replace('%2', targetClass.name);
        $gameMessage.add(message);
        
        // Update class images / 更新職業圖像 / 職業画像更新
        $gamePlayer.refresh();
    }
    
    function findClassImage(classId) {
        for (const classData of classList) {
            if (!classData || !classData.Enabled) {
                continue;
            }
            
            if (parseInt(classData.Class) === classId) {
                const picObject = {
                    picture: classData.Picture
                    // character: classData.Character,
                    // characterIndex: classData.CharacterIndex || 0,
                    // battler: classData.Battler
                };
                return picObject;
            }
        }
        return null;
    }
    
    function getSafeActor(statusWindow, index) {
        let actor = null;
        
        try {
            actor = statusWindow.actor(index);
            
            if (!actor && index >= 0 && index < $gameParty.size()) {
                const members = $gameParty.members();
                if (members && members[index]) {
                    actor = members[index];
                }
            }
            
            if (!actor && typeof $gameParty.allMembers === 'function') {
                const allMembers = $gameParty.allMembers();
                if (allMembers && allMembers[index]) {
                    actor = allMembers[index];
                }
            }
            
        } catch (error) {
            console.error('ClassChangeSystem: 獲取演員時發生錯誤:', error);
            return null;
        }
        
        return actor;
    }    

    //-----------------------------------------------------------------------------
    // Scene_ActorSelection / 角色選擇場景 / アクター選択シーン
    //-----------------------------------------------------------------------------
    
    class Scene_ActorSelection extends Scene_MenuBase {
        create() {
            super.create();
            this.createStatusWindow();
        }
        createStatusWindow() {
            const rect = this.statusWindowRect();
            // 使用專為轉職設計的狀態視窗 / Use custom status window designed for class change
            this._statusWindow = new Window_ClassChangeMenuStatus(rect);
            this._statusWindow.setHandler('ok', this.onActorOk.bind(this));
            this._statusWindow.setHandler('cancel', this.popScene.bind(this));
            
            if ($gameParty.size() === 0) {
                console.warn('ClassChangeSystem: 隊伍中沒有可用的成員');
                this.popScene();
                return;
            }
            
            this.addWindow(this._statusWindow);
            
            if ($gameParty.menuActor()) {
                this._statusWindow.selectLast();
            } else {
                this._statusWindow.select(0);
            }
            this._statusWindow.activate();
        }
        
        statusWindowRect() {
            const wy = this.mainAreaTop();
            const ww = Graphics.boxWidth;
            const wh = Graphics.boxHeight - this.mainAreaTop();
            const wx = 0;
            return new Rectangle(wx, wy, ww, wh);
        }
        
        onActorOk() {
            const index = this._statusWindow.index();
            const actor = getSafeActor(this._statusWindow, index);
            
            if (!actor) {
                console.warn('ClassChangeSystem: 無法獲取有效的對象');
                SoundManager.playBuzzer();
                return;
            }
            
            selectedActor = actor;
            SceneManager.push(Scene_ClassChange);
        }
    }
    
    //-----------------------------------------------------------------------------
    // Window_ClassChangeMenuStatus / 轉職菜單狀態視窗 / クラスチェンジメニューステータスウィンドウ
    //-----------------------------------------------------------------------------
    
    class Window_ClassChangeMenuStatus extends Window_StatusBase {
        initialize(rect) {
            super.initialize(rect);
            this._formationMode = false;
            this._pendingIndex = -1;
            this.refresh();
        }
        
        maxItems() {
            return $gameParty.size();
        }
        
        numVisibleRows() {
            return 4;
        }
        
        itemHeight() {
            return Math.floor(this.innerHeight / this.numVisibleRows());
        }
        
        actor(index) {
            return $gameParty.members()[index];
        }
        
        drawItem(index) {
            this.drawPendingItemBackground(index);
            this.drawItemImage(index);
            this.drawItemStatus(index);
        }
        
        drawPendingItemBackground(index) {
            if (index === this._pendingIndex) {
                const rect = this.itemRect(index);
                const color = ColorManager.pendingColor();
                this.changePaintOpacity(false);
                this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
                this.changePaintOpacity(true);
            }
        }
        
        drawItemImage(index) {
            const actor = this.actor(index);
            const rect = this.itemRect(index);
            const width = ImageManager.faceWidth;
            const height = rect.height - 2;
            this.changePaintOpacity(actor.isBattleMember());
            this.drawActorFace(actor, rect.x + 1, rect.y + 1, width, height);
            this.changePaintOpacity(true);
        }
        
        drawItemStatus(index) {
            const actor = this.actor(index);
            const rect = this.itemRect(index);
            const x = rect.x + 162;
            const y = rect.y + rect.height / 2 - this.lineHeight() * 1.5;
            const width = rect.width - x - this.itemPadding();
            
            // 為轉職專用設計：顯示當前職業資訊而非 HP/MP / For class change: show current class info instead of HP/MP
            this.drawActorClassStatus(actor, x, y, width);
        }
        
        // 新增：繪製職業狀態的方法 / New: Method to draw class status
        drawActorClassStatus(actor, x, y, width) {
            const lineHeight = this.lineHeight();
            const currentClass = actor.currentClass();
            
            const classText = getText("classText");
            const levelText = TextManager.basic(0);
            const expText = TextManager.basic(8);

            const actorExpText = actor.isMaxLevel() ? '-------' : actor.nextRequiredExp();

            // 第一行：當前職業 / First line: Current class
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(classText + ':', x, y, width / 2);
            this.changeTextColor(ColorManager.normalColor());
            this.drawText(currentClass.name, x + width / 2, y, width / 2);
            
            // 第二行：等級 / Second line: Level
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(levelText + ':', x, y + lineHeight, width / 2);
            this.changeTextColor(ColorManager.normalColor());
            this.drawText(actor.level, x + width / 2, y + lineHeight, width / 2);
            
            // 第三行：經驗值 / Third line: Experience
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(expText + ':', x, y + lineHeight * 2, width / 2);
            this.changeTextColor(ColorManager.normalColor());
            this.drawText(actorExpText, x + width / 2, y + lineHeight * 2, width / 2);
            
            this.resetTextColor();
        }
        
        processOk() {
            Window_StatusBase.prototype.processOk.call(this);
            const actor = this.actor(this.index());
            $gameParty.setMenuActor(actor);
        }
        
        isCurrentItemEnabled() {
            if (this._formationMode) {
                const actor = this.actor(this.index());
                return actor && actor.isFormationChangeOk();
            } else {
                return true;
            }
        }
        
        selectLast() {
            this.smoothSelect($gameParty.menuActor().index() || 0);
        }
        
        formationMode() {
            return this._formationMode;
        }
        
        setFormationMode(formationMode) {
            this._formationMode = formationMode;
        }
        
        pendingIndex() {
            return this._pendingIndex;
        }
        
        setPendingIndex(index) {
            const lastPendingIndex = this._pendingIndex;
            this._pendingIndex = index;
            this.redrawItem(this._pendingIndex);
            this.redrawItem(lastPendingIndex);
        }
    }
    
    //-----------------------------------------------------------------------------
    // Scene_ClassChange / 轉職場景 / 転職シーン
    //-----------------------------------------------------------------------------
    
    class Scene_ClassChange extends Scene_MenuBase {
        create() {
            super.create();
            this._exitAfterMessage = false;
            this._waitCount = 0;
            this.createClassListWindow();
            this.createClassInfoWindow();
            this.createConfirmationWindow();
        }
        
        update() {
            super.update();
            
            if (this._exitAfterMessage) {
                if (this._waitCount > 0) {
                    this._waitCount--;
                } else {
                    SceneManager.goto(Scene_Map);
                    this._exitAfterMessage = false;
                    return;
                }
            }
            
            // Handle custom input keys / 處理自定義輸入按鍵 / カスタム入力キーの処理
            this.handleCustomInput();
        }
        
        handleCustomInput() {
            // Tab switching (left/right arrows) / 頁籤切換 (左右箭頭) / タブ切り替え (左右矢印)
            if (this._tabWindow) {
                if (Input.isTriggered('left')) {
                    const currentIndex = this._tabWindow.index();
                    const newIndex = currentIndex > 0 ? currentIndex - 1 : this._tabWindow.maxItems() - 1;
                    this._tabWindow.select(newIndex);
                    SoundManager.playCursor();
                } else if (Input.isTriggered('right')) {
                    const currentIndex = this._tabWindow.index();
                    const newIndex = currentIndex < this._tabWindow.maxItems() - 1 ? currentIndex + 1 : 0;
                    this._tabWindow.select(newIndex);
                    SoundManager.playCursor();
                }
            }
            
            // Info window scrolling (R/F keys) / 資訊窗口捲動 (R/F 鍵) / 情報ウィンドウスクロール (R/F キー)
            if (this._classInfoWindow && this._classInfoWindow.active) {
                if (Input.isTriggered('infoUp')) {
                    this._classInfoWindow.scrollUp();
                    SoundManager.playCursor();
                } else if (Input.isTriggered('infoDown')) {
                    this._classInfoWindow.scrollDown();
                    SoundManager.playCursor();
                }
            }
            
            // Actor switching (T/E keys) / 角色切換 (T/E 鍵) / アクター切り替え (T/E キー)
            if (Input.isTriggered('actorLeft') || Input.isTriggered('actorRight')) {
                this.switchActor(Input.isTriggered('actorRight'));
            }
        }
        
        switchActor(isNext) {
            const currentActorId = selectedActor ? selectedActor.actorId() : 1;
            const partyMembers = $gameParty.allMembers();
            
            if (partyMembers.length <= 1) return;
            
            let currentIndex = partyMembers.findIndex(actor => actor.actorId() === currentActorId);
            if (currentIndex === -1) currentIndex = 0;
            
            const newIndex = isNext 
                ? (currentIndex + 1) % partyMembers.length
                : (currentIndex - 1 + partyMembers.length) % partyMembers.length;
            
            selectedActor = partyMembers[newIndex];
            this._classListWindow.setActor(selectedActor);
            this._classListWindow.select(0);
            this._classListWindow.activate();
            
            // Update info window with new actor / 用新角色更新資訊窗口 / 新しいアクターで情報ウィンドウを更新
            if (this._classListWindow._data.length > 0) {
                const firstClass = this._classListWindow._data[0];
                this._classInfoWindow.setClass(firstClass, selectedActor);
                this._classInfoWindow.setPreviewClass(firstClass);
            }else{
                this._classInfoWindow.setClass(null, selectedActor);
                this._classInfoWindow.setPreviewClass(null);
            }
            
            SoundManager.playCursor();
        }
        
        createClassListWindow() {
            const rect = this.classListWindowRect();
            this._classListWindow = new Window_ClassList(rect);
            this._classListWindow.setHandler('ok', this.onClassOk.bind(this));
            this._classListWindow.setHandler('cancel', this.onClassCancel.bind(this));
            this._classListWindow.setActor(selectedActor);
            this.addWindow(this._classListWindow);
            this._classListWindow.activate();
        }
        
        createClassInfoWindow() {
            // Create tab window / 創建頁籤窗口 / タブウィンドウを作成
            const tabRect = this.tabWindowRect();
            this._tabWindow = new Window_ClassTabs(tabRect);
            this._tabWindow.setHandler('ok', this.onTabOk.bind(this));
            this._tabWindow.setHandler('cancel', this.onTabCancel.bind(this));
            this.addWindow(this._tabWindow);
            
            // Create info window / 創建信息窗口 / 情報ウィンドウを作成
            const infoRect = this.classInfoWindowRect();
            this._classInfoWindow = new Window_ClassInfo(infoRect);
            this._classListWindow.setInfoWindow(this._classInfoWindow);
            this._tabWindow.setInfoWindow(this._classInfoWindow);
            this.addWindow(this._classInfoWindow);
            this.initializePreview();
            
        }
        
        tabWindowRect() {
            const wx = classListWidth;
            const wy = 0;
            const ww = Graphics.boxWidth - classListWidth;
            const wh = 72; // Tab height / 頁籤高度 / タブの高さ
            return new Rectangle(wx, wy, ww, wh);
        }
        
        onTabOk() {
            // Switch to info window for scrolling / 切換到信息窗口進行滾動 / スクロール用に情報ウィンドウに切り替え
            this._tabWindow.deactivate();
            this._classInfoWindow.activate();
        }
        
        onTabCancel() {
            // Return to class list / 返回職業列表 / 職業リストに戻る
            this._tabWindow.deactivate();
            this._classListWindow.activate();
        }
        
        initializePreview() {
            const firstClass = this._classListWindow._data[0];
            const actor = this._classListWindow._actor;
            if (this._classListWindow._data.length > 0) {
                this._classInfoWindow.setClass(firstClass, actor);
                this._classInfoWindow.setPreviewClass(firstClass);
                this._classListWindow.select(0);
            }else{
                this._classInfoWindow.setClass(null, actor);
                this._classInfoWindow.setPreviewClass(null);
            }
        }
        
        createConfirmationWindow() {
            const rect = this.confirmationWindowRect();
            this._confirmationWindow = new Window_Confirmation(rect);
            this._confirmationWindow.setHandler('ok', this.onConfirmOk.bind(this));
            this._confirmationWindow.setHandler('cancel', this.onConfirmCancel.bind(this));
            this._confirmationWindow.hide();
            this.addWindow(this._confirmationWindow);
        }
        
        classListWindowRect() {
            const wx = 0;
            const wy = 0;
            const ww = classListWidth;
            const wh = Graphics.boxHeight; //底部拉到底占滿剩下的
            return new Rectangle(wx, wy, ww, wh);
            
        }
        
        classInfoWindowRect() {
            const wx = classListWidth;
            const wy = 72; // Add tab height / 添加頁籤高度 / タブの高さを追加
            const ww = Graphics.boxWidth - classListWidth;
            const wh = Graphics.boxHeight - 72; // Subtract tab height / 減去頁籤高度 / タブの高さを減算
            return new Rectangle(wx, wy, ww, wh);
        }
        
        confirmationWindowRect() {
            const ww = 400;
            const wh = 250;
            const wx = (Graphics.boxWidth - ww) / 2;
            const wy = (Graphics.boxHeight - wh) / 2;
            return new Rectangle(wx, wy, ww, wh);
        }
        
        onClassOk() {
            selectedClass = this._classListWindow.item();
            if (selectedClass) {
                const conditions = checkClassChangeConditions(selectedActor, selectedClass.id);
                const checkResult = checkConditionResult(selectedActor, selectedClass.id,conditions);
                if (checkResult || isForceMode) {
                    this._confirmationWindow.setClassData(selectedActor, selectedClass, conditions);
                    this._confirmationWindow.show();
                    this._confirmationWindow.activate();
                    this._classListWindow.deactivate();
                } else {
                    $gameMessage.add(conditions[0].reason);
                }
            }
        }
        
        onClassCancel() {
            if (selectedActor) {
                this.popScene();
            } else {
                SceneManager.goto(Scene_ActorSelection);
            }
        }
        
        onConfirmOk() {
            executeClassChange(selectedActor, selectedClass.id, isForceMode);
            
            selectedActor = null;
            selectedClass = null;
            isForceMode = false;
            
            this._waitCount = 30;
            this._exitAfterMessage = true;
        }
        
        onConfirmCancel() {
            this._confirmationWindow.hide();
            this._classListWindow.activate();
        }
    }  
  
    //-----------------------------------------------------------------------------
    // Window_ClassTabs / 職業頁籤窗口 / 職業タブウィンドウ
    //-----------------------------------------------------------------------------
    
    class Window_ClassTabs extends Window_Selectable {
        initialize(rect) {
            super.initialize(rect);
            this._infoWindow = null;
            this._tabNames = [
                getText('tabs.classIntro'),
                getText('tabs.conditions'), 
                getText('tabs.statsComparison'),
                getText('tabs.skillChanges')
            ];
            this.refresh();
            this.select(0);
        }
        
        setInfoWindow(window) {
            this._infoWindow = window;
        }
        
        maxItems() {
            return this._tabNames?.length;
        }
        
        maxCols() {
            return this._tabNames?.length;
        }
        
        itemWidth() {
            return Math.floor(this.innerWidth / this.maxCols());
        }
        
        itemHeight() {
            return this.innerHeight;
        }
        
        drawItem(index) {
            const rect = this.itemRect(index);
            const isSelected = index === this.index();
            
            // Draw tab background / 繪製頁籤背景 / タブ背景を描画
            if (isSelected) {
                this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, ColorManager.itemBackColor1());
            } else {
                this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, ColorManager.itemBackColor2());
            }
            
            // Draw tab text / 繪製頁籤文字 / タブテキストを描画
            this.changeTextColor(isSelected ? ColorManager.powerUpColor() : ColorManager.normalColor());
            this.drawText(this._tabNames[index], rect.x, rect.y, rect.width, 'center');
            this.resetTextColor();
        }
        
        select(index) {
            super.select(index);
            if (this._infoWindow) {
                this._infoWindow.setTabIndex(index);
            }
        }
        
        cursorUp() {
            // Disable vertical movement / 禁用垂直移動 / 垂直移動を無効化
        }
        
        cursorDown() {
            // Disable vertical movement / 禁用垂直移動 / 垂直移動を無効化
        }
        
        cursorLeft() {
            const index = this._index + 1 >= this.maxItems()? 0 : this._index + 1;  
            this.select(index);
        }
        
        cursorRight() {
            const index = this._index - 1 < 0? this.maxItems() - 1 : this._index - 1;
            this.select(index);
        }
        
        processHandling() {
            if (this.isOpenAndActive()) {
                if (this.isOkEnabled() && this.isOkTriggered()) {
                    return this.processOk();
                }
                if (this.isCancelEnabled() && this.isCancelTriggered()) {
                    return this.processCancel();
                }
                if (this.isHandled('pagedown') && Input.isTriggered('pagedown')) {
                    return this.processPagedown();
                }
                if (this.isHandled('pageup') && Input.isTriggered('pageup')) {
                    return this.processPageup();
                }
            }
        }
    }
    
    //-----------------------------------------------------------------------------
    // Window_ClassList / 職業列表窗口 / 職業リストウィンドウ
    //-----------------------------------------------------------------------------
    
    class Window_ClassList extends Window_Selectable {
        initialize(rect) {
            super.initialize(rect);
            this._actor = null;
            this._data = [];
            this._infoWindow = null;
        }
        
        setActor(actor) {
            this._actor = actor;
            this.refresh();
        }
        
        setInfoWindow(window) {
            this._infoWindow = window;
        }
        
        maxItems() {
            return this._data.length;
        }
        
        item() {
            return this._data[this.index()];
        }
        
        isCurrentItemEnabled() {
            const item = this.item();
            if (!item || !this._actor) return false;
            
            if (isForceMode) return true;
            
            const checkResult = checkConditionResult(this._actor, item.id);
            return checkResult;
        }
        
        makeItemList() {
            this._data = [];
            if (!this._actor) return;
            
            // 使用統一的條件檢查函數來收集可用職業 / Use unified condition checking function to collect available classes / 統一された条件チェック関数を使用して利用可能な職業を収集
            const availableClasses = new Set();
            
            // 檢查插件參數中定義的職業 / Check classes defined in plugin parameters / プラグインパラメータで定義された職業をチェック
            for (const classInfo of classList) {
                const classId = parseInt(classInfo.Class);
                const enabled = classInfo.Enabled === 'true';
                if (classId && $dataClasses[classId] && 
                    enabled && 
                    classId !== this._actor.currentClass().id &&
                    !this.isDuplicateClass(classInfo)) {
                    availableClasses.add(classId);
                }
            }
            
            // Convert to array and sort / 轉換為陣列並排序 / 配列に変換してソート
            this._data = Array.from(availableClasses)
                .map(id => $dataClasses[id])
                .filter(classData => classData)
                .sort((a, b) => a.id - b.id);
        }
        isDuplicateClass(item) {
            if(allowDuplicate){
                return false;
            }
            const hadClass = $gameActors._data.some(dataActor => 
                dataActor && dataActor.currentClass().id == item.Class);
            return hadClass;
        }
        
        drawItem(index) {
            const item = this._data[index];
            if (!item) return;
            
            const rect = this.itemLineRect(index);
            const enabled = this.isItemEnabled(index);
            const itemName = getClassName(this._actor,item);
            
            this.changePaintOpacity(enabled);
            this.drawText(itemName, rect.x, rect.y, rect.width);
            this.changePaintOpacity(true);
        }

        isItemEnabled(index) {
            const item = this._data[index];
            if (!item || !this._actor) return false;
            
            if (isForceMode) return true;
            
            const checkResult = checkConditionResult(this._actor, item.id);
            return checkResult;
        }
        
        refresh() {
            this.makeItemList();
            super.refresh();
        }
        
        select(index) {
            super.select(index);
            if (this._infoWindow) {
                const item = this.item();
                this._infoWindow.setClass(item, this._actor);
                this._infoWindow.setPreviewClass(item);
            }
        }
        
        // Disable horizontal movement / 禁用水平移動 / 水平移動を無効化
        cursorLeft() {
            // Disabled / 禁用 / 無効
        }
        
        cursorRight() {
            // Disabled / 禁用 / 無効
        }
        
        cursorPagedown() {
            // Disabled / 禁用 / 無効
        }
        
        cursorPageup() {
            // Disabled / 禁用 / 無効
        }
    }    
   
 //-----------------------------------------------------------------------------
    // Window_ClassInfo / 職業信息窗口 / 職業情報ウィンドウ
    //-----------------------------------------------------------------------------

    class Window_ClassInfo extends Window_Base {
            initialize(rect) {
            super.initialize(rect);
            this._class = null;
            this._actor = null;
            this._tabIndex = 0;
            this._maxTabs = 4; // 4個頁籤：職業介紹、轉職條件、能力比較、技能變化
            this._scrollY = 0;
            this._maxScrollY = 0;
            this.refresh();
        }

        setClass(classData, actor) {
            this._class = classData;
            this._actor = actor;
            this.refresh();
        }
        
        setPreviewClass(classData) {
            this._previewClass = classData;
            this.refresh();
        }
        
        setTabIndex(index) {
            this._tabIndex = index;
            this._scrollY = 0;
            this.refresh();
        }
        
        switchTab(direction) {
            this._tabIndex = (this._tabIndex + direction + this._maxTabs) % this._maxTabs;
            this._scrollY = 0;
            this.refresh();
            SoundManager.playCursor();
        }
        
        scrollContent(direction) {
            const lineHeight = this.lineHeight();
            const newScrollY = this._scrollY + direction * lineHeight;
            this._scrollY = Math.max(0, Math.min(newScrollY, this._maxScrollY));
            this.refresh();
            if (this._scrollY !== newScrollY) {
                SoundManager.playCursor();
            }
        }
        
        calculateMaxScroll(contentHeight) {
            // No tab height offset needed since tabs are handled by Window_ClassTabs / 不需要頁籤高度偏移，因為頁籤由 Window_ClassTabs 處理 / タブは Window_ClassTabs で処理されるためタブの高さオフセットは不要
            const availableHeight = this.innerHeight;
            this._maxScrollY = Math.max(0, contentHeight - availableHeight);
        }
        
        // Implement scrolling methods using Scrollable API / 使用 Scrollable API 實現滾動方法 / Scrollable API を使用してスクロールメソッドを実装
        scrollUp() {
            if (this.smoothScrollUp) {
                this.smoothScrollUp(1);
            } else {
                // Fallback for manual scrolling / 手動滾動的備用方案 / 手動スクロールのフォールバック
                const lineHeight = this.lineHeight();
                this._scrollY = Math.max(0, this._scrollY - lineHeight);
                this.refresh();
            }
        }
        
        scrollDown() {
            if (this.smoothScrollDown) {
                this.smoothScrollDown(1);
            } else {
                // Fallback for manual scrolling / 手動滾動的備用方案 / 手動スクロールのフォールバック
                const lineHeight = this.lineHeight();
                this._scrollY = Math.min(this._maxScrollY, this._scrollY + lineHeight);
                this.refresh();
            }
        }
        
        // Override itemHeight for Scrollable API / 為 Scrollable API 覆蓋 itemHeight / Scrollable API のために itemHeight をオーバーライド
        itemHeight() {
            return this.lineHeight();
        }
        
        refresh() {
            this.contents.clear();
            // Tab content only, no headers (handled by Window_ClassTabs)
            // 頁籤順序：職業介紹、轉職條件、能力比較、技能變化
            if (this._tabIndex === 0) {
                this.drawClassIntroTab();
            } else if (this._tabIndex === 1) {
                this.drawConditionsTab();
            } else if (this._tabIndex === 2) {
                this.drawStatsComparisonTab();
            } else if (this._tabIndex === 3) {
                this.drawSkillChangeTab();
            }
        }

        // 職業介紹頁籤
        drawClassIntroTab() {
            let y = 0;
            let contentHeight = 0;
            this.drawOperationHint(y - this._scrollY);
            y += this.lineHeight();
            contentHeight += this.lineHeight();
            const targetClass = this._previewClass;
            const lineHeight = this.lineHeight();
            if (!targetClass) {
                this.changeTextColor(ColorManager.systemColor());
                this.drawText(getText('selectClassForIntro'), 0, y, this.innerWidth, 'center');
                this.resetTextColor();
                y += lineHeight;
                contentHeight += lineHeight;
            }
            let faceImageHeight = 0;
            let faceImageWidth = 0;
            if(this._actor && this._actor.faceName()){
                const maxWidth = Math.min(this.innerWidth - 40, 144);
                const maxHeight = 144;
                const scale = 1;
                faceImageWidth = maxWidth * scale;
                faceImageHeight = maxHeight * scale;
                const imageX = (this.innerWidth - faceImageWidth)/2;
                this.drawFace(this._actor.faceName(), this._actor.faceIndex(), imageX, y - this._scrollY, faceImageWidth, faceImageHeight);
                y += faceImageHeight + 20;
                contentHeight += faceImageHeight + 20;
                this.drawText(this._actor.name(), 0, y - this._scrollY, this.innerWidth, 'center');
                y += lineHeight;
                contentHeight += lineHeight;
            }
            if(!targetClass){
                return;
            }
            // 顯示職業描述

            const checkResult = checkConditionResult(this._actor, targetClass.id);


            const targetClassName = getClassName(this._actor,targetClass,checkResult);
            // 顯示職業名稱
            this.changeTextColor(ColorManager.systemColor());
            this.contents.fontSize = 28;
            this.drawText(`${this._actor?.currentClass().name}→${targetClassName}`, 0, y - this._scrollY, this.innerWidth, 'center');
            this.contents.fontSize = $gameSystem.mainFontSize();
            this.resetTextColor();
            y += lineHeight * 1.5;
            contentHeight += lineHeight * 1.5;
            
            if(!checkResult && hideUnchangeableClassDescription){
                return;
            }
            // 使用新的圖片查找邏輯 / Use new image finding logic / 新しい画像検索ロジックを使用
            const classImages = findClassImage(targetClass.id, this._actor);
            let imageHeight = 0;
            let imageWidth = 0;
            if (classImages) {
                if (classImages.picture) {
                    let bitmap = classBitmaps.find(b => b.pictureName === classImages.picture)?.bitmap;
                    if(!bitmap){
                        bitmap = ImageManager.loadPicture(classImages.picture);
                        if(bitmap){
                            classBitmaps.push({
                                pictureName: classImages.picture,
                                bitmap: bitmap
                            });
                        }
                    }
                    try {
                        if (bitmap && bitmap.isReady()) {
                            const maxWidth = Math.min(this.innerWidth - 40, 196);
                            const maxHeight = 196;
                            const scale = Math.min(maxWidth / bitmap.width, maxHeight / bitmap.height, 1);
                            imageWidth = bitmap.width * scale;
                            imageHeight = bitmap.height * scale;
                            const imageX = this.innerWidth - imageWidth;
                            
                            this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 
                                             imageX, y - this._scrollY, imageWidth, imageHeight);
                        }
                    } catch (e) {
                        console.warn('Failed to load class picture:', classImages.picture);
                    }
                }
            }
            const conditions = getClassConditions(targetClass.id);
            const description = conditions.Description;
            if (description) {
                this.changeTextColor(ColorManager.systemColor());
                this.drawText(getText('classDescription'), 0, y - this._scrollY, this.innerWidth - imageWidth, 'center');
                this.resetTextColor();
                y += lineHeight;
                contentHeight += lineHeight;
                
                const descriptionY = this.drawTextWithWordWrap(description, 0, y - this._scrollY, this.innerWidth - imageWidth - 10, this.innerHeight - y);
                y = descriptionY + this._scrollY + lineHeight;
                contentHeight = descriptionY + this._scrollY + lineHeight;
            } else {
                // 如果沒有描述，顯示預設訊息
                this.changeTextColor(ColorManager.systemColor());
                this.drawText(getText('noClassDescription'), 0, y - this._scrollY, this.innerWidth - imageWidth, 'center');
                this.resetTextColor();
                y += lineHeight * 2;
                contentHeight += lineHeight * 2;
            }
        
            this.calculateMaxScroll(contentHeight);
        }
        
        drawOperationHint(y){
            this.changeTextColor(ColorManager.systemColor());
            this.contents.fontSize = 14;
            this.drawText(getText('operationHint'), 0, y, this.innerWidth, 'right');
            this.contents.fontSize = $gameSystem.mainFontSize();
            this.resetTextColor();
        }
        drawConditionsTab() {
            let y = 0;
            let contentHeight = 0;
            this.drawOperationHint(y - this._scrollY);
            y += this.lineHeight();
            contentHeight += this.lineHeight();
            if (!this._actor) {
                this.changeTextColor(ColorManager.systemColor());
                this.drawText(getText('selectCharacterFirst'), 0, y - this._scrollY, this.innerWidth, 'center');
                this.resetTextColor();
                return;
            }
            
            const targetClass = this._previewClass;
            if (!targetClass) {
                this.changeTextColor(ColorManager.systemColor());
                this.drawText(getText('selectClassForConditions'), 0, y - this._scrollY, this.innerWidth, 'center');
                this.resetTextColor();
                return;
            }
            
            const lineHeight = this.lineHeight();
            
            const targetClassName = getClassName(this._actor,targetClass);
            // Display class name / 顯示職業名稱 / 職業名を表示
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(getText('targetClass'), 0, y - this._scrollY, 200);
            this.resetTextColor();
            this.drawText(targetClassName, 200, y - this._scrollY, 200);
            y += lineHeight;
            
            // Display change conditions / 顯示轉職條件 / 転職条件を表示
            const conditions = getClassConditions(targetClass.id);
            const check = checkClassChangeConditions(this._actor, targetClass.id);
            const checkResult = checkConditionResult(this._actor, targetClass.id);
            y += lineHeight / 2;
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(getText('changeConditions'), 0, y - this._scrollY, 200);
            this.resetTextColor();
            y += lineHeight;
            if(isForceMode){
                this.changeTextColor(ColorManager.powerUpColor());
                this.drawText(getText('forceMode'), 20, y - this._scrollY, this.innerWidth - 20);
                return;
            }else if (checkResult) {
                this.changeTextColor(ColorManager.powerUpColor());
                this.drawText(getText('allConditionsMet'), 20, y - this._scrollY, this.innerWidth - 20);
                return;
            } 
            for (let index = 0; index < check.length; index++) {
                const reason = check[index].reason;
                this.changeTextColor(ColorManager.powerDownColor());
                this.drawText('✗ ' + reason, 20, y - this._scrollY, this.innerWidth - 20);
                this.resetTextColor();
                y += lineHeight;
            }
            y += lineHeight;
            // Display resource costs / 顯示資源消耗 / リソースコストを表示
            if (conditions.goldCost || conditions.itemCosts) {
                this.changeTextColor(ColorManager.systemColor());
                this.drawText(getText('changeCost'), 0, y - this._scrollY, 200);
                this.resetTextColor();
                y += lineHeight;
                
                if (conditions.goldCost) {
                    const canAfford = $gameParty.gold() >= conditions.goldCost;
                    this.changeTextColor(canAfford ? ColorManager.normalColor() : ColorManager.powerDownColor());
                    this.drawText(getText('goldCost') + ' ' + conditions.goldCost, 20, y - this._scrollY, 300);
                    this.resetTextColor();
                    y += lineHeight;
                }
                
                if (conditions.itemCosts) {
                    for (const cost of conditions.itemCosts) {
                        const item = $dataItems[cost.id];
                        if (item) {
                            const hasEnough = $gameParty.numItems(item) >= cost.amount;
                            this.changeTextColor(hasEnough ? ColorManager.normalColor() : ColorManager.powerDownColor());
                            this.drawText(`${item.name}: ${cost.amount}`, 20, y - this._scrollY, 300);
                            this.resetTextColor();
                            y += lineHeight;
                        }
                    }
                }
            }
            
            contentHeight = y;
            this.calculateMaxScroll(contentHeight);
        }
        
        drawStatsComparisonTab() {
            let y = 0;
            let contentHeight = 0;
            this.drawOperationHint(y - this._scrollY);
            y += this.lineHeight();
            contentHeight += this.lineHeight();
            if (!this._actor) {
                this.changeTextColor(ColorManager.systemColor());
                this.drawText(getText('selectCharacterFirst'), 0, y - this._scrollY, this.innerWidth, 'center');
                this.resetTextColor();
                return;
            }
            
            const compareClass = this._previewClass;
            if (!compareClass) {
                this.changeTextColor(ColorManager.systemColor());
                this.drawText(getText('selectClassForStats'), 0, y - this._scrollY, this.innerWidth, 'center');
                this.resetTextColor();
                return;
            }
            
            
            const lineHeight = this.lineHeight() - 2;
           
            
            // Display class transition / 顯示職業轉換 / 職業転換を表示
            this.changeTextColor(ColorManager.systemColor());
            const oldClassName = this._actor.currentClass().name;
            const newClassName = getClassName(this._actor,compareClass);
            this.drawText(`${oldClassName} → ${newClassName}`, 0, y - this._scrollY, this.innerWidth, 'center');
            this.resetTextColor();
            y += lineHeight;
            contentHeight += lineHeight;
            
            // Display level change info / 顯示等級變化信息 / レベル変化情報を表示
            if (!keepExp) {
                this.changeTextColor(ColorManager.powerDownColor());
                this.drawText(`Level: Lv.${this._actor.level} → Lv.1 (Reset)`, 0, y - this._scrollY, this.innerWidth, 'center');
                this.resetTextColor();
                y += lineHeight;
                contentHeight += lineHeight;
            }
            y += 8;
            contentHeight += 8;
            
            // Create temporary actor for preview / 創建臨時演員來預覽 / プレビュー用の一時アクターを作成
            let tempActor;
            try {
                tempActor = JsonEx.makeDeepCopy(this._actor);
                
                if (!keepSkills) {
                    const currentClass = tempActor.currentClass();
                    const currentLevel = tempActor.level;
                    
                    const oldClassSkills = currentClass.learnings
                        .filter(learning => learning.level <= currentLevel)
                        .map(learning => learning.skillId);
                    
                    const newClassSkills = compareClass.learnings
                        .filter(learning => learning.level <= currentLevel)
                        .map(learning => learning.skillId);
                    
                    tempActor._skills = tempActor._skills.filter(skillId => !oldClassSkills.includes(skillId));
                    
                    for (const skillId of newClassSkills) {
                        if (!tempActor._skills.includes(skillId)) {
                            tempActor._skills.push(skillId);
                        }
                    }
                    
                    tempActor._skills.sort((a, b) => a - b);
                }
                
                tempActor.changeClass(compareClass.id, keepExp);
            } catch (error) {
                this.changeTextColor(ColorManager.powerDownColor());
                this.drawText(getText('errors.cannotPreviewStats'), 0, y, this.innerWidth, 'center');
                this.resetTextColor();
                return;
            }
            
            if (!tempActor) {
                this.changeTextColor(ColorManager.powerDownColor());
                this.drawText(getText('errors.cannotPreviewStats'), 0, y, this.innerWidth, 'center');
                this.resetTextColor();
                return;
            }
            
            // Stats comparison title / 能力值比較標題 / ステータス比較タイトル
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(getText('baseStatsChange'), 0, y, this.innerWidth, 'center');
            this.resetTextColor();
            y += lineHeight;
            
            // Calculate table center position / 計算表格居中位置 / テーブル中央位置を計算
            const tableWidth = 360;
            const tableX = (this.innerWidth - tableWidth) / 2;
            const columnSpace = 100;
            
            // Draw table headers / 繪製表頭 / テーブルヘッダーを描画
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(getText('statHeaders.item'), tableX, y, 70, 'center');
            this.drawText(getText('statHeaders.before'), tableX + columnSpace, y, 70, 'center');
            this.drawText(getText('statHeaders.after'), tableX + columnSpace * 2, y, 70, 'center');
            this.drawText(getText('statHeaders.change'), tableX + columnSpace * 3, y, 70, 'center');
            this.resetTextColor();
            y += lineHeight;
            
            // Draw separator line / 繪製分隔線 / 区切り線を描画
            this.contents.fillRect(tableX, y - 2, tableWidth, 2, ColorManager.systemColor());
            y += 2;
            const tempActorBefore = JsonEx.makeDeepCopy(this._actor);
            
            // Basic parameter comparison / 基本參數比較 / 基本パラメータ比較
            for (let i = -1; i < 8; i++) {
                const parameterName = i === -1 ? TextManager.basic(0) : TextManager.param(i);
                const currentValue = i === -1 ? tempActorBefore.level : this.actorParamWithoutEquip(i,tempActorBefore);
                const newValue = i === -1 ? tempActor.level : this.actorParamWithoutEquip(i,tempActor);
                const difference = newValue - currentValue;
                // Parameter name / 參數名稱 / パラメータ名
                this.drawText(parameterName, tableX, y, 70, 'center');
                
                // Current value / 當前數值 / 現在の値
                this.drawText(currentValue.toString(), tableX + columnSpace, y, 70, 'center');
                
                // New value / 轉職後數值 / 転職後の値
                this.drawText(newValue.toString(), tableX + columnSpace * 2, y, 70, 'center');
                
                // Change amount / 變化量 / 変化量
                if (difference > 0) {
                    this.changeTextColor(ColorManager.powerUpColor());
                    this.drawText(`+${difference}`, tableX + columnSpace * 3, y, 70, 'center');
                } else if (difference < 0) {
                    this.changeTextColor(ColorManager.powerDownColor());
                    this.drawText(difference.toString(), tableX + columnSpace * 3, y, 70, 'center');
                } else {
                    this.resetTextColor();
                    this.drawText('0', tableX + columnSpace * 3, y, 70, 'center');
                }
                this.resetTextColor();
                
                y += lineHeight;
            }
            
            y += 4;
            this.calculateMaxScroll(contentHeight);
        }
        currentParam(actor,paramId){
            if(!actor){
                actor = this._actor;
            }
            switch(paramId){
                case 0:
                    return actor.mhp;
                case 1:
                    return actor.mmp;
                case 2:
                    return actor.atk;
                case 3:
                    return actor.def;
                case 4:
                    return actor.mat;
                case 5:
                    return actor.mdf;
                case 6:
                    return actor.agi;
                case 7:
                    return actor.luk;
            }
        }
        actorParamWithoutEquip(paramId,actor){
            if(!actor){
                actor = JsonEx.makeDeepCopy(this._actor);
            }
            actor.clearEquipments();
            const currentTotalValue = this.currentParam(actor,paramId);
            return currentTotalValue;
        }
        drawSkillChangeTab() {
            let y = 0;
            let contentHeight = 0;
            this.drawOperationHint(y - this._scrollY);
            y += this.lineHeight();
            contentHeight += this.lineHeight();
            if (!this._actor) {
                this.changeTextColor(ColorManager.systemColor());
                this.drawText(getText('selectCharacterFirst'), 0, y, this.innerWidth, 'center');
                this.resetTextColor();
                return;
            }
            
            const compareClass = this._previewClass;
                        
            if (!compareClass) {
                this.changeTextColor(ColorManager.systemColor());
                this.drawText(getText('selectClassForSkills'), 0, y, this.innerWidth, 'center');
                this.resetTextColor();
                return;
            }
            

            const lineHeight = this.lineHeight() - 2;
            
            // Get current and new skills / 獲取當前技能和轉職後技能 / 現在のスキルと転職後のスキルを取得
            const currentSkills = [...this._actor._skills];
            let newSkills = [];
            let removedSkills = [];
            let addedSkills = [];
            
            if (keepSkills) {
                const compareClassLevel = keepExp ? this._actor.level : 1;
                const newClassSkills = compareClass.learnings
                    .filter(learning => learning.level <= compareClassLevel)
                    .map(learning => learning.skillId);
                
                addedSkills = newClassSkills.filter(skillId => !currentSkills.includes(skillId));
                removedSkills = [];
            } else {
                const currentClass = this._actor.currentClass();
                const currentLevel = this._actor.level;
                
                const oldClassSkills = currentClass.learnings
                    .filter(learning => learning.level <= currentLevel)
                    .map(learning => learning.skillId);
                
                const compareClassLevel = keepExp ? currentLevel : 1;
                const newClassSkills = compareClass.learnings
                    .filter(learning => learning.level <= compareClassLevel)
                    .map(learning => learning.skillId);
                
                const nonClassSkills = currentSkills.filter(skillId => !oldClassSkills.includes(skillId));
                newSkills = [...new Set([...nonClassSkills, ...newClassSkills])].sort((a, b) => a - b);
                
                removedSkills = currentSkills.filter(skillId => !newSkills.includes(skillId));
                addedSkills = newSkills.filter(skillId => !currentSkills.includes(skillId));
            }
            
            // Display title / 顯示標題 / タイトルを表示
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(getText('skillChangePreview'), 0, y, this.innerWidth, 'center');
            this.resetTextColor();
            y += lineHeight + 8;
            contentHeight += lineHeight + 8;
            
            // Display removed skills / 顯示被移除的技能 / 削除されるスキルを表示
            if (removedSkills.length > 0) {
                this.changeTextColor(ColorManager.powerDownColor());
                this.drawText(getText('skillsLost'), 20, y, this.innerWidth);
                this.resetTextColor();
                y += lineHeight;
                contentHeight += lineHeight;
                
                for (const skillId of removedSkills) {
                    const skill = $dataSkills[skillId];
                    if (skill) {
                        this.changeTextColor(ColorManager.powerDownColor());
                        this.drawIcon(skill.iconIndex, 40, y - this._scrollY);
                        this.drawText(`- ${skill.name}`, 40 + 36, y, this.innerWidth - 76);
                        this.resetTextColor();
                        y += lineHeight;
                        contentHeight += lineHeight;
                    }
                }
                y += lineHeight / 2;
                contentHeight += lineHeight / 2;
            }
            
            // Display added skills / 顯示新增的技能 / 追加されるスキルを表示
            if (addedSkills.length > 0) {
                this.changeTextColor(ColorManager.powerUpColor());
                this.drawText(getText('skillsGained'), 20, y, this.innerWidth);
                this.resetTextColor();
                y += lineHeight;
                contentHeight += lineHeight;
                
                for (const skillId of addedSkills) {
                    const skill = $dataSkills[skillId];
                    if (skill) {
                        this.changeTextColor(ColorManager.powerUpColor());
                        this.drawIcon(skill.iconIndex, 40, y - this._scrollY);
                        this.drawText(`+ ${skill.name}`, 40 + 36, y, this.innerWidth - 76);
                        this.resetTextColor();
                        y += lineHeight;
                        contentHeight += lineHeight;
                    }
                }
                y += lineHeight / 2;
                contentHeight += lineHeight / 2;
            }
            
            // If no skill changes / 如果沒有技能變化 / スキル変化がない場合
            if (removedSkills.length === 0 && addedSkills.length === 0) {
                this.changeTextColor(ColorManager.systemColor());
                if (keepSkills) {
                    this.drawText(getText('noNewSkills'), 0, y, this.innerWidth, 'center');
                } else {
                    this.drawText(getText('noSkillChanges'), 0, y, this.innerWidth, 'center');
                }
                this.resetTextColor();
                contentHeight += lineHeight;
            }
            
            this.calculateMaxScroll(contentHeight);
        }
        
        drawTextWithWordWrap(text, x, y, maxWidth, maxHeight) {
            if (!text) return y;
            
            const lineHeight = this.lineHeight();
            let currentY = y;
            let currentLineText = '';
            let words = text.split('');
            let testText = '';
            
            for (let i = 0; i < words.length; i++) {
                const char = words[i];
                testText = currentLineText + char;
                
                const textWidth = this.contents.measureTextWidth(testText);
                
                if (char === '\n' || textWidth > maxWidth) {
                    if (currentLineText.trim()) {
                        this.contents.drawText(currentLineText, x, currentY, maxWidth, lineHeight, 'left');
                        currentY += lineHeight;
                    }
                    
                    if (char === '\n') {
                        currentLineText = '';
                    } else {
                        currentLineText = char;
                    }
                } else {
                    currentLineText = testText;
                }
            }
            
            if (currentLineText.trim()) {
                this.contents.drawText(currentLineText, x, currentY, maxWidth, lineHeight, 'left');
                currentY += lineHeight;
            }
            
            return currentY;
        }
    }    

    //-----------------------------------------------------------------------------
    // Window_Confirmation / 確認窗口 / 確認ウィンドウ
    //-----------------------------------------------------------------------------
    
    class Window_Confirmation extends Window_Command {
        initialize(rect) {
            super.initialize(rect);
            this._actor = null;
            this._class = null;
            this._conditions = null;
        }
        
        setClassData(actor, classData, conditions) {
            this._actor = actor;
            this._class = classData;
            this._conditions = conditions;
            this.refresh();
        }
        
        makeCommandList() {
            this.addCommand(getText('confirmChange'), 'ok');
            this.addCommand(getText('cancel'), 'cancel');
        }
        
        drawAllItems() {
            if (!this._class || !this._actor) return;
            
            let y = 0;
            const lineHeight = this.lineHeight();
            
            // Confirmation message / 確認訊息 / 確認メッセージ
            this.drawText(getText('confirmMessage'), 0, y, this.innerWidth, 'center');
            y += lineHeight * 2;
            
            // Display resource costs / 顯示將要消耗的資源 / 消費されるリソースを表示
            let hasAnyCosts = false;
            
            if (this._conditions) {
                if (this._conditions.goldCost) {
                    this.drawText(`${getText('goldCost')} -${this._conditions.goldCost}`, 0, y, this.innerWidth);
                    y += lineHeight;
                    hasAnyCosts = true;
                }
                
                if (this._conditions.itemCosts) {
                    for (const cost of this._conditions.itemCosts) {
                        const item = $dataItems[cost.id];
                        if (item) {
                            this.drawText(`${item.name}: -${cost.amount}`, 0, y, this.innerWidth);
                            y += lineHeight;
                            hasAnyCosts = true;
                        }
                    }
                }
            }
            
            if (!hasAnyCosts) {
                y += lineHeight;
            }
            
            y += lineHeight / 2;
            this._commandAreaTop = y;
            
            super.drawAllItems();
        }
        
        itemRect(index) {
            const rect = Window_Command.prototype.itemRect.call(this, index);
            if (this._commandAreaTop) {
                rect.y += this._commandAreaTop;
            }
            return rect;
        }
    }

    //-----------------------------------------------------------------------------
    // Menu Integration / 菜單整合 / メニュー統合
    //-----------------------------------------------------------------------------
    
    if (showMenuCommand) {
        const _Window_MenuCommand_addMainCommands = Window_MenuCommand.prototype.addMainCommands;
        Window_MenuCommand.prototype.addMainCommands = function() {
            _Window_MenuCommand_addMainCommands.call(this);
            
            this._list.splice(menuCommandPosition, 0, {
                name: getText('menuCommand'),
                symbol: 'classChange',
                enabled: true,
                ext: null
            });
        };
        
        const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
        Scene_Menu.prototype.createCommandWindow = function() {
            _Scene_Menu_createCommandWindow.call(this);
            this._commandWindow.setHandler('classChange', this.commandPersonal.bind(this));
        };
        
        const _Scene_Menu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
        Scene_Menu.prototype.onPersonalOk = function() {
            if (this._commandWindow.currentSymbol() === 'classChange') {
                this.updateActor();
                selectedActor = this.actor();
                isForceMode = false;
                SceneManager.push(Scene_ClassChange);
            } else {
                _Scene_Menu_onPersonalOk.call(this);
            }
        };
    }
    
    // Register global classes / 註冊全局類別 / グローバルクラスを登録
    window.Scene_ActorSelection = Scene_ActorSelection;
    window.Scene_ClassChange = Scene_ClassChange;
    window.Window_ClassList = Window_ClassList;
    window.Window_ClassInfo = Window_ClassInfo;
    window.Window_Confirmation = Window_Confirmation;
    
})();