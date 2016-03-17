package ca.umanitoba.cs.votee;

import android.test.ActivityInstrumentationTestCase2;

import com.robotium.solo.Solo;

import ca.umanitoba.cs.votee.api.APIHelper;

/**
 * Created by Levko on 2016-03-16.
 */
public class RegisterActivityTest extends ActivityInstrumentationTestCase2<RegisterActivity> {

    public RegisterActivityTest() {
        super(RegisterActivity.class);
    }

    private static String CORRECT_FULL_NAME = "Android Test";
    private static String CORRECT_USER_NAME = "android_user";
    private static String CORRECT_ROLE = "professor";
    private static String CORRECT_EMAIL = "androidApiTest@email.com";
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

    public void testCorrectRegister() throws Exception {

        // Unlock the lock screen
        solo.unlockScreen();
        //Click on the full name field
        solo.clickOnView(solo.getView(R.id.full_name));
        // Type an full name, baby
        solo.enterText(0, CORRECT_FULL_NAME);
        //Click on the email field
        solo.clickOnView(solo.getView(R.id.email));
        // Type an email, baby
        solo.enterText(1, CORRECT_EMAIL);
        //Click on the user name field
        solo.clickOnView(solo.getView(R.id.user_name));
        // Type an email, baby
        solo.enterText(2, CORRECT_USER_NAME);
        //Click on the correct role radio button
        solo.clickOnRadioButton(1);
        //Click on the password field
        solo.clickOnView(solo.getView(R.id.password));
        //Enter the password
        solo.enterText(3, CORRECT_PASSWORD);
        //Click on the confirm password field
        solo.clickOnView(solo.getView(R.id.password_repeat));
        //Enter the password
        solo.enterText(3, CORRECT_PASSWORD);
        //Click on the submit button
        solo.clickOnView(solo.getView(R.id.register_button));
        //Wait for transition to the HomeView activity
        solo.waitForActivity(HomeView.class);
        //Make sure we see what we expect to see
        boolean textFound = solo.searchText("Courses");
        assertTrue("Could not log in", textFound);

    }

    public void testIncorrectEmail() throws Exception {
        // Unlock the lock screen
        solo.unlockScreen();
        //Click on the full name field
        solo.clickOnView(solo.getView(R.id.full_name));
        // Type an full name, baby
        solo.enterText(0, CORRECT_FULL_NAME);
        //Click on the email field
        solo.clickOnView(solo.getView(R.id.email));
        // Type an email, baby
        solo.enterText(1, INCORRECT_EMAIL_1);
        //Click on the user name field
        solo.clickOnView(solo.getView(R.id.user_name));
        // Type an email, baby
        solo.enterText(2, CORRECT_USER_NAME);
        //Click on the correct role radio button
        solo.clickOnRadioButton(1);
        //Click on the password field
        solo.clickOnView(solo.getView(R.id.password));
        //Enter the password
        solo.enterText(3, CORRECT_PASSWORD);
        //Click on the confirm password field
        solo.clickOnView(solo.getView(R.id.password_repeat));
        //Enter the password
        solo.enterText(3, CORRECT_PASSWORD);
        //Click on the submit button
        solo.clickOnView(solo.getView(R.id.register_button));
        String errorMessage = solo.getString(R.string.error_invalid_email);
        boolean errorTextFound = solo.searchText(errorMessage);
        assertTrue("Should see an error text displayed that the email is incorrect", errorTextFound);
    }

    public void testIncorrectPassword1() throws Exception {
        // Unlock the lock screen
        solo.unlockScreen();
        //Click on the full name field
        solo.clickOnView(solo.getView(R.id.full_name));
        // Type an full name, baby
        solo.enterText(0, CORRECT_FULL_NAME);
        //Click on the email field
        solo.clickOnView(solo.getView(R.id.email));
        // Type an email, baby
        solo.enterText(1, CORRECT_EMAIL);
        //Click on the user name field
        solo.clickOnView(solo.getView(R.id.user_name));
        // Type an email, baby
        solo.enterText(2, CORRECT_USER_NAME);
        //Click on the correct role radio button
        solo.clickOnRadioButton(1);
        //Click on the password field
        solo.clickOnView(solo.getView(R.id.password));
        //Enter the password
        solo.enterText(3, INCORRECT_PASSWORD_1);
        //Click on the confirm password field
        solo.clickOnView(solo.getView(R.id.password_repeat));
        //Enter the password
        solo.enterText(3, INCORRECT_PASSWORD_1);
        //Click on the submit button
        solo.clickOnView(solo.getView(R.id.register_button));
        //Check for invalid email address string
        String errorMessage = solo.getString(R.string.error_invalid_password_short);
        boolean errorTextFound = solo.searchText(errorMessage);
        assertTrue("Should see an error text displayed that the password is too short", errorTextFound);
    }

    public void testIncorrectPassword2() throws Exception {
        // Unlock the lock screen
        solo.unlockScreen();
        //Click on the full name field
        solo.clickOnView(solo.getView(R.id.full_name));
        // Type an full name, baby
        solo.enterText(0, CORRECT_FULL_NAME);
        //Click on the email field
        solo.clickOnView(solo.getView(R.id.email));
        // Type an email, baby
        solo.enterText(1, CORRECT_EMAIL);
        //Click on the user name field
        solo.clickOnView(solo.getView(R.id.user_name));
        // Type an email, baby
        solo.enterText(2, CORRECT_USER_NAME);
        //Click on the correct role radio button
        solo.clickOnRadioButton(1);
        //Click on the password field
        solo.clickOnView(solo.getView(R.id.password));
        //Enter the password
        solo.enterText(3, INCORRECT_PASSWORD_2);
        //Click on the confirm password field
        solo.clickOnView(solo.getView(R.id.password_repeat));
        //Enter the password
        solo.enterText(3, INCORRECT_PASSWORD_2);
        //Click on the submit button
        solo.clickOnView(solo.getView(R.id.register_button));
        //Check for invalid email address string
        String errorMessage = solo.getString(R.string.error_invalid_password_long);
        boolean errorTextFound = solo.searchText(errorMessage);
        assertTrue("Should see an error text displayed that the password is too long", errorTextFound);
    }

