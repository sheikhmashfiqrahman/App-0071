### Description of the Application

- ```Aim```: A web application  that will enable users to watch classic movies and cartoons as well as manage the contents of their watch list. The web application will  utilize MongoDB, Express JS, React and Node JS that will provide a streaming platform to be used by subscribers of the platform.

- ``` Target Users```:
1. Stakeholder 
2. Product owner
3. Consumer/Subscriber of the Application
4. University Tutors 

### Folder/File structure: 

1. There are three components created inside the [Components Folder](src/Components). (MovieBox, Row, Search)

2. Under [Source Folder](src) there are pages and components folder created separately for importing into one App.js for rendering the application. (WatchList, MyList(Recently watched), Watch, Login, Register, Home, UserProfile). The Service module is used for using utlities like CRUD operation. 

3. A description of each file is given inside the code components. Please check for further details of what each script is doing. 

4. Controller, models, config and routes are created separately in the server side [Server Folder](server/src/)

### Core react concepts used: 

 Hooks: ```useEffect```, ```useState```, ```useRef```, ```useNavigate```, ```Custom componens``` etc.  


### MVP Features claimed 

- ```Registration Page```: This is the landing page of the application. The users would be able to Register  into the application by providing their firstname, lastname, username and password. The user would be given a notification if there is an exisiting username therefore, the username needs to be unique. The page is designed as per our mockup design. 

- ```Login Page```: After successfully registering, users would be able to login using their username and password. If the password is incorrect, they would not be able to login. 

- ```Home Page```: After successfully logging in, the the user shall see a home page containing all the movies in a row format view and recently watched section shall show all the recently watched movie in a row format view. The more view contains more views. A search bar and a navbar containing home, favourite list, watch list, profie and logout is designed in the home page.

- ```Watch Page```: Users can watch the movies from the list of movies from the home page and it will redirect them to the watch page and use the player to play the movie. Users can play the movies of their choice. 

- ``` Watch List Page```: Users can add movies in a watch list by clicking on the plus button. It will add the movies to a watchlist.

- ```My Favourite List Page```: Users can add movies to their favourite list by clicking the heart button, the favourtie movies get stored in a list and can be viewed by the user in the favourite watch list page.

- ``` Profile Page ```: User would be able to update their user information after logging into the application. The users are given permission change their firstname, lastname and password. 

- ```Search Function```: Users can search for individual movies by typing the movies in the search bar.

- ```Button Handlers```: 
    1. User would be able to use the heart button to add the movies to the favourite list page.
   
    2. User would be able to use the plus button to add the movies to the watch list page.

    3. User would be able to use the dislike button to remove the movies from the watch list and the favourtie list.



- ``` Logout```: The users are given the option to logout after using the application.


#### Check [ApplicationScreenshot folder](screenshots)


## Instructions

To install React and all the required packages, run:

```bash
npm install
```

To run the front-end development server:

```bash
npm start
```

To run the back-end development server:

```bash
npm run server
```

### Next Steps for the Project 

Our next step should be working towards the security of the application. 2 factor authentication should be added for better protection. In the future our plan is to use cloud storage like Azure or AWS for storing our movies. We need to run some back end testing for security. Overall, our next target is to work on the security of application and make much more responsive. As a MVP release we are happy with the progress we made. 

### Summary of the Team Role 

- Linh: Full Stack Developer/Product owner. Provided solution towards both front end and back end.
- James : Project manager/Developer/Front-End Designer. 
- Sheikh : Scrum master/Back-End engineer/Tester. 

### Project Tooling
- Communications: Used Facebook messanger for group communication. Held weekly meetings in ZOOM for Project Update. 
- Version Control: Used Three Branches for development.
- Sprint Management: Used Trello for sprint management. 






