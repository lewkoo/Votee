package ca.umanitoba.cs.votee;

import android.test.ActivityInstrumentationTestCase2;

import com.robotium.solo.Solo;

import ca.umanitoba.cs.votee.api.APIHelper;


/**
 * Created by Levko on 2016-03-15.
 */
public class LoginActivityTest extends ActivityInstrumentationTestCase2<LoginActivity> {

    public LoginActivityTest(){
        super(LoginActivity.class);
    }

    private static String CORRECT_EMAIL = "testUser@test.com";
    private static String CORRECT_PASSWORD = "12345678";

    private static String INCORRECT_EMAIL_1 = "test@t";
    private static String INCORRECT_PASSWORD_1 = "1234";
    private static String INCORRECT_PASSWORD_2 = "123456789101112131415161718192021";

    private Solo solo;


    @Override
    public void setUp() throws Exception {
        //setUp() is run before a test case is started.
        //This is where the solo object is created.
        solo = new Solo(getInstrumentation());
        getActivity();

        // make sure we connect to the production server
        APIHelper.setVtApiHost("http://votee-project.herokuapp.com");
        APIHelper.updateRESTAdapter();

    }

    @Override
    public void tearDown() throws Exception {
        //tearDown() is run after a test case has finished.
        //finishOpenedActivities() will finish all the activities that have been opened during the test execution.
        solo.finishOpenedActivities();
    }

    public void testCorrectLogIn() throws Exception {

        // Unlock the lock screen
        solo.unlockScreen();
        //Click on the email field
        solo.clickOnView(solo.getView(R.id.email));
        // Type an email, baby
        solo.enterText(0, CORRECT_EMAIL);
        //Click on the password field
        solo.clickOnView(solo.getView(R.id.password));
        //Enter the password
        solo.enterText(1, CORRECT_PASSWORD);
        //Click on the submit button
        solo.clickOnView(solo.getView(R.id.email_sign_in_button));
        //Wait for transition to the HomeView activity
        solo.waitForActivity(HomeView.class);
        //Make sure we see what we expect to see
        boolean textFound = solo.searchText("Courses");
        assertTrue("Could not log in", textFound);

    }

    public void testIncorrectEmail() throws Exception {
        // Unlock the lock screen
        solo.unlockScreen();
        //Click on the email field
        solo.clickOnView(solo.getView(R.id.email));
        // Type an email, baby
        solo.enterText(0, INCORRECT_EMAIL_1);
        //Enter the password
        solo.enterText(1, CORRECT_PASSWORD);
        //Click on the submit button
        solo.clickOnView(solo.getView(R.id.email_sign_in_button));
        //Check for invalid email address string
        String errorMessage = solo.getString(R.string.error_invalid_email);
        boolean errorTextFound = solo.searchText(errorMessage);
        assertTrue("Should see an error text displayed that the email is incorrect", errorTextFound);
    }

    public void testIncorrectPassword1() throws Exception {
        // Unlock the lock screen
        solo.unlockScreen();
        //Click on the email field
        solo.clickOnView(solo.getView(R.id.email));
        // Type an email, baby
        solo.enterText(0, CORRECT_EMAIL);
        //Click on the password field
        solo.clickOnView(solo.getView(R.id.password));
        //Enter the password
        solo.enterText(1, INCORRECT_PASSWORD_1);
        //Click on the submit button
        solo.clickOnView(solo.getView(R.id.email_sign_in_button));
        //Check for invalid email address string
        String errorMessage = solo.getString(R.string.error_invalid_password_short);
        boolean errorTextFound = solo.searchText(errorMessage);
        assertTrue("Should see an error text displayed that the password is too short", errorTextFound);
    }

    public void testIncorrectPassword2() throws Exception {
        // Unlock the lock screen
        solo.unlockScreen();
        //Click on the email field
        solo.clickOnView(solo.getView(R.id.email));
        // Type an email, baby
        solo.enterText(0, CORRECT_EMAIL);
        //Enter the password
        solo.enterText(1, INCORRECT_PASSWORD_2);
        //Click on the submit button
        solo.clickOnView(solo.getView(R.id.email_sign_in_button));
        //Check for invalid email address string
        String errorMessage = solo.getString(R.string.error_invalid_password_long);
        boolean errorTextFound = solo.searchText(errorMessage);
        assertTrue("Should see an error text displayed that the password is too long", errorTextFound);
    }

    public void testEmptyEmail() throws Exception {
        // Unlock the lock screen
        solo.unlockScreen();
        //Click on the email field
        solo.clickOnView(solo.getView(R.id.email));
        // Type an email, baby
        //solo.enterText(0, CORRECT_EMAIL);
        //Enter the password
        solo.enterText(1, CORRECT_PASSWORD);
        //Click on the submit button
        solo.clickOnView(solo.getView(R.id.email_sign_in_button));
        //Check for invalid email address string
        String errorMessage = solo.getString(R.string.error_field_required);
        boolean errorTextFound = solo.searchText(errorMessage);
        assertTrue("Should see an error text displayed that the email field is empty", errorTextFound);
    }

    public void testEmptyPassword() throws Exception {
        // Unlock the lock screen
        solo.unlockScreen();
        //Click on the email field
        solo.clickOnView(solo.getView(R.id.email));
        // Type an email, baby
        solo.enterText(0, CORRECT_EMAIL);
        //Enter the password
        //solo.enterText(1, CORRECT_PASSWORD);
        //Click on the submit button
        solo.clickOnView(solo.getView(R.id.email_sign_in_button));
        //Check for invalid email address string
        String errorMessage = solo.getString(R.string.error_field_required);
        boolean errorTextFound = solo.searchText(errorMessage);
        assertTrue("Should see an error text displayed that the password field is empty", errorTextFound);
    }
}
