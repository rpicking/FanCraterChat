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
            scope:
                "openid offline_access profile read:current_user update:current_user_metadata",
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

            await getUserId();
            await getMetadata();
        })
        .catch(error => console.log(error));
};

// get new access token

// get id of current user based on accessToken
export const getUserId = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");

    const user_info = await auth0.auth.userInfo({
        token: accessToken
    });

    const user_id = user_info.sub;
    await AsyncStorage.setItem("user_id", user_id);
    console.log(user_info);
    return user_id;
};

// get full info for user_id or current user if empty
export const getMetadata = async user_id => {
    const accessToken = await AsyncStorage.getItem("accessToken");

    const user_id = user_id || (await AsyncStorage.getItem("user_id"));

    const user_info = await auth0.users(accessToken).getUser({ id: user_id });
    return user_info;
};

// modify current user metadata
export const setMetadata = async metadata => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const user_id = await AsyncStorage.getItem("user_id");

    auth0
        .users(accessToken)
        .patchUser({ id: user_id, metadata: metadata })
        .then(console.log)
        .catch(console.error);
};
