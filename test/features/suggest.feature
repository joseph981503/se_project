Feature: 推薦
  In order to 不用找就能看到我這個使用者可能想用的功能
  As a 使用者
  I want to 依據我的使用記錄和熱門使用，在一開始就看到我想要的功能

  Scenario: 歷史記錄
    Given 系統使用記錄是淨空的    
    Given 我的身份是 "學生"
    And 一連串我的身份可以用的校務功能
    """
    畢業離校檢核 就學貸款申請 場地申請登記 遺失物品查詢 學生住宿申請 宿舍包裹郵件查詢 場地申請登記 遺失物品查詢 學生住宿申請 暑期營隊宿舍申請 緊急聯絡人 遺失物品查詢 場地申請登記 出國進修補助 出國選課申請 輔系雙修申請 全校課程查詢 成績查詢 成績查詢 成績查詢
    """
    When 我依序使用上述一連串的功能
    Then 個人記錄會顯示我用過的中，前五名頻繁出現的功能 

  Scenario: 同身分中熱門 
    Given 系統使用記錄是淨空的
    Given 我的身份是 "學生"    
    And 另一個跟我同身份的人
    And 一連串我的身份可以用的校務功能
      """
      畢業離校檢核 就學貸款申請 場地申請登記 遺失物品查詢 學生住宿申請 宿舍包裹郵件查詢 場地申請登記 遺失物品查詢 學生住宿申請 暑期營隊宿舍申請 緊急聯絡人 遺失物品查詢 場地申請登記 出國進修補助 出國選課申請 輔系雙修申請 全校課程查詢 成績查詢 成績查詢 成績查詢
      """
    And 一連串他可以用的校務功能      
      """
      本學期教學意見調查 當學期在學證明列印服務 當學期在學證明列印服務 成績查詢 出國進修補助 學生住宿申請 學生住宿申請結果查詢 宿舍請修 宿舍包裹郵件查詢 校外租賃查詢 成績查詢 選課服務 選課服務 全校課程查詢 學生住宿申請 學生入帳明細查詢 當學期在學證明列印服務 出國進修補助 學生請假系統 優良導師推薦
      """
    And 兩串功能中，有交集的大於5
    When 我依序使用上述一連串的功能
    And 他依序使用了上述一連串校務功能
    Then 我的同身分熱門會顯示出,其中前五名頻繁出現的功能 

    # !! There is a bug in wdio-cucumber-framework, if we use Background ,it will complain ․ERROR: Cannot read property 'type' of undefined
    # Background:
    #   Given 系統使用記錄是淨空的

    # Scenario Outline: 歷史記錄
    #   Given 我的身份是<identity>  # 教師或學生
    #   And 一連串我的身份可以用的校務功能 <serial of functions> 
    #   When 依序使用這一連串的功能 
    #   Then 個人記錄會顯示我用過的中，前五名頻繁出現的功能 
    #   And 不只顯示，都是可以點進去到功能裡面

    # Scenario Outline: 同身分中熱門 
    #   Given 身分是<Identity>自己和另一個人 # 教師或學生
    #   And 我使用的一連串功能<my functions>, 他使用的一連串功能<his functions>
    #   And 兩串功能中，有交集的大於沒交集的部份    
    #   When 他使用了上述一連串校務功能
    #   And 我使用了上述一連串校務功能    
    #   Then 同身分熱門會顯示出,其中前五名頻繁出現的功能 
    #   And 五個隨機抽一個，真的可以點進去
