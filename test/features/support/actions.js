// We don't define functions directly in exports, because function in it can't call another function in it, if we do so. Think about switching account that use logout and login
module.exports = {
    login : login,
    logout : logout,
    switch_account_to : switch_account_to,
    search : search 
}

function login(id, password){
    browser.waitForEnabled('.inputUser')
    browser.setValue('.inputUser', id)
    browser.setValue('.inputPass', password)
    browser.click('.loginPanel button')
}

function logout(){
    browser.waitForEnabled('p=登出')
    browser.click('p=登出')
}

function switch_account_to(id, password){
    logout()
    login(id, password)
}

function search(search_word){
    // 不是Ajax, 而是普通地要load一個新的html時, 如果還沒load完就想要按就會找不到該element
    // 此時就用waitForEnabled 來確認這個element已經準備好了
    // (有時候可能其他的load好了但這個element還沒load好，所以可能不能用其他的東西來當線索) 
    browser.waitForEnabled('input[class="searchInput"]')
    browser.setValue('input[class="searchInput"]', search_word)
} 
