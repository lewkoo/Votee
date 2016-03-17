package ca.umanitoba.cs.votee;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.RadioButton;
import android.widget.TextView;

import com.google.gson.JsonObject;

import ca.umanitoba.cs.votee.data.Question;

public class QuizDetailsActivity extends BaseActivity {
    //Defining views
    private TextView questionTitle;
    private RadioButton option1;
    private RadioButton option2;
    private RadioButton option3;
    private RadioButton option4;



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


        //display values
        questionTitle.setText(String.valueOf(selectedQuestion.getTitle()));
        option1.setText(String.valueOf(selectedQuestion.getOptions().getOption1()));
        option2.setText(String.valueOf(selectedQuestion.getOptions().getOption2()));
        option3.setText(String.valueOf(selectedQuestion.getOptions().getOption3()));
        option4.setText(String.valueOf(selectedQuestion.getOptions().getOption4()));


    }
}
