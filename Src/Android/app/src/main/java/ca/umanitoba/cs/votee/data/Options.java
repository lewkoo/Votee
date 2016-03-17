package ca.umanitoba.cs.votee.data;

/**
 * Created by Yuriy on 3/16/2016.
 */

import org.json.JSONObject;

import java.io.Serializable;
import org.json.JSONObject;
import java.io.Serializable;

public class Options  implements Serializable {
    private String option1;
    private String option2;
    private String option3;
    private String option4;


    //single instance for singleton pattern
    private static Options instance;

    public static Options getInstance() {
        if (instance == null)
            instance = new Options();
        return instance;
    }

    public String getOption1() {
        return option1;
    }

    public String getOption2() {
        return option2;
    }

    public String getOption3() {
        return option3;
    }

    public String getOption4() {
        return option4;
    }
}
