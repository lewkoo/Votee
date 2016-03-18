package ca.umanitoba.cs.votee.data;

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

    public Question(){

    }

    public Question(String token){
        this.token = token;
        _id = null;
        answer = null;
        created = null;
        creator = null;
        options = null;
        title = null;
        type = null;
        selected = false;
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

    public void setToken(String token){this.token = token;}

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public void setCreated(String created) {
        this.created = created;
    }

    public void setCreator(UserProfile creator) {
        this.creator = creator;
    }

    public void setOptions(Options options) {
        this.options = options;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void resetQuestion(){restoreQuestionData();}

    private void restoreQuestionData(){
        this.token = null;
        this._id = null;
        this.answer = null;
        this.created = null;
        this.creator = null;
        this.options = null;
        this.title = null;
        this.type = null;
        this.selected = false;

    }


}
