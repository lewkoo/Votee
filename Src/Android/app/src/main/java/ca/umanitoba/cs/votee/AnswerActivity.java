package ca.umanitoba.cs.votee;

/**
 * Created by bozgo_000 on 2016-03-16.
 */

import ca.umanitoba.cs.votee.fragments.CourseList;

import android.net.Uri;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;

import org.json.JSONException;
import org.json.JSONObject;
import com.google.gson.JsonObject;

import java.util.List;

import ca.umanitoba.cs.votee.api.APIHelper;
import ca.umanitoba.cs.votee.data.Question;
import ca.umanitoba.cs.votee.fragments.CourseList;
import ca.umanitoba.cs.votee.fragments.QuizList;


public class AnswerActivity extends BaseActivity implements CourseList.OnFragmentInteractionListener, QuizList.OnFragmentInteractionListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.answer_view);

        super.setupTitlebar();

        mActionBar.setDisplayHomeAsUpEnabled(true);

        Question q = getQ();
        String answerA = "A";
        String answerB = "B";
        String answerC = "C";
        String answerD = "D";
        JSONObject jobj = q.getOptions();

        try {
            answerA = jobj.getString("answerA");
            answerB = jobj.getString("answerB");
            answerC = jobj.getString("answerC");
            answerD = jobj.getString("answerD");
        } catch (JSONException e) {
            e.printStackTrace();
        }

        TextView questionText = (TextView)findViewById(R.id.questionText);
        Button answerAButton = (Button)findViewById(R.id.buttonAnswerA);
        Button answerBButton = (Button)findViewById(R.id.buttonAnswerB);
        Button answerCButton = (Button)findViewById(R.id.buttonAnswerC);
        Button answerDButton = (Button)findViewById(R.id.buttonAnswerD);

        questionText.setText(q.getTitle());
        answerAButton.setText(answerA);
        answerBButton.setText(answerB);
        answerCButton.setText(answerC);
        answerDButton.setText(answerD);


    }

    public Question getQ(){
        List<Question>  QuestionList = APIHelper.getQuestions();
        int i = 0;

        while (!QuestionList.get(i).getSelected()){
            i++;
        }
        return QuestionList.get(i);
    }
    @Override
    public void onFragmentInteraction(Uri uri) {

    }
}
