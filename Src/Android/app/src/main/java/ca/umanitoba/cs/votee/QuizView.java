package ca.umanitoba.cs.votee;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.StrictMode;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import ca.umanitoba.cs.votee.api.APIHelper;
import ca.umanitoba.cs.votee.data.Question;
import ca.umanitoba.cs.votee.fragments.CourseList;
import ca.umanitoba.cs.votee.fragments.QuizList;

/**
 * Created by bozgo_000 on 2016-03-15.
 */
public class QuizView extends BaseActivity implements CourseList.OnFragmentInteractionListener, QuizList.OnFragmentInteractionListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.quiz_view);

        super.setupTitlebar();

        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);

        getQuestions();

        mActionBar.setDisplayHomeAsUpEnabled(true);
    }


    public void onItemClick(AdapterView<?> adapter, View v, int position, long id) {
        Question item = (Question) adapter.getItem(position);
        item.setSelected();
    }

    public void onSelectClick(View view){

        Intent questionIntent = new Intent(QuizView.this, AnswerActivity.class);
        QuizView.this.startActivity(questionIntent);


    }
    public void getQuestions(){

        ArrayAdapter<Object> listAdapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1);
        ListView listView = (ListView) findViewById(R.id.activity_main_listView);
        listView.setAdapter(listAdapter);

        listAdapter.addAll(APIHelper.getQuestions());
//        retrofit.client.Response response;
//        response = APIHelper.getQuestions();
    }

    @Override
    public void onFragmentInteraction(Uri uri) {

    }

}