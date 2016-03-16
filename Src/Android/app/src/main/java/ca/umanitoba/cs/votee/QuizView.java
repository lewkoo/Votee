package ca.umanitoba.cs.votee;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.StrictMode;
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

import java.util.List;

import ca.umanitoba.cs.votee.api.APIHelper;
import ca.umanitoba.cs.votee.data.Question;
import ca.umanitoba.cs.votee.fragments.CourseList;
import ca.umanitoba.cs.votee.fragments.QuizList;

/**
 * Created by bozgo_000 on 2016-03-15.
 */
public class QuizView extends BaseActivity implements CourseList.OnFragmentInteractionListener, QuizList.OnFragmentInteractionListener {

    private List<Question> questions;

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
    public void getQuestions(){

        ArrayAdapter<Object> listAdapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1);
        ListView listView = (ListView) findViewById(R.id.activity_main_listView);
        listView.setAdapter(listAdapter);

        questions = APIHelper.getQuestions();

//        showList();

//        listAdapter.addAll(APIHelper.getQuestions());
//        retrofit.client.Response response;
//        response = APIHelper.getQuestions();
    }

//    TODO: finish
//    private void showList(){
//        //String array to store all the book names
//        String[] items = new String[questions.size()];
//
//        //Traversing through the whole list to get all the names
//        for(int i=0; i<questions.size(); i++){
//            //Storing names to string array
//            items[i] = questions.get(i).getTitle();
//        }
//
//        //Creating an array adapter for list view
//        ArrayAdapter adapter = new ArrayAdapter<String>(this,R.layout.simple_list,items);
//
//        //Setting adapter to listview
//        listView.setAdapter(adapter);
//    }

    @Override
    public void onFragmentInteraction(Uri uri) {

    }

}