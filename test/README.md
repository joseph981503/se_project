# 使用方法
`npm test`  
## 只測試某個feature  
`npm test -- --spec ./test/features/search.feature`  
`npm test -- --spec ./test/features/category.feature`  
`npm test -- --spec ./test/features/suggest.feature`  
## 除了原本的chrome, 加上也在firefox上測試
`./node_modules/.bin/wdio ./test/wdio.andFirefox.config.js`  (  ` --spec ./test/features/search.feature`  )

# 待補的東西
1. [第7行需要補一個清空所有使用紀錄的clearHistory 函式](./test/features/step-definitions/suggest-steps.js)
2. 個人紀錄最頻繁5個， 同身份(e.g.學生)紀錄最頻繁5個 (沒有學生和教師都能用的校務功能，所以不需要全校師生範圍的推荐)
3. 點擊搜尋欄後，要能點登出
4. 點擊搜尋欄後，要能點一個叫「取消搜尋」的button， 讓推荐可以顯現出來
5. 有些inccu 校務系統有的學生的功能， 沒有放到網頁上， 但是我寫的test 剛好有包含到

# 錯誤偵測/回報
如果有錯誤可以先到 `<project-root>/test/errorShots` 看發生錯誤時自動擷的瀏覽器圖片  
如果覺得測試code 有問題可以再聯絡我
