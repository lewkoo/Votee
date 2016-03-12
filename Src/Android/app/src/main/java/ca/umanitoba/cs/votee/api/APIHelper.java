package ca.umanitoba.cs.votee.api;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.squareup.okhttp.OkHttpClient;

import java.security.InvalidParameterException;
import java.util.concurrent.TimeUnit;

import ca.umanitoba.cs.votee.BuildConfig;
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
    public static final  String VT_API_HOST = BuildConfig.HOST;
    public static final String VT_API_TOKEN_KEY = "authorization";
    public static final String VT_API_EMAIL_KEY = "email";
    public static final String VT_API_PASSWORD_KEY = "password";
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

    private static void updateRESTAdapter() {
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

    private static JsonObject parseResponseBody(retrofit.client.Response response)
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





}
