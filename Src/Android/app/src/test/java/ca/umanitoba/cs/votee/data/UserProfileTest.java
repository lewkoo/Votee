package ca.umanitoba.cs.votee.data;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static junit.framework.Assert.assertEquals;
import static junit.framework.Assert.assertFalse;
import static junit.framework.TestCase.assertTrue;

/**
 * Created by Levko on 2016-03-14.
 */
public class UserProfileTest {

    @Before
    public void setUp() throws Exception {

    }

    @After
    public void tearDown() throws Exception {
        UserProfile.getInstance().resetUser();
    }

    @Test
    public void testGetInstance() throws Exception {
        UserProfile.getInstance();
        assertTrue(UserProfile.isInitialized());
    }

    @Test
    public void testGetToken() throws Exception {
        assertTrue(UserProfile.getInstance().getToken() == null);
    }

    @Test
    public void testSetToken() throws Exception {
        assertTrue(UserProfile.getInstance().getToken() == null);
        UserProfile.getInstance().setToken("abcd");
        assertEquals("abcd", UserProfile.getInstance().getToken());
    }

    @Test
    public void testGetPassword() throws Exception {
        assertTrue(UserProfile.getInstance().getPassword() == null);
    }

    @Test
    public void testSetPassword() throws Exception {
        assertTrue(UserProfile.getInstance().getPassword() == null);
        UserProfile.getInstance().setPassword("abcd");
        assertEquals("abcd", UserProfile.getInstance().getPassword());
    }

    @Test
    public void testGetEmail() throws Exception {
        assertTrue(UserProfile.getInstance().getEmail() == null);
    }

    @Test
    public void testSetEmail() throws Exception {
        assertTrue(UserProfile.getInstance().getEmail() == null);

        // should fail to validate this email
        UserProfile.getInstance().setEmail("abcd");
        assertEquals(null, UserProfile.getInstance().getEmail());

        // should pass validation
        UserProfile.getInstance().setEmail("test@test.com");
        assertEquals("test@test.com", UserProfile.getInstance().getEmail());
    }

    @Test
    public void testGetName() throws Exception {
        assertTrue(UserProfile.getInstance().getName() == null);
    }

    @Test
    public void testSetName() throws Exception {
        assertTrue(UserProfile.getInstance().getName() == null);
        UserProfile.getInstance().setName("abcd");
        assertEquals("abcd", UserProfile.getInstance().getName());
    }

    @Test
    public void testResetUser() throws Exception {
        UserProfile.getInstance().resetUser();

        assertTrue(UserProfile.getInstance().getToken() == null);
        assertTrue(UserProfile.getInstance().getPassword() == null);
        assertTrue(UserProfile.getInstance().getEmail() == null);
        assertTrue(UserProfile.getInstance().getName() == null);
    }

    @Test
    public void testIsLoggedIn() throws Exception {
        assertFalse(UserProfile.getInstance().isLoggedIn());

        UserProfile.getInstance().setToken("abcd");

        assertTrue(UserProfile.getInstance().isLoggedIn());

        UserProfile.getInstance().setToken(null);

        assertFalse(UserProfile.getInstance().isLoggedIn());

    }
}