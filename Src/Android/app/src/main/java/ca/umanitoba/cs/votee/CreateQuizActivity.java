package ca.umanitoba.cs.votee;

import android.content.Intent;
import android.os.AsyncTask;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;

import com.google.gson.annotations.SerializedName;

import java.security.InvalidParameterException;

import ca.umanitoba.cs.votee.api.APIHelper;
import ca.umanitoba.cs.votee.data.Options;
import ca.umanitoba.cs.votee.data.UserProfile;
import retrofit.RetrofitError;

import android.widget.AdapterView.OnItemSelectedListener;


public class CreateQuizActivity extends BaseActivity {

    private CreateQuizTask mCreateTask = null;

    private EditText courseNumView = null;
    private EditText quizQuestionView = null;
    private EditText opt1View = null;
    private EditText opt2View = null;
    private EditText opt3View = null;
    private EditText opt4View = null;
    private Spinner correctAnswerView = null;
    private String mServErr = null;

    private View  mCreateQuizFormView;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_create_quiz);

        super.setupTitlebar(R.menu.toolbar);

        Spinner spinner = (Spinner) findViewById(R.id.correct_answer);
        // Create an ArrayAdapter using the string array and a default spinner layout
        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this,
                R.array.options_array, android.R.layout.simple_spinner_item);
        // Specify the layout to use when the list of choices appears
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        // Apply the adapter to the spinner
        spinner.setAdapter(adapter);

        //set up the form
        courseNumView = (EditText)findViewById(R.id.course_number);
        quizQuestionView = (EditText)findViewById(R.id.course_title);
        opt1View = (EditText)findViewById(R.id.option1);
        opt2View = (EditText)findViewById(R.id.option2);
        opt3View = (EditText)findViewById(R.id.option3);
        opt4View = (EditText)findViewById(R.id.option4);
        correctAnswerView = (Spinner)findViewById(R.id.correct_answer);

        spinner.setOnItemSelectedListener(new OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
//                System.out.println("SOMETHING SELECTED");
                Log.v("item", (String) parent.getItemAtPosition(position));
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });

        mCreateQuizFormView = findViewById(R.id.create_form);

        Button mCreateButton = (Button)findViewById(R.id.create_quiz);
        if (mCreateButton != null) {
            mCreateButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    attemptCreate();
                }
            });
        }

    }//onCreate

    private void attemptCreate() {
        Log.v("item", "in attemptCreate()!");
        if(mCreateTask != null){
            return;
        }

        //reset errors
        courseNumView.setError(null);
        quizQuestionView.setError(null);
        opt1View.setError(null);
        opt2View.setError(null);
        opt3View.setError(null);
        opt4View.setError(null);


        // Store values at the time of the create quiz attempt.
        String courseNum = courseNumView.getText().toString();
        String quizQuestion = quizQuestionView.getText().toString();
        String quizOpt1 = opt1View.getText().toString();
        String quizOpt2 = opt2View.getText().toString();
        String quizOpt3 = opt3View.getText().toString();
        String quizOpt4 = opt4View.getText().toString();
        String correctAns = correctAnswerView.getSelectedItem().toString();

        View focusView = null;
        boolean cancel = false;

        //check for validity
        if(TextUtils.isEmpty(courseNum)){
            courseNumView.setError(getString(R.string.error_field_required));
            focusView = courseNumView;
            cancel = true;
        }

        if(TextUtils.isEmpty(quizQuestion)){
            quizQuestionView.setError(getString(R.string.error_field_required));
            focusView = quizQuestionView;
            cancel = true;
        }

        if(TextUtils.isEmpty(quizOpt1)){
            opt1View.setError(getString(R.string.error_field_required));
            focusView = opt1View;
            cancel = true;
        }

        if(TextUtils.isEmpty(quizOpt2)){
            opt2View.setError(getString(R.string.error_field_required));
            focusView = opt2View;
            cancel = true;
        }

        if(TextUtils.isEmpty(quizOpt3)){
            opt3View.setError(getString(R.string.error_field_required));
            focusView = opt3View;
            cancel = true;
        }

        if(TextUtils.isEmpty(quizOpt4)){
            opt4View.setError(getString(R.string.error_field_required));
            focusView = opt4View;
            cancel = true;
        }

        if(TextUtils.isEmpty(correctAns)){
            focusView = correctAnswerView;
            cancel = true;
        }

        if(cancel){
            //error in validation
            focusView.requestFocus();
        } else {
            //setup QOptions
            Options options = new Options(quizOpt1, quizOpt2, quizOpt3, quizOpt4);
            //create question
            mCreateTask = new CreateQuizTask(courseNum, quizQuestion, options, correctAns);
            mCreateTask.execute((Void)null);
        }
    }//attemptCreate


    public class CreateQuizTask extends AsyncTask<Void, Void, Boolean> {
        private final String courseNum;
        private final String quizQuestion;
        private final Options options;
        private final String correctAns;


        public CreateQuizTask(String courseNum, String quizQuestion, Options options, String correctAns) {
            this.courseNum = courseNum;
            this.quizQuestion = quizQuestion;
            this.options = options;
            this.correctAns = correctAns;
        }

        @Override
        protected Boolean doInBackground(Void... params) {

            // Issue an API call
            try {
                APIHelper.createQuestion(courseNum, quizQuestion, options, correctAns);
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

            return UserProfile.getInstance().isAuthenticated();
        }



        @Override
        protected void onPostExecute(final Boolean success) {
            mCreateTask = null;

            if (mServErr != null) {
                Snackbar snackbar = Snackbar.make(mCreateQuizFormView, mServErr, Snackbar.LENGTH_LONG);
                //redirect for now TODO: finish
                Intent intent = new Intent(CreateQuizActivity.this, QuizView.class);
                startActivity(intent);
                finish();
                //snackbar.show();
            } else if (success) {
                Intent intent = new Intent(CreateQuizActivity.this, QuizView.class);
                startActivity(intent);
                finish();
            } else {
//                mPasswordView.setError(getString(R.string.error_incorrect_password));
//                mPasswordView.requestFocus();
            }
        }

        @Override
        protected void onCancelled() {
            mCreateTask = null;
        }
    }
}
