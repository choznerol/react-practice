## 10/11 修改



### 10點修正

1. *HeroPage.jsx inline style 這個部分看可不可以，移到 styles/xxx.scss 裏頭，然後再透過 index.scss import。* -> **已修正（[5dca7d](https://github.com/choznerol/react-practice/commit/5dca7d8173715c3f22cb1d6ec47adda534ff836e)）**


2. HeroPage.jsx <Route path="/:id"> 這段是不是包錯地方應該要包 HeroProfile component ? -> **已修正（[fd117f](https://github.com/choznerol/react-practice/commit/fd117f58eb6a7c36df6817c0c08abfa4317996e7)）**


3. 載入失敗可以直接跳一個 popup 通知使用者現在的狀態，像是你儲存成功有顯示一個訊息
順便重寫了一個直接依賴於 store 的 Message 元件。-> 已修正（詳見其他更新3.）


4. 表單沒有做 validation 使用者可以直接按下儲存，然後 backend 才回傳錯誤，這個部分可以在前端先做掉。-> **已修正（[5010a1](https://github.com/choznerol/react-practice/commit/5010a1614512567eb55ea1124eef7a0474bff5a5)）**


5. AbilityCounter.jsx props 有兩個 onDecrementClick。 -> **已修正（ [b15c20](https://github.com/choznerol/react-practice/commit/b15c2017ea5712bcf5427b74c5c996d9eaf6c348)）**


6. styles/index.css 這個整個是 bootstrap 的 code 嗎？ 如果是為什麼不用 npm package 的那一份？
    **Fixed in [ba36b2](https://github.com/choznerol/react-practice/commit/ba36b21261db7aab2f10ec7afd0b8b764b9be8f8)**
    起初的動機是想客製化 bootstrap 的一些參數，但又不能直接改寫 node_module 裡的內容，所以當時思路是：在 styles/ 裡自己覆寫一些 SCSS 參數 --> 載入 npm package 那份 bootstrap 的 SCSS 融合成改過的版本 --> 用 node-sass-chokidar 自動編譯成 index.css
    但確實有點冗余，所以這次改成用 sass-loader 把上述過程整合進 webpack 中，並參考 bootstrap/scss/bootstrap.scss 的架構對 component 按需載入，應該會是比較簡潔的方法。


7. HeroList.jsx 看到一段被註解的 code "onClick={ () => handleCardClick(hero.id) }" 好奇想要知道，為什麼後來把切換連結做到 HeroCard.jsx
   當時為了避免一次同時架構多個新工具會很亂，所以一開始的策略是完成基本架構後依序整合 redux -> react-router -> redux-observable，過程中則持續重構（雖然有點冗，不過因為一次學習(debug)感覺這樣比較清楚）。

   這兩行 code 便是介於從完成 redux 到加入 router 之間的重構中所忽略遺漏的部分，原本是點擊卡片會 dispatch action 來觸發 HeroProfile 元件的改變（HeroProfile依賴於store）；後來加入 router 後改成以 url 作為 HeroProfile 的 source of truth。


8. 程式碼修整乾淨 ex: 沒用到的變數或是檔案移除。


9. 從 heros -> heros/:id 會打兩次 heros 的 api，但應該要避免。--> 已更新，跟 router 部分的修改一起處理（其他更新1.的第四項）


10. HomePage.jsx 這一頁主要的目的是什麼？
    其實原本只是覺得 `/` 是一片空白不太好，所以放了些提示性的連結，不過目前改成預設跳轉到 /heros，應該這樣比較合適



### 其他更新

1. 部分程式碼重構
    * 將 HeroList 元件的複雜邏輯移到 mapStateToProps 中（549e8a86b8392a3cb2fb826ae1f96a41eabfb57d），UI 部分拆分出 HeroProfileEditor functional 元件（[04bad7b](04bad7b97ba4d1d836b7849455c9c4f99785b3d8)）
    * 將所有 reducer 的初始狀態統一在 reducers/index.jsx 中定義（[0d8e47](https://github.com/choznerol/react-practice/commit/0d8e470c55ec5269fcfec024523fe8ae4b1b0284#diff-20b2bea64a13114b01d0c4a96f23a61bR10)）
    * 將各個 epic 拆分獨立檔案
    * router 改成以 path="hero/:id?" 來同時匹配有選 hero 和沒選的狀況
2. 提示通知小框框
    * 改寫 <Message/> 為直接依賴於 store 的元件，任意元件皆可送出 action 讓它跳通知。
    * 外觀為 bootstrap alert 元件（<BSAlert/>）
    * 相關branch [feature/refactor-message-comp](https://github.com/choznerol/react-practice/commits/feature/refactor-message-comp)
3. 頂端進度條
    * 初次加載時會在頁面頂端跑的一條 Loaing bar，根據 GET /heros 來開始及結束。
    * 使用了第三方 Library [react-redux-loading-bar](https://github.com/mironov/react-redux-loading-bar)，是個跟 redux store 整合的很好的現成元件，在任何地方都可送出 action 讓它開始、結束 loading。
4. 「儲存」按鈕 loading 動畫
    * 在 awesome-react-components 上試了幾個 loader/spinner 最後選擇了[halogen](https://github.com/yuanyan/halogen)，不過因為它的 react 版本太舊了所以直接移植了部分元件的 code 出來用（RingLoading.jsx, PulseLoader.jsx 兩個檔案）。



* 遇到的困難、問題，以及解決的方法
    * 經由 connect(mapStateToProps) 注入 HeroList 元件的 props 中，其中有一個是記錄能力值的 `profile` 物件，因為每次 store state 改變可能只動了 profile 中的一對鍵值（比如proifle[unsaved_str] += 1），因此 connect() 的 shallowEqual 機制會讓 HeroList 不知道要 re-render，結果就是雖然 store 中的能力值增減了，顯示出的剩餘點數卻沒變。對此依序嘗試了幾個方法：

        1. 思考 store 的資料結構的設計是否合理：profile 這個節點是不是太深了，後來覺得這部分應該是合理的。
        2. 自訂義 areStatePropsEqual() 傳給 connect() 第四個參數 options 讓 connect() 知道要仔細檢查 profile 的鍵值，但壞處是 code 會變得太艱澀難懂，應該會有更直覺的解法。
        3. 在 mapStateToProps 中攤開 profile 的 8 個參數（4種能力值加上各自的未儲存版本）一一作為 props 注入 HeroList 避開 shallowEqual，但壞處是 code 會變得很長很冗余。
        4. 在 mapStateToProps 中先算好剩餘點數，作為一個 props 注入 HeroList，如此簡化了 HeroList 內部邏輯，code 邏輯似乎也變得比較合理，最後採用此方法。
