This project created with `react-native init`

### Installation

*   Clone repo
*   Install yarn `npm install -g yarn`
*   Install modules `yarn install`
*   Link auth0 `react-native link react-native-auth0`

Add API keys replacing `***REMOVED***` with your own keys in:
*   Sendbird API - `src/actions/sendbirdActions.js`
*   Auth0 API - `src/actions/auth0Actions.js`
*   Google Geocoding API - `src/actions/geocoderActions.js`
*   Google Geocoding API - `src/screens/settings/profile.js`
*   Google Geocoding API - `src/screens/userProfile/index.js`
*   Google Maps Android API - `android/app/src/main/AndroidManifest.xml`


### Run

*   Android - `react-native run-android`
*   iOS - `react-native run-ios`
