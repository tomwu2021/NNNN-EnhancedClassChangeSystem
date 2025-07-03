//=============================================================================
// NNNN_Enhanced_ClassChangeSystem.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.000 Enhanced Class Change System with Resource Costs
 * @author NeNeNeNeTai
 * @url https://github.com/tomwu2021/NeNeNeNeTaiPlugin
 * @help NNNN_Enhanced_ClassChangeSystem.js
 * 
 * ◆主要功能 (Main Features)
 * - 增強版轉職系統，包含資源消耗機制
 * - 支援金錢和道具消耗
 * - 詳細的職業轉換條件檢查
 * - 參數需求驗證
 * - 轉職確認流程
 * 
 * ◆轉職流程 (Class Change Flow)
 * 1. 選擇角色 (Select Actor)
 * 2. 選擇可轉職職業 (Select Available Class)
 * 3. 查看轉職條件和能力變化 (View Conditions & Stats Comparison)
 * 4. 確認消耗資源 (Confirm Resource Cost)
 * 5. 執行轉職 (Execute Class Change)
 * 
 * ◆頁籤功能 (Tab Features)
 * 在職業資訊頁面使用 ← → 鍵切換以下頁籤：
 * - 轉職條件：顯示轉職所需條件和消耗
 * - 能力比較：顯示轉職前後能力值變化
 * 
 * ◆職業標籤設定 (Class Note Tags)
 * 在職業的備註欄中設定以下標籤：
 * 
 * <allowedFromClass:1,2,3>
 * 指定可以從哪些職業轉職到此職業
 * 這是正面表列（白名單），只有列出的職業ID可以轉職
 * 如果包含 0，則忽略此限制，允許所有職業轉職
 * 
 * <changeClassCost:5000>
 * 轉職所需的金錢數量
 * 
 * <changeClassItems:3/2,5/1>
 * 轉職所需的道具，格式為 道具ID/數量，多個用逗號分隔
 * 
 * <requiredLevel:10>
 * 轉職所需的最低等級
 * 
 * <requiredHP:100>
 * <requiredMP:50>
 * <requiredATK:30>
 * <requiredDEF:25>
 * <requiredMAT:20>
 * <requiredMDF:20>
 * <requiredAGI:35>
 * <requiredLUK:15>
 * 轉職所需的最低參數值
 * 
 * ◆使用方法 (Usage)
 * 使用插件命令 "OpenClassChange" 開啟轉職畫面
 * 或設定菜單命令顯示
 * 
 * ◆利用規約 (Terms of Use)
 * MIT License
 * Copyright (c) 2024 NeNeNeNeTai
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 * @param ShowMenuCommand
 * @text Show Menu Command / メニューに表示 / 在菜單中顯示
 * @desc Whether to show class change command in main menu / メインメニューに転職コマンドを表示するか / 是否在主菜單中顯示轉職命令
 * @type boolean
 * @default true
 * 
 * @param MenuCommandText
 * @text Menu Command Text / メニューコマンドテキスト / 菜單命令文字
 * @desc Text displayed for the command in menu / メニューに表示するコマンドテキスト / 在菜單中顯示的命令文字
 * @type string
 * @default 職業転換
 * 
 * @param MenuCommandPosition
 * @text Menu Command Position / メニューコマンド位置 / 菜單命令位置
 * @desc Position to insert command in menu (0 = top) / メニューにコマンドを挿入する位置 (0が最前面) / 在菜單中插入命令的位置 (0為最前面)
 * @type number
 * @default 3
 * 
 * @param ClassListWidth
 * @text Class List Width / 職業リスト幅 / 職業列表寬度
 * @desc Width of the class selection window / 職業選択ウィンドウの幅 / 職業選擇窗口的寬度
 * @type number
 * @default 300
 * 
 * @param ConfirmMessage
 * @text Confirm Message / 確認メッセージ / 確認訊息
 * @desc Message displayed when confirming class change / 転職確認時に表示するメッセージテキスト / 轉職確認時顯示的訊息文字
 * @type string
 * @default 転職を実行しますか？
 * 
 * @param SuccessMessage
 * @text Success Message / 成功メッセージ / 成功訊息
 * @desc Message displayed when class change succeeds / 転職成功時に表示するメッセージテキスト / 轉職成功時顯示的訊息文字
 * @type string
 * @default %1 は %2 に転職しました！
 * 
 * @param InsufficientResourcesMessage
 * @text Insufficient Resources Message / リソース不足メッセージ / 資源不足訊息
 * @desc Message displayed when resources are insufficient / リソース不足時に表示するメッセージテキスト / 資源不足時顯示的訊息文字
 * @type string
 * @default リソースが不足しているため、転職できません！
 * 
 * @param CategorySeparator
 * @text Category Separator / カテゴリ区切り文字 / 分類區隔符號
 * @desc String used to identify category separators, classes containing this will be excluded / カテゴリ区切りを識別する文字列、これを含む職業は除外される / 用於標識分類區隔的字串，包含此字串的職業將被排除
 * @type string
 * @default -- 
 * 
 * @param KeepSkills
 * @text Keep Skills / スキル保持 / 保留技能
 * @desc Whether to keep learned skills when changing class / 転職時に習得済みスキルを保持するか / 轉職時是否保留已學會的技能
 * @type boolean
 * @default false
 * 
 * @param KeepExp
 * @text Keep Experience / 経験値保持 / 保留經驗值
 * @desc Whether to keep current level and experience when changing class / 転職時に現在のレベルと経験値を保持するか / 轉職時是否保留當前等級和經驗值
 * @type boolean
 * @default true
 * 
 * @param paramNames
 * @text Parameter Names / パラメータ名 / 參數名稱
 * @desc Custom names for the 8 parameters (HP,MP,ATK,DEF,MAT,MDF,AGI,LUK). Separate with commas. / 8つのパラメータのカスタム名(HP,MP,ATK,DEF,MAT,MDF,AGI,LUK)、カンマ区切り / 8個參數的自定義名稱(HP,MP,ATK,DEF,MAT,MDF,AGI,LUK)，用逗號分隔
 * @type string
 * @default HP,MP,ATK,DEF,MAT,MDF,AGI,LUK
 * 
 * @param textTabConditions
 * @text Tab Text: Conditions / 頁籤文字：條件 / タブテキスト：条件
 * @desc Text for the conditions tab / 條件頁籤的文字 / 条件タブのテキスト
 * @type string
 * @default Conditions
 * 
 * @param textTabStatsComparison
 * @text Tab Text: Stats Comparison / 頁籤文字：能力比較 / タブテキスト：ステータス比較
 * @desc Text for the stats comparison tab / 能力比較頁籤的文字 / ステータス比較タブのテキスト
 * @type string
 * @default Stats Comparison
 * 
 * @param textTabSkillChanges
 * @text Tab Text: Skill Changes / 頁籤文字：技能變化 / タブテキスト：スキル変化
 * @desc Text for the skill changes tab / 技能變化頁籤的文字 / スキル変化タブのテキスト
 * @type string
 * @default Skill Changes
 * 
 * @param textOperationHint
 * @text Operation Hint / 操作提示 / 操作ヒント
 * @desc Operation hint text shown on interface / 界面上顯示的操作提示文字 / インターフェースに表示される操作ヒントテキスト
 * @type string
 * @default E/T Switch Tabs  R/F Scroll
 * 
 * @param textSelectCharacterFirst
 * @text Select Character First / 請先選擇角色 / キャラクター選択促進
 * @desc Message when no character is selected / 沒有選擇角色時的訊息 / キャラクターが選択されていない時のメッセージ
 * @type string
 * @default Please select a character first
 * 
 * @param textSelectClassForConditions
 * @text Select Class For Conditions / 選擇職業查看條件 / 条件表示用職業選択
 * @desc Message when no class is selected for conditions view / 沒有選擇職業查看條件時的訊息 / 条件表示用に職業が選択されていない時のメッセージ
 * @type string
 * @default Select a class to view change conditions
 * 
 * @param textSelectClassForStats
 * @text Select Class For Stats / 選擇職業查看能力 / ステータス表示用職業選択
 * @desc Message when no class is selected for stats view / 沒有選擇職業查看能力時的訊息 / ステータス表示用に職業が選択されていない時のメッセージ
 * @type string
 * @default Select a class to view stat changes
 * 
 * @param textSelectClassForSkills
 * @text Select Class For Skills / 選擇職業查看技能 / スキル表示用職業選択
 * @desc Message when no class is selected for skills view / 沒有選擇職業查看技能時的訊息 / スキル表示用に職業が選択されていない時のメッセージ
 * @type string
 * @default Select a class to view skill changes
 * 
 * @param textTargetClass
 * @text Target Class Label / 目標職業標籤 / 対象職業ラベル
 * @desc Label for target class / 目標職業的標籤 / 対象職業のラベル
 * @type string
 * @default Target Class:
 * 
 * @param textChangeConditions
 * @text Change Conditions Label / 轉職條件標籤 / 転職条件ラベル
 * @desc Label for change conditions section / 轉職條件區段的標籤 / 転職条件セクションのラベル
 * @type string
 * @default Change Conditions:
 * 
 * @param textAllConditionsMet
 * @text All Conditions Met / 符合所有條件 / すべての条件満足
 * @desc Message when all conditions are met / 符合所有條件時的訊息 / すべての条件が満たされた時のメッセージ
 * @type string
 * @default ✓ All conditions met
 * 
 * @param textChangeCost
 * @text Change Cost Label / 轉職消耗標籤 / 転職コストラベル
 * @desc Label for change cost section / 轉職消耗區段的標籤 / 転職コストセクションのラベル
 * @type string
 * @default Change Cost:
 * 
 * @param textGoldCost
 * @text Gold Cost Label / 金錢消耗標籤 / お金コストラベル
 * @desc Label for gold cost / 金錢消耗的標籤 / お金コストのラベル
 * @type string
 * @default Gold: 
 * 
 * @param textParamRequirements
 * @text Parameter Requirements Label / 參數需求標籤 / パラメータ要件ラベル
 * @desc Label for parameter requirements section / 參數需求區段的標籤 / パラメータ要件セクションのラベル
 * @type string
 * @default Parameter Requirements:
 * 
 * @param textOtherRequirements
 * @text Other Requirements Label / 其他需求標籤 / その他要件ラベル
 * @desc Label for other requirements section / 其他需求區段的標籤 / その他要件セクションのラベル
 * @type string
 * @default Other Requirements:
 * 
 * @param textChangeSettings
 * @text Change Settings Label / 轉職設定標籤 / 転職設定ラベル
 * @desc Label for change settings section / 轉職設定區段的標籤 / 転職設定セクションのラベル
 * @type string
 * @default Change Settings:
 * 
 * @param textSkillsKept
 * @text Skills Kept Message / 保留技能訊息 / スキル保持メッセージ
 * @desc Message when skills are kept / 保留技能時的訊息 / スキルが保持される時のメッセージ
 * @type string
 * @default ✓ Keep original skills
 * 
 * @param textSkillsNotKept
 * @text Skills Not Kept Message / 不保留技能訊息 / スキル非保持メッセージ
 * @desc Message when skills are not kept / 不保留技能時的訊息 / スキルが保持されない時のメッセージ
 * @type string
 * @default ✗ Replace with class skills
 * 
 * @param textExpKept
 * @text Experience Kept Message / 保留經驗值訊息 / 経験値保持メッセージ
 * @desc Message when experience is kept / 保留經驗值時的訊息 / 経験値が保持される時のメッセージ
 * @type string
 * @default ✓ Keep level and experience
 * 
 * @param textExpNotKept
 * @text Experience Not Kept Message / 不保留經驗值訊息 / 経験値非保持メッセージ
 * @desc Message when experience is not kept / 不保留經驗值時的訊息 / 経験値が保持されない時のメッセージ
 * @type string
 * @default ✗ Reset to level 1
 * 
 * @param textLevelResetSuffix
 * @text Level Reset Suffix / 等級重置後綴 / レベルリセット接尾辞
 * @desc Template for level reset display. Variables: {currentLevel} / 等級重置顯示的模板。變數：{currentLevel} / レベルリセット表示のテンプレート。変数：{currentLevel}
 * @type string
 * @default Level: Lv.{currentLevel} → Lv.1 (Reset)
 * 
 * @param textBaseStatsChange
 * @text Base Stats Change / 基礎能力值變化 / 基本ステータス変化
 * @desc Label for base stats change section / 基礎能力值變化區段的標籤 / 基本ステータス変化セクションのラベル
 * @type string
 * @default Base Stat Changes:
 * 
 * @param textStatHeaderItem
 * @text Stat Header: Item / 能力表頭：項目 / ステータスヘッダー：項目
 * @desc Header text for item column in stats table / 能力表格中項目欄的標題文字 / ステータステーブルの項目列のヘッダーテキスト
 * @type string
 * @default Item
 * 
 * @param textStatHeaderBefore
 * @text Stat Header: Before / 能力表頭：之前 / ステータスヘッダー：変更前
 * @desc Header text for before column in stats table / 能力表格中之前欄的標題文字 / ステータステーブルの変更前列のヘッダーテキスト
 * @type string
 * @default Before
 * 
 * @param textStatHeaderAfter
 * @text Stat Header: After / 能力表頭：之後 / ステータスヘッダー：変更後
 * @desc Header text for after column in stats table / 能力表格中之後欄的標題文字 / ステータステーブルの変更後列のヘッダーテキスト
 * @type string
 * @default After
 * 
 * @param textStatHeaderChange
 * @text Stat Header: Change / 能力表頭：變化 / ステータスヘッダー：変化
 * @desc Header text for change column in stats table / 能力表格中變化欄的標題文字 / ステータステーブルの変化列のヘッダーテキスト
 * @type string
 * @default Change
 * 
 * @param textSkillChangePreview
 * @text Skill Change Preview / 技能變化預覽 / スキル変化プレビュー
 * @desc Title for skill change preview section / 技能變化預覽區段的標題 / スキル変化プレビューセクションのタイトル
 * @type string
 * @default Skill Change Preview
 * 
 * 
 * @param textSkillsLost
 * @text Skills Lost Title / 失去技能標題 / 失うスキルタイトル
 * @desc Title for skills lost section / 失去技能區段的標題 / 失うスキルセクションのタイトル
 * @type string
 * @default ■ Skills Lost:
 * 
 * @param textSkillsGained
 * @text Skills Gained Title / 獲得技能標題 / 獲得スキルタイトル
 * @desc Title for skills gained section / 獲得技能區段的標題 / 獲得スキルセクションのタイトル
 * @type string
 * @default ■ Skills Gained:
 * 
 * @param textNoSkillChanges
 * @text No Skill Changes / 沒有技能變化 / スキル変化なし
 * @desc Message when there are no skill changes / 沒有技能變化時的訊息 / スキル変化がない時のメッセージ
 * @type string
 * @default No skill changes
 * 
 * @param textNoNewSkills
 * @text No New Skills / 沒有新技能 / 新スキルなし
 * @desc Message when there are no new skills to learn / 沒有新技能可學習時的訊息 / 学習する新しいスキルがない時のメッセージ
 * @type string
 * @default No new skills to learn
 * 
 * @param textCannotPreviewStats
 * @text Cannot Preview Stats / 無法預覽數值 / ステータスプレビュー不可
 * @desc Error message when stats cannot be previewed / 無法預覽數值時的錯誤訊息 / ステータスをプレビューできない時のエラーメッセージ
 * @type string
 * @default Cannot preview stat changes
 * 
 * @param textInvalidClass
 * @text Invalid Class / 無效職業 / 無効職業
 * @desc Error message for invalid class / 無效職業的錯誤訊息 / 無効職業のエラーメッセージ
 * @type string
 * @default Invalid class
 * 
 * @param textCannotChangeFromCurrentClass
 * @text Cannot Change From Current Class / 無法從當前職業轉職 / 現職業から転職不可
 * @desc Error message when cannot change from current class / 無法從當前職業轉職時的錯誤訊息 / 現在の職業から転職できない時のエラーメッセージ
 * @type string
 * @default Cannot change from current class to this class
 * 
 * @param textLevelInsufficient
 * @text Level Insufficient Template / 等級不足模板 / レベル不足テンプレート
 * @desc Template for level insufficient message. Variables: {requiredLevel}, {currentLevel} / 等級不足訊息的模板。變數：{requiredLevel}, {currentLevel} / レベル不足メッセージのテンプレート。変数：{requiredLevel}, {currentLevel}
 * @type string
 * @default Insufficient level (Required: Lv.{requiredLevel}, Current: Lv.{currentLevel})
 * 
 * @param textParamInsufficient
 * @text Parameter Insufficient Template / 參數不足模板 / パラメータ不足テンプレート
 * @desc Template for parameter insufficient message. Variables: {paramName}, {requiredValue}, {currentValue} / 參數不足訊息的模板。變數：{paramName}, {requiredValue}, {currentValue} / パラメータ不足メッセージのテンプレート。変数：{paramName}, {requiredValue}, {currentValue}
 * @type string
 * @default {paramName} insufficient (Required: {requiredValue}, Actual: {currentValue})
 * 
 * @param textGoldInsufficient
 * @text Gold Insufficient Template / 金錢不足模板 / お金不足テンプレート
 * @desc Template for gold insufficient message. Variables: {requiredGold} / 金錢不足訊息的模板。變數：{requiredGold} / お金不足メッセージのテンプレート。変数：{requiredGold}
 * @type string
 * @default Insufficient gold (Required: {requiredGold})
 * 
 * @param textItemInsufficient
 * @text Item Insufficient Template / 道具不足模板 / アイテム不足テンプレート
 * @desc Template for item insufficient message. Variables: {itemName}, {requiredAmount} / 道具不足訊息的模板。變數：{itemName}, {requiredAmount} / アイテム不足メッセージのテンプレート。変数：{itemName}, {requiredAmount}
 * @type string
 * @default Insufficient items: {itemName} x{requiredAmount}
 * 
 * @param textLevelRequirement
 * @text Level Requirement Template / 等級需求模板 / レベル要件テンプレート
 * @desc Template for level requirement display. Variables: {requiredLevel}, {currentLevel} / 等級需求顯示的模板。變數：{requiredLevel}, {currentLevel} / レベル要件表示のテンプレート。変数：{requiredLevel}, {currentLevel}
 * @type string
 * @default Level: Lv.{requiredLevel} (Current: Lv.{currentLevel})
 * 
 * @param textParamRequirement
 * @text Parameter Requirement Template / 參數需求模板 / パラメータ要件テンプレート
 * @desc Template for parameter requirement display. Variables: {paramName}, {requiredValue}, {currentValue} / 參數需求顯示的模板。變數：{paramName}, {requiredValue}, {currentValue} / パラメータ要件表示のテンプレート。変数：{paramName}, {requiredValue}, {currentValue}
 * @type string
 * @default {paramName}: {requiredValue} (Actual: {currentValue})
 * 
 * @param textConfirmChange
 * @text Confirm Change Button / 確認轉職按鈕 / 転職確認ボタン
 * @desc Text for confirm change button / 確認轉職按鈕的文字 / 転職確認ボタンのテキスト
 * @type string
 * @default Confirm Change
 * 
 * @param textCancel
 * @text Cancel Button / 取消按鈕 / キャンセルボタン
 * @desc Text for cancel button / 取消按鈕的文字 / キャンセルボタンのテキスト
 * @type string
 * @default Cancel
 * 
 * @param includeExtraStats
 * @text Include Extra Stats / 包含額外能力值 / 追加ステータス含む
 * @desc Whether to include extra stats from items/traits in calculations / 是否在計算中包含來自道具/特性的額外能力值 / 計算にアイテム/特性からの追加ステータスを含むか
 * @type boolean
 * @default true
 * 
 * @command OpenClassChange
 * @text 開啟轉職畫面
 * @desc 開啟職業轉換畫面
 * 
 * @arg actorId
 * @text 指定角色ID
 * @desc 直接指定要轉職的角色ID (留空則顯示角色選擇)
 * @type actor
 * 
 * @arg variableActorId
 * @text 角色ID變數
 * @desc 用變數指定角色ID (優先於直接指定)
 * @type variable
 */

