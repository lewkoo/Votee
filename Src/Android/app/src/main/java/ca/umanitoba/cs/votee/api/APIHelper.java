package ca.umanitoba.cs.votee.api;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.squareup.okhttp.OkHttpClient;

import java.security.InvalidParameterException;
import java.util.List;
import java.util.concurrent.TimeUnit;

import ca.umanitoba.cs.votee.BuildConfig;
import ca.umanitoba.cs.votee.data.Options;
import ca.umanitoba.cs.votee.data.Question;
import ca.umanitoba.cs.votee.data.UserProfile;
import retrofit.RequestInterceptor;
import retrofit.RestAdapter;
import retrofit.RetrofitError;
import retrofit.client.OkClient;
import retrofit.converter.GsonConverter;
import retrofit.mime.TypedByteArray;

/**
 * Created by Levko on 2016-03-10.
 *
 * Authors:
 * Levko Ivanchuk
 */
public class APIHelper {

    final static String LOGTAG = APIHelper.class.getSimpleName();

    public static String VT_API_HOST = BuildConfig.HOST;
    public static final String VT_API_TOKEN_KEY = "authorization";
    public static final String VT_API_EMAIL_KEY = "email";
    public static final String VT_API_PASSWORD_KEY = "password";
    public static final String VT_API_CONFIRM_PASSWORD_KEY = "confirmPassword";
    public static final String VT_API_USERNAME_KEY = "username";
    public static final String VT_API_NAME_KEY = "name";
    public static final String VT_API_ROLES_KEY = "roles";

    //question params
    public static final String VT_API_COURSE_NUM = "Number";
    public static final String VT_API_TITLE = "title";
    public static final String VT_API_OPTIONS = "options";
    public static final String VT_API_ANSWER = "answer";
    public static final String VT_API_CREATOR = "creator";


    public static final String API_AUTH_FAIL = "Authentication fail";

    private static RestAdapter mRestAdapter;
    private static APIHelperInterface mRestService;
    private static final Gson mGson;

    static OkClient okClient;

    // token for any further API calls that require
    // authentication
    private static String userToken = "Bearer ";

    // static methods to initialise the REST Adapter and
    // REST Service objects

    static {
        OkHttpClient okHttpClient = new OkHttpClient();
        okHttpClient.setConnectTimeout(20000, TimeUnit.MILLISECONDS);
        okHttpClient.setReadTimeout(20000, TimeUnit.MILLISECONDS);
        okClient = new OkClient(okHttpClient);
    }

    static {
        // Create the Gson Builder class
        mGson = new GsonBuilder().create();
        updateRESTAdapter();
    }

    public static void updateRESTAdapter() {
        RestAdapter.LogLevel desiredLogLevel = getLogLevel();
        // Create the REST Adapter
        mRestAdapter = new RestAdapter.Builder()
                .setLogLevel(desiredLogLevel)
                .setClient(okClient)
                // this might be needed
                .setRequestInterceptor(new RequestInterceptor() {
                    @Override
                    public void intercept(RequestFacade request) {
                        request.addHeader("Content-Type", "application/json");
                        if(UserProfile.getInstance().isLoggedIn()){
                            request.addHeader("authorization", "Bearer " + UserProfile.getInstance().getToken());
                        }
                    }
                })
                .setEndpoint(VT_API_HOST)
                .setConverter(new GsonConverter(mGson))
                .build();

        // Create a REST service
        mRestService = mRestAdapter.create(APIHelperInterface.class);
    }

    private static RestAdapter.LogLevel getLogLevel() {
        // Select the desired config level based on your build config
        RestAdapter.LogLevel desiredLogLevel = RestAdapter.LogLevel.NONE;
        if(BuildConfig.FLAVOR.equals("development"))
        {
            desiredLogLevel = RestAdapter.LogLevel.FULL;
        }else if (BuildConfig.FLAVOR.equals("production"))
        {
            desiredLogLevel = RestAdapter.LogLevel.BASIC;
        }
        return desiredLogLevel;
    }

    /**
     * Created by Levko on 2016-03-10.
     *
     * REST Response object. Contains all the information we might need
     * in a response
     */
    public static class Response {
        public boolean success;
        public JsonArray data;
        public String[] errors;
        public String[] warnings;
        public String[] info;
        public Throwable retrofitError;

        public Response(Throwable retrofitError) {
            this.retrofitError = retrofitError;
            this.success = false;
            this.data = null;
        }

        public Response(Exception exception) {
            this.retrofitError = null;
            warnings = new String[]{exception.getMessage(), exception.getLocalizedMessage()};
            this.success = false;
            this.data = null;
        }
    }

    public static String getVtApiHost() {
        return VT_API_HOST;
    }

    public static void setVtApiHost(String vtApiHost) {
        VT_API_HOST = vtApiHost;
    }

    /**
     * API requests
     */

    public static JsonObject getJsonParamsForLogIn()
    {
        if(UserProfile.getInstance().getEmail() == null ||
                UserProfile.getInstance().getPassword() == null){
            return null;
        }else{
            final JsonObject jsonParams = new JsonObject();
            jsonParams.addProperty(VT_API_EMAIL_KEY, UserProfile.getInstance().getEmail());
            jsonParams.addProperty(VT_API_PASSWORD_KEY, UserProfile.getInstance().getPassword());
            return jsonParams;
        }
    }

