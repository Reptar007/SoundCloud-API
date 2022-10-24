# Duckie Beats
![image](https://i.imgur.com/KEpFYEo.png)

***
# SoundCloud Clone

Duckir Beats is a full-stack application that is based on SoundCloud. In Duckie Beats, a user is able to listen and see all songs made on the app. Additionally, the user is able to create, update and delete songs. Every song has a comment section that non-users are able to see, but only logged-in users are able to create and delete. Visit [Raptor Music](https://sebastian-soundcloud.herokuapp.com/) to start creating the next big thing!

***
## Getting Started

### Backend
`cd /backend` to get started in the backend
  1. run `npm install` to install dependencies
  2. created a new folder named `.env` and copy and paste from the `.env.example` file
  3. run `npm start` to started the backend server
  4. `cd ..` to return back to root folder
  * It should be up and running but you can check by going to http://localhost:8000/

### Frontend
`cd /frontend` to get started in the frontend
  1. run `npm install` to install dependencies
  2. run `npm start` to get the frontend server
  * it should automatically load into your default browser if not got to http://localhost:3000/

***
## Built With:
Frameworks, Platforms, and Libraries: 

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

Database:

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

Hosted with:

![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

***
## 🤝 Connect with me:
<div id="badges">
  <a href="https://www.linkedin.com/in/sebastian-antonucci-014101109/">
    <img src="https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn Badge"/>
  </a>
  <a href="https://github.com/Reptar007">
    <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" alt="Github Badge"/>
  </a>
  <a href="https://www.facebook.com/Sebas4106">
    <img src="https://img.shields.io/badge/Facebook-%231877F2.svg?style=for-the-badge&logo=Facebook&logoColor=white" alt="Facebook Badge"/>
  </a>
</div>



***
[API DOCUMENTATION](https://github.com/Reptar007/SoundCloud-API/wiki/API-DOCUMENTATION)

Documentation of the API routes used to make requests to the database.

***

[DATABASE SCHEMA](https://github.com/Reptar007/SoundCloud-API/wiki/DB-SCHEMA)

SQLite3 database schema.

***

[FEATURE LIST](https://github.com/Reptar007/SoundCloud-API/wiki/FEATURES)

List of the functional features of the app. 

***

[REDUX STORE SHAPE](https://github.com/Reptar007/SoundCloud-API/wiki/SoundCloud-Redux-Store-Shape)

Pseudo code that illustrates the state of the Redux store for the two features that will be implemented. 

***

### Feature Descriptions

## Landing Page
* A quackster (user) is able to sign-up or login from the landing page
* on the landing page you are able to play a song
* The Nav Bar will change depending on the user logged in or not
* A new quackster is able to look at individual song pages cannot make a comment unless signed in
![image](https://i.imgur.com/YUm2ntu.png)
![image](https://i.imgur.com/kMlfJGF.png)
![image](https://i.imgur.com/IUa1kTD.png)

## User Login Page
* Once a quackster is logged in, they are able to see all songs created
* the Nav Bar will change with a create song link and a dropdown menu which they can see their profile and logout buttons
![image](https://i.imgur.com/TsDmNah.png)
![image](https://i.imgur.com/ZeLLLze.png)
