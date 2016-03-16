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
    private static String INCORRECT_EMAIL_2 = "test2@test.";
    private static String INCORRECT_PASSWORD_1 = "1234";
    private static String INCORRECT_PASSWORD_2 = "123456789101112131415161718192021";

    private static final String expectedToken = "eyJhbGciOiJIUzI1NiJ9.JTdCJTIyX2lkJTIyOiUyMjU2ZTIyZDY1NzM2ZjBmMjgyZjNmYTRkZiUyMiwlMjJlbWFpbCUyMjolMjJsZXdrb29AZ21haWwuY29tJTIyLCUyMnVzZXJuYW1lJTIyOiUyMmxld2tvb0BnbWFpbC5jb20lMjIsJTIybmFtZSUyMjolMjJMZXZrbyUyMEl2YW5jaHVrJTIyLCUyMl9fdiUyMjowLCUyMnByb3ZpZGVyJTIyOiUyMmxvY2FsJTIyLCUyMnJvbGVzJTIyOiU1QiUyMmFkbWluJTIyLCUyMmF1dGhlbnRpY2F0ZWQlMjIlNUQlN0Q.vAeMPcWJxal-4-nJQrnlKCSASepOd-HSjEc5QVE7wN8";
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
}
