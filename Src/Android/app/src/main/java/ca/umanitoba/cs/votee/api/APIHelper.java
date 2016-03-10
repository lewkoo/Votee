package ca.umanitoba.cs.votee.api;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;

import ca.umanitoba.cs.votee.BuildConfig;
import retrofit.RestAdapter;
import retrofit.client.OkClient;
import retrofit.converter.GsonConverter;

/**
 * Created by Levko on 2016-03-10.
 *
 * Authors:
 * Levko Ivanchuk
 */
public class APIHelper {

    final static String LOGTAG = APIHelper.class.getSimpleName();
    public static final  String VT_API_HOST = BuildConfig.HOST;
    public static final String API_AUTH_FAIL = "Authentication fail";

    private static final RestAdapter mRestAdapter;
    private static final APIHelperInterface mRestService;
    private static final Gson mGson;

    static OkClient okClient;

    // token for any further API calls that require
    // authentication
    private static String userToken = "";


    // static method to initialise the REST Adapter and
    // REST Service objects
    static {
        // Create the Gson Builder class
        mGson = new GsonBuilder().create();

        // Select the desired config level based on your build config
        RestAdapter.LogLevel desiredLogLevel = RestAdapter.LogLevel.NONE;
        if(BuildConfig.FLAVOR.equals("development"))
        {
            desiredLogLevel = RestAdapter.LogLevel.FULL;
        }else if (BuildConfig.FLAVOR.equals("production"))
        {
            desiredLogLevel = RestAdapter.LogLevel.BASIC;
        }

        // Create the REST Adapter
        mRestAdapter = new RestAdapter.Builder()
                .setLogLevel(desiredLogLevel)
                .setClient(okClient)
                // this might be needed
                /*
                .setRequestInterceptor(new RequestInterceptor() {
                    @Override
                    public void intercept(RequestFacade request) {
                        request.addHeader("Content-Type", "application/json");
                    }
                })
                 */
                .setEndpoint(VT_API_HOST)
                .setConverter(new GsonConverter(mGson))
                .build();

        // Create a REST service
        mRestService = mRestAdapter.create(APIHelperInterface.class);

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



}
