package ca.umanitoba.cs.votee;

/**
 * Created by bozgo_000 on 2016-03-15.
 */

import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;

import ca.umanitoba.cs.votee.fragments.CourseList;
import ca.umanitoba.cs.votee.fragments.QuizList;


public class CourseView extends FragmentActivity implements CourseList.OnFragmentInteractionListener, QuizList.OnFragmentInteractionListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.course_view);
//
    }

    @Override
    public void onFragmentInteraction(Uri uri) {

    }

}
