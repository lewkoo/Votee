package ca.umanitoba.cs.votee;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;

import ca.umanitoba.cs.votee.api.APIHelper;
import ca.umanitoba.cs.votee.data.UserProfile;
import retrofit.RetrofitError;

/**
 * Created by nathan on 16/03/16.
 */
public abstract class BaseActivity extends AppCompatActivity {
    protected UserLogoutTask mAuthTask;
    protected Toolbar mToolbar;
    protected ActionBar mActionBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    protected void setupTitlebar()
    {
        // my_toolbar is defined in the layout file
        mToolbar = (Toolbar) findViewById(R.id.my_toolbar);
        setSupportActionBar(mToolbar);

        // Get a support ActionBar corresponding to this toolbar
        mActionBar = getSupportActionBar();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.toolbar, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.action_sign_out:
                mAuthTask = new UserLogoutTask();
                mAuthTask.execute((Void) null);
                Intent intent = new Intent(this, LoginActivity.class);
                startActivity(intent);
                return true;

            default:
                // If we got here, the user's action was not recognized.
                // Invoke the superclass to handle it.
                return super.onOptionsItemSelected(item);

        }
    }

    public class UserLogoutTask extends AsyncTask<Void, Void, Boolean> {

        @Override
        protected Boolean doInBackground(Void... params) {

            // Issue an API call
            try {
                APIHelper.logOut();
            }
            catch (RetrofitError e)
            {
            }

            return !UserProfile.getInstance().isAuthenticated();
        }

        @Override
        protected void onPostExecute(final Boolean success) {
            mAuthTask = null;
            finish();
        }

        @Override
        protected void onCancelled() {
            mAuthTask = null;
        }
    }
}
