Feature: 以分類尋找
  In order to 在不知道要找的東西是什麼時，也能探索然後找到想要的功能
  As a 使用者
  I want to 透過廣的分類範圍來找

  Scenario Outline: 以分類尋找
    Given 一個分類<category> 和其底下一個功能 <searching function>
    When 點擊<category>
    Then 看到可以進去的 <searching function>
