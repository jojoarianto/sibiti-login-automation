const {Builder, By, Key}     = require("selenium-webdriver");
var remote                   = require('selenium-webdriver/remote');
const xlsxFile               = require('read-excel-file/node');
require('dotenv').config();


(async function() {
    // let driver = await new Builder().forBrowser("chrome").build();
    // await driver.get(process.env.SITE);

    await xlsxFile(process.env.EXCEL).then((rows) => {
        
        for (i in rows){
            const account =  getData(process.env.EXCEL, i);
            console.log(account);
        }
    })
}());


function getData(data, i){
    var email='';
    var pass='';
    xlsxFile(data).then((rows) => {
        for (j in rows[i]){
            if (j == 0) {
                email = rows[i][j];
            }else if(j ==1){
                pass = rows[i][j];                  
            }
        };
        console.log(email);
        console.log(pass);
        return {
            'email' :email,
            'pass' :pass
        };
    })
    // return {
    //     'email' :email,
    //     'pass' :pass
    // };
}

async function logIn(driver, account){
    await driver.findElement(By.id('email')).sendKeys(account.email);
    await driver.findElement(By.id('password-login')).sendKeys(account.pass, Key.RETURN);
    await driver.sleep(1000);
    //await driver.findElement(By.xpath("/html/body/nav/div/ul/li[8]")).click();
    await driver.sleep(1000);

}