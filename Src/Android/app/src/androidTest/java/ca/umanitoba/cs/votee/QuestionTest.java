package ca.umanitoba.cs.votee;

import org.junit.Test;
import org.junit.After;
import org.junit.Before;

import java.security.InvalidParameterException;

import static junit.framework.Assert.assertEquals;
import static junit.framework.Assert.assertFalse;
import static junit.framework.TestCase.assertTrue;


import ca.umanitoba.cs.votee.data.Options;
import ca.umanitoba.cs.votee.data.Question;
import ca.umanitoba.cs.votee.data.UserProfile;

import static org.junit.Assert.*;

/**
 * Created by bozgo_000 on 2016-03-17.
 */
public class QuestionTest {


    @Before
    public void setUp() throws Exception {

    }

    @After
    public void tearDown() throws Exception {
        Question.getInstance().resetQuestion();
    }

    @Test
    public void testGetInstance() throws Exception {
        Question.getInstance();
        assertTrue(Question.isInitialized());
    }


    @Test
    public void testGetToken() throws Exception {
        assertTrue(Question.getInstance().getToken() == null);
    }

    @Test
    public void testSetToken() throws Exception {
        assertTrue(Question.getInstance().getToken() == null);
        Question.getInstance().setToken("token111");
        assertEquals("token111", Question.getInstance().getToken());
    }

    @Test
    public void testGet_id() throws Exception {
        assertTrue(Question.getInstance().get_id() == null);
    }

    @Test
    public void testSet_id() throws Exception {
        assertTrue(Question.getInstance().get_id() == null);
        Question.getInstance().set_id("id111");
        assertEquals("id111", Question.getInstance().get_id());
    }

    @Test
    public void testGetAnswer() throws Exception {
        assertTrue(Question.getInstance().getAnswer() == null);
    }

    @Test
    public void testSetAnswer() throws Exception {
        assertTrue(Question.getInstance().getAnswer() == null);
        Question.getInstance().setAnswer("answer1");
        assertEquals("answer1", Question.getInstance().getAnswer());
    }

    @Test
    public void testGetCreated() throws Exception {
        assertTrue(Question.getInstance().getCreated() == null);
    }

    @Test
    public void testSetCreated() throws Exception {
        assertTrue(Question.getInstance().getCreated() == null);
        Question.getInstance().setCreated("01-01-1111");
        assertEquals("01-01-1111", Question.getInstance().getCreated());
    }

    @Test
    public void testGetTitle() throws Exception {
        assertTrue(Question.getInstance().getTitle() == null);
    }

    @Test
    public void testSetTitle() throws Exception {
        assertTrue(Question.getInstance().getTitle() == null);
        Question.getInstance().setTitle("titletest");
        assertEquals("titletest", Question.getInstance().getTitle());
    }

    @Test
    public void testGetType() throws Exception {
        assertTrue(Question.getInstance().getType() == null);
    }

    @Test
    public void testSetType() throws Exception {
        assertTrue(Question.getInstance().getType() == null);
        Question.getInstance().setType("questiontype");
        assertEquals("questiontype", Question.getInstance().getType());
    }

}
