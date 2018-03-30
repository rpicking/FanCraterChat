import { AsyncStorage } from "react-native";
import Auth0 from "react-native-auth0";

const auth0 = new Auth0({
    domain: "rpickingemu.auth0.com",
    clientId: "***REMOVED***"
});

// launches login redirect, saving accessToken to storage
export const launchLogin = async () => {
    auth0.webAuth
        .authorize({
            scope: "openid offline_access profile update:current_user_metadata",
            audience: "https://rpickingemu.auth0.com/api/v2/"
        })
        .then(async function(credentials) {
            console.log(credentials);
            const access = credentials.accessToken;
            const refresh = credentials.refreshToken;

            try {
                await AsyncStorage.setItem("accessToken", access);
                await AsyncStorage.setItem("refreshToken", refresh);
            } catch (error) {
                console.log(error);
            }

            auth0.auth
                .userInfo({ token: access })
                .then(function(response) {
                    console.log(response);
                })
                .catch(console.error);
        })
        .catch(error => console.log(error));
};

// get new access token

// get user metadata

// modify user metadat

/*
auth0
    .users(credentials.accessToken)
    .patchUser({id: response.sub, metadata: {'test': 'working'}})
    .then(console.log)
    .catch(console.error);
*/
