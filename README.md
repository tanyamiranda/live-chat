# This is a live-chat app build with Vue and hosted on Firebase

This app is part of a course on Udemy course titled [Build Web Apps with Vue JS 3 & Firebase](https://www.udemy.com/course/build-web-apps-with-vuejs-firebase/). 
<br/><br/>
Before continuing, you must have a google account and you must create a <b>Firebase Project</b> and a <b>Firestore Database</b> within that project. Login to your google account and go to http://firebase.google.com to set this up.
<br/><br/>
Once you have created these elements, you can continue.
<br/>
## Project setup

### Install all packages for development environment
```
npm install
```

### Update Firebase Firestore configuration
In the file /src/firebase/config.js, change the credentials stored in the <b>firebaseConfig</b> variable to the credentials from the Firestore database you created earlier.

### Compiles and hot-reloads for development
```
npm run serve 
```

## ⭐ App is up and running on localhost! ⭐

![Sonny and Mariel high fiving.](https://content.codecademy.com/courses/learn-cpp/community-challenge/highfive.gif 'High Five')

Now that you have tested the app locally in your development environment, you are ready to deploy the app to your new firebase project.

## Firebase Setup

### Install Firebase Tools globally
In any command window, execute the following so that all your projects can access the firebase tools
```
npm install -g firebase-tools
``` 

### Log into your google account from within a terminal in your VSCode project
If you havent already logged in from a browser, this will open a window and ask you to log into your google account 
```
firebase login
```

### Initialize firebase
```
firebase init
``` 
This will prompt you with the following:
1. <b>Which Firebase features do you want to set up for this directory?</b> Only select <b>Hosting</b>
2. <b>Select New or Existing Project</b> I would create project ahead of time, but you can create it here too. 
3. <b>What do you want to use as your public directory?</b> Enter <b>dist</b> (vue compiles to thisfolder)
4. <b>Configure as a single-page app (rewrite all urls to /index.html)?</b> Enter <b>Yes</b>
5. <b>Set up automatic builds and deploys with GitHub? </b> Enter <b>No</b>

### Run build command to build files to the new "dist" directory
```
npm run build
```

### Deploy changes to firebase
```
firebase deploy
```