    public static JsonObject getJsonParamsForQuestions()
    {
        if(UserProfile.getInstance().getEmail() == null ||
                UserProfile.getInstance().getPassword() == null){
            throw new InvalidParameterException("User name / password is empty");
        }

        final JsonObject jsonParams = new JsonObject();
        jsonParams.addProperty(VT_API_EMAIL_KEY, UserProfile.getInstance().getEmail());
        jsonParams.addProperty(VT_API_PASSWORD_KEY, UserProfile.getInstance().getPassword());
        return jsonParams;
    }

    public static JsonObject getJsonParamsWithToken() {

        if(UserProfile.getInstance().getToken() == null)
            return null;

        final JsonObject jsonParams = new JsonObject();
        jsonParams.addProperty(VT_API_TOKEN_KEY, "Bearer "+UserProfile.getInstance().getToken());
        return jsonParams;
    }

    /*
     * Helper methods
     *
     */

    public static JsonObject parseResponseBody(retrofit.client.Response response)
    {
        String receivedBodyString = new String(((TypedByteArray) response.getBody()).getBytes());
        JsonObject obj = new JsonParser().parse(receivedBodyString).getAsJsonObject();
        return obj;
    }

    public static JsonObject parseResponseErrorBody(RetrofitError response)
    {
        String receivedBodyString = new String(((TypedByteArray) response.getBody()).getBytes());
        JsonObject obj = new JsonParser().parse(receivedBodyString).getAsJsonObject();
        return obj;
    }

    // logIn call
    public static void logIn() {
        final JsonObject jsonParams = getJsonParamsForLogIn();
        if(jsonParams == null) throw new InvalidParameterException("No user email and password"); // no user email and or password

        retrofit.client.Response response;
        try{
            response = mRestService.logIn(jsonParams);
        } catch (RetrofitError error){
            throw error;
        }

        // extract the token from a JSON response
        String receivedToken = "";
        if(response != null)
        {
            receivedToken = parseResponseBody(response).get("token").getAsString();
            UserProfile.getInstance().setToken(receivedToken);
        }

        // Update the REST adapter with an authorization token
        updateRESTAdapter();

    }

    // register call
    public static void register(String emailValue, String password, String userName, String name, String roles){
        final JsonObject jsonParams = new JsonObject();

        if(emailValue == null || password == null
                || userName == null || name == null
                || roles == null) throw new InvalidParameterException("Invalid parameters given");

        jsonParams.addProperty(VT_API_EMAIL_KEY, emailValue);
        jsonParams.addProperty(VT_API_PASSWORD_KEY, password);
        jsonParams.addProperty(VT_API_CONFIRM_PASSWORD_KEY, password);
        jsonParams.addProperty(VT_API_USERNAME_KEY, userName);
        jsonParams.addProperty(VT_API_NAME_KEY, name);
        jsonParams.addProperty(VT_API_ROLES_KEY, roles);

        retrofit.client.Response response;
        try{
            response = mRestService.register(jsonParams);
        } catch (RetrofitError error){
            throw error;
        }

        // extract the token from a JSON response
        String receivedToken = "";
        if(response != null)
        {
            receivedToken = parseResponseBody(response).get("token").getAsString();
            UserProfile.getInstance().setToken(receivedToken);

            // set other user data
            UserProfile.getInstance().setEmail(emailValue);
            UserProfile.getInstance().setName(name);
            UserProfile.getInstance().setPassword(password);
        }

        // Update the REST adapter with an authorization token
        updateRESTAdapter();

    }

    //logOut call
    public static void logOut(){
        final JsonObject jsonParams = getJsonParamsWithToken();
        if(jsonParams == null) throw new InvalidParameterException("Not logged in yet"); // user is not logged in yet

        retrofit.client.Response response;
        try {
            response = mRestService.logOut();
        }catch (RetrofitError error){
            throw error;
        }

        UserProfile.getInstance().resetUser();
        // Remove the authorization token from the REST Adapter
        updateRESTAdapter();

        //TODO: take to the home screen

    }

//    //get Questions call
    public static List<Question> getQuestions(){
        final JsonObject jsonParams = getJsonParamsWithToken();
        if(jsonParams == null) throw new InvalidParameterException("Not logged in yet"); // user is not logged in yet

        List<Question> response;

        try{
            response = mRestService.questions();
        } catch (RetrofitError error){
            throw error;
        }
        return response;
    }

    // register call
    public static void createQuestion(String courseNum, String quizQuestion, Options options, String correctAns) {
        final JsonObject jsonParams = new JsonObject();

        if (courseNum == null || quizQuestion == null
                || options == null || correctAns == null)
            throw new InvalidParameterException("Invalid parameters given");

        //pass token in request
//        jsonParams.addProperty(userToken, UserProfile.getInstance().getToken());
        jsonParams.addProperty(VT_API_TITLE, quizQuestion);
        //TODO: create options JSON object or pass it to this function
        jsonParams.addProperty(VT_API_OPTIONS, mGson.toJson(options));
        jsonParams.addProperty(VT_API_ANSWER, correctAns);
        jsonParams.addProperty(VT_API_CREATOR, UserProfile.getInstance().get_id());

//        retrofit.client.Response response;
        Question response;
        try {
            response = mRestService.createQuestion(jsonParams);
        } catch (RetrofitError error) {
            throw error;
        }

        // extract the token from a JSON response
//        String receivedToken = "";
//        if (response != null) {
////            receivedToken = parseResponseBody(response).get("token").getAsString();
////            UserProfile.getInstance().setToken(receivedToken);
//
////            // set other user data
////            UserProfile.getInstance().setEmail(emailValue);
////            UserProfile.getInstance().setName(name);
////            UserProfile.getInstance().setPassword(password);
////        }
//
//            // Update the REST adapter with an authorization token
////            updateRESTAdapter();
//
//        }
    }



}
