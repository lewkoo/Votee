package ca.umanitoba.cs.votee.api;

import com.jayway.restassured.RestAssured;
import com.xebialabs.restito.server.StubServer;

import org.glassfish.grizzly.http.Method;
import org.glassfish.grizzly.http.util.HttpStatus;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.security.InvalidParameterException;

import ca.umanitoba.cs.votee.data.UserProfile;

import static com.jayway.restassured.RestAssured.expect;
import static com.jayway.restassured.RestAssured.given;
import static com.xebialabs.restito.builder.stub.StubHttp.whenHttp;
import static com.xebialabs.restito.builder.verify.VerifyHttp.verifyHttp;
import static com.xebialabs.restito.semantics.Action.ok;
import static com.xebialabs.restito.semantics.Action.status;
import static com.xebialabs.restito.semantics.Action.stringContent;
import static com.xebialabs.restito.semantics.Condition.endsWithUri;
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

    @Before
    public void start() {
        server = new StubServer(3000).run();
        RestAssured.port = server.getPort();

        UserProfile.getInstance().resetUser();

    }

    @After
    public void stop(){
        server.stop();
    }

    @Test
    public void shouldPassVerification() {
        // Restito
        whenHttp(server).
                match(endsWithUri("/api/login")).
                then(status(HttpStatus.OK_200));

        // Rest-assured
        expect().statusCode(200).when().get("/api/login");

        // Restito
        verifyHttp(server).once(
                method(Method.GET),
                uri("/api/login")
        );
    }

    @Test
    public void shouldAuthenticateUserAndReturnToken()
    {
        // Set up a mock server responce
        /*
        whenHttp(server).
                match(post("/api/login"), parameter("email", "test@test.com", "password", "testPassword")).
                then(status(HttpStatus.OK_200), stringContent("{\n" +
                        "  \"token\": \"eyJhbGciOiJIUzI1NiJ9.JTdCJTIyX2lkJTIyOiUyMjU2ZTIyZDY1NzM2ZjBmMjgyZjNmYTRkZiUyMiwlMjJlbWFpbCUyMjolMjJsZXdrb29AZ21haWwuY29tJTIyLCUyMnVzZXJuYW1lJTIyOiUyMmxld2tvb0BnbWFpbC5jb20lMjIsJTIybmFtZSUyMjolMjJMZXZrbyUyMEl2YW5jaHVrJTIyLCUyMl9fdiUyMjowLCUyMnByb3ZpZGVyJTIyOiUyMmxvY2FsJTIyLCUyMnJvbGVzJTIyOiU1QiUyMmFkbWluJTIyLCUyMmF1dGhlbnRpY2F0ZWQlMjIlNUQlN0Q.vAeMPcWJxal-4-nJQrnlKCSASepOd-HSjEc5QVE7wN8\",\n" +
                        "  \"redirect\": \"/\"\n" +
                        "}"));
        */

        String expectedToken = "eyJhbGciOiJIUzI1NiJ9.JTdCJTIyX2lkJTIyOiUyMjU2ZTIyZDY1NzM2ZjBmMjgyZjNmYTRkZiUyMiwlMjJlbWFpbCUyMjolMjJsZXdrb29AZ21haWwuY29tJTIyLCUyMnVzZXJuYW1lJTIyOiUyMmxld2tvb0BnbWFpbC5jb20lMjIsJTIybmFtZSUyMjolMjJMZXZrbyUyMEl2YW5jaHVrJTIyLCUyMl9fdiUyMjowLCUyMnByb3ZpZGVyJTIyOiUyMmxvY2FsJTIyLCUyMnJvbGVzJTIyOiU1QiUyMmFkbWluJTIyLCUyMmF1dGhlbnRpY2F0ZWQlMjIlNUQlN0Q.vAeMPcWJxal-4-nJQrnlKCSASepOd-HSjEc5QVE7wN8";

        whenHttp(server).
                match(post("/api/login")).
                then(status(HttpStatus.OK_200), stringContent("{\n" +
                        "  \"token\": \"eyJhbGciOiJIUzI1NiJ9.JTdCJTIyX2lkJTIyOiUyMjU2ZTIyZDY1NzM2ZjBmMjgyZjNmYTRkZiUyMiwlMjJlbWFpbCUyMjolMjJsZXdrb29AZ21haWwuY29tJTIyLCUyMnVzZXJuYW1lJTIyOiUyMmxld2tvb0BnbWFpbC5jb20lMjIsJTIybmFtZSUyMjolMjJMZXZrbyUyMEl2YW5jaHVrJTIyLCUyMl9fdiUyMjowLCUyMnByb3ZpZGVyJTIyOiUyMmxvY2FsJTIyLCUyMnJvbGVzJTIyOiU1QiUyMmFkbWluJTIyLCUyMmF1dGhlbnRpY2F0ZWQlMjIlNUQlN0Q.vAeMPcWJxal-4-nJQrnlKCSASepOd-HSjEc5QVE7wN8\",\n" +
                        "  \"redirect\": \"/\"\n" +
                        "}"));

        // Set the user email and password
        UserProfile.getInstance().setEmail("test@test.com");
        UserProfile.getInstance().setPassword("testPassword");

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
        // Set up a mock server responce
        whenHttp(server).
                match(post("/api/login"), parameter("email", "test@test.com", "password", "testPassword")).
                then(ok(), stringContent("{\n" +
                        "  \"token\": \"eyJhbGciOiJIUzI1NiJ9.JTdCJTIyX2lkJTIyOiUyMjU2ZTIyZDY1NzM2ZjBmMjgyZjNmYTRkZiUyMiwlMjJlbWFpbCUyMjolMjJsZXdrb29AZ21haWwuY29tJTIyLCUyMnVzZXJuYW1lJTIyOiUyMmxld2tvb0BnbWFpbC5jb20lMjIsJTIybmFtZSUyMjolMjJMZXZrbyUyMEl2YW5jaHVrJTIyLCUyMl9fdiUyMjowLCUyMnByb3ZpZGVyJTIyOiUyMmxvY2FsJTIyLCUyMnJvbGVzJTIyOiU1QiUyMmFkbWluJTIyLCUyMmF1dGhlbnRpY2F0ZWQlMjIlNUQlN0Q.vAeMPcWJxal-4-nJQrnlKCSASepOd-HSjEc5QVE7wN8\",\n" +
                        "  \"redirect\": \"/\"\n" +
                        "}"));

        expect().statusCode(404).when().get("/api/login");

        // Issue an API call, should fail with an error
        APIHelper.logIn();

        System.out.println(UserProfile.getInstance().getToken());
        assertTrue(UserProfile.getInstance().getToken().equals(null));
    }

    @Test(expected = AssertionError.class)
    public void shouldFailWhenUrlIsNotCalled() {
        verifyHttp(server).once(
                method(Method.POST),
                uri("/demo"),
                parameter("foo", "bar")
        );
    }


    @Test(expected = AssertionError.class)
    public void shouldFailWhenParametersExpectedButWrongOnesGiven() {
        whenHttp(server).
                match(endsWithUri("/demo")).
                then(status(HttpStatus.OK_200));

        given().param("foo", "bar").get("/demo");

        verifyHttp(server).once(
                method(Method.GET),
                uri("/demo"),
                parameter("another", "pair")
        );
    }

    @Test(expected = AssertionError.class)
    public void shouldFailWhenMethodIsWrong() {
        whenHttp(server).
                match(endsWithUri("/demo")).
                then(status(HttpStatus.OK_200));

        given().param("foo", "bar").get("/demo");

        verifyHttp(server).once(
                method(Method.POST),
                uri("/demo"),
                parameter("foo", "bar")
        );
    }

}
