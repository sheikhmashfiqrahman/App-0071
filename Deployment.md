## Link for the Application 

```Click on the link:```
https://ancient-bastion-22463.herokuapp.com/



## Production build 

First we need to create a production build 

First we need to change the base Urls to relative Urls for all the urls that used in the project
For example: 
            localhost:8102/home  change to =>  /home

After that we can run this command "npm run build" to create a production build
(note: ensure you are in the root directory)

Next, in package.json, add "proxy":"http://localhost:8102" to ensure the the project works in the development mode


## Deployment to Heroku
Step 1: create an account

Step 2: install Heroku CLI "https://devcenter.heroku.com/articles/getting-started-with-nodejs"

Step 3: open a terminal/ command prompt then navigate to the root folder

Step 4: Run this command to login: heroku login. 
        press any key to open the browser and enter your username and password to login

Step 5: Back to the project, create a procfile and include the text below:
        release: npm run build
        web: node server/src/index.js

Step 6: In your backend server (config.js), make sure using the port declared in env file or port 8000 if PORT is not defined
            const port = process.env.PORT || '8000'

Step 7: Back to the terminal, create a heroku application by using this "heroku create"

Step 8: Deploy the project with this "git push heroku master"
        Now we can access the project using the newly created heroku link

        If you make any changes to the project , run this command to update the heroku app  : git push heroku master 





