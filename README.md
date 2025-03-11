# Live Chat

This app is part of a course on Udemy titled [Build Web Apps with Vue JS 3 & Firebase](https://www.udemy.com/course/build-web-apps-with-vuejs-firebase/). 

This is a basic live chat app built with Vue hosted on Firebase.

Before continuing, you must have a google account and you must create a **Firebase Project** and a **Firestore Database** within that project. Login to your google account and go to http://firebase.google.com to set this up.

Once you have created these elements, you can continue.

## Project setup

### Install all packages for development environment
```
npm install
```

### Setup Firebase environment variables
In the **.env.local** and **.env.production** files, add the following variables containing the credentials for the Firestore database you created earlier. These values can be found in the firebase console under your project settings. 

**NOTE:** If you don't have these files, you will have to create them in your project's base folder. You cannot deploy to firebase without a production environment file.

```
VUE_APP_FIREBASE_API_KEY=new-firebase-value
VUE_APP_FIREBASE_AUTH_DOMAIN=new-firebase-value
VUE_APP_FIREBASE_PROJECT_ID=new-firebase-value
VUE_APP_FIREBASE_STORAGE_BUCKET=new-firebase-value
VUE_APP_FIREBASE_MESSAGING_SENDER_ID=new-firebase-value
VUE_APP_FIREBASE_APP_ID=new-firebase-value
```

### Setup access codes in Firestore DB for registraion
This app allows registration only if the user enters a valid access code. This is a small level of security to prevent DOS or other malicious attempts for your site. 

In firebase, you will manually create a collection that contains unique codes to validate if the request to signup is being made with your permission. The collection will contain documents with the fields {"app-name", "code"}. You can have multiple entries per application. Sample entries for the "chat-app" application would be as follows: 
```
app-name="chat-app", code="codeformike"
app-name="chat-app", code="marysaccesscode"
app-name="chat-app", code="john3i2d0s"
```

### Setup application environment variables
In the **.env.local** and **.env.production** files, set the following variables to the collection you created to hold access codes. If, for example, you create a collection called "ValidationCodes" to hold the documents for the "chat-app" application, the variables would be as follows:
```
VUE_APP_AC=ValidationCodes
VUE_APP_AN=chat-app
```


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
1. **Which Firebase features do you want to set up for this directory?** Only select **Hosting**
2. **Select New or Existing Project** I would create project ahead of time, but you can create it here too. 
3. **What do you want to use as your public directory?** Enter **dist** (vue compiles to this folder)
4. **Configure as a single-page app (rewrite all urls to /index.html)?** Enter **Yes**
5. **Set up automatic builds and deploys with GitHub? ** Enter **No**

### Run build command to build files to the new "dist" directory
```
npm run build
```

### Deploy changes to firebase
```
firebase deploy
```
