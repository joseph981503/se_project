Feature: 推薦
  In order to 不用找就能看到我這個使用者可能想用的功能
  As a 使用者
  I want to 依據我的使用記錄和熱門使用，在一開始就看到我想要的功能

  Background:
    Given 一連串的學生可以用的功能<student serial of functions>
    And 一連串的教師可以用的功能 <teacher serial of functions>
    And <student serial of function> 和 <teacher serial of function> 有交集
    And 系統使用記錄是淨空的

  Scenario Outline: 歷史記錄
    When 依序使用一連串的功能 <student serial of functions> 
    Then 個人記錄會顯示<serial of function> 中前五名頻繁出現的功能 
    And 不只顯示，都是可以點進去到功能裡面

  Scenario Outline: 同身分中熱門
    Given 自己的身分是<Identity> // 教師或學生
    And 另外一個同<identity>的人
    And 系統暫無任何同身分的人使用記錄
    When 另外一個人依序使用過一連串的功能 <teacher serial of functions>
    Then 同身分熱門會顯示出,其中前五名頻繁出現的功能 
    And 不只顯示，都是可以點進去到功能裡面

  Scenario Outline: 全校熱門
    Given 自己的身分是<identity> 
    When 一個學生做了 <student serial of functions>, 一個教師作了<teacher serial of functions>
    Then 全校熱門會顯示兩個一連串功能裡，<identity> 可以作的中，最頻繁出現的前五名
    And 不只顯示，都是可以點進去到功能裡面
