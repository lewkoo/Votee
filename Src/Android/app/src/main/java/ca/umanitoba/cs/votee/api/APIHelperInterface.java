package ca.umanitoba.cs.votee.api;

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
    String VT_API_URL_USER_GET_CONFIG = "/api/get-config";

    // Circles package routes
    String VT_API_URL_CIRCLES_MINE = "/api/circles/mine";
    String VT_API_URL_CIRCLES_TEST = "/api/circles/test";
    String VT_API_URL_CIRCLES_ALL = "/api/circles/all";

    // Courses package routes
    String VT_API_URL_COURSES = "/api/courses";

    // Questions package routes
    String VT_API_URL_QUESTIONS = "/api/questions";

}
