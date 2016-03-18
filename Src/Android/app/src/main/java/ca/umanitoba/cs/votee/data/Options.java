package ca.umanitoba.cs.votee.data;

/**
 * Created by Yuriy on 3/16/2016.
 */

import java.io.Serializable;

public class Options  implements Serializable {
    private String opt0;
    private String opt1;
    private String opt2;
    private String opt3;

    public Options(){

    }

    //constructor when creating Quiz
    public Options(String opt0, String opt1, String opt2, String opt3){
        this.opt0 = opt0;
        this.opt1 = opt1;
        this.opt2 = opt2;
        this.opt3 = opt3;
    }

    public String getOption1() {
        return opt0;
    }

    public String getOption2() {
        return opt1;
    }

    public String getOption3() {
        return opt2;
    }

    public String getOption4() {
        return opt3;
    }

    public void setOpt1(String opt0) {
        this.opt0 = opt0;
    }

    public void setOpt2(String opt1) {
        this.opt1 = opt1;
    }

    public void setOpt3(String opt2) {
        this.opt2 = opt2;
    }

    public void setOpt4(String opt3) {
        this.opt3 = opt3;
    }

    public void resetOptions(){
        this.opt0 = null;
        this.opt1 = null;
        this.opt2 = null;
        this.opt3 = null;
    }


}
