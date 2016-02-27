describe('Questions', function(){
    var loginForm;
    var emailInput;
    var passwordInput;
    var submitButton;

    beforeEach(function() {
        browser.get('/questions');

        newQuestionButton = element(by.id('createQuestionButton'));
    });

    describe('create', function() {
        var multiChoiceRadio;
        var openEndedRadio;
        var multiChoiceTitleInput;
        var option1Input;
        var option2Input;
        var option3Input;
        var option4Input;
        var answerDropdown;
        var multiChoiceSubmit;
        var openEndedTitle;

        beforeEach(function() {
            browser.get('/questions/create');

            multiChoiceRadio = element(by.id('multiChoiceRadio'));
            openEndedRadio = element(by.id('openEndedRadio'));
            multiChoiceTitleInput = element(by.id('multiChoiceTitle'));
            option1Input = element(by.id('option1'));
            option2Input = element(by.id('option2'));
            option3Input = element(by.id('option3'));
            option4Input = element(by.id('option4'));
            answerDropdown = element(by.id('answerDropdown'));
            multiChoiceSubmit = element(by.id('submitMultiChoice'));
            openEndedTitle = element(by.id('title'));
            openEndedSubmit = element(by.id('submitOpenEnded'));
        });

        it('should be able to create a multiple choice question', function(){
            multiChoiceRadio.click();
            multiChoiceTitleInput.sendKeys('question title');
            option1Input.sendKeys('answer 1');
            option2Input.sendKeys('answer 2');
            option3Input.sendKeys('answer 3');
            option4Input.sendKeys('answer 4');
            answerDropdown.$('[value="0"]').click();
            multiChoiceSubmit.click();

            expect(element(by.css('.panel-title')).getText()).toBe('question title');
        });
    });
});
