package ca.umanitoba.cs.votee;

/**
 * Created by bozgo_000 on 2016-03-16.
 */

import android.net.Uri;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;

import ca.umanitoba.cs.votee.fragments.CourseList;
import ca.umanitoba.cs.votee.fragments.QuizList;


public class AnswerActivity extends BaseActivity implements CourseList.OnFragmentInteractionListener, QuizList.OnFragmentInteractionListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.answer_view);

        super.setupTitlebar();

        mActionBar.setDisplayHomeAsUpEnabled(true);

        TextView questionText = (TextView)findViewById(R.id.questionText);
        Button answerAButton = (Button)findViewById(R.id.buttonAnswerA);
        Button answerBButton = (Button)findViewById(R.id.buttonAnswerB);
        Button answerCButton = (Button)findViewById(R.id.buttonAnswerC);
        Button answerDButton = (Button)findViewById(R.id.buttonAnswerD);

        questionText.setText("Question goes here!");
        answerAButton.setText("Answer A");
        answerBButton.setText("Answer B");
        answerCButton.setText("Answer C");
        answerDButton.setText("Answer D");

    }

    @Override
    public void onFragmentInteraction(Uri uri) {

    }
}
