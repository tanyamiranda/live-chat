# Live Chat

Jump to section:
- [Setup Development Environment](#setup-development-environment)
- [Change Firebase project or Firestore database](#change-firebase-project-or-firestore-database)
- [Setup Firebase Hosting](#setup-firebase-hosting)


This app is part of a course on Udemy titled [Build Web Apps with Vue JS 3 & Firebase](https://www.udemy.com/course/build-web-apps-with-vuejs-firebase/). 

This is a basic live chat app built with Vue hosted on Firebase.

Before continuing, you must have a google account and you must create a **Firebase Project** and a **Firestore Database** within that project. Login to your google account and go to http://firebase.google.com to set this up.

## Setup Development Environment

### 1. Install all packages for development environment
```
npm install
```
### 2. Set Firebase environment variables
In the **.env.local** file, add the following variables containing the credentials for the Firestore database. These values can be found in the firebase console under your project settings. If you don't have this files, you will have to create it in your project's base folder. 

**Note: This file is not saved on github.**

```
VUE_APP_FIREBASE_API_KEY=firebase-value
VUE_APP_FIREBASE_AUTH_DOMAIN=firebase-value
VUE_APP_FIREBASE_PROJECT_ID=firebase-value
VUE_APP_FIREBASE_STORAGE_BUCKET=firebase-value
VUE_APP_FIREBASE_MESSAGING_SENDER_ID=firebase-value
VUE_APP_FIREBASE_APP_ID=firebase-value
```
### 3. Compile (with hot-reload) for development
```
npm run serve 
```

## ⭐ App is up and running on localhost! ⭐

![Sonny and Mariel high fiving.](https://content.codecademy.com/courses/learn-cpp/community-challenge/highfive.gif 'High Five')

Now that you have tested the app locally in your development environment, you are ready to setup your firebase dev environment so that you can deploy the app to your new firebase project.

## Change Firebase project or Firestore database

If you have cloned this app, you will need to create create a new **Firebase Project** and a **Firestore Database** within that project. From within that project you will also add a "web app" and select "Also set up Firebase Hosting for this app" option. This will create the environment variables for your development environment. 

Login to your google account and go to http://firebase.google.com to set this up.

### 1. Set application environment variables

In the **.env.local** file, add the following variables for the Firestore database. These values can be found in the firebase console under your project settings.

**Note: This file is not saved on github.**

```
VUE_APP_FIREBASE_API_KEY=new-firebase-value
VUE_APP_FIREBASE_AUTH_DOMAIN=new-firebase-value
VUE_APP_FIREBASE_PROJECT_ID=new-firebase-value
VUE_APP_FIREBASE_STORAGE_BUCKET=new-firebase-value
VUE_APP_FIREBASE_MESSAGING_SENDER_ID=new-firebase-value
VUE_APP_FIREBASE_APP_ID=new-firebase-value
```

### 2. Create access codes in Firebase for user registraion

This app uses access code as a security measure to ward off DOS or other malicious attacks. These are created directly in Firestore by the developer/admin and given to users directly (email, text, etc.). If the user does not enter a valid access code, registration is not executed and the user cannot login to the application.

In the firestore console, you will manually create a new collection in the firestore database. The collection will contain documents with the fields {"app-name", "code"}. You can have multiple entries per application. Sample entries for the "chat-app" application would be as follows: 
```
app-name="chat-app", code="codeformike"
app-name="chat-app", code="marysaccesscode"
app-name="chat-app", code="john3i2d0s"
```

In the same **env.local** file, set the following variable to the collection you created to hold access codes. If, for example, you create a collection called "ValidationCodes" to hold the access codes for the "chat-app" application, the variables would be as follows:

```
VUE_APP_AC=ValidationCodes
VUE_APP_AN=chat-app
```

### 3. Add security to firebase
Add rules to the firestore db that will preven unauthenticated users from accessing the chat data collection, and also only allow read requests to the collection holding validation codes.

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Restrict access to the "accessCodes" collection
    match /ValidationCodes/{doc} {
      allow read;
    }

    // Only allow acces to authenticated users
    match /chat-app/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}

```
### 4. Compile (with hot-reload) for development
```
npm run serve 
```
### 5. Test app with NEW Firebase/Firestore project on localhost

Test the application setup by registering a user with one of the access codes you've created in Firestore. Any connection issues will appear in the browser console. 

If there are no connection issues and your are receiving an Invalid Access Code error, make sure the collection name and app name environment variables match the entries in the Firestore database.

```
VUE_APP_AC=ValidationCodes
VUE_APP_AN=chat-app
```

If these values don't match the Firestore database setup, registration will not work, and you will not be able to log in.

## Setup Firebase Hosting

Now that you have tested the application locally, you are ready to setup you application for deployment to a production Firebase Hosting site. 

### 1. Install Firebase Tools globally
In any command window, execute the following so that all your projects can access the firebase tools
```
npm install -g firebase-tools
``` 

### 2. Log into your google account from within a terminal in your VSCode project
If you havent already logged in from a browser, this will open a window and ask you to log into your google account 
```
firebase login
```

### 3. Initialize firebase
```
firebase init
``` 
This will prompt you with the following:
1. **Which Firebase features do you want to set up for this directory?** Only select **Hosting**
2. **Select New or Existing Project** I would create project ahead of time, but you can create it here too. 
3. **What do you want to use as your public directory?** Enter **dist** (vue compiles to this folder)
4. **Configure as a single-page app (rewrite all urls to /index.html)?** Enter **Yes**
5. **Set up automatic builds and deploys with GitHub?** Enter **No**

### 4. Create .env.production file

Firebase deployment only uses the **.env.production** for its environemnt variables. You must create this file and copy the variables from the **.env.local** or set new variables if you have multiple environments. 

**Note: This file is not saved on github.**


### 5. Run build command to build files to the new "dist" directory

This must be done whenever there are changes to the application that need to be deployed to production.

```
npm run build
```

### 6. Deploy changes to firebase
```
firebase deploy
```

## ⭐ Your App is now live on Firebase Hosting site! ⭐

![Sonny and Mariel high fiving.](https://content.codecademy.com/courses/learn-cpp/community-challenge/highfive.gif 'High Five')

Test your app using the domains provided by Firebase Hosting.

## OPTIONAL PRODUCTION SETUP: Lock your Firebase API to your production domain(s). 

Your firebase credentials stored in the **.env.production** file can be read by hackers from your production website. By locking your API to your production domain, you can protect your site from Cross-Site Request Forgery (CSRF), essentially preventing hackers from using your credentials in their own app to update your data and authenticate users.

Before proceeding, read [**Development Environment Restriction**](#development-environment-restriction) below.

### 1. Get your production domains from Firebase
Go into your project in firebase and go to "Hosting" service and find all the domains set up for your app. If you have a custom domain, this will be included in this list. You can restrict access to custom domain if you wish.

### 2. Setup API Restrictions in Google Developer Console
Go to the Google Develper Console. Currently, the url is https://console.cloud.google.com/apis/ , but this may change. Do a search to get the correct site.  

1. Select your project from the list of projects, and then go to **Credentials** on the menu. 

2. Under **API Keys**, find the Browser key created by firebsae when you created the hosting site.

3. Under **Application restrictions**, select "Websites" and add your domains to the list.  

4. Click Save. Changes normally take up to 5 minutes to take effect.

For more information, read the [documentation](https://cloud.google.com/docs/authentication/api-keys) about this feature from Google.


### Development Environment Restriction 

Once you lock your production Firebase APIs, the same credentials will no longer work in your development environment. There are several ways you can securly work around this security feature and still keep your production credentials securly locked to your production domains. 

You can create a separate web app within Firebase (**without a Hosting site**) so that you can use that new API key in your local development environement to access the same data as production. Since this API key is not being used on any public website, this is relatively secure. Also, you can also create a new firestore database within the same project or within an entirely new project if you wish to completely separate development and production data. 

Either way, the credential values would be stored in the **.env.local** file and would be different in the **.env.production** file. When deploying changes, firebase only looks at the **.env.production** file. 

**IMPORTANT: Make sure github ignores these files**

In the **.gitignore** file, enter the following if it's not already there:
```
# environment files
.env.*
```
