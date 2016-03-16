package ca.umanitoba.cs.votee;

import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;

import ca.umanitoba.cs.votee.fragments.CourseList;
import ca.umanitoba.cs.votee.fragments.QuizList;

/**
 * Created by bozgo_000 on 2016-03-15.
 */
public class QuizView extends AppCompatActivity implements CourseList.OnFragmentInteractionListener, QuizList.OnFragmentInteractionListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.quiz_view);

        // my_toolbar is defined in the layout file
        Toolbar myChildToolbar =
                (Toolbar) findViewById(R.id.my_toolbar);
        setSupportActionBar(myChildToolbar);

        // Get a support ActionBar corresponding to this toolbar
        ActionBar ab = getSupportActionBar();

        // Enable the Up button
        ab.setDisplayHomeAsUpEnabled(true);
    }

    @Override
    public void onFragmentInteraction(Uri uri) {

    }

}