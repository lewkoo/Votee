package ca.umanitoba.cs.votee.data;

import junit.framework.Assert;

import ca.umanitoba.cs.votee.data.Options;
import ca.umanitoba.cs.votee.data.Question;

import static junit.framework.Assert.assertEquals;
import static junit.framework.Assert.assertTrue;

/**
 * Created by bozgo_000 on 2016-03-17.
 */
public class OptionsTest {

    private Options testOption;


    @Before
    public void setUp() throws Exception {
        testOption = new Options("Answer1", "Answer2", "Answer3", "Answer4");
        testOption.resetOptions();
    }

    @After
    public void tearDown() throws Exception {
        testOption.resetOptions();
    }


    @Test
    public void testGetOption1() throws Exception {
        Assert.assertEquals(testOption.getOption1(), null);
    }

    @Test
    public void testSetOption1() throws Exception {
        Assert.assertEquals(testOption.getOption1(), null);
        testOption.setOpt1("Ans1");
        Assert.assertEquals("Ans1", testOption.getOption1());
    }

    @Test
    public void testGetOption2() throws Exception {
        assertTrue(testOption.getOption2() == null);
    }

    @Test
    public void testSetOption2() throws Exception {
        assertTrue(testOption.getOption2() == null);
        testOption.setOpt2("Ans2");
        Assert.assertEquals("Ans2", testOption.getOption2());
    }

    @Test
    public void testGetOption3() throws Exception {
        assertTrue(testOption.getOption3() == null);
    }

    @Test
    public void testSetOption3() throws Exception {
        assertTrue(testOption.getOption3() == null);
        testOption.setOpt3("Ans3");
        Assert.assertEquals("Ans3", testOption.getOption3());
    }

    @Test
    public void testGetOption4() throws Exception {
        assertTrue(testOption.getOption4() == null);
    }

    @Test
    public void testSetOption4() throws Exception {
        assertTrue(testOption.getOption4() == null);
        testOption.setOpt2("Ans4");
        Assert.assertEquals("Ans4", testOption.getOption4());
    }

    @Test
    public void testResetOptions() throws Exception {
        testOption.resetOptions();

        assertTrue(testOption.getOption1() == null);
        assertTrue(testOption.getOption2() == null);
        assertTrue(testOption.getOption3() == null);
        assertTrue(testOption.getOption4() == null);
    }

}
