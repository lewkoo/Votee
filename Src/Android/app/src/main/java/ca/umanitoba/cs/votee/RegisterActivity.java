package ca.umanitoba.cs.votee;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.RadioButton;

public class RegisterActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
    }

    @Override
    public void onBackPressed() {
        new AlertDialog.Builder(this)
                .setTitle("Really Exit?")
                .setMessage("Are you sure you want to stop registering an account?")
                .setNegativeButton(android.R.string.no, null)
                .setPositiveButton(android.R.string.yes, new DialogInterface.OnClickListener() {

                    public void onClick(DialogInterface arg0, int arg1) {
                        finish();
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
                // set the intended role to Student
                break;
            case R.id.radioButtonProf:
                if(checked)
                // set the intended role to Prof
                break;

            case R.id.radioButtonAdmin:
                if(checked)
                // set the intended role to Admin
                break;
        }

    }

}
