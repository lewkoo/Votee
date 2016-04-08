package ca.umanitoba.cs.votee.data;
import java.io.Serializable;


/**
 * Created by Yuriy on 16-04-07.
 */
public class Answer implements  Serializable{
    private String created;
    private UserProfile  student;
    private String answer;

    public Answer(){ };

    public String getCreated() {
        return created;
    }

    public void setCreated(String created) {
        this.created = created;
    }

    public UserProfile getStudent() {
        return student;
    }

    public void setStudent(UserProfile student) {
        this.student = student;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
}
