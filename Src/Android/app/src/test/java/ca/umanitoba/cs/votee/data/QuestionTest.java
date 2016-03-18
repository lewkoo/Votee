package ca.umanitoba.cs.votee.data;

import junit.framework.Assert;

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

    private Question testQuestion;


    @Before
    public void setUp() throws Exception {
        testQuestion = new Question("testtoken");
    }

    @After
    public void tearDown() throws Exception {
        testQuestion.resetQuestion();
    }


    @Test
    public void testGet_id() throws Exception {
        assertTrue(testQuestion.get_id() == null);
    }

    @Test
    public void testSet_id() throws Exception {
        assertTrue(testQuestion.get_id() == null);
        testQuestion.set_id("id111");
        Assert.assertEquals("id111", testQuestion.get_id());
    }

    @Test
    public void testGetAnswer() throws Exception {
        assertTrue(testQuestion.getAnswer() == null);
    }

    @Test
    public void testSetAnswer() throws Exception {
        assertTrue(testQuestion.getAnswer() == null);
        testQuestion.setAnswer("answer1");
        Assert.assertEquals("answer1", testQuestion.getAnswer());
    }

    @Test
    public void testGetCreated() throws Exception {
        assertTrue(testQuestion.getCreated() == null);
    }

    @Test
    public void testSetCreated() throws Exception {
        assertTrue(testQuestion.getCreated() == null);
        testQuestion.setCreated("01-01-1111");
        Assert.assertEquals("01-01-1111", testQuestion.getCreated());
    }

    @Test
    public void testGetTitle() throws Exception {
        assertTrue(testQuestion.getTitle() == null);
    }

    @Test
    public void testSetTitle() throws Exception {
        assertTrue(testQuestion.getTitle() == null);
        testQuestion.setTitle("titletest");
        Assert.assertEquals("titletest", testQuestion.getTitle());
    }

    @Test
    public void testGetType() throws Exception {
        assertTrue(testQuestion.getType() == null);
    }

    @Test
    public void testSetType() throws Exception {
        assertTrue(testQuestion.getType() == null);
        testQuestion.setType("questiontype");
        Assert.assertEquals("questiontype", testQuestion.getType());
    }

    @Test
    public void testResetQuestion() throws Exception {
        testQuestion.resetQuestion();

        assertTrue(testQuestion.get_id() == null);
        assertTrue(testQuestion.getAnswer() == null);
        assertTrue(testQuestion.getCreated() == null);
        assertTrue(testQuestion.getTitle() == null);
        assertTrue(testQuestion.getType() == null);
    }

}
