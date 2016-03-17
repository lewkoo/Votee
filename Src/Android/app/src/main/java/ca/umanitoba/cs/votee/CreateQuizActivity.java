package ca.umanitoba.cs.votee;

import android.content.Intent;
import android.os.AsyncTask;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;

import ca.umanitoba.cs.votee.api.APIHelper;
import ca.umanitoba.cs.votee.data.UserProfile;
import retrofit.RetrofitError;

import android.widget.AdapterView.OnItemSelectedListener;


public class CreateQuizActivity extends BaseActivity {

//    private CreateQuizTask mCreateTask = null;

    private EditText courseNum = null;
    private EditText courseTitle = null;
    private EditText opt1 = null;
    private EditText opt2 = null;
    private EditText opt3 = null;
    private EditText opt4 = null;

    private View  mCreateQuizView;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_create_quiz);

        super.setupTitlebar(R.menu.toolbar);

        Spinner spinner = (Spinner) findViewById(R.id.spinner);
        // Create an ArrayAdapter using the string array and a default spinner layout
        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this,
                R.array.options_array, android.R.layout.simple_spinner_item);
        // Specify the layout to use when the list of choices appears
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        // Apply the adapter to the spinner
        spinner.setAdapter(adapter);

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


    }//attemptCreate


//    public class CreateQuizTask extends AsyncTask<Void, Void, Boolean> {
//        private final String mFullName;
//        private final String mEmail;
//        private final String mUserName;
//        private final String mPassword;
//        private final String mUserRole;
//        private String mServErr = null;
//
//        public CreateQuizTask(String mFullName, String mEmail, String mPassword, String mUserName, String mUserRole) {
//            this.mFullName = mFullName;
//            this.mEmail = mEmail;
//            this.mPassword = mPassword;
//            this.mUserName = mUserName;
//            this.mUserRole = mUserRole;
//        }
//
//        @Override
//        protected Boolean doInBackground(Void... params) {
//
//            // Issue an API call
//            try {
//                APIHelper.register(mEmail, mPassword, mUserName, mFullName, mUserRole);
//            }
//            catch (RetrofitError e)
//            {
//                RetrofitError.Kind kind = e.getKind();
//
//                if (kind == RetrofitError.Kind.HTTP)
//                {
//                    if(e.getResponse().getStatus() == 400){
//                        mServErr = "Email / username already used. Try a different one";
//                    }
//                }
//                else
//                {
//                    mServErr = "Error contacting server. Please try again later";
//                }
//            }
//
//            return UserProfile.getInstance().isAuthenticated();
//        }
//
//
//
//        @Override
//        protected void onPostExecute(final Boolean success) {
//            mCreateTask = null;
//
//            if (mServErr != null) {
//                Snackbar snackbar = Snackbar.make(mRegisterFormView, mServErr, Snackbar.LENGTH_LONG);
//                snackbar.show();
//            } else if (success) {
//                Intent intent = new Intent(RegisterActivity.this, HomeView.class);
//                startActivity(intent);
//                finish();
//            } else {
//                mPasswordView.setError(getString(R.string.error_incorrect_password));
//                mPasswordView.requestFocus();
//            }
//        }
//
//        @Override
//        protected void onCancelled() {
//            mRegisterTask = null;
//        }
//    }
}
