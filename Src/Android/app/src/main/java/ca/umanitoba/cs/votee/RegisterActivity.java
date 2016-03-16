package ca.umanitoba.cs.votee;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.view.View;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.TextView;

import java.security.InvalidParameterException;

import ca.umanitoba.cs.votee.api.APIHelper;
import ca.umanitoba.cs.votee.data.UserProfile;
import retrofit.RetrofitError;

import static ca.umanitoba.cs.votee.LoginActivity.isPasswordValid;

public class RegisterActivity extends AppCompatActivity {

    private UserRegisterTask mRegisterTask = null;

    private UserProfile.UserRoles selectedRole = null;

    private EditText mFullNameView;
    private AutoCompleteTextView mEmailView;
    private EditText mUserNameView;
    private EditText mPasswordView;
    private EditText mPasswordConfirmView;

    private TextView mRoleTextLabel;

    private View mRegisterFormView;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
        // Set up the register form
        mFullNameView = (EditText) findViewById(R.id.full_name);
        mEmailView = (AutoCompleteTextView) findViewById(R.id.email);
        mUserNameView = (EditText) findViewById(R.id.user_name);
        mPasswordView = (EditText) findViewById(R.id.password);
        mPasswordConfirmView = (EditText) findViewById(R.id.password_repeat);

        Button mRegisterButton = (Button) findViewById(R.id.register_button);
        if (mRegisterButton != null) {
            mRegisterButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    attemptRegister();
                }
            });
        }

        mRoleTextLabel = (TextView) findViewById(R.id.roleTextLabel);
        mRegisterFormView = findViewById(R.id.register_form);
    }

    private void attemptRegister() {
        if (mRegisterTask != null) {
            return;
        }

        // Reset errors
        mFullNameView.setError(null);
        mEmailView.setError(null);
        mUserNameView.setError(null);
        mPasswordView.setError(null);
        mPasswordConfirmView.setError(null);

        // Store values at the time of the register attempt.
        String name = mFullNameView.getText().toString();
        String email = mEmailView.getText().toString();
        String userName = mUserNameView.getText().toString();
        String password = mPasswordView.getText().toString();
        String confirmPassword = mPasswordConfirmView.getText().toString();
        String role = null;

        boolean cancel = false;
        View focusView = null;

        //Check for valid name
        if(TextUtils.isEmpty(name)){
            mFullNameView.setError(getString(R.string.error_field_required));
            focusView = mFullNameView;
            cancel = true;
        }

        //Check for valid user name
        if(TextUtils.isEmpty(userName)){
            mUserNameView.setError(getString(R.string.error_field_required));
            focusView = mUserNameView;
            cancel = true;
        }

        //Check for valid email
        try {
            if(TextUtils.isEmpty(email)){
                mEmailView.setError(getString(R.string.error_field_required));
                focusView = mEmailView;
                cancel = true;
            }else{
                UserProfile.getInstance().setEmail(email); // throws InvalidParameterException if email is invalid
            }


        } catch (InvalidParameterException ipfe){
            mEmailView.setError(getString(R.string.error_invalid_email));
            focusView = mEmailView;
            cancel = true;
        }

        // Check for a valid role
        if(selectedRole == null){
            mRoleTextLabel.setError(getString(R.string.role_not_selected_error_message));
            focusView = mRoleTextLabel;
            cancel = true;
        }else{
            role = selectedRole.toString();
        }

        // Check for a valid password, if the user entered one.
        if (TextUtils.isEmpty(password))  {
            mPasswordView.setError(getString(R.string.error_field_required));
            focusView = mPasswordView;
            cancel = true;
        }else if(!isPasswordValid(password, mPasswordView)){
            focusView = mPasswordView;
            cancel = true;
        }

        // Check for a valid confirm password, if the user entered one.
        if (TextUtils.isEmpty(confirmPassword))  {
            mPasswordConfirmView.setError(getString(R.string.error_field_required));
            focusView = mPasswordConfirmView;
            cancel = true;
        }else if(!isPasswordValid(confirmPassword, mPasswordConfirmView)){
            focusView = mPasswordConfirmView;
            cancel = true;
        }

        //Check if passwords match
        if(!TextUtils.equals(password, confirmPassword)){
            mPasswordView.setError("Passwords do not match");
            mPasswordView.setText("");
            mPasswordConfirmView.setText("");
            focusView = mPasswordView;
            cancel = true;
        }

        if (cancel){
            // There was an error in the validation
            // Do not attempt registration
            focusView.requestFocus();
        } else {
            mRegisterTask = new UserRegisterTask(name, email, password, userName, role);
            mRegisterTask.execute((Void) null);
        }


    }


    @Override
    public void onBackPressed() {
        new AlertDialog.Builder(this)
                .setTitle(R.string.registration_cancel_confirm_message)
                .setMessage(R.string.registration_cancel_confim_detail_message)
                .setNegativeButton(android.R.string.no, null)
                .setPositiveButton(android.R.string.yes, new DialogInterface.OnClickListener() {

                    public void onClick(DialogInterface arg0, int arg1) {
                        finish(); // finish this activity. Automatically returns back to login
                    }
                }).create().show();
    }

    public void onRadioButtonClicked(View view) {
        // Is the button checked?
        boolean checked = ((RadioButton)view).isChecked();

        // Check which radio button was clicked
        switch (view.getId()){
            case R.id.radioButtonStudent:
                if(checked)
                    selectedRole = UserProfile.UserRoles.student;
                break;
            case R.id.radioButtonProf:
                if(checked)
                    selectedRole = UserProfile.UserRoles.professor;
                break;
            case R.id.radioButtonAdmin:
                if(checked)
                    selectedRole = UserProfile.UserRoles.administrator;
                break;
        }

    }

    public class UserRegisterTask extends AsyncTask<Void, Void, Boolean> {
        private final String mFullName;
        private final String mEmail;
        private final String mUserName;
        private final String mPassword;
        private final String mUserRole;
        private String mServErr;

        public UserRegisterTask(String mFullName, String mEmail, String mPassword, String mUserName, String mUserRole) {
            this.mFullName = mFullName;
            this.mEmail = mEmail;
            this.mPassword = mPassword;
            this.mUserName = mUserName;
            this.mUserRole = mUserRole;
        }

        @Override
        protected Boolean doInBackground(Void... params) {

            // Issue an API call


            // Issue an API call
            try {
                APIHelper.logIn();
            }
            catch (RetrofitError e)
            {
                RetrofitError.Kind kind = e.getKind();

                if (kind == RetrofitError.Kind.HTTP)
                {
                    if (e.getResponse().getStatus() != 401) {
                        mServErr = e.getMessage();
                    }
                }
                else
                {
                    mServErr = "Error contacting server. Please try again later";
                }
            }

            APIHelper.register(mEmail, mPassword, mUserName, mFullName, mUserRole);

            return UserProfile.getInstance().isAuthenticated();
        }



        @Override
        protected void onPostExecute(final Boolean success) {
            mRegisterTask = null;

            if (mServErr != null) {
                Snackbar snackbar = Snackbar.make(mRegisterFormView, mServErr, Snackbar.LENGTH_LONG);
                snackbar.show();
            }
            if (success) {
                Intent intent = new Intent(RegisterActivity.this, HomeView.class);
                startActivity(intent);
                finish();
            } else {
                mPasswordView.setError(getString(R.string.error_incorrect_password));
                mPasswordView.requestFocus();
            }
        }

        @Override
        protected void onCancelled() {
            mRegisterTask = null;
        }
    }

}
