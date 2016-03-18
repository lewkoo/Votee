package ca.umanitoba.cs.votee;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.RadioButton;
import android.widget.TextView;

import com.google.gson.JsonObject;

import java.util.Arrays;
import java.util.List;

import ca.umanitoba.cs.votee.data.Question;
import ca.umanitoba.cs.votee.data.UserProfile;

public class QuizDetailsActivity extends BaseActivity {
    //Defining views
    private TextView questionTitle;
    private RadioButton option1;
    private RadioButton option2;
    private RadioButton option3;
    private RadioButton option4;
    private Button voteButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_quiz_details);

        super.setupTitlebar(R.menu.toolbar);
        mActionBar.setDisplayHomeAsUpEnabled(true);

        //get question object
        Question selectedQuestion = (Question)getIntent().getSerializableExtra("Question");

        //initialize views
        questionTitle = (TextView)findViewById(R.id.textViewQuestionTitle);
        option1 = (RadioButton)findViewById(R.id.radioButton1);
        option2 = (RadioButton)findViewById(R.id.radioButton2);
        option3 = (RadioButton)findViewById(R.id.radioButton3);
        option4 = (RadioButton)findViewById(R.id.radioButton4);
//        voteButton = (Button)findViewById(R.id.vote_button);

//        String[] roles = UserProfile.getInstance().getRoles();
//        List rolesList = Arrays.asList(roles);
//
//        if(rolesList.contains("professor")){
//            //hide vote from prof
//            voteButton.setVisibility(View.INVISIBLE);
//        }

        //display values
        questionTitle.setText(String.valueOf(selectedQuestion.getTitle()));
        option1.setText(String.valueOf(selectedQuestion.getOptions().getOption1()));
        option2.setText(String.valueOf(selectedQuestion.getOptions().getOption2()));
        option3.setText(String.valueOf(selectedQuestion.getOptions().getOption3()));
        option4.setText(String.valueOf(selectedQuestion.getOptions().getOption4()));
    }
}
