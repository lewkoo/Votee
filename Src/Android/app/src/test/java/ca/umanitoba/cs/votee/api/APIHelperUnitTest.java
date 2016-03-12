package ca.umanitoba.cs.votee.api;

import com.google.gson.JsonSyntaxException;
import com.jayway.restassured.RestAssured;
import com.xebialabs.restito.server.StubServer;

import org.glassfish.grizzly.http.Method;
import org.glassfish.grizzly.http.util.HttpStatus;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.security.InvalidParameterException;

import ca.umanitoba.cs.votee.data.UserProfile;
import retrofit.RetrofitError;

import static com.jayway.restassured.RestAssured.expect;
import static com.xebialabs.restito.builder.stub.StubHttp.whenHttp;
import static com.xebialabs.restito.builder.verify.VerifyHttp.verifyHttp;
import static com.xebialabs.restito.semantics.Action.ok;
import static com.xebialabs.restito.semantics.Action.status;
import static com.xebialabs.restito.semantics.Action.stringContent;
import static com.xebialabs.restito.semantics.Condition.get;
import static com.xebialabs.restito.semantics.Condition.method;
import static com.xebialabs.restito.semantics.Condition.parameter;
import static com.xebialabs.restito.semantics.Condition.post;
import static com.xebialabs.restito.semantics.Condition.uri;
import static junit.framework.Assert.assertTrue;

/**
 * Created by Levko on 2016-03-10.
 *
 * Authors:
 * Levko Ivanchuk
 */
public class APIHelperUnitTest {

    public StubServer server;

    private static final String expectedToken = "eyJhbGciOiJIUzI1NiJ9.JTdCJTIyX2lkJTIyOiUyMjU2ZTIyZDY1NzM2ZjBmMjgyZjNmYTRkZiUyMiwlMjJlbWFpbCUyMjolMjJsZXdrb29AZ21haWwuY29tJTIyLCUyMnVzZXJuYW1lJTIyOiUyMmxld2tvb0BnbWFpbC5jb20lMjIsJTIybmFtZSUyMjolMjJMZXZrbyUyMEl2YW5jaHVrJTIyLCUyMl9fdiUyMjowLCUyMnByb3ZpZGVyJTIyOiUyMmxvY2FsJTIyLCUyMnJvbGVzJTIyOiU1QiUyMmFkbWluJTIyLCUyMmF1dGhlbnRpY2F0ZWQlMjIlNUQlN0Q.vAeMPcWJxal-4-nJQrnlKCSASepOd-HSjEc5QVE7wN8";

    @Before
    public void start() {
        server = new StubServer(3000).run();
        RestAssured.port = server.getPort();

        // Set the user email and password
        UserProfile.getInstance().setEmail("test@test.com");
        UserProfile.getInstance().setPassword("testPassword");
    }

    @After
    public void stop(){
        server.stop();
        // Reset user data to default
        UserProfile.getInstance().resetUser();
    }

    /*
     * LOG IN METHOD TEST
     */

    @Test
    public void shouldAuthenticateUserAndReturnToken()
    {
        // Set up a mock server response
        whenHttp(server).
                match(post("/api/login")).
                then(status(HttpStatus.OK_200), stringContent("{\n" +
                        "  \"token\": " + expectedToken + ", \n" +
                        "  \"redirect\": \"/\"\n" +
                        "}"));

        // Issue an API call
        APIHelper.logIn();

        // Check the token that we received
        assertTrue(UserProfile.getInstance().getToken().equals(expectedToken));

        // Verify that at least one API call was issued
        verifyHttp(server).once(
                method(Method.POST),
                uri("/api/login")
        );
    }

    @Test(expected = InvalidParameterException.class)
    public void shouldFailToLogInIfUEmailAndPasswordNotSet()
    {
        // Set up a mock server response
        whenHttp(server).
                match(post("/api/login"), parameter("email", "test@test.com", "password", "testPassword")).
                then(ok(), stringContent("{\n" +
                        "  \"token\": " + expectedToken + ", \n" +
                        "  \"redirect\": \"/\"\n" +
                        "}"));

        expect().statusCode(404).when().get("/api/login");

        // reset the user profile to default
        UserProfile.getInstance().resetUser();
        // Assert that these values have been reset
        assertTrue(UserProfile.getInstance().getEmail() == null);
        assertTrue(UserProfile.getInstance().getPassword() == null);

        // Issue an API call, should fail with an error
        APIHelper.logIn();

        assertTrue(UserProfile.getInstance().getToken() == null);
    }

    // simulate a wrong credentials given from the client
    @Test(expected = RetrofitError.class)
    public void shouldFailToLogInIfEmailAndPasswordAreIncorrect(){
        // Set up a mock server response
        whenHttp(server).
                match(post("/api/login"), parameter("email", "test@test.com", "password", "testPassword")).
                then(ok(), stringContent("{\n" +
                        "  \"token\": " + expectedToken + ", \n" +
                        "  \"redirect\": \"/\"\n" +
                        "}"));

        UserProfile.getInstance().setEmail("testemail@test.com");
        UserProfile.getInstance().setPassword("asdasdasd");

        APIHelper.logIn();
        assertTrue(UserProfile.getInstance().getToken() == null);
    }

    // simulate a server down
    @Test(expected = RetrofitError.class)
    public void shouldThrownAnExceptionWhenAServerIsDown(){
        server.stop();
        APIHelper.logIn();
    }

    // simulate a corrupt JSON
    @Test(expected = JsonSyntaxException.class)
    public void shouldThrowAnExceptionWhenTheResponseIsIncorrect(){

        // Set up a mock server responce
        whenHttp(server).
                match(post("/api/login")).
                then(status(HttpStatus.OK_200), stringContent("{\n" +
                        "  \"token\": " + " \n" +
                        "  \"redirect\": \"/\"\n" +
                        "}"));

        APIHelper.logIn();
    }

    // simulate a corrupt JSON
    @Test(expected = RetrofitError.class)
    public void shouldThrowAnExceptionWHenTheResponseIsMalformed(){
        // Set up a mock server responce
        whenHttp(server).
                match(post("/api/login"), parameter("email", "test@test.com", "password", "testPassword")).
                then(ok(), stringContent("{\n" +
                        "  \"token\": " + expectedToken + " \n" +
                        "  \"redirect\": \"/\"\n" +
                        "}"));

        APIHelper.logIn();
    }


    /*
     * LOG OUT METHOD TESTS
     */

    @Test
    public void shouldSuccessfullyLogIn(){
        // Set up a mock server response
        whenHttp(server).
                match(get("/api/logout")).
                then(status(HttpStatus.OK_200));

        UserProfile.getInstance().setToken(expectedToken);

        APIHelper.logOut();
        assertTrue(UserProfile.getInstance().getToken() == null);

        // Verify that at least one API call was issued
        verifyHttp(server).once(
                method(Method.GET),
                uri("/api/logout")
        );

    }

    @Test(expected = InvalidParameterException.class)
    public void shouldFailToLogOutWhenNotLoggedIn(){
        // Set up a mock server response
        whenHttp(server).
                match(get("/api/logout")).
                then(ok(), stringContent(""));

        // Make sure the mock works
        expect().statusCode(200).when().get("/api/logout");

        APIHelper.logOut();
    }
    
}
