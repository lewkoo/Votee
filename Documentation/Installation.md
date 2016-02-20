
## 1 - Install and Run the Application

This project utilizes the MEAN.io stack and HTML/css/javascript to run in its current state.
In order to properly use and run the current working application, you must install components from each of these onto
your fresh operating system.  Follow this step by step guide to run the current working iteration of the application.
 

## 2 - Table of Contents
 
1. Preamble
2. Table Of Contents
3. Installing the Environment
4. Installing NodeJS
5. Installing MongoDB
6. Accessing the Repository
7. Checking out the project
8. Running the Application

## 3 - Installing the Environment

In order to run the project, MongoDB environment and NodeJS environments must be installed on your machine.
First, we will install NodeJS, then MongoDB.
The following sections will guide you through this process.

## 4 - Installing NodeJS

First, you will install NodeJS onto your machine.
1. To begin, go to https://nodejs.org/en/ to find the latest release for your current operating system.
2. Once you have completed this download, run through the installation by clicking on the installer
application (likely in your downloads folder).
3. Once you have navigated through the setup wizard choosing your desired options,
you should have the NodeJS environment active on your machine.


## 5 - Installing MongoDB

Next, you will install MongoDB onto your machine.
1. To begin, go to http://www.mongodb.org/downloads to find your operating system's current release.
2. Click the download button to receive the installer application.
3. Once the download is completed, run the installer and select your desired installation options.
4. Once the setup wizard completes, you should now be running the required prerequisites for running the project application.


## 6 - Accessing the Repository

In order to access the project source files, you will need to access the project repository on Git. The current repository can be found at https://github.com/lewkoo/Votee The best way to access this repository, is through a development environment using the GitHub desktop application.
It can be found here: https://desktop.github.com/
Once installed, the project can be synchronized and saved onto your current machine by running the application, adding the repository link (https://github.com/lewkoo/Votee) and choosing synchronize.

## 7 - Checking out the project (Optional)

The easiest way to retrieve the project files, is to open them in a javascript development environment.
We are currently utilizing WebStorm, which can be downloaded and installed here https://www.jetbrains.com/webstorm/download/
However, any other javascript development environment with Git or version control access would work also.
Once you have opened the WebStorm application, you can then hit open and navigate to the project files that
you just saved from the Git application.  Once they have loaded into the project, you can access all
front end and backend files related to the application.


## 8 - Running the Application

1. Open a terminal and navigate to the folder where the application was checked out to. Make sure you are in the main Votee directory.
2. In your terminal window type ``` npm install ``` This will install all the necessary dependencies needed to run the project.
3. If you would like to run the tests type  ```npm test ``` in your terminal window (make sure you are in main Votee directory). This will run all (acceptance and unit) tests for the application.
4. After install is completed, in your terminal window type: 
 ```node server ``` This will start a production version of the application.
5. Open a web browser (Firefox or Chrome) and navigate to http://localhost:3000