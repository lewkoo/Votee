package ca.umanitoba.cs.votee;

import android.os.AsyncTask;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.RadioButton;
import android.widget.TextView;
import android.widget.RadioGroup;
import android.widget.Toast;



import com.google.gson.JsonObject;

import java.util.Arrays;
import java.util.List;

import ca.umanitoba.cs.votee.api.APIHelper;
import ca.umanitoba.cs.votee.data.Options;
import ca.umanitoba.cs.votee.data.Question;
import ca.umanitoba.cs.votee.data.UserProfile;
import retrofit.RetrofitError;

public class QuizDetailsActivity extends BaseActivity {
    private VoteTask mVoteTask = null;
    private String mServErr = null;


    //Defining views
    private TextView questionTitle;
    private RadioButton option1;
    private RadioButton option2;
    private RadioButton option3;
    private RadioButton option4;
    private Button voteButton;
    private RadioGroup radioGroup;
    private Question currQuestion;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_quiz_details);

        super.setupTitlebar(R.menu.toolbar);
        mActionBar.setDisplayHomeAsUpEnabled(true);

        //get question object
        Question selectedQuestion = (Question)getIntent().getSerializableExtra("Question");
        this.currQuestion = selectedQuestion;

        //initialize views
        questionTitle = (TextView)findViewById(R.id.textViewQuestionTitle);
        option1 = (RadioButton)findViewById(R.id.radioButton1);
        option2 = (RadioButton)findViewById(R.id.radioButton2);
        option3 = (RadioButton)findViewById(R.id.radioButton3);
        option4 = (RadioButton)findViewById(R.id.radioButton4);
        voteButton = (Button)findViewById(R.id.vote_button);

        String[] roles = UserProfile.getInstance().getRoles();
        UserProfile foo = UserProfile.getInstance();
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

        /* Initialize Radio Group and attach click handler */
        radioGroup = (RadioGroup) findViewById(R.id.radioGroup);
        radioGroup.clearCheck();

        /* Attach CheckedChangeListener to radio group */
        radioGroup.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup group, int checkedId) {
                RadioButton rb = (RadioButton) group.findViewById(checkedId);
                if (null != rb && checkedId > -1) {
                    Toast.makeText(QuizDetailsActivity.this, rb.getText(), Toast.LENGTH_SHORT).show();
                }

            }
        });
    }

    public void onSubmit(View v) {
        RadioButton rb = (RadioButton) radioGroup.findViewById(radioGroup.getCheckedRadioButtonId());
        option1.isSelected();
        String answer = "";
        if(option1.isChecked()){
            answer = "0";
            currQuestion.setSelectedAnswer("1");
            mVoteTask= new VoteTask(this.currQuestion);
            mVoteTask.execute((Void)null);

        } else if(option2.isChecked()){
            answer = "1";
            currQuestion.setSelectedAnswer("2");
            mVoteTask= new VoteTask(this.currQuestion);
            mVoteTask.execute((Void)null);

        } else if(option3.isChecked()){
            answer = "2";
            currQuestion.setSelectedAnswer("3");
            mVoteTask= new VoteTask(this.currQuestion);
            mVoteTask.execute((Void)null);

        }else if(option4.isChecked()){
            answer = "3";
            currQuestion.setSelectedAnswer("4");
            mVoteTask= new VoteTask(this.currQuestion);
            mVoteTask.execute((Void)null);

        } else {
            //vote
            Toast.makeText(QuizDetailsActivity.this, "Please select one of the available options", Toast.LENGTH_SHORT).show();
        }
//        Toast.makeText(QuizDetailsActivity.this, rb.getText(), Toast.LENGTH_SHORT).show();
    } //onSubmit

    public class VoteTask extends AsyncTask<Void, Void, Boolean> {
        private final Question q;

        public VoteTask(Question q) {
            this.q = q;
        }

        @Override
        protected Boolean doInBackground(Void... params) {

            // Issue an API call
            try {
                APIHelper.voteForQuestion(this.q);
            }
            catch (RetrofitError e)
            {
                RetrofitError.Kind kind = e.getKind();

                if (kind == RetrofitError.Kind.HTTP)
                {
//                    if(e.getResponse().getStatus() == 400){
//                        mServErr = "Email / username already used. Try a different one";
//                    }
                }
                else
                {
                    mServErr = "Error contacting server. Please try again later";
                }
            }
            return true;
        }

        @Override
        protected void onPostExecute(final Boolean success) {
            mVoteTask = null;

            if (mServErr != null) {
                Toast.makeText(QuizDetailsActivity.this, "Your vote has been received!", Toast.LENGTH_SHORT).show();
                //redirect for now TODO: finish
                Intent intent = new Intent(QuizDetailsActivity.this, QuizView.class);
                startActivity(intent);
                finish();
                //snackbar.show();
            } else if (success) {
                Intent intent = new Intent(QuizDetailsActivity.this, QuizView.class);
                startActivity(intent);
                finish();
            } else {
//                mPasswordView.setError(getString(R.string.error_incorrect_password));
//                mPasswordView.requestFocus();
            }
        }

        @Override
        protected void onCancelled() {
            mVoteTask = null;
        }
    }
}
