package ca.umanitoba.cs.votee;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

import ca.umanitoba.cs.votee.data.Question;

public class QuizDetailsActivity extends AppCompatActivity {
    //Defining views
    private TextView questionTitle;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_quiz_details);

        Question selectedQuestion = (Question)getIntent().getSerializableExtra("Question");

        //initialize views
        questionTitle = (TextView)findViewById(R.id.textViewQuestionTitle);

        //display values
        questionTitle.setText(String.valueOf(selectedQuestion.getTitle()));

    }
}
