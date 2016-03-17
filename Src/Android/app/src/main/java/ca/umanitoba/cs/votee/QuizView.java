package ca.umanitoba.cs.votee;

import android.content.Intent;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.StrictMode;
import android.support.design.widget.Snackbar;
import android.support.v4.app.FragmentActivity;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import java.io.Serializable;
import java.util.List;

import ca.umanitoba.cs.votee.api.APIHelper;
import ca.umanitoba.cs.votee.data.Question;
import ca.umanitoba.cs.votee.data.UserProfile;
import ca.umanitoba.cs.votee.fragments.CourseList;
import ca.umanitoba.cs.votee.fragments.QuizList;
import retrofit.RetrofitError;

/**
 * Created by bozgo_000 on 2016-03-15.
 */
public class QuizView extends BaseActivity implements CourseList.OnFragmentInteractionListener, QuizList.OnFragmentInteractionListener, ListView.OnItemClickListener {

    private List<Question> questions;
    private ListView listView;

    private View mQuizView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.quiz_view);

        super.setupTitlebar();
        mActionBar.setDisplayHomeAsUpEnabled(true);

        mQuizView = findViewById(R.id.quiz_view);

        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);

        ArrayAdapter<Object> listAdapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1);
        listView = (ListView) findViewById(R.id.activity_main_listView);
        listView.setAdapter(listAdapter);

        getQuestions();

        //set onClick listener to listView
        listView.setOnItemClickListener(this);
    }


//    public void onItemClick(AdapterView<?> adapter, View v, int position, long id) {
//        Question item = (Question) adapter.getItem(position);
//        item.setSelected();
//    }
//
//    public void onSelectClick(View view){
//
//        Intent questionIntent = new Intent(QuizView.this, AnswerActivity.class);
//        QuizView.this.startActivity(questionIntent);
//
//
//    }

    GetQuestionsTask mGetQuestionsTask;
    public void getQuestions(){
        mGetQuestionsTask = new GetQuestionsTask();
        mGetQuestionsTask.execute();

//        listAdapter.addAll(APIHelper.getQuestions());
//        retrofit.client.Response response;
//        response = APIHelper.getQuestions();
    }

//    TODO: finish
    private void showList(){
        //String array to store all the book names
        String[] items = new String[questions.size()];

        //Traversing through the whole list to get all the names
        for(int i=0; i<questions.size(); i++){
            //Storing names to string array
            items[i] = questions.get(i).getTitle();
        }

        //Creating an array adapter for list view
        ArrayAdapter adapter = new ArrayAdapter<String>(this,R.layout.questions_list,items);

        //Setting adapter to listview
        listView.setAdapter(adapter);
    }

    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
        //Creating an intent
        Intent intent = new Intent(this, QuizDetailsActivity.class);
//
//        //Getting the requested question from the list
        Question question = questions.get(position);
//
//        //Adding question details to intent
        intent.putExtra("Question", question);

        startActivity(intent);
    }

    @Override
    public void onFragmentInteraction(Uri uri) {

    }

    public class GetQuestionsTask extends AsyncTask<Void, Void, Boolean> {

        private String mServErr = null;

        @Override
        protected Boolean doInBackground(Void... params) {

            // Issue an API call
            try {
                questions = APIHelper.getQuestions();
            }
            catch (RetrofitError e)
            {
                RetrofitError.Kind kind = e.getKind();

                if (kind == RetrofitError.Kind.HTTP)
                {
                    mServErr = e.getMessage();
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
            mAuthTask = null;
            //showProgress(false);

            if (mServErr != null) {
                Snackbar snackbar = Snackbar.make(mQuizView, mServErr, Snackbar.LENGTH_LONG);
                snackbar.show();
            }
            else if (success) {
                showList();
            } else {
            }
        }

        @Override
        protected void onCancelled() {
            mAuthTask = null;
            //showProgress(false);
        }
    }
}