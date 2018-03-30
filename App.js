import Auth0 from 'react-native-auth0';
const auth0 = new Auth0({ domain: 'rpickingemu.auth0.com', clientId: '***REMOVED***' });




import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

auth0
    .webAuth
    .authorize({scope: 'openid offline_access profile update:current_user_metadata', audience: 'https://rpickingemu.auth0.com/api/v2/'})
    .then(function(credentials) {
        console.log(credentials);
        let access = credentials.accessToken;
        

        auth0
            .auth
            .userInfo({token: credentials.accessToken})
            .then(function(response) {
                console.log(response);
                auth0
                    .users(credentials.accessToken)
                    .patchUser({id: response.sub, metadata: {'test': 'working'}})
                    .then(console.log)
                    .catch(console.error);
            })
            .catch(console.error);
    })
    .catch(error => console.log(error));

type Props = {};
export default class App extends Component<Props> {
     
    render() {
    return (
        <View style={styles.container}>
        <Text style={styles.welcome}>
            Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
            To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
            {instructions}
        </Text>
        </View>
    );
    }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    },
    welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    },
    instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    },
});
    