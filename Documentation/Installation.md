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

In your terminal, navigate to the Votee code folder and run the following commands.  
*On Windows, make sure you use Git Bash to run these commands.*

    npm install -g gulp bower
    npm install

## Running

*Before running Votee, make sure that you have started mongod.  
Instructions for doing so are located in the relevant installation guides in the dependencies section above.*

To run Votee on your local machine, run

    gulp

This will start a development server on port 3000.  
Visit ``localhost:3000`` in your favorite browser.

To start a production server, instead run

    gulp production

## Running unit tests

    gulp test

## Running end to end Selenium tests

    gulp e2e.test
