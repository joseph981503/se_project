Feature: 搜尋
  In order to 輕鬆搜尋到我想要的功能
  As a 使用者
  I want to 在我不清楚功能的標題名，甚至不知道的我想找的東西的名字，也可以輕鬆找到我想要的功能

  Background:
    Given 這次想搜尋的功能<searching function>

  Scenario Outline: 實時更新搜尋結果
    When 在搜尋列輸入 <search function> 標題的隨機一小段
    And 從即時顯示的搜尋結果，點擊 <searching function>
    Then 進到了該功能 <searching function>裡面

  Scenario Outline: 用功能的標籤找到它
    Given <searching function> 的一個標籤 <label>
    When 在搜尋列輸入<label>
    And 從即時顯示的搜尋結果，點擊 <searching function>
    Then 進到了該功能 <searching function>裡面