/*:ja
 * @target MZ
 * @plugindesc v1.000 リソースコスト付き拡張転職システム
 * @author NeNeNeNeTai
 * @url https://github.com/tomwu2021/NeNeNeNeTaiPlugin
 * @help NNNN_Enhanced_ClassChangeSystem.js
 * 
 * ◆主な機能
 * - リソースコスト機能付きの拡張転職システム
 * - お金とアイテムの消費をサポート
 * - 詳細な職業転換条件チェック
 * - パラメータ要件の検証
 * - 転職確認フロー
 * 
 * ◆転職フロー
 * 1. アクター選択
 * 2. 利用可能な職業選択
 * 3. 転職条件と能力変化の確認
 * 4. リソースコストの確認
 * 5. 転職実行
 * 
 * ◆タブ機能
 * 職業情報画面で ← → キーで以下のタブを切り替える：
 * - 転職条件：転職に必要な条件とコストを表示
 * - 能力比較：転職前後の能力値の変化を表示
 * 
 * ◆職業タグ設定
 * 職業のメモ欄に以下のタグを設定：
 * 
 * <allowedFromClass:1,2,3>
 * どの職業からこの職業に転職できるかを指定
 * これはホワイトリスト形式で、リストにある職業IDのみ転職可能
 * 配列に 0 が含まれている場合、この制限を無視し、すべての職業から転職可能
 * 
 * <changeClassCost:5000>
 * 転職に必要なお金の量
 * 
 * <changeClassItems:3/2,5/1>
 * 転職に必要なアイテム、形式は アイテムID/数量、複数はカンマ区切り
 * 
 * <requiredLevel:10>
 * 転職に必要な最低レベル
 * 
 * <requiredHP:100>
 * <requiredMP:50>
 * <requiredATK:30>
 * <requiredDEF:25>
 * <requiredMAT:20>
 * <requiredMDF:20>
 * <requiredAGI:35>
 * <requiredLUK:15>
 * 転職に必要な最低パラメータ値
 * 
 * @param ShowMenuCommand
 * @text メニューに表示
 * @desc メインメニューに転職コマンドを表示するか
 * @type boolean
 * @default true
 * 
 * @param MenuCommandText
 * @text メニューコマンドテキスト
 * @desc メニューに表示するコマンドテキスト
 * @type string
 * @default 職業転換
 * 
 * @param MenuCommandPosition
 * @text メニューコマンド位置
 * @desc メニューにコマンドを挿入する位置 (0が最前面)
 * @type number
 * @default 3
 * 
 * @param ClassListWidth
 * @text 職業リスト幅
 * @desc 職業選択ウィンドウの幅
 * @type number
 * @default 300
 * 
 * @param ConfirmMessage
 * @text 確認メッセージ
 * @desc 転職確認時に表示するメッセージテキスト
 * @type string
 * @default 転職を実行しますか？
 * 
 * @param SuccessMessage
 * @text 成功メッセージ
 * @desc 転職成功時に表示するメッセージテキスト
 * @type string
 * @default %1 は %2 に転職しました！
 * 
 * @param InsufficientResourcesMessage
 * @text リソース不足メッセージ
 * @desc リソース不足時に表示するメッセージテキスト
 * @type string
 * @default リソースが不足しているため、転職できません！
 * 
 * @param CategorySeparator
 * @text 分類區隔符號
 * @desc 用於標識分類區隔的字串，包含此字串的職業將被排除
 * @type string
 * @default -- 
 * 
 * @param KeepSkills
 * @text 保留技能
 * @desc 轉職時是否保留已學會的技能
 * @type boolean
 * @default false
 * 
 * @param KeepExp
 * @text Keep Experience / 保留經驗值 / 経験値保持
 * @desc Whether to keep current level and experience when changing class / 轉職時是否保留當前等級和經驗值 / 転職時に現在のレベルと経験値を保持するか
 * @type boolean
 * @default true
 * 
 * @command OpenClassChange
 * @text 転職画面を開く
 * @desc 職業転換画面を開く
 * 
 * @arg actorId
 * @text 指定アクターID
 * @desc 転職するアクターIDを直接指定 (空白の場合はアクター選択を表示)
 * @type actor
 * 
 * @arg variableActorId
 * @text アクターID変数
 * @desc 変数でアクターIDを指定 (直接指定より優先)
 * @type variable
 */

