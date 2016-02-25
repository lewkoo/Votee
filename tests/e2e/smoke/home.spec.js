describe('Smoke test home page', function(){
  it('title should contain Votee', function(){
    browser.get('/');
    expect(browser.getTitle()).toMatch(/.*Votee.*/);
  });

  it('should have a logo', function() {
     browser.get('/');

     expect(element(by.id('logo')).isPresent()).toBeTruthy();
  });
});

describe('Login page', function(){
    var loginForm;
    var emailInput;
    var passwordInput;
    var submitButton;

    beforeEach(function() {
        browser.get('/auth/login');

        loginForm = element(by.id('login_form'));
        emailInput = element(by.id('email_block'));
        passwordInput = element(by.id('password_block'));
        submitButton = element(by.css('.submit_button'));
    });

    it('should show a login form', function(){
        expect(loginForm.isPresent()).toBeTruthy();
    });

    it('should not allow an invalid email', function(){
        emailInput.sendKeys('not a valid email');

        expect(emailInput.getAttribute('validationMessage')).not.toBe('');
    });

    it('should allow a valid email', function(){
        emailInput.sendKeys('email@example.com');

        expect(emailInput.getAttribute('validationMessage')).toBe('');
    });

    it('should not login with invalid password', function(){
        emailInput.sendKeys(browser.params.testEmail);
        passwordInput.sendKeys('not the right password');
        submitButton.click();

        expect(browser.getLocationAbsUrl()).toBe('/auth/login');
    });

    it('should login with a valid password', function(){
        emailInput.sendKeys(browser.params.testEmail);
        passwordInput.sendKeys(browser.params.testPassword);
        submitButton.click();

        expect(browser.getLocationAbsUrl()).toBe('/');
    });
});
