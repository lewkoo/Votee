describe('Questions', function(){
    var testQuestionUrl;

    beforeAll(function() {
        // Start with a question to test against.
        browser.get('/questions/create');

        multiChoiceRadio = element(by.id('multiChoiceRadio'));
        multiChoiceTitleInput = element(by.id('multiChoiceTitle'));
        option1Input = element(by.id('option1'));
        option2Input = element(by.id('option2'));
        option3Input = element(by.id('option3'));
        option4Input = element(by.id('option4'));
        answerDropdown = element(by.id('answerDropdown'));
        multiChoiceSubmit = element(by.id('submitMultiChoice'));

        multiChoiceRadio.click();
        multiChoiceTitleInput.sendKeys('What is the answer to life the universe and everything?');
        option1Input.sendKeys('Love');
        option2Input.sendKeys('Happiness');
        option3Input.sendKeys('42');
        option4Input.sendKeys("It's all a lie");
        answerDropdown.$('[value="3"]').click();
        multiChoiceSubmit.click();

        browser.getLocationAbsUrl().then(function(url) {
            testQuestionUrl = url;
        });
    });

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

    describe('list', function() {
        beforeEach(function() {
            browser.get('/questions');
        });

        it('should list questions', function(){
            expect(element(by.linkText('What is the answer to life the universe and everything?')).isPresent()).toBeTruthy();
        });
    });

    describe('edit', function() {
        beforeEach(function() {
            browser.get(testQuestionUrl);
        });

        it('should change title', function(){
            element(by.id('editButton')).click();
            element(by.id('title')).sendKeys(protractor.Key.CONTROL, 'a', protractor.Key.NULL,'New Title');
            element(by.buttonText('Edit')).click();

            expect(element(by.css('.panel-title')).getText()).toBe('New Title');
        });
    });
});
