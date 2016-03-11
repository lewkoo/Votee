package ca.umanitoba.cs.votee.data;

/**
 * Created by Levko on 2016-03-10.
 */
public class UserProfile {

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
        this.email = email;
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
}
