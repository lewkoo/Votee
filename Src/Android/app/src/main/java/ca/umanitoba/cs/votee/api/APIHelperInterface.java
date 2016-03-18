package ca.umanitoba.cs.votee.api;

import android.telecom.Call;

import com.google.gson.JsonObject;

import org.json.JSONObject;

import java.util.List;

import ca.umanitoba.cs.votee.data.Question;
import retrofit.Callback;
import retrofit.http.Body;
import retrofit.http.GET;
import retrofit.http.POST;

/**
 * Created by Levko on 2016-03-10.
 *
 * Authors:
 * Levko Ivanchuk
 */
public interface APIHelperInterface {

    // Users package routes
    String VT_API_URL_USER_LOGIN = "/api/login";
    String VT_API_URL_USER_LOGOUT = "/api/logout";
    String VT_API_URL_USER_REGISTER = "/api/register";
    String VT_API_URL_USER_ABOUT_ME = "/api/users/me";
    String VT_API_URL_USER_QUESTIONS = "/api/questions";

    //TODO: Implement method definitions and implementations for these routes
    // Circles package routes
    String VT_API_URL_CIRCLES_MINE = "/api/circles/mine";
    String VT_API_URL_CIRCLES_TEST = "/api/circles/test";
    String VT_API_URL_CIRCLES_ALL = "/api/circles/all";

    // Courses package routes
    String VT_API_URL_COURSES = "/api/courses";

    // Questions package routes
    String VT_API_URL_QUESTIONS = "/api/questions";

    // Users package methods
    // Sends a log in payload, receives a token
    @POST(VT_API_URL_USER_LOGIN)
    retrofit.client.Response logIn(@Body JsonObject params);

    @GET(VT_API_URL_USER_LOGOUT)
    // Send a log out command, receives a success / failure
    retrofit.client.Response logOut();

    @POST(VT_API_URL_USER_REGISTER)
    // Send a register command, receives a success / failure
    retrofit.client.Response register(@Body JsonObject params);

    @GET(VT_API_URL_USER_ABOUT_ME)
    // Send a command to get user data, receives user data JSON
    retrofit.client.Response userInfo(@Body JsonObject params);

    @GET(VT_API_URL_USER_QUESTIONS)
    List<Question> questions();

    @POST(VT_API_URL_USER_QUESTIONS)
    Question createQuestion(@Body JsonObject params);

}
