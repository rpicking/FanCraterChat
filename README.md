# FanCrater Chat User Manual

###### Table of Contents

[Walkthrough](#walkthrough)  
[Problem Statement](#problem-statement)
[System Requirements](#system-requirements)
[Conceptual Design](#conceptual-design)
[User Interface Design](#user-interface-design)
[Functional Requirements](#functional-requirements)
[Implementation](#implementation)
[Testing](#testing)

## Walkthrough

-   When a user selects the FanCrater App from their device, they will be directed to the Splash screen where they can choose to login. On this screen the user does not have access the the drawer and cannot proceed without logging in or already being logged in.
    ![Login Screen](https://i.imgur.com/tNJFhkAl.jpg "Login Screen")

-   Once a user has selected to login from the Splash screen, they will be directed to an authorization page. If the user has an account, they can opt to sign in with Google or enter the user information. Once entered, the user will select Log In at the bottom of the screen. On successful login, the user will be directed to the “Map” screen.
    ![Auth0 Login](https://i.imgur.com/g1oxHRHl.png "Auth0 Login")

-   If a user does not have an account, they will need to select Sign Up. A user has the option to Sign Up by using google or entering their email and password. Once the information has been entered, the user will click Sign Up at the bottom of the screen. On successful sign up, the user will directed to the “Map” screen.
    ![Auth0 Signup](https://i.imgur.com/mRLLhfsl.png "Auth0 Signup")

-   The Map screen will show up with pins for other users in the same area who share the same Notable. All screens from this point will now have access to the menu drawer. To view it, slide from the left edge of the screen or click the menu button at the top right on all screens. To see more information about a user, select a pin.
    ![Map Screen](https://i.imgur.com/oF9haZOl.png "Map Screen")

-   Once a pin is selected, information about that user will pop up on the screen. To view their user profile, simply click anywhere on the card. While the map does show a waypoint for yourself on the map, clicking on your information card will not do anything. The notable that the users share with be listed underneath the username.
    ![Map Screen Click On User](https://i.imgur.com/t5LLUlZl.png "Map Screen Click On User")

-   The user profile has information about the user’s location, their notables, and a small blurb about themselves. You may click the back button at the top left to return to the map. To chat with a user, select Chat at the bottom of the screen.
    ![Other User Profile](https://i.imgur.com/smXt63Ml.png "Other User Profile")

-   A chat screen will appear when Chat is selected. If you have not previously chatted with the user, no messages appear. If you have chatted with the user before, old messages will appear. If the other user is currently typing you will see a “User is typing…” notification above the input bar. Clicking on the other user’s picture will take you to their profile page. To see all current chats with other users, press the back arrow in the top left-hand corner of the screen.
    ![Chat Screen](https://i.imgur.com/R48WEJPl.png "Chat Screen")

-   The chat overview screen shows all open chats with other users. To go back to a previous chat, simply click on that chat to open it. Clicking on one of the profile pictures on the left side of the screen will take you to that users profile page. A user can navigate to other screens on the app by pressing the “menu” button in the top right hand corner or by pressing the back arrow in the top left hand corner.
    ![Chat Overview Screen](https://i.imgur.com/xm9kuVLl.png "Chat Overview Screen")

-   When the menu button is pressed from any screen in the app, or the user swipes from the left side of the screen, a drawer will slide out with options to navigate to other areas of the app. From here the user can select to go to the Map, the Chat screen, the Setting screen, or logout which will log you out and return you to the splash screen.
    ![Side Drawer](https://i.imgur.com/sBYBsE0l.png "Side Drawer")

-   When the Setting screen is selected from the drawer, the user will be directed to their own profile page. The profile page displays the user ID, avatar, and current location. The user’s notables are listed below the user information as well as a small blurb about the user. A logout button at the bottom of the screen will log the user out of their profile and navigate back to the original login screen.  
    ![Own Profile Screen](https://i.imgur.com/2wZmmjOl.png "Own Profile Screen")

*   Users can select the Options tab from the Settings screen by either swiping on the screen or selecting the tab. Once the Options tab has been selected the user can choose how they would like to share their location to other users that share the same Notables. The default is set to use Current Location, but the user can click the arrow to select Zip Code. To navigate to other areas in the app, the user can select the “menu” at the top right-hand corner of the screen or swiping from the left side to open the navigation drawer. The back arrow, located on the top left-hand corner of the screen will navigate back to the previous screen.
    ![Options Screen](https://i.imgur.com/SK2PWCPl.png "Options Screen")

*   If the arrow is selected, the user has the option to update their zip code. A user must enter a 5-digit zip code, otherwise a red circle with an X will appear. Once a 5-digit zip code has been entered, a green check mark will appear indicating that the zip code has been updated.
    ![Options Screen Zipcode Error](https://i.imgur.com/hadMN1Ql.png "Options Screen Zipcode Error") ![Options Screen Zipcode Success](https://imgur.com/7yNklu4l.png "Options Screen Zipcode Success")

-   User can select the About tab from the Settings screen by either swiping on the screen or selecting the tab. This screen gives the user information about FanCrater and the app itself.
    ![About Screen](https://i.imgur.com/SqzeCjdl.png "About Screen")

-   To logout of the app, a user will either need to open the drawer by pressing the “menu” in the top right-hand corner on any screen or swiping from the left and selecting logout or navigate back to their profile screen in settings and select logout. Logging out will return the user back to the Splash screen.

## Problem Statement

#### Background:

The client for this project is a company called Fan Crater. The client has an online presence where they connect celebrities (Notables) with their fan base. Fan Crater provides a portal for notables to provide their fans with direct, personalized, exclusive content. Fan users, referred to as Superfans, pay a monthly fee to gain access to the exclusive content.
https://www.fancrater.com

#### Problem:

Fan Crater wishes to create a mobile application to be used by Superfans to connect with and to chat with other Superfans. The application should show the user’s current location on a map in relation to the location of other Superfans. The application should have the ability for two fans to chat with each other. The user should only be able see and connect with Superfans who follow the same notable(s). When the user touches the location of another Superfan on the map the application should give the user information about the other fan and an option to start a chat session with them.

#### Solution:

The development team plans on using JavaScript and React Native, with Native Base to create this application. The application will use geo-location software to get the current user’s location and the location of other Superfans with the same notable(s). The application will have to filter based on notables. The application will display a map of the locations of other Superfans. The user can touch the pin location of another fan to see their profile screen with an option to chat with the other fan. A chat application will be incorporated into the app for the Superfans to chat with one another. The application will also be required to do other basic functions such as: log in, log out, settings, ect.

## System Requirements

Our code base relied on two sets of dependencies, one set for the app and another for development of the app. As the main code for react native applications is JavaScript, these dependencies are all JavaScript packages. Management and installation was initially handled with npm and later with yarn, where all packages could be installed by running npm install or later yarn install. All dependencies are listened and managed by yarn in the package.json file.

Development dependencies were those that were not actually required to run the bundled code for the application, but were required for development and running a non-release version of the app on an emulator/simulator or on a mobile device that is connected to the “server” that bundles and installs the app on a real device for development purposes.

#### Application Dependencies

        "native-base": "^2.4.1",
        "react": "16.3.0-alpha.1",
        "react-native": "0.54.0-rc.3",
        "react-native-auth0": "^1.2.2",
        "react-native-gifted-chat": "^0.4.3",
        "react-native-maps": "^0.20.1",
        "react-native-permissions": "^1.1.1",
        "react-native-vector-icons": "^4.5.0",
        "react-navigation": "^1.5.8",
        "sendbird": "^3.0.57"

#### Development Dependencies

        "babel-jest": "22.4.3",
        "babel-preset-react-native": "4.0.0",
        "jest": "22.4.3",
        "react-test-renderer": "16.3.0-alpha.1"

## Conceptual Design

#### Interaction Diagram

![Interaction Diagram](https://i.imgur.com/9o3ZmqYl.png "Interaction Diagram")
![Class Diagram](https://i.imgur.com/JraXHndl.png "Class Diagram")

#### Use Case Diagram

![Use Case Diagram](https://i.imgur.com/IBDQlUdl.png "Use Case Diagram")

## User Interface Design

| Splash Screen with Login Button                                  |                   Profile Screen With Settings Bar                   |
| ---------------------------------------------------------------- | :------------------------------------------------------------------: |
| ![Login Screen](https://i.imgur.com/SyzvARDl.png "Login Screen") | ![Profile Screen](https://i.imgur.com/z1xfBiFl.png "Profile Screen") |

| Map Screen with Users Pinned                                 |                          Chat Screen                           |
| ------------------------------------------------------------ | :------------------------------------------------------------: |
| ![Map Screen](https://i.imgur.com/L8CdWnTl.png "Map Screen") | ![Chat Screen](https://i.imgur.com/bSibqDLl.png "Chat Screen") |

## Functional Requirements

##### FanCrater Terms:

-   Notable: a user that other users can subscribe to (e.g. musicians, actors, sports figures).
-   SuperFan: a user who subscribes to a Notable.

##### Overview:

The FanCrater app will consist of geolocation, chat, and user authentication technologies. A SuperFan can login, see other super fans who subscribe to the same notable, view their profile, chat with those super fans, and logout.

##### Authentication:

A Superfan must login to the app on initial download and use. The Superfan will use their email and password to log into the app. The Superfan will remain logged in until they have formally logged out.

The Superfan may create a user for themselves or use an existing account.

##### Geolocation:

Superfans who subscribe to the same notable will be able to see each other on a live map within the app.

A Superfan must broadcast their location in order for other super fans to see them on the map. A Superfan shall be able to turn off broadcasting.

Superfans can click on an Icon and see the nickname, profile picture, and Notable they subscribe to. They may also select them to view profile and/or chat.

Superfans can broadcast by postal code OR latitude and longitude.

##### Settings:

Superfans can view their settings to see profile information, set their mode of location gathering, and read a FanCrater about page.

##### Chat:

Superfans can chat with one another.

When a Superfan shows up on the map, another Superfan can chat with them. A Superfan must be broadcasting their location to start a new chat.

Superfans can view their previous chats. Superfans can use previous chats to talk to other Superfans while not broadcasting their location.

## Implementation

The initial react-native project was created with react-native-cli by running react-native init. This created a template empty application that could then launched on either Android or iOS devices if properly built or if running in developer mode. As our code base is quite large and management of it would be tricky without version control, our code is currently accessible in a public repository on GitHub at https://github.com/rpicking/FanCraterChat. While there are minimal steps to launch the application once initial requirements for development are satisfied, some software will need to be installed for development.

1.  Installation of node.js/npm
2.  Global installation of yarn
    npm install -g yarn
3.  Download code
    `git clone https://github.com/rpicking/FanCraterChat.git`
4.  Installation of react-native cli
    `yarn install react-native-cli`
5.  In the top level directory of FanCraterChat install dependencies
    `yarn install`
6.  Launch the app with native code specific to iOS or Android
    -   If running on an iOS simulator or device
        `react-native run-ios`
    -   If running on an Android emulator or device
        `react-native run-android`
7.  Installation of additional packages can be install with yarn and will be added to the package.json file that contains all dependencies.
    `yarn install "package-name"`
8.  Debugging of the live code could be done by opening the developer menu (not present when building for release) and enabling live debugging which could then be viewed in a browser’s console.
    • On an emulator/simulator press ctrl-m or cmd-m to launch the developer menu and enable live debugging.
    • On an actual device, shake the phone to bring up the menu and enable live debugging.

## Application Programs

As react-native already has quite a lot of programs developed to aid in application development we had no need to create our own. For our codebase we used a few that came with the installation of react-native-cli which is a required package for development of react-native applications. Development for android devices could take place on any operating system, but iOS building/testing could only be done on a Mac due to Apple’s restrictions.

-   Metro Bundler
    This was a bundler that came with react-native-cli. When launching the application through react-native run-android or react-native run-ios. After the building of the native code application by react-native-cli, the metro bundler was launched. This will monitor files recursively in your project folder, bundling them and sending them to your connected device or emulator to run.
-   Android Studio
    If you wished to run the application on an android emulator, you were required to install Android Studio and download/install an emulator. To launch the emulator, you would open Android Studio, navigate to the AVD Manager, and launch the device. You could then compile, bundle and launch your code on that device by running react-native run-android.
-   Android Device
    Running the application on an android device required you to open said device’s settings page, navigating to about, and clicking on the build 7 times. If done successfully it will announce that the device has be put in developer mode and you can now build, bundle, and run the application by connecting your device and running react-native run-android.
-   XCode
    Running on an iOS device required opening the FanCraterChat/ios folder in XCode. This was only after registering your device. You would build, bundle, and compile the code through the XCode interface.
-   iOS Simulator
    Running on an iOS simulator would require the installation of XCode on the machine. You could then build, bundle, and compile the code by running react-native run-ios which would launch the iOS simulator and start the application on it.

## Testing

##### Levels of Testing

Unit integration and UI testing was all done manually on FanCrater Chat. Through each step of the development process we followed the process of testing the functionality of our features for functionality, making sure it was interacting with the any resources correctly, and finally made sure the UI was correct.

##### Technologies and Processes:

For FanCrater Chat, we utilized informal technologies for testing to keep it simple and cost effective.
Integration testing for our API resources for user data, chat, and authentication. We were able to write our JavaScript code and run it locally to make sure we got the returning json objects. This made it simple and was enough testing to know we had correct, working code.

Unit testing was done locally on a separate app to make sure our functionality was correct. Every time a new function was developed we were able to build it on another side app locally, test it, then implement it and push to the app. In doing this, we used mock data to simulate the functionality existing in the app.

User interface testing was completed after we knew our functionality and integration tests were working properly. We had standards for how the app was supposed to show information and allow the users to interact. With those standards we were able to develop our UI. Certain styling liberties were taken for colors and icons.

#####Passing Rate:
Before we could implement new functionality, our code had to first pass local testing before being pushed and added to the app. Our app was able to maintain a heathy passing rate by not breaking when adding new functionality. This was due to our robust testing processes before implementing new features during our development. It also produced a smoother development life cycle for FanCrater Chat.