(() => {
    'use strict';
    
    //=============================================================================
    // Constants and Initialization / 常數和初始化 / 定数と初期化
    //=============================================================================

    // Parameters / 參數 / パラメータ
    const pluginName = "NNNN_Enhanced_ClassChangeSystem";
    const parameters = PluginManager.parameters(pluginName);
    
    // Cost Settings moved to constants / 成本設定移至常數 / コスト設定を定数に移動
    const COST_SETTINGS_OLD = {
        goldCost: Number(parameters['goldCost'] || 0),
        itemCosts: JSON.parse(parameters['itemCosts'] || '[]'),
        levelRequirement: Number(parameters['levelRequirement'] || 1),
        paramRequirements: JSON.parse(parameters['paramRequirements'] || '[]'),
        keepOriginalSkills: parameters['keepOriginalSkills'] === 'true',
        keepExp: parameters['KeepExp'] === 'true'
    };

    // Hardcoded symbols / 硬編碼符號 / ハードコード記号
    const SYMBOLS = {
        checkMark: "✓",
        crossMark: "✗",
        bullet: "■",
        minus: "-",
        plus: "+",
        classTransition: "→",
        closeParen: ")"
    };

    // Get text parameters / 獲取文字參數 / テキストパラメータ取得
    const UI_TEXTS = {
        tabs: {
            conditions: parameters['textTabConditions'] || 'Conditions',
            statsComparison: parameters['textTabStatsComparison'] || 'Stats Comparison',
            skillChanges: parameters['textTabSkillChanges'] || 'Skill Changes'
        },
        
        operationHint: parameters['textOperationHint'] || 'E/T Switch Tabs  R/F Scroll',
        
        common: {
            selectCharacterFirst: parameters['textSelectCharacterFirst'] || 'Please select a character first',
            selectClassForConditions: parameters['textSelectClassForConditions'] || 'Select a class to view change conditions',
            selectClassForStats: parameters['textSelectClassForStats'] || 'Select a class to view stat changes',
            selectClassForSkills: parameters['textSelectClassForSkills'] || 'Select a class to view skill changes'
        },
        
        conditions: {
            targetClass: parameters['textTargetClass'] || 'Target Class:',
            changeConditions: parameters['textChangeConditions'] || 'Change Conditions:',
            allConditionsMet: parameters['textAllConditionsMet'] || '✓ All conditions met',
            changeCost: parameters['textChangeCost'] || 'Change Cost:',
            goldCost: parameters['textGoldCost'] || 'Gold: ',
            paramRequirements: parameters['textParamRequirements'] || 'Parameter Requirements:',
            otherRequirements: parameters['textOtherRequirements'] || 'Other Requirements:',
            changeSettings: parameters['textChangeSettings'] || 'Change Settings:',
            skillsKept: parameters['textSkillsKept'] || '✓ Keep original skills',
            skillsNotKept: parameters['textSkillsNotKept'] || '✗ Replace with class skills',
            expKept: parameters['textExpKept'] || '✓ Keep level and experience',
            expNotKept: parameters['textExpNotKept'] || '✗ Reset to level 1',
            levelInsufficient: parameters['textLevelInsufficient'] || 'Insufficient level (Required: Lv.{requiredLevel}, Current: Lv.{currentLevel})',
            paramInsufficient: parameters['textParamInsufficient'] || '{paramName} insufficient (Required: {requiredValue}, Actual: {currentValue})',
            goldInsufficient: parameters['textGoldInsufficient'] || 'Insufficient gold (Required: {requiredGold})',
            itemInsufficient: parameters['textItemInsufficient'] || 'Insufficient items: {itemName} x{requiredAmount}',
            levelRequirement: parameters['textLevelRequirement'] || 'Level: Lv.{requiredLevel} (Current: Lv.{currentLevel})',
            paramRequirement: parameters['textParamRequirement'] || '{paramName}: {requiredValue} (Actual: {currentValue})'
        },
        
        statsComparison: {
            levelResetSuffix: parameters['textLevelResetSuffix'] || 'Level: Lv.{currentLevel} → Lv.1 (Reset)',
            baseStatsChange: parameters['textBaseStatsChange'] || 'Base Stat Changes:',
        },
        
        statHeaders: {
            item: parameters['textStatHeaderItem'] || 'Item',
            before: parameters['textStatHeaderBefore'] || 'Before',
            after: parameters['textStatHeaderAfter'] || 'After',
            change: parameters['textStatHeaderChange'] || 'Change'
        },
        
        skillChanges: {
            skillChangePreview: parameters['textSkillChangePreview'] || 'Skill Change Preview',
            skillsLost: parameters['textSkillsLost'] || '■ Skills Lost:',
            skillsGained: parameters['textSkillsGained'] || '■ Skills Gained:',
            noSkillChanges: parameters['textNoSkillChanges'] || 'No skill changes',
            noNewSkills: parameters['textNoNewSkills'] || 'No new skills to learn'
        },
        
        errors: {
            cannotPreviewStats: parameters['textCannotPreviewStats'] || 'Cannot preview stat changes',
            invalidClass: parameters['textInvalidClass'] || 'Invalid class',
            cannotChangeFromCurrentClass: parameters['textCannotChangeFromCurrentClass'] || 'Cannot change from current class to this class'
        },
        
        confirmation: {
            confirmChange: parameters['textConfirmChange'] || 'Confirm Change',
            cancel: parameters['textCancel'] || 'Cancel'
        }
    };

    // Template replacement function / 模板替換函數 / テンプレート置換関数
    function formatText(template, replacements) {
        let result = template;
        for (const [key, value] of Object.entries(replacements)) {
            result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
        }
        return result;
    }
    
    // Parameter names for display / 參數名稱顯示 / パラメータ名表示
    const paramNames = (parameters['paramNames'] || 'HP,MP,ATK,DEF,MAT,MDF,AGI,LUK').split(',').map(name => name.trim());
    
    // ============================================================================
    // UI Text Configuration / 界面文字配置 / UIテキスト設定
    // ============================================================================
    
    const showMenuCommand = parameters['ShowMenuCommand'] === 'true';
    const menuCommandText = parameters['MenuCommandText'] || '職業轉換';
    const menuCommandPosition = parseInt(parameters['MenuCommandPosition']) || 3;
    const classListWidth = parseInt(parameters['ClassListWidth']) || 300;
    const confirmMessage = parameters['ConfirmMessage'] || '確認要進行轉職嗎？';
    const successMessage = parameters['SuccessMessage'] || '%1 成功轉職為 %2！';
    const insufficientResourcesMessage = parameters['InsufficientResourcesMessage'] || '資源不足，無法進行轉職！';
    const categorySeparator = parameters['CategorySeparator'] || '--';
    const keepSkills = parameters['KeepSkills'] === 'true';
    const keepExp = parameters['KeepExp'] === 'true';
    const includeExtraStats = parameters['includeExtraStats'] === 'true';
    
    // 統一使用相同的按鍵字串名稱避免覆蓋問題 / Use same key string names to avoid override issues
    Input.keyMapper[69] = 'switchLeft'   // E key
    Input.keyMapper[84] = 'switchRight'  // T key
    Input.keyMapper[82] = 'switchUp'     // R key
    Input.keyMapper[70] = 'switchDown'   // F key
    
    // 全局變數
    let selectedActor = null;
    let selectedClass = null;
    
    //-----------------------------------------------------------------------------
    // Plugin Commands
    //-----------------------------------------------------------------------------
    
    PluginManager.registerCommand(pluginName, 'OpenClassChange', args => {
        let actorId = null;
        
        if (args.variableActorId) {
            actorId = $gameVariables.value(parseInt(args.variableActorId));
        } else if (args.actorId) {
            actorId = parseInt(args.actorId);
        }
        
        if (actorId) {
            selectedActor = $gameActors.actor(actorId);
            SceneManager.push(Scene_EnhancedClassChange);
        } else {
            selectedActor = null;
            SceneManager.push(Scene_ActorSelection);
        }
    });
    
    //-----------------------------------------------------------------------------
    // Utility Functions
    //-----------------------------------------------------------------------------
    
    function parseClassNote(classData) {
        const note = classData.note;
        const conditions = {};
        
        // 解析允許的源職業 - 新格式：<allowedFromClass:1,2,3>
        const allowedFromMatch = note.match(/<allowedFromClass:\s*([^>]+)>/i);
        if (allowedFromMatch) {
            const idsString = allowedFromMatch[1].trim();
            conditions.allowedFromClass = idsString.split(',').map(id => parseInt(id.trim()));
        }
        
        // 解析允許的角色 - 新格式：<allowedActor:1,2,3>
        const allowedActorMatch = note.match(/<allowedActor:\s*([^>]+)>/i);
        if (allowedActorMatch) {
            const idsString = allowedActorMatch[1].trim();
            conditions.allowedActor = idsString.split(',').map(id => parseInt(id.trim()));
        }
        
        // 解析職業描述 - 新格式：<classDescription:職業的詳細說明>
        const descriptionMatch = note.match(/<classDescription:\s*([^>]+)>/i);
        if (descriptionMatch) {
            conditions.classDescription = PluginManagerEx.convertVariables(descriptionMatch[1].trim());
        }
        
        // 解析金錢消耗
        const costMatch = note.match(/<changeClassCost:\s*(\d+)>/i);
        if (costMatch) {
            conditions.goldCost = parseInt(costMatch[1]);
        }
        
        // 解析道具消耗 - 新格式：<changeClassItems:3/2,5/1>
        const itemsMatch = note.match(/<changeClassItems:\s*([^>]+)>/i);
        if (itemsMatch) {
            const itemsString = itemsMatch[1].trim();
            const itemPairs = itemsString.split(',');
            conditions.itemCosts = itemPairs.map(pair => {
                const [id, amount] = pair.split('/').map(x => parseInt(x.trim()));
                return { id, amount };
            });
        }
        
        // 解析參數需求 - 使用新的 param0-param7 標註格式
        
        ['param0', 'param1', 'param2', 'param3', 'param4', 'param5', 'param6', 'param7'].forEach((param, index) => {
            const match = note.match(new RegExp(`<${param}:(\\d+)>`, 'i'));
            if (match) {
                if (!conditions.paramRequirements) conditions.paramRequirements = [];
                conditions.paramRequirements.push({ paramId: index, value: parseInt(match[1]) });
            }
        });
        
        // 解析參數需求 - 支援舊格式（requiredHP, requiredMP, etc.）
        const oldParamTags = ['requiredHP', 'requiredMP', 'requiredATK', 'requiredDEF', 'requiredMAT', 'requiredMDF', 'requiredAGI', 'requiredLUK'];
        oldParamTags.forEach((paramTag, index) => {
            const match = note.match(new RegExp(`<${paramTag}:(\\d+)>`, 'i'));
            if (match) {
                if (!conditions.paramRequirements) conditions.paramRequirements = [];
                conditions.paramRequirements.push({ paramId: index, value: parseInt(match[1]) });
            }
        });
        
        // 解析等級需求
        const levelMatch = note.match(/<requiredLevel:\s*(\d+)>/i);
        if (levelMatch) {
            conditions.requiredLevel = parseInt(levelMatch[1]);
        }
        
        return conditions;
    }
    
    // Check if conditions are met for viewing interface / 檢查是否符合條件以查看界面 / インターフェース表示の条件チェック
    function checkClassChangeConditions(actor, targetClassId) {
        const targetClass = $dataClasses[targetClassId];
        if (!targetClass) return { canChange: false, reason: UI_TEXTS.errors.invalidClass };
        
        const conditions = parseClassNote(targetClass);
        
        // Check if actor is allowed to change to this class / 檢查角色是否允許轉換到此職業 / アクターがこの職業に転職可能かチェック
        if (conditions.allowedActor && conditions.allowedActor.length > 0) {
            if (!conditions.allowedActor.includes(actor.actorId())) {
                return { canChange: false, reason: '此角色無法轉換到這個職業' };
            }
        }
        
        // Check if allowed to change from current class / 檢查是否允許從當前職業轉職 / 現在の職業からの転職可能性をチェック
        if (conditions.allowedFromClass && conditions.allowedFromClass.length > 0) {
            // Check if current class is in allowed list / 檢查當前職業是否在允許列表中 / 現在の職業が許可リストに含まれているかチェック
            if (!conditions.allowedFromClass.includes(actor.currentClass().id) && !conditions.allowedFromClass.includes(0)) {
                return { canChange: false, reason: UI_TEXTS.errors.cannotChangeFromCurrentClass };
            }
        }else{
            return { canChange: false, reason: UI_TEXTS.errors.cannotChangeFromCurrentClass };
        }
        
        // Check level requirement / 檢查等級需求 / レベル要件チェック
        if (conditions.requiredLevel && actor.level < conditions.requiredLevel) {
            return { 
                canChange: false, 
                reason: formatText(UI_TEXTS.conditions.levelInsufficient, { requiredLevel: conditions.requiredLevel, currentLevel: actor.level }) 
            };
        }
        
        // Check parameter requirements / 檢查參數需求 / パラメータ要件チェック
        if (conditions.paramRequirements) {
            for (const requirement of conditions.paramRequirements) {
                const paramIndex = requirement.paramId;
                const requiredValue = requirement.value;
                const currentValue = getActualParam(actor, paramIndex);
                
                if (currentValue < requiredValue) {
                    return { 
                        canChange: false, 
                        reason: formatText(UI_TEXTS.conditions.paramInsufficient, { paramName: paramNames[paramIndex], requiredValue: requiredValue, currentValue: currentValue }) 
                    };
                }
            }
        }
        
        // Check gold cost / 檢查金錢 / お金チェック
        if (conditions.goldCost && $gameParty.gold() < conditions.goldCost) {
            return { canChange: false, reason: formatText(UI_TEXTS.conditions.goldInsufficient, { requiredGold: conditions.goldCost }) };
        }
        
        // Check item costs / 檢查道具需求 / アイテム要件チェック
        if (conditions.itemCosts) {
            for (const cost of conditions.itemCosts) {
                const item = $dataItems[cost.itemId];
                if (!item || $gameParty.numItems(item) < cost.amount) {
                    return { 
                        canChange: false, 
                        reason: formatText(UI_TEXTS.conditions.itemInsufficient, { itemName: item ? item.name : 'Unknown Item', requiredAmount: cost.amount }) 
                    };
                }
            }
        }
        
        return { canChange: true };
    }
    
    function executeClassChange(actor, targetClassId) {
        const targetClass = $dataClasses[targetClassId];
        const conditions = parseClassNote(targetClass);
        
        // 消耗資源
        if (conditions.goldCost) {
            $gameParty.loseGold(conditions.goldCost);
        }
        
        if (conditions.itemCosts) {
            for (const cost of conditions.itemCosts) {
                const item = $dataItems[cost.itemId];
                if (item) {
                    $gameParty.loseItem(item, cost.amount);
                }
            }
        }
        
        // 處理技能轉換
        if (!keepSkills) {
            // 獲取當前職業和目標職業的學習技能
            const currentClass = actor.currentClass();
            const currentLevel = actor.level;
            
            // 取得舊職業應該學會的技能（基於當前等級）
            const oldClassSkills = currentClass.learnings
                .filter(learning => learning.level <= currentLevel)
                .map(learning => learning.skillId);
            
            // 取得新職業應該學會的技能（基於當前等級）
            const newClassSkills = targetClass.learnings
                .filter(learning => learning.level <= currentLevel)
                .map(learning => learning.skillId);
            
            // 移除舊職業技能，保留非職業技能
            actor._skills = actor._skills.filter(skillId => !oldClassSkills.includes(skillId));
            
            // 添加新職業技能（避免重複）
            for (const skillId of newClassSkills) {
                if (!actor._skills.includes(skillId)) {
                    actor._skills.push(skillId);
                }
            }
            
            // 排序技能ID
            actor._skills.sort((a, b) => a - b);
        }
        
        // 執行轉職（根據設定保留或重置經驗值）
        actor.changeClass(targetClassId, keepExp);
        
        // 顯示成功訊息
        const message = formatText(successMessage, { 1: actor.name(), 2: targetClass.name });
        $gameMessage.add(message);
    }
    
    function getSafeActor(statusWindow, index) {
        // 嘗試多種方法獲取演員
        let actor = null;
        
        
        try {
            // 首先嘗試標準方法
            actor = statusWindow.actor(index);
            
            // 如果失敗，嘗試直接從隊伍獲取
            if (!actor && index >= 0 && index < $gameParty.size()) {
                const members = $gameParty.members();
                if (members && members[index]) {
                    actor = members[index];
                }
            }
            
            // 如果還是失敗，嘗試從所有成員獲取（支援SRPG插件）
            if (!actor && typeof $gameParty.allMembers === 'function') {
                const allMembers = $gameParty.allMembers();
                if (allMembers && allMembers[index]) {
                    actor = allMembers[index];
                }
            }
            
        } catch (error) {
            console.error('Enhanced_ClassChangeSystem: 獲取演員時發生錯誤:', error);
            return null;
        }
        
        return actor;
    }
    
    function getActualParam(actor, paramId) {
        if (!includeExtraStats) {
            // 簡單模式：只使用基礎能力值 / Simple mode: only use base stats
            const baseValue = actor.paramBase(paramId);
            
            // 查找該參數的加成 traits (code=21, dataId=paramId)
            let multiplier = 1.0;
            
            // 從角色數據中查找 traits
            const actorData = $dataActors[actor.actorId()];
            if (actorData && actorData.traits) {
                for (const trait of actorData.traits) {
                    if (trait.code === 21 && trait.dataId === paramId) {
                        multiplier = trait.value;
                        break;
                    }
                }
            }
            
            // 計算實際能力值
            const actualValue = Math.floor(baseValue * multiplier);
            
            return actualValue;
        } else {
            // 增強模式：包含額外能力值 / Enhanced mode: include extra stats
            return getEnhancedParam(actor, paramId);
        }
    }
    
    // 計算增強能力值（包含額外加成） / Calculate enhanced parameter value (including extra bonuses)
    function getEnhancedParam(actor, paramId) {
        // 獲取當前總能力值（含裝備） / Get current total stat value (with equipment)
        const currentTotalValue = actor.param(paramId);
        // 創建臨時演員來計算清除裝備後的能力值 / Create temp actor to calculate stats without equipment
        const tempActor = JsonEx.makeDeepCopy(actor);
        tempActor.clearEquipments();
        const withoutEquipmentValue = tempActor.param(paramId);
        
        // 獲取基礎能力值 / Get base stat value
        const baseValue = actor.paramBase(paramId);
        
        // 獲取職業加成 / Get class multiplier
        const classMultiplier = getClassMultiplier(actor, paramId);
        
        // 獲取角色加成 / Get actor multiplier  
        const actorMultiplier = getActorMultiplier(actor, paramId);
        
        // 計算額外能力值 / Calculate extra stat value
        // extraValue = (清除裝備後能力值 / 職業加成 / 角色加成) - 基礎能力值
        const calculatedBaseWithMultipliers = Math.floor(baseValue * actorMultiplier * classMultiplier);
        let extraValue = 0;
        
        if (calculatedBaseWithMultipliers > 0) {
            // 如果清除裝備後的能力值大於計算出的基礎值，則有額外能力值
            extraValue = withoutEquipmentValue / actorMultiplier / classMultiplier - baseValue;
        }
        
        // 當前能力值 = (基礎能力值 + 額外能力值) * 角色加成 * 職業加成
        const finalValue = Math.floor((baseValue + extraValue) * actorMultiplier * classMultiplier);
        
        return finalValue;
    }
    
    // 獲取職業能力值加成 / Get class parameter multiplier
    function getClassMultiplier(actor, paramId) {
        const classData = actor.currentClass();
        if (!classData || !classData.traits) return 1.0;
        
        for (const trait of classData.traits) {
            if (trait.code === 21 && trait.dataId === paramId) {
                return trait.value;
            }
        }
        return 1.0;
    }
    
    // 獲取角色能力值加成 / Get actor parameter multiplier
    function getActorMultiplier(actor, paramId) {
        const actorData = $dataActors[actor.actorId()];
        if (!actorData || !actorData.traits) return 1.0;
        
        for (const trait of actorData.traits) {
            if (trait.code === 21 && trait.dataId === paramId) {
                return trait.value;
            }
        }
        return 1.0;
    }
    
    // 計算轉職後的能力值（保留額外能力值） / Calculate post-class-change parameter value (preserving extra stats)
    function calculateNewClassParam(actor, newClassId, paramId) {

        const tempActor = JsonEx.makeDeepCopy(actor);
        tempActor.changeClass(newClassId, keepExp);
        
        if (!includeExtraStats) {
            // 簡單模式：使用原來的計算方式 / Simple mode: use original calculation
            return tempActor.paramBase(paramId);
        }
        const newBaseValue = tempActor.paramBase(paramId)
        
        // 增強模式：保留額外能力值 / Enhanced mode: preserve extra stats
        const baseValue = actor.paramBase(paramId);
        
        // 計算當前額外能力值 / Calculate current extra stat value
        const currentValue = getEnhancedParam(actor, paramId);
        const currentClassMultiplier = getClassMultiplier(actor, paramId);
        const actorMultiplier = getActorMultiplier(actor, paramId);
        
        // 推算額外能力值
        const calculatedBase = Math.floor(baseValue * actorMultiplier * currentClassMultiplier);
        const extraValue = Math.max(0, (currentValue - calculatedBase)/actorMultiplier/currentClassMultiplier);
        
        // 獲取新職業的能力值加成 / Get new class multiplier
        const newClassData = $dataClasses[newClassId];
        let newClassMultiplier = 1.0;
        if (newClassData && newClassData.traits) {
            for (const trait of newClassData.traits) {
                if (trait.code === 21 && trait.dataId === paramId) {
                    newClassMultiplier = trait.value;
                    break;
                }
            }
        }
        
        // 計算新的能力值 = (基礎能力值 + 額外能力值) * 角色加成 * 新職業加成
        const newValue = Math.floor((newBaseValue + extraValue) * actorMultiplier * newClassMultiplier);
        
        return newValue;
    }
    
    //-----------------------------------------------------------------------------
    // Scene_ActorSelection
    //-----------------------------------------------------------------------------
    
    class Scene_ActorSelection extends Scene_MenuBase {
        create() {
            super.create();
            this.createStatusWindow();
        }
        
        createStatusWindow() {
            const rect = this.statusWindowRect();
            this._statusWindow = new Window_MenuStatus(rect);
            this._statusWindow.setHandler('ok', this.onActorOk.bind(this));
            this._statusWindow.setHandler('cancel', this.popScene.bind(this));
            
            // 檢查是否有可用的隊伍成員
            if ($gameParty.size() === 0) {
                console.warn('Enhanced_ClassChangeSystem: 隊伍中沒有可用的成員');
                this.popScene();
                return;
            }
            
            this.addWindow(this._statusWindow);
            
            // 默認選擇第一個角色，或使用上次選擇的角色
            if ($gameParty.menuActor()) {
                this._statusWindow.selectLast();
            } else {
                this._statusWindow.select(0);
            }
            this._statusWindow.activate();
        }
        
        statusWindowRect() {
            const ww = Graphics.boxWidth;
            const wh = this.mainAreaHeight();
            const wx = 0;
            const wy = this.mainAreaTop();
            return new Rectangle(wx, wy, ww, wh);
        }
        
        onActorOk() {
            // 獲取選中的演員
            const index = this._statusWindow.index();
            const actor = getSafeActor(this._statusWindow, index);
            
            // 檢查演員是否有效
            if (!actor) {
                console.warn('Enhanced_ClassChangeSystem: 無法獲取有效的演員對象');
                SoundManager.playBuzzer();
                return;
            }
            
            selectedActor = actor;
            // 進入轉職場景，轉職完成後會自動退出整個系統
            SceneManager.push(Scene_EnhancedClassChange);
        }
    }
    
    //-----------------------------------------------------------------------------
    // Scene_EnhancedClassChange
    //-----------------------------------------------------------------------------
    
    class Scene_EnhancedClassChange extends Scene_MenuBase {
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
            
            // 處理轉職成功後的退出
            if (this._exitAfterMessage) {
                if (this._waitCount > 0) {
                    this._waitCount--;
                } else {
                    SceneManager.goto(Scene_Map);
                    this._exitAfterMessage = false;
                    return;
                }
            }
            
            // 處理輸入 - 使用自定義 keyMapper
            if (this._classListWindow.active && this._classInfoWindow) {
                if (Input.isTriggered('switchLeft')) { // E鍵 - 向左切換頁籤
                    this._classInfoWindow.switchTab(-1);
                } else if (Input.isTriggered('switchRight')) { // T鍵 - 向右切換頁籤
                    this._classInfoWindow.switchTab(1);
                } else if (Input.isTriggered('switchUp')) { // R鍵 - 向上滾動
                    this._classInfoWindow.scrollContent(-1);
                } else if (Input.isTriggered('switchDown')) { // F鍵 - 向下滾動
                    this._classInfoWindow.scrollContent(1);
                }
            }
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
            const rect = this.classInfoWindowRect();
            this._classInfoWindow = new Window_ClassInfo(rect);
            this._classListWindow.setInfoWindow(this._classInfoWindow);
            this.addWindow(this._classInfoWindow);
            
            // 初始化預覽：設置第一個職業為預覽對象
            this.initializePreview();
        }
        
        initializePreview() {
            // 確保有可用的職業列表
            if (this._classListWindow._data.length > 0) {
                const firstClass = this._classListWindow._data[0];
                const actor = this._classListWindow._actor; // 從職業列表窗口獲取演員
                
                this._classInfoWindow.setClass(firstClass, actor);
                this._classInfoWindow.setPreviewClass(firstClass);
                // 設置列表選擇為第一個項目
                this._classListWindow.select(0);
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
            const wy = this.mainAreaTop();
            const ww = classListWidth;
            const wh = this.mainAreaHeight();
            return new Rectangle(wx, wy, ww, wh);
        }
        
        classInfoWindowRect() {
            const wx = classListWidth;
            const wy = this.mainAreaTop();
            const ww = Graphics.boxWidth - classListWidth;
            const wh = this.mainAreaHeight();
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
                const check = checkClassChangeConditions(selectedActor, selectedClass.id);
                if (check.canChange) {
                    this._confirmationWindow.setClassData(selectedActor, selectedClass, check.conditions);
                    this._confirmationWindow.show();
                    this._confirmationWindow.activate();
                    this._classListWindow.deactivate();
                } else {
                    $gameMessage.add(check.reason);
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
            executeClassChange(selectedActor, selectedClass.id);
            
            // 清理全局變數，防止狀態殘留
            selectedActor = null;
            selectedClass = null;
            
            // 延遲退出，讓成功訊息顯示
            this._waitCount = 30; // 等待30幀（約0.5秒）
            this._exitAfterMessage = true;
        }
        
        onConfirmCancel() {
            this._confirmationWindow.hide();
            this._classListWindow.activate();
        }
    }
    
    //-----------------------------------------------------------------------------
    // Window_ClassList
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
            // 移除初始化預覽邏輯，將在場景中處理
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
            
            const check = checkClassChangeConditions(this._actor, item.id);
            return check.canChange;
        }
        
        makeItemList() {
            this._data = [];
            if (!this._actor) return;
            
            let filteredCount = 0; // 記錄被過濾的職業數量
            
            // 收集所有職業（除了當前職業）
            for (let i = 1; i < $dataClasses.length; i++) {
                const classData = $dataClasses[i];
                if (classData && classData.id !== this._actor.currentClass().id) {
                    // 排除職業名字為空字串的
                    if (!classData.name || classData.name.trim() === '') {
                        filteredCount++;
                        continue;
                    }
                    
                    // 排除包含分類區隔字串的職業
                    if (classData.name.includes(categorySeparator)) {
                        filteredCount++;
                        continue;
                    }
                    
                    this._data.push(classData);
                }
            }
        }
        
        drawItem(index) {
            const item = this._data[index];
            if (!item) return;
            
            const rect = this.itemLineRect(index);
            const enabled = this.isItemEnabled(index);
            
            this.changePaintOpacity(enabled);
            this.drawText(item.name, rect.x, rect.y, rect.width);
            this.changePaintOpacity(true);
        }
        
        isItemEnabled(index) {
            const item = this._data[index];
            if (!item || !this._actor) return false;
            
            const check = checkClassChangeConditions(this._actor, item.id);
            return check.canChange;
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
                // 同時設置預覽職業用於能力比較
                this._infoWindow.setPreviewClass(item);
            }
        }
    }
    
    //-----------------------------------------------------------------------------
    // Window_ClassInfo
    //-----------------------------------------------------------------------------
    
    class Window_ClassInfo extends Window_Base {
        initialize(rect) {
            super.initialize(rect);
            this._class = null;
            this._actor = null;
            this._previewClass = null; // 預覽職業（當前光標停留的職業）
            this._tabIndex = 0; // 0: 條件, 1: 能力值比較, 2: 技能變化
            this._maxTabs = 3;
            this._scrollY = 0; // 當前頁籤的滾動位置
            this._maxScrollY = 0; // 當前頁籤的最大滾動位置
        }
        
        setClass(classData, actor) {
            this._class = classData;
            this._actor = actor;
            this.refresh();
        }
        
        setPreviewClass(classData) {
            this._previewClass = classData;
            // 當預覽職業改變時刷新顯示
            this.refresh();
        }
        
        switchTab(direction) {
            this._tabIndex = (this._tabIndex + direction + this._maxTabs) % this._maxTabs;
            this._scrollY = 0; // 切換頁籤時重置滾動位置
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
            const tabHeight = 36;
            const separatorHeight = 2;
            const availableHeight = this.innerHeight - tabHeight - separatorHeight;
            this._maxScrollY = Math.max(0, contentHeight - availableHeight);
        }
        
        // 智能文字換行方法
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
                
                // 測量文字寬度
                const textWidth = this.contents.measureTextWidth(testText);
                
                // 如果遇到換行符或文字寬度超出限制
                if (char === '\n' || textWidth > maxWidth) {
                    // 繪製當前行
                    if (currentLineText.trim()) {
                        this.contents.drawText(currentLineText, x, currentY, maxWidth, lineHeight, 'left');
                        currentY += lineHeight;
                    }
                    
                    // 重設當前行文字
                    if (char === '\n') {
                        currentLineText = '';
                    } else {
                        currentLineText = char;
                    }
                } else {
                    currentLineText = testText;
                }
            }
            
            // 繪製最後一行
            if (currentLineText.trim()) {
                this.contents.drawText(currentLineText, x, currentY, maxWidth, lineHeight, 'left');
                currentY += lineHeight;
            }
            
            return currentY;
        }
        
        refresh() {
            this.contents.clear();
            
            // 總是繪製頁籤標題
            this.drawTabHeaders();
            
            // 繪製頁籤與內容之間的分隔線
            const tabHeight = 36;
            this.contents.fillRect(0, tabHeight, this.innerWidth, 2, ColorManager.systemColor());
            
            // 設置內容區域的裁剪範圍
            const contentRect = new Rectangle(0, tabHeight + 2, this.innerWidth, this.innerHeight - tabHeight - 2);
            this.contents.paintOpacity = 255;
            
            // 保存原始裁剪設定
            const originalClip = this.contents._context.save();
            this.contents._context.beginPath();
            this.contents._context.rect(contentRect.x, contentRect.y, contentRect.width, contentRect.height);
            this.contents._context.clip();
            
            // 根據當前頁籤繪製內容
            if (this._tabIndex === 0) {
                this.drawConditionsTab();
            } else if (this._tabIndex === 1) {
                this.drawStatsComparisonTab();
            } else if (this._tabIndex === 2) {
                this.drawSkillChangeTab();
            }
            
            // 恢復原始裁剪設定
            this.contents._context.restore();
        }
        
        drawTabHeaders() {
            const tabWidth = this.innerWidth / this._maxTabs;
            const tabHeight = 36;
            
            // 繪製頁籤背景
            for (let i = 0; i < this._maxTabs; i++) {
                const x = i * tabWidth;
                const isActive = i === this._tabIndex;
                // 頁籤背景色
                if (isActive) {
                    this.contents.fillRect(x, 0, tabWidth, tabHeight, ColorManager.itemBackColor1());
                } else {
                    this.contents.fillRect(x, 0, tabWidth, tabHeight, ColorManager.itemBackColor2());
                }
                
                // 頁籤文字
                this.changeTextColor(isActive ? ColorManager.powerUpColor() : ColorManager.normalColor());
                const tabText = i === 0 ? UI_TEXTS.tabs.conditions : i === 1 ? UI_TEXTS.tabs.statsComparison : UI_TEXTS.tabs.skillChanges;
                this.drawText(tabText, x, 6, tabWidth, 'center');
            }
            
            this.resetTextColor();
            
            // 操作提示
            this.changeTextColor(ColorManager.normalColor()); // 使用白色
            this.contents.fontSize = 14; // 略小字體
            this.drawText(UI_TEXTS.operationHint, this.innerWidth - 150, tabHeight + 2, 150, 'right');
            this.contents.fontSize = $gameSystem.mainFontSize(); // 恢復默認字體大小
            this.resetTextColor();
        }
        
        drawConditionsTab() {
            if (!this._actor) {
                const y = 65 - this._scrollY; // 從分隔線下方開始，考慮滾動位置
                const lineHeight = this.lineHeight();
                this.changeTextColor(ColorManager.systemColor());
                this.drawText(UI_TEXTS.common.selectCharacterFirst, 0, y, this.innerWidth, 'center');
                this.resetTextColor();
                return;
            }
            
            // 使用預覽職業顯示條件
            const targetClass = this._previewClass;
            if (!targetClass) {
                const y = 65 - this._scrollY; // 從分隔線下方開始，考慮滾動位置
                const lineHeight = this.lineHeight();
                this.changeTextColor(ColorManager.systemColor());
                this.drawText(UI_TEXTS.common.selectClassForConditions, 0, y, this.innerWidth, 'center');
                this.resetTextColor();
                return;
            }
            
            let y = 65 - this._scrollY; // 從分隔線下方開始，考慮滾動位置
            const lineHeight = this.lineHeight();
            let contentHeight = 65; // 起始內容高度
            
            // 顯示職業名稱
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(UI_TEXTS.conditions.targetClass, 0, y, 200);
            this.resetTextColor();
            this.drawText(targetClass.name, 200, y, 200);
            y += lineHeight;
            
            // 顯示轉職條件
            const conditions = parseClassNote(targetClass);
            const check = checkClassChangeConditions(this._actor, targetClass.id);
            
            y += lineHeight / 2;
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(UI_TEXTS.conditions.changeConditions, 0, y, 200);
            this.resetTextColor();
            y += lineHeight;
            
            // 檢查結果
            if (check.canChange) {
                this.changeTextColor(ColorManager.powerUpColor());
                this.drawText(UI_TEXTS.conditions.allConditionsMet, 20, y, 300);
            } else {
                this.changeTextColor(ColorManager.powerDownColor());
                this.drawText(SYMBOLS.crossMark + ' ' + check.reason, 20, y, 300);
            }
            this.resetTextColor();
            y += lineHeight * 2;
            
            // 顯示消耗資源
            if (conditions.goldCost || conditions.itemCosts) {
                this.changeTextColor(ColorManager.systemColor());
                this.drawText(UI_TEXTS.conditions.changeCost, 0, y, 200);
                this.resetTextColor();
                y += lineHeight;
                
                if (conditions.goldCost) {
                    const canAfford = $gameParty.gold() >= conditions.goldCost;
                    this.changeTextColor(canAfford ? ColorManager.normalColor() : ColorManager.powerDownColor());
                    this.drawText(UI_TEXTS.conditions.goldCost + conditions.goldCost, 20, y, 300);
                    this.resetTextColor();
                    y += lineHeight;
                }
                
                if (conditions.itemCosts) {
                    for (const cost of conditions.itemCosts) {
                        const item = $dataItems[cost.id];
                        if (item) {
                            const hasEnough = $gameParty.numItems(item) >= cost.amount;
                            this.changeTextColor(hasEnough ? ColorManager.normalColor() : ColorManager.powerDownColor());
                            this.drawText(`${item.name}: ${cost.amount}`, 20, y, 300);
                            this.resetTextColor();
                            y += lineHeight;
                        }
                    }
                }
            }
            
            // 顯示參數需求
            if (conditions.paramRequirements && conditions.paramRequirements.length > 0) {
                y += lineHeight / 2;
                this.changeTextColor(ColorManager.systemColor());
                this.drawText(UI_TEXTS.conditions.paramRequirements, 0, y, 200);
                this.resetTextColor();
                y += lineHeight;
                
                for (const requirement of conditions.paramRequirements) {
                    const paramIndex = requirement.paramId;
                    const requiredValue = requirement.value;
                    const currentValue = getActualParam(this._actor, paramIndex);
                    const meets = currentValue >= requiredValue;
                    
                    this.changeTextColor(meets ? ColorManager.normalColor() : ColorManager.powerDownColor());
                    this.drawText(formatText(UI_TEXTS.conditions.paramRequirement, { paramName: paramNames[paramIndex], requiredValue: requiredValue, currentValue: currentValue }), 20, y, 300);
                    this.resetTextColor();
                    y += lineHeight;
                }
            }
            
            // 顯示等級需求
            if (conditions.requiredLevel) {
                const meetsLevel = this._actor.level >= conditions.requiredLevel;
                this.changeTextColor(meetsLevel ? ColorManager.normalColor() : ColorManager.powerDownColor());
                this.drawText(formatText(UI_TEXTS.conditions.levelRequirement, { requiredLevel: conditions.requiredLevel, currentLevel: this._actor.level }), 20, y, 300);
                this.resetTextColor();
                y += lineHeight;
            }
            
            // 顯示職業描述（如果有）
            if (conditions.classDescription) {
                y += lineHeight / 2;
                this.changeTextColor(ColorManager.systemColor());
                this.drawText('職業描述:', 0, y, 200);
                this.resetTextColor();
                y += lineHeight;
                
                // 使用智能換行顯示職業描述
                const descriptionY = this.drawTextWithWordWrap(conditions.classDescription, 20, y, this.innerWidth - 20, this.innerHeight - y);
                y = descriptionY + lineHeight;
            }
            
            contentHeight = y;
            
            // 計算並設置最大滾動位置
            this.calculateMaxScroll(contentHeight);
        }
        
        drawStatsComparisonTab() {
            if (!this._actor) {
                const y = 65 - this._scrollY; // 從分隔線下方開始，考慮滾動位置
                const lineHeight = this.lineHeight();
                this.changeTextColor(ColorManager.systemColor());
                this.drawText(UI_TEXTS.common.selectCharacterFirst, 0, y, this.innerWidth, 'center');
                this.resetTextColor();
                return;
            }
            
            // 使用預覽職業進行比較
            const compareClass = this._previewClass;
            if (!compareClass) {
                const y = 65 - this._scrollY; // 從分隔線下方開始，考慮滾動位置
                const lineHeight = this.lineHeight();
                this.changeTextColor(ColorManager.systemColor());
                this.drawText(UI_TEXTS.common.selectClassForStats, 0, y, this.innerWidth, 'center');
                this.resetTextColor();
                return;
            }
            
            let y = 65 - this._scrollY; // 從分隔線下方開始，考慮滾動位置
            const lineHeight = this.lineHeight() - 2; // 縮小行高
            let contentHeight = 65; // 起始內容高度
            
            // 顯示職業轉換: 舊職業 -> 新職業
            this.changeTextColor(ColorManager.systemColor());
            const oldClassName = this._actor.currentClass().name;
            const newClassName = compareClass.name;
            this.drawText(`${oldClassName} ${SYMBOLS.classTransition} ${newClassName}`, 0, y, this.innerWidth, 'center');
            this.resetTextColor();
            y += lineHeight;
            contentHeight += lineHeight;
            
            // 顯示等級變化信息
            if (!keepExp) {
                this.changeTextColor(ColorManager.powerDownColor());
                this.drawText(formatText(UI_TEXTS.statsComparison.levelResetSuffix, { currentLevel: this._actor.level }), 0, y, this.innerWidth, 'center');
                this.resetTextColor();
                y += lineHeight;
                contentHeight += lineHeight;
            }
            y += 8;
            contentHeight += 8;
            
            // 創建臨時演員來預覽轉職後數值
            let tempActor;
            try {
                tempActor = JsonEx.makeDeepCopy(this._actor);
                
                // 處理技能轉換預覽
                if (!keepSkills) {
                    // 獲取當前職業和目標職業的學習技能
                    const currentClass = tempActor.currentClass();
                    const currentLevel = tempActor.level;
                    
                    // 取得舊職業應該學會的技能（基於當前等級）
                    const oldClassSkills = currentClass.learnings
                        .filter(learning => learning.level <= currentLevel)
                        .map(learning => learning.skillId);
                    
                    // 取得新職業應該學會的技能（基於當前等級）
                    const newClassSkills = compareClass.learnings
                        .filter(learning => learning.level <= currentLevel)
                        .map(learning => learning.skillId);
                    
                    // 移除舊職業技能，保留非職業技能
                    tempActor._skills = tempActor._skills.filter(skillId => !oldClassSkills.includes(skillId));
                    
                    // 添加新職業技能（避免重複）
                    for (const skillId of newClassSkills) {
                        if (!tempActor._skills.includes(skillId)) {
                            tempActor._skills.push(skillId);
                        }
                    }
                    
                    // 排序技能ID
                    tempActor._skills.sort((a, b) => a - b);
                }
                
                // 執行轉職預覽（根據設定保留或重置經驗值）
                tempActor.changeClass(compareClass.id, keepExp);
            } catch (error) {
                const y = 100;
                const lineHeight = this.lineHeight();
                this.changeTextColor(ColorManager.powerDownColor());
                this.drawText(UI_TEXTS.errors.cannotPreviewStats, 0, y, this.innerWidth, 'center');
                this.resetTextColor();
                return;
            }
            
            // 確保 tempActor 存在
            if (!tempActor) {
                const y = 100;
                const lineHeight = this.lineHeight();
                this.changeTextColor(ColorManager.powerDownColor());
                this.drawText(UI_TEXTS.errors.cannotPreviewStats, 0, y, this.innerWidth, 'center');
                this.resetTextColor();
                return;
            }
            
            // 能力值比較標題
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(UI_TEXTS.statsComparison.baseStatsChange, 0, y, this.innerWidth, 'center');
            this.resetTextColor();
            y += lineHeight;
            
            // 計算表格居中位置
            const tableWidth = 360;
            const tableX = (this.innerWidth - tableWidth) / 2;
            const columnSpace = 100;
            // 繪製表頭
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(UI_TEXTS.statHeaders.item, tableX, y, 70, 'center');
            this.drawText(UI_TEXTS.statHeaders.before, tableX + columnSpace, y, 70, 'center');
            this.drawText(UI_TEXTS.statHeaders.after, tableX + columnSpace * 2, y, 70, 'center');
            this.drawText(UI_TEXTS.statHeaders.change, tableX + columnSpace * 3, y, 70, 'center');
            this.resetTextColor();
            y += lineHeight;
            
            // 繪製分隔線
            this.contents.fillRect(tableX, y - 2, tableWidth, 2, ColorManager.systemColor());
            y += 2;
            
            // 基本參數比較
            const paramNames = ['HP', 'MP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'];
            for (let i = 0; i < 8; i++) {
                // 使用增強的能力值計算方法 / Use enhanced parameter calculation method
                const currentValue = includeExtraStats ? getEnhancedParam(this._actor, i) : this._actor.paramBase(i);
                const newValue = calculateNewClassParam(this._actor, compareClass.id, i);
                const difference = newValue - currentValue;
                
                // 參數名稱
                this.drawText(paramNames[i], tableX, y, 70, 'center');
                
                // 當前數值
                this.drawText(currentValue.toString(), tableX + columnSpace, y, 70, 'center');
                
                // 轉職後數值
                this.drawText(newValue.toString(), tableX + columnSpace * 2, y, 70, 'center');
                
                // 變化量
                if (difference > 0) {
                    this.changeTextColor(ColorManager.powerUpColor());
                    this.drawText(`+${difference}`, tableX + columnSpace * 3, y, 70, 'center');
                } else if (difference < 0) {
                    this.changeTextColor(ColorManager.powerDownColor());
                    this.drawText(difference.toString(), tableX + columnSpace * 3, y, 70, 'center');
                } 
                this.resetTextColor();
                
                y += lineHeight;
            }
            
            y += 4; // 減少間距
            
            
            // 計算並設置最大滾動位置
            this.calculateMaxScroll(contentHeight);
        }
        
        drawSkillChangeTab() {
            if (!this._actor) {
                const y = 65 - this._scrollY; // 從分隔線下方開始，考慮滾動位置
                const lineHeight = this.lineHeight();
                this.changeTextColor(ColorManager.systemColor());
                this.drawText(UI_TEXTS.common.selectCharacterFirst, 0, y, this.innerWidth, 'center');
                this.resetTextColor();
                return;
            }
            
            // 使用預覽職業進行比較
            const compareClass = this._previewClass;
            if (!compareClass) {
                const y = 65 - this._scrollY; // 從分隔線下方開始，考慮滾動位置
                const lineHeight = this.lineHeight();
                this.changeTextColor(ColorManager.systemColor());
                this.drawText(UI_TEXTS.common.selectClassForSkills, 0, y, this.innerWidth, 'center');
                this.resetTextColor();
                return;
            }
            
            let y = 65 - this._scrollY; // 從分隔線下方開始，考慮滾動位置
            const lineHeight = this.lineHeight() - 2;
            let contentHeight = 65; // 起始內容高度
            
            // 獲取當前技能和轉職後技能
            const currentSkills = [...this._actor._skills];
            let newSkills = [];
            let removedSkills = [];
            let addedSkills = [];
            
            if (keepSkills) {
                // 保留技能模式：計算新職業會新增的技能
                const compareClassLevel = keepExp ? this._actor.level : 1; // 根據經驗值設定決定比較等級
                const newClassSkills = compareClass.learnings
                    .filter(learning => learning.level <= compareClassLevel)
                    .map(learning => learning.skillId);
                
                // 新增的技能：新職業的技能中，角色還沒有的
                addedSkills = newClassSkills.filter(skillId => !currentSkills.includes(skillId));
                // 保留技能模式下沒有移除的技能
                removedSkills = [];
            } else {
                // 不保留技能模式：計算技能變化
                const currentClass = this._actor.currentClass();
                const currentLevel = this._actor.level;
                
                // 取得舊職業應該學會的技能
                const oldClassSkills = currentClass.learnings
                    .filter(learning => learning.level <= currentLevel)
                    .map(learning => learning.skillId);
                
                // 取得新職業應該學會的技能
                const compareClassLevel = keepExp ? currentLevel : 1; // 根據經驗值設定決定比較等級
                const newClassSkills = compareClass.learnings
                    .filter(learning => learning.level <= compareClassLevel)
                    .map(learning => learning.skillId);
                
                // 計算轉職後技能：移除舊職業技能，加入新職業技能，保留非職業技能
                const nonClassSkills = currentSkills.filter(skillId => !oldClassSkills.includes(skillId));
                newSkills = [...new Set([...nonClassSkills, ...newClassSkills])].sort((a, b) => a - b);
                
                // 計算被移除和新增的技能
                removedSkills = currentSkills.filter(skillId => !newSkills.includes(skillId));
                addedSkills = newSkills.filter(skillId => !currentSkills.includes(skillId));
            }
            
            // 顯示標題
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(UI_TEXTS.skillChanges.skillChangePreview, 0, y, this.innerWidth, 'center');
            this.resetTextColor();
            y += lineHeight + 8;
            contentHeight += lineHeight + 8;
            
            // 顯示被移除的技能
            if (removedSkills.length > 0) {
                this.changeTextColor(ColorManager.powerDownColor());
                this.drawText(UI_TEXTS.skillChanges.skillsLost, 20, y, this.innerWidth);
                this.resetTextColor();
                y += lineHeight;
                contentHeight += lineHeight;
                
                for (const skillId of removedSkills) {
                    const skill = $dataSkills[skillId];
                    if (skill) {
                        this.changeTextColor(ColorManager.powerDownColor());
                        // 繪製技能圖標
                        this.drawIcon(skill.iconIndex, 40, y - this._scrollY);
                        this.drawText(`${SYMBOLS.minus} ${skill.name}`, 40 + 36, y, this.innerWidth - 76);
                        this.resetTextColor();
                        y += lineHeight;
                        contentHeight += lineHeight;
                    }
                }
                y += lineHeight / 2;
                contentHeight += lineHeight / 2;
            }
            
            // 顯示新增的技能
            if (addedSkills.length > 0) {
                this.changeTextColor(ColorManager.powerUpColor());
                this.drawText(UI_TEXTS.skillChanges.skillsGained, 20, y, this.innerWidth);
                this.resetTextColor();
                y += lineHeight;
                contentHeight += lineHeight;
                
                for (const skillId of addedSkills) {
                    const skill = $dataSkills[skillId];
                    if (skill) {
                        this.changeTextColor(ColorManager.powerUpColor());
                        // 繪製技能圖標
                        this.drawIcon(skill.iconIndex, 40, y - this._scrollY);
                        this.drawText(`${SYMBOLS.plus} ${skill.name}`, 40 + 36, y, this.innerWidth - 76);
                        this.resetTextColor();
                        y += lineHeight;
                        contentHeight += lineHeight;
                    }
                }
                y += lineHeight / 2;
                contentHeight += lineHeight / 2;
            }
            
            // 如果沒有技能變化
            if (removedSkills.length === 0 && addedSkills.length === 0) {
                this.changeTextColor(ColorManager.systemColor());
                if (keepSkills) {
                    this.drawText(UI_TEXTS.skillChanges.noNewSkills, 0, y, this.innerWidth, 'center');
                } else {
                    this.drawText(UI_TEXTS.skillChanges.noSkillChanges, 0, y, this.innerWidth, 'center');
                }
                this.resetTextColor();
                contentHeight += lineHeight;
            }
            // 計算並設置最大滾動位置
            this.calculateMaxScroll(contentHeight);
        }
    }
    
    //-----------------------------------------------------------------------------
    // Window_Confirmation
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
            this.addCommand(UI_TEXTS.confirmation.confirmChange, 'ok');
            this.addCommand(UI_TEXTS.confirmation.cancel, 'cancel');
        }
        
        drawAllItems() {
            if (!this._class || !this._actor) return;
            
            let y = 0;
            const lineHeight = this.lineHeight();
            
            // 確認訊息
            this.drawText(confirmMessage, 0, y, this.innerWidth, 'center');
            y += lineHeight * 2;
            
            // 顯示將要消耗的資源
            let hasAnyCosts = false; // 標記是否有任何消耗
            
            if (this._conditions) {
                if (this._conditions.goldCost) {
                    this.drawText(`金錢: ${SYMBOLS.minus}${this._conditions.goldCost}`, 0, y, this.innerWidth);
                    y += lineHeight;
                    hasAnyCosts = true;
                }
                
                if (this._conditions.itemCosts) {
                    for (const cost of this._conditions.itemCosts) {
                        const item = $dataItems[cost.itemId];
                        if (item) {
                            this.drawText(`${item.name}: ${SYMBOLS.minus}${cost.amount}`, 0, y, this.innerWidth);
                            y += lineHeight;
                            hasAnyCosts = true;
                        }
                    }
                }
            }
            
            // 如果沒有任何消耗，添加額外間距避免與選項重疊
            if (!hasAnyCosts) {
                y += lineHeight;
            }
            
            // 添加分隔線間距
            y += lineHeight / 2;
            
            // 設置命令區域的起始位置
            this._commandAreaTop = y;
            
            // 繪製命令
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
    // Menu Integration
    //-----------------------------------------------------------------------------
    
    if (showMenuCommand) {
        const _Window_MenuCommand_addMainCommands = Window_MenuCommand.prototype.addMainCommands;
        Window_MenuCommand.prototype.addMainCommands = function() {
            _Window_MenuCommand_addMainCommands.call(this);
            
            // 在指定位置插入轉職命令
            this._list.splice(menuCommandPosition, 0, {
                name: menuCommandText,
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
                selectedActor = this.actor();
                SceneManager.push(Scene_EnhancedClassChange);
            } else {
                _Scene_Menu_onPersonalOk.call(this);
            }
        };
    }
    
})(); 