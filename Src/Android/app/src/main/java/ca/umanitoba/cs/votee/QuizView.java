package ca.umanitoba.cs.votee;

import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;

import ca.umanitoba.cs.votee.fragments.CourseList;
import ca.umanitoba.cs.votee.fragments.QuizList;

/**
 * Created by bozgo_000 on 2016-03-15.
 */
public class QuizView extends FragmentActivity implements CourseList.OnFragmentInteractionListener, QuizList.OnFragmentInteractionListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.quiz_view);
//
    }

    @Override
    public void onFragmentInteraction(Uri uri) {

    }

}