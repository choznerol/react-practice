### 1. 我們該如何執行完成的package
`$ yarn`

安裝相關套件

`$ npm start -s`

打開瀏覽器造訪 http://localhost:3000


### 2. 專案的架構，Web的架構邏輯
所有組件分為六個 presentational component 和兩個 container component，後者包括了負責頁面上半部的卡片的 <HeroList/> 及下半部顯示能力值的 <HeroProfile>。
redux store 的架構分為 heros, profiles, message 三個子樹，前兩者便分別為 API 提供的資料，message 則是儲存成功的提示訊息。
應用的資料流為可分為同步與非同步討論，同步的部分由前端組件 dispatch action 再由 reducer 處理、更新 store；非同步的部分則是前端組件 dispatch action，reducer 部分處理（如更新 isFetching），再由 redux-observable 篩選、判斷如何處理非同步請求，非同步請求完成後 redux-observable 則會再作相應處理（如 dispatch action 更新 store）


### 3. 你對於所有使用到的第三方library的理解，以及他們的功能簡介
react-redux：將應用中需共用的狀態統一集中在一個 store 中管理，組件們只能以 dispatch 一個 action object 來修改 store，通常用在應用較大較複雜、資料流難以配合組件父子關係的專案，在此專案中主要以 heros 和 profiles 兩個節點存放抓到的資料，資料結構則是參考自官方的 reddit 範例。

redux-observable：位在 reducer 之後接手以 epic 處理 store 的資料流，epic 的特色是資料流進資料流出，有了資料流就可以用 Rx 的各種 operator 聲明是地處理資料流，另外在 ajax 的部分，相較於 Promise 而言 Observable 的編程方式可以輕易做到 cancelation。

react-router：匹配 url 改變與對應的前端邏輯，與 store 一起同為應用的 source of fact，組件可依賴其狀態作出相應的改變

bootstrap@4.0.0-beta：因為 Mr.AM 在 Hahow 部落格中說過公司可以用 flexbox，所以就放心地用了新版的 bootstrap，專案中有用到新的 card 和 flexbox 類。 style/_custom_bootstrap.sass 設定了能自動編譯出客製化組件的參數，但目前只改了顏色。


### 4. 你在程式碼中寫註解的原則，遇到什麼狀況會寫註解
假想看的人能否快速理解，若否，則優先嘗試 refactor、重新命名（或註解 //TODO: refactor，在 commit 前修正）。若無法想出更好的寫法解決，則在比較曖昧不明的函式或變數旁註解它的功能、目的或值得注意的副作用。


### 5. 在這份專案中你遇到的困難、問題，以及解決的方法
* 為了配合 redux 組件需謹慎規劃為 presentational component 和 container component，雖然一開始認為考慮周全了，之後還是持續調整各組件的職責，也還在摸索最好的規劃方法：如何才能兼顧效能（盡可能分出 presentaional component）與可讀性（避免難懂的 container）

* redux的概念、actions 和 reducer 都沒有花太多時間，反倒是 react-redux 中的 <Provider>、connect 等等語法花了不少時間才完全搞懂，還好網上分別都找到了很好的解說，以及簡化版的實作。

* 最大的問題應該是錯估了掌握相關工具所需的時間，上週面試前照著官方教學第一次嘗試寫基本的 react ，當時一切都感覺跟 vue 很像很順利，這次專案多了 react-router, redux, react-redux，雖然也分別跟以前寫過的 vue-router, vuex 很像，但像是理解(及debug)一些 react-redux 的神奇語法仍佔去了開發的大半時間，反而很可惜地沒剩時間好好探索 Observable 能做的事。

* react 與 vue 不少概念都很相似，但 react 語法和專案架構都相當靈活，因為看過的專案和範例都還不多，還在摸索這部分的 best practice。

* 因為在不小心發現創辦人GitHub上的 [react-starter-kit](https://github.com/austintodo/react-start-kit) 所以就決定以此為基礎，但剛開始寫一直出現難懂的錯誤，結果原來是因為年代久遠 react-router 和 redux 都有了 breaking update，雖然可以直接用原本的版本，但當時覺得還有時間，且以後也有機會遇到類似問題，所以就邊學也邊 upgrade 各項工具。


最後，不得不承認這次專案的時間規劃不當，雖然應該有做到了題目的各項需求，但仍有太多不及完成的前端基本需求，包括：
* Refactor、測試和更完善的註解
* 目前僅有用 epic 過濾不必要的 fetch（store 已經有要的資料），還應考慮 cancelation 的情境。
* 基於假設現實中 heros 數量可能遠不只 4 個，若 url 為 heros/1 則應優先抓取這個 hero 的資料，未必需要等到抓回所有 heros
