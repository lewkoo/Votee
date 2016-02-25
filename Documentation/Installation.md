# Setting up Votee

## Dependencies

### Quick start
Install the latest stable release of the following:

- Node.js - [Download](https://nodejs.org/en/download/)
- MongoDB - [Download](https://www.mongodb.org/downloads)
- Git - [Download](http://git-scm.com/downloads)

### Windows
- Download and install [Node.js](https://nodejs.org/en/download/)
- Follow the installation guide for [MongoDB](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/)
- Download and install [Git](http://git-scm.com/downloads)

### OS X
- Download and install [Node.js](https://nodejs.org/en/download/)
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

    npm install -g gulp bower
    npm install

## Running

To run Votee on your local machine, run

    gulp

This will start a development server on port 3000.  
Visit ``localhost:3000`` in your favorite browser.

To start a production server, instead run

    gulp production

## Running unit tests

    gulp test
