package ca.umanitoba.cs.votee.data;

/**
 * Created by Yuriy on 3/16/2016.
 */

import org.json.JSONObject;

import java.io.Serializable;
import org.json.JSONObject;
import java.io.Serializable;

public class Options  implements Serializable {
    private String opt0;
    private String opt1;
    private String opt2;
    private String opt3;

    public Options(){

    }

    public String getOption1() {
        return opt0;
    }

    public String getOption2() {
        return opt1;
    }

    public String getOption3() {
        return opt2;
    }

    public String getOption4() {
        return opt3;
    }
}
