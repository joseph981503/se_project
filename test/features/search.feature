@search
Feature: 搜尋
  In order to 輕鬆搜尋到我想要的功能
  As a 使用者
  I want to 在我不清楚功能的標題名，甚至不知道的我想找的東西的名字，也可以輕鬆找到我想要的功能
          
  Scenario: 實時更新搜尋結果0
    Given 想要搜尋的校務功能 "遺失物品查詢"
    When 在搜尋列輸入功能標題的隨機一小段
    Then 出現該功能    

  Scenario: 實時更新搜尋結果1
    Given 想要搜尋的校務功能 "出國選課申請"   
    When 在搜尋列輸入功能標題的隨機一小段
    Then 出現該功能        

  Scenario: 實時更新搜尋結果2
    Given 想要搜尋的校務功能 "社團/系級幹部"
    When 在搜尋列輸入功能標題的隨機一小段
    Then 出現該功能        

    # 因 wdio-cucumber-framework 的bug, 無法使用Scenario Outline    
    # Scenario Outline: 實時更新搜尋結果 
    #   When 在搜尋列輸入想搜尋的功能 "<searching function>" 標題的隨機一小段
    #   And 從即時顯示的搜尋結果，點擊 "<searching function>"
    #   Then 進到了該功能 "<searching function>"裡面
    
    #   Examples:
    #     | searching function |
    #     | 遺失物品查詢       |
    #     | 出國選課申請       |
    #     | 社團/系級幹部      | 
