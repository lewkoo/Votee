package ca.umanitoba.cs.votee.data;

import java.security.InvalidParameterException;
import java.util.regex.Pattern;

/**
 * Created by Levko on 2016-03-10.
 */
public class UserProfile {

    public static final Pattern EMAIL_ADDRESS_PATTERN = Pattern.compile(
            "[a-zA-Z0-9\\+\\.\\_\\%\\-\\+]{1,256}" +
                    "\\@" +
                    "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}" +
                    "(" +
                    "\\." +
                    "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25}" +
                    ")+"
    );


    public enum UserRoles{
        student ("student"),
        professor ("professor"),
        administrator ("administrator"),
        unknown ("unknown");

        private final String name;

        private UserRoles(String s) {
            name = s;
        }

        public boolean equalsName(String otherName) {
            return (otherName != null) && name.equals(otherName);
        }

        public String toString() {
            return this.name;
        }
    }



    private String token;
    private String name;
    private String password;
    private String email;
    private String provider;
    private String[] roles;
    private String _id;

    // single instance
    private static UserProfile instance;

    public static UserProfile getInstance() {
        if (instance == null)
            instance = new UserProfile();
        return instance;
    }

    public UserProfile() {
        restoreUserData();
    }

    private void restoreUserData()
    {
        this.token = null;
        this.name = null;
        this.password = null;
        this.email = null;
        this.provider = null;
        this.roles = null;
        this._id = null;
    }


    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {

        boolean valid;

        valid = EMAIL_ADDRESS_PATTERN.matcher(email).matches();

        if(valid){
            this.email = email;
        }else{
            throw new InvalidParameterException("Email did not validate");
        }
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String[] getRoles() {
        return roles;
    }

    public void setRoles(String[] roles) {
        this.roles = roles;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public void resetUser() {
        restoreUserData();
    }

    public boolean isAuthenticated()
    {
        return this.token != null && this.token.length() > 0;
    }

    public boolean isLoggedIn() {
        return this.token != null;
    }

    public static boolean isInitialized(){
        if(instance == null){
            return false;
        }else{
            return true;
        }
    }
}
