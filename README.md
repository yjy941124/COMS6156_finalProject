# COMS6156_finalProject
Final project code repository for COMS 6156

This is the code repository for our final project for COMS 6156, MLPRec.
This web application is written in JavaScript.
Backend: NodeJS
Frontend: JQuery
Database: MongoDB

### Install dependencies

In order to compile and run this app, you need to first install some dependencies.

First install NodeJS, https://nodejs.org/en/

Then install MongoDB, https://www.mongodb.com/

After that, go into the project directory, and type 

npm install --save 

This will install some dependencies by npm.

Note: You may still have some libraries left out because of the configuration set when you install NodeJS. If that's the case, after you run the app, the error message will ask you to install the specific package.
For example, the error message indicates body-parser is missing, then you need to do : 

npm install body-parse --save.

### Run the app

It's important to note that, for the safety concern, the e-mail address we used in this project has been removed from the github repo. If you want to see the e-mail feature running. You will need to manually add the e-mail account into the code. There are two blocks of codes you need to modify, both of them are inside the **app.js** file.

Also, you will have an empty database prior to your first run. If you would like to use our data, simply import the data we provided in this repository, namely, **output.json**, or feel free to import your own data by filling the survey out. Importing data can be done in both Mongo Compass(GUI) or in Mongo Shell by the mongoimport command.

Then you are ready to run the code!

First, open a terminal, type mongod. (You may need to do sudo and set the path for mongod first before running this command, again it depends on your computer's setting.)

Then, open a separate terminal, go into the project's root, and type npm start.

Now, go to your browser, type: localhost:8880 
You are all set!

Feel free to leave any questions in the Issues section.
