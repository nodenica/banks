var webdriverio = require('webdriverio');

/**
 * Banpro username and password
 * @type {Object}
 */
var account = {
  username: '',
  password: ''
};

/**
 * Browser options
 * @type {Object}
 */
var options = {
  desiredCapabilities: {
    browserName: 'chrome'
  }
};

var data = {
  account: '',
  balance: ''
};

var browser = webdriverio.remote(options).init();

browser.url('https://www.banpro.com.ni/banproenlinea/loginnic.asp')
.element('input[name="fldLoginNameT"]').setValue(account.username)
.execute(function() {
  document.querySelector('input[name="fldPasswordT"]').value = account.password;
}, null)
.click('input[type="submit"]')
.getTitle().then(function(title) {
  if (title === 'Productos') {
    browser.getText('td.uno').then(function(values) {
      data.account = values[0];
    })
    .getText('td.saldo').then(function(values) {
      data.balance = values[1];
      console.log(data);
    })
    .end();
  } else {
    console.log('Espera 5 min chele');
    browser.end();
  }
});
