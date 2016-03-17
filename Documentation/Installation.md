# Setting up Votee

## Dependencies

### Quick start
Install the latest stable release of the following:

- Node.js - [Download](https://nodejs.org/en/download/stable/)
- MongoDB - [Download](https://www.mongodb.org/downloads)
- Git - [Download](http://git-scm.com/downloads)

### Windows
- Download and install [Node.js](https://nodejs.org/en/download/stable/)
- Follow the installation guide for [MongoDB](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/)
- Download and install [Git](http://git-scm.com/downloads)  
You'll need git bash in order to run the rest of the commands.
If you do not have Python installed, you must install it before proceeding. [Download Python here](https://www.python.org/downloads/release/python-2711/)

Also, sometimes certain packages fail to install on Windows if a C++ compiler is not present. This can be fixed by doing the following:

 - Install [Visual Studio Community 2013](http://go.microsoft.com/fwlink/?LinkId=517284)
 - Run `npm config set msvs_version 2013 --global`
 - Run `npm install bcrypt`

### OS X
- Download and install [Node.js](https://nodejs.org/en/download/stable/)
- Follow the installation guide for [MongoDB](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/)
- Download and install [Git](http://git-scm.com/downloads)

### Debian/Ubuntu based

Ubuntu ships with an outdated version of nodejs.  
The following command will add an updated repository.

    curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -

Install nodejs, mongodb, and git.

    sudo apt-get install nodejs mongodb git

## Get the code

    git clone https://github.com/lewkoo/Votee.git

## Prerequisite packages

To install prerequisite packages on your local machine, first change directory

    cd Src/Web

In your terminal, navigate to the Votee code folder and run the following commands.  
*On Windows, make sure you use Git Bash to run these commands.*

    npm install -g gulp bower
    npm install
    


On Windows, sometimes certain front-end packages fail to install correctly. We found a few ways to remedy this, however, the easiest one is to run:

    bower install -f
    

## Running

*Before running Votee, make sure that you have started mongod.  
Instructions for doing so are located in the relevant installation guides in the dependencies section above.*

To run Votee on your local machine, first change directory

    cd Src/Web

then run

    gulp

This will start a development server on port 3000.  
Visit [localhost:3000](http://localhost:3000) in your favorite browser.

To start a production server, instead run

    gulp production

## Running unit tests

    gulp test

## Running end to end Selenium tests

    gulp e2e.test


# Setting up Android application

## Dependencies

There are two ways of running our Android Application: through an IDE and command line. We describe both ways. 

## Option 1: Running with an IDE
### Install the latest release of Android Studio

You can download the IDE here: [Android Studio download link](http://developer.android.com/sdk/index.html#win-bundle)
You have to, of course, select the correct version for your operating system.

### Open the project with Android Studio

Next, you will need to open the project through the Android Studio. Instructions on how to do that are available here: 

[Opening a project with Android Studio](https://github.com/dogriffiths/HeadFirstAndroid/wiki/How-to-open-a-project-in-Android-Studio)

However, you need to point the application into `Votee/Src/Android`

### Running the application

Simply select `Run > Run app`

You will be presented with a Device Chooser menu. If you have an Android device connected into your computer with Developer Mode enabled, you can run Votee on that device. Alternatively, you can select to run Votee on an emulator. When you are done, hit "OK"

### Running unit tests

Click on `Build Variants` in the bottom left part of the IDE

In the `Test Artifact` drop-down, select `Unit Tests`

In Project window, find `java/ca.umanitoba.cs.votee (test)`. Right click on the folder, and select `Run Run Unit Test'

A Unit Test runner will appear in the bottom part of the screen, indicating which tests passed and which failed.

### Running end-to-end tests

Click on `Build Variants` in the bottom left part of the IDE

In the `Test Artifact` drop-down, select `Android Instrumentation Tests`

In Project window, find `java/ca.umanitoba.cs.votee (androidTest)`. Right click on the folder, and select `Run Run E2E Test'

Depending on which device you run the tests, the device should be showing the tasks executing. The test results will also appear in the IDE.

## Option 2: Running with a Command line

TODO: finish later
