package ca.umanitoba.cs.votee.api;

import com.google.gson.Gson;

import ca.umanitoba.cs.votee.BuildConfig;
import retrofit.RestAdapter;

/**
 * Created by Levko on 2016-03-10.
 *
 * Authors:
 * Levko Ivanchuk
 */
public class APIHelper {

    final static String LOGTAG = APIHelper.class.getSimpleName();
    public final static String VT_API_HOST = BuildConfig.HOST;
    public static final String API_AUTH_FAIL = "Authentication fail";

    private static final RestAdapter mRestAdapter;
    private static final APIHelperInterface mRestService;
    private static final Gson mGson;
}
