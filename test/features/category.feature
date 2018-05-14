@category
Feature: 以分類尋找
  In order to 在不知道要找的東西是什麼時，也能探索然後找到想要的功能
  As a 使用者
  I want to 透過廣的分類範圍來找

  Scenario: 以分類尋找
    Given 一個分類"個人" 和其底下一個功能 "重要會議查詢"
    When 點擊"個人"
    Then 看到可以進去的 "重要會議查詢"

  Scenario: 以分類尋找
    Given 一個分類"財務" 和其底下一個功能 "學雜費減免申請"
    When 點擊"財務"
    Then 看到可以進去的 "學雜費減免申請"

  Scenario: 以分類尋找
    Given 一個分類"學務" 和其底下一個功能 "超減修習學分數申請"
    When 點擊"學務"
    Then 看到可以進去的 "超減修習學分數申請"

  Scenario: 以分類尋找
    Given 一個分類"住宿" 和其底下一個功能 "宿舍請修"
    When 點擊"住宿"
    Then 看到可以進去的 "宿舍請修"

  Scenario: 以分類尋找
    Given 一個分類"辦活動" 和其底下一個功能 "團體活動緊急通聯登錄"
    When 點擊"辦活動"
    Then 看到可以進去的 "團體活動緊急通聯登錄"

  Scenario: 以分類尋找
    Given 一個分類"問卷" 和其底下一個功能 "表單服務系統"
    When 點擊"問卷"
    Then 看到可以進去的 "表單服務系統"

    # Scenario Outline: 以分類尋找
    #   Given 一個分類"<category>" 和其底下一個功能 "<searching function>"
    #   When 點擊"<category>"
    #   Then 看到可以進去的 "<searching function>"

    #   Examples:
    #     | category | searching function |
    #     | 個人     | 心靈導師預約       |
    #     |          |                    |
