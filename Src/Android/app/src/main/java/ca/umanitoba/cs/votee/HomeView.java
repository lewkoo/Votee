package ca.umanitoba.cs.votee;


import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;

import ca.umanitoba.cs.votee.fragments.CourseList;
import ca.umanitoba.cs.votee.fragments.QuizList;


public class HomeView extends FragmentActivity implements CourseList.OnFragmentInteractionListener, QuizList.OnFragmentInteractionListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home_view);
//      TODO: implement and uncomment
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
