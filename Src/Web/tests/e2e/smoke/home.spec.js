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