    public void testNotMatchingPasswords() throws Exception {
        // Unlock the lock screen
        solo.unlockScreen();
        //Click on the full name field
        solo.clickOnView(solo.getView(R.id.full_name));
        // Type an full name, baby
        solo.enterText(0, CORRECT_FULL_NAME);
        //Click on the email field
        solo.clickOnView(solo.getView(R.id.email));
        // Type an email, baby
        solo.enterText(1, CORRECT_EMAIL);
        //Click on the user name field
        solo.clickOnView(solo.getView(R.id.user_name));
        // Type an user name, baby
        solo.enterText(2, CORRECT_USER_NAME);
        //Click on the correct role radio button
        solo.clickOnRadioButton(1);
        //Click on the password field
        solo.clickOnView(solo.getView(R.id.password));
        //Enter the password
        solo.enterText(3, CORRECT_PASSWORD);
        //Click on the confirm password field
        solo.clickOnView(solo.getView(R.id.password_repeat));
        //Enter the password
        solo.enterText(3, CORRECT_PASSWORD + " extra stuff");
        //Click on the submit button
        solo.clickOnView(solo.getView(R.id.register_button));
        //Check for invalid email address string
        String errorMessage = solo.getString(R.string.error_passwords_do_not_match);
        boolean errorTextFound = solo.searchText(errorMessage);
        assertTrue("Should see an error text displayed that the passwords are not matching", errorTextFound);
    }

    public void testNoFullName() throws Exception {
        // Unlock the lock screen
        solo.unlockScreen();
        //Click on the full name field
        solo.clickOnView(solo.getView(R.id.full_name));
        // DO NOT Type an full name, baby

        //Click on the email field
        solo.clickOnView(solo.getView(R.id.email));
        // Type an email, baby
        solo.enterText(1, CORRECT_EMAIL);
        //Click on the user name field
        solo.clickOnView(solo.getView(R.id.user_name));
        // Type an email, baby
        solo.enterText(2, CORRECT_USER_NAME);
        //Click on the correct role radio button
        solo.clickOnRadioButton(1);
        //Click on the password field
        solo.clickOnView(solo.getView(R.id.password));
        //Enter the password
        solo.enterText(3, CORRECT_PASSWORD);
        //Click on the confirm password field
        solo.clickOnView(solo.getView(R.id.password_repeat));
        //Enter the password
        solo.enterText(3, CORRECT_PASSWORD);
        //Click on the submit button
        solo.clickOnView(solo.getView(R.id.register_button));
        //Check for invalid email address string
        String errorMessage = solo.getString(R.string.error_field_required);
        boolean errorTextFound = solo.searchText(errorMessage);
        assertTrue("Should see an error text displayed that a field is required", errorTextFound);
    }

    public void testNoUserName() throws Exception {
        // Unlock the lock screen
        solo.unlockScreen();
        //Click on the full name field
        solo.clickOnView(solo.getView(R.id.full_name));
        // Type an full name, baby
        solo.enterText(0, CORRECT_FULL_NAME);
        //Click on the email field
        solo.clickOnView(solo.getView(R.id.email));
        // Type an email, baby
        solo.enterText(1, CORRECT_EMAIL);
        //Click on the user name field
        //Click on the correct role radio button
        solo.clickOnRadioButton(1);
        //Click on the password field
        solo.clickOnView(solo.getView(R.id.password));
        //Enter the password
        solo.enterText(3, CORRECT_PASSWORD);
        //Click on the confirm password field
        solo.clickOnView(solo.getView(R.id.password_repeat));
        //Enter the password
        solo.enterText(3, CORRECT_PASSWORD);
        //Click on the submit button
        solo.clickOnView(solo.getView(R.id.register_button));
        //Check for invalid email address string
        String errorMessage = solo.getString(R.string.error_field_required);
        boolean errorTextFound = solo.searchText(errorMessage);
        assertTrue("Should see an error text displayed that a field is required", errorTextFound);
    }

    public void testNoRoleSelected() throws Exception {
        // Unlock the lock screen
        solo.unlockScreen();
        //Click on the full name field
        solo.clickOnView(solo.getView(R.id.full_name));
        // Type an full name, baby
        solo.enterText(0, CORRECT_FULL_NAME);
        //Click on the email field
        solo.clickOnView(solo.getView(R.id.email));
        // Type an email, baby
        solo.enterText(1, CORRECT_EMAIL);
        //Click on the user name field
        solo.clickOnView(solo.getView(R.id.user_name));
        // Type an user name, baby
        solo.enterText(2, CORRECT_USER_NAME);
        //DO NOT Click on the correct role radio button
        //solo.clickOnRadioButton(1);
        //Click on the password field
        solo.clickOnView(solo.getView(R.id.password));
        //Enter the password
        solo.enterText(3, CORRECT_PASSWORD);
        //Click on the confirm password field
        solo.clickOnView(solo.getView(R.id.password_repeat));
        //Enter the password
        solo.enterText(3, CORRECT_PASSWORD);
        //Click on the submit button
        solo.clickOnView(solo.getView(R.id.register_button));
        //Check for invalid email address string
        String errorMessage = solo.getString(R.string.role_not_selected_error_message);
        boolean errorTextFound = solo.searchText(errorMessage);
        assertTrue("Should see an error text displayed that a role is not selected", errorTextFound);
    }
}
