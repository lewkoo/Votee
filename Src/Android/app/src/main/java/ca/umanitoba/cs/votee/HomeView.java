package ca.umanitoba.cs.votee;


import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.StrictMode;
import android.support.v4.app.FragmentActivity;
import android.widget.ArrayAdapter;
import android.widget.ListAdapter;
import android.widget.ListView;

import java.util.List;

import ca.umanitoba.cs.votee.api.APIHelper;
import ca.umanitoba.cs.votee.data.Question;
import ca.umanitoba.cs.votee.fragments.CourseList;
import ca.umanitoba.cs.votee.fragments.QuizList;


public class HomeView extends FragmentActivity implements CourseList.OnFragmentInteractionListener, QuizList.OnFragmentInteractionListener {

    private List<Question> questions;
    private ListView listView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home_view);

        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);

        getQuestions();

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

    protected void onQuizClick(){
        Intent quizIntent = new Intent(HomeView.this, QuizView.class);
        HomeView.this.startActivity(quizIntent);

    }

    protected void onCourseClick(){
        Intent courseIntent = new Intent(HomeView.this, CourseView.class);
        HomeView.this.startActivity(courseIntent);

    }
}
