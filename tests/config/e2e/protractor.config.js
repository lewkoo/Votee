var jasmineReporters = require('jasmine-reporters');

var testName = 'Test User';
var testUsername = 'testuser';
var testEmail = 'email@test.com';
var testPassword = 'password';

exports.config = {
  baseUrl: 'http://localhost:3001',
  framework: 'jasmine2',
  specs: [
    '../../e2e/**/*.spec.js'
  ],
  multiCapabilities: [
    {
      browserName: 'chrome'
    },
    {
      browserName: 'firefox'
    }
  ],

  params: {
      testName: testName,
      testEmail: testEmail,
      testUsername: testUsername,
      testPassword: testPassword
  },

  onPrepare: function(){
    //Creates independent results files for each browser
    //Otherwise they run at the same time and overwrite each other
    var capsPromise = browser.getCapabilities();

    return capsPromise.then(function(caps){
      var browserName = caps.caps_.browserName;
      var browserVersion = caps.caps_.version;
      var browserPrefix = browserName + '-' + browserVersion + '-';
      jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
        savePath: 'tests/results/e2e/junit',
        filePrefix: browserPrefix,
        consolidateAll: false
      }));

      browser.get('/auth/register');

      element(by.id('name')).sendKeys(testName);
      element(by.id('email_block')).sendKeys(testEmail);
      element(by.id('username')).sendKeys(testUsername);
      element(by.id('password_block')).sendKeys(testPassword);
      element(by.id('confirm_password')).sendKeys(testPassword);
      element(by.id('professorRadio')).click();
      element(by.css('.submit_button')).click();
    });
  }
};
