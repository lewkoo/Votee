package ca.umanitoba.cs.votee.data;

import org.json.JSONObject;

import java.io.Serializable;

/**
 * Created by Yuriy on 3/15/2016.
 */
public class Question  implements Serializable{
    private String token;
    private String _id;
    private String answer;
    //anything better for date?
    private String created;
    private UserProfile creator;
    private Options options;
    private String title;
    private String type;
    private boolean selected;


    //single instance for singleton pattern
    private static Question instance;

    public static Question getInstance() {
        if (instance == null)
            instance = new Question();
        return instance;
    }

    public String getToken() {
        return token;
    }

    public String get_id() {
        return _id;
    }

    public String getAnswer() {
        return answer;
    }

    public String getCreated() {
        return created;
    }

    public UserProfile getCreator() {
        return creator;
    }

    public Options getOptions() {
        return options;
    }

    public String getTitle() {
        return title;
    }

    public String getType() {
        return type;
    }

    public boolean getSelected(){ return selected; }

    public void setSelected(){selected = true;}
}
