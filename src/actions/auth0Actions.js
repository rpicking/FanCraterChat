import { AsyncStorage } from "react-native";
import { NavigationActions } from "react-navigation";
import Auth0 from "react-native-auth0";
import { Toast } from "native-base";

import { createApiUser, updateApiUser } from "./apiActions";
import { createUser, updateUser, loginSendBird } from "./sendbirdActions";

const auth0 = new Auth0({
    domain: "rpickingemu.auth0.com",
    clientId: "***REMOVED***"
});

let current_user_info = {};

// launches login redirect, saving accessToken to storage
export const launchLogin = async () => {
    return await auth0.webAuth
        .authorize({
            scope:
                "openid offline_access profile email nickname user_metadata read:current_user update:current_user_metadata",
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

            const user_info = await getUserInfo();
            let metadata = await getMetadata();

            if (!metadata) {
                metadata = {};
                const api_id = await createApiUser(user_info);
                console.log("api_id: " + api_id);
                await AsyncStorage.setItem("api_id", api_id);
                await setMetadata({ api_id: api_id });
            }

            // login sendbird
            await createUser(user_info.sub, user_info.nickname, metadata.picture);
            return user_info;
        })
        .catch(error => {
            console.log(error);
            return false;
        });
};

// get id of current user based on accessToken
// returns user_info id = user_info.sub
export const getUserInfo = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    let user_info;
    try {
        user_info = await auth0.auth.userInfo({
            token: accessToken
        });
    } catch (e) {
        console.log(e);
        await getNewAccessToken();
        return await getUserInfo();
    }
    current_user_info = user_info;
    const user_id = user_info.sub;
    await AsyncStorage.setItem("user_id", user_id);
    return user_info;
};

export const loginSavedUser = async () => {
    let cur_metadata = await getMetadata(current_user_info.sub);
    await loginSendBird(current_user_info.sub);

    const nickname = current_user_info.nickname;
    let picture = current_user_info.picture;
    if (cur_metadata.hasOwnProperty("picture")) {
        picture = cur_metadata.picture;
    }
    await updateUser(nickname, picture);
};

export const getMetadata = async user_id => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    user_id = user_id || (await AsyncStorage.getItem("user_id"));
    let user_info = {};
    try {
        user_info = await auth0.users(accessToken).getUser({ id: user_id });
    } catch (e) {
        console.log(e);
        await getNewAccessToken();
        return await getMetadata();
    }

    if (
        user_info.hasOwnProperty("userMetadata") &&
        user_info.userMetadata.hasOwnProperty("api_id")
    ) {
        if (user_info.userMetadata.hasOwnProperty("picture")) {
        }

        let api_id = user_info.userMetadata.api_id;
        console.log("api_id: " + api_id);
        await AsyncStorage.setItem("api_id", api_id);
        return user_info.userMetadata;
    }
    return;
};

// modify current user metadata
export const setMetadata = async metadata => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const user_id = await AsyncStorage.getItem("user_id");

    console.log(metadata);
    // update picture on api and sendbird
    if (metadata.hasOwnProperty("picture")) {
        await updateUser(null, metadata.picture);
        await updateApiUser({ image: metadata.picture });
    }

    try {
        await auth0.users(accessToken).patchUser({ id: user_id, metadata: metadata });
    } catch (e) {
        console.log(e);
        await getNewAccessToken();
        await setMetadata(metadata);
        return;
    }
};

// get new access token
export const getNewAccessToken = async () => {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    let accessToken = "";

    try {
        const response = await auth0.auth.refreshToken({
            refreshToken: refreshToken
        });
        accessToken = response.accessToken;
    } catch (e) {
        console.log(e);
    }

    await AsyncStorage.setItem("accessToken", accessToken);
};

// logout user pass in this.props.navigation
export const logout = async navigation => {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    await AsyncStorage.removeItem("api_id");
    await AsyncStorage.removeItem("user_id");

    const resetAction = NavigationActions.reset({
        index: 0,
        key: null,
        actions: [NavigationActions.navigate({ routeName: "Splash" })]
    });

    navigation.dispatch(resetAction);
    Toast.show({
        text: "User Logged Out Successfully",
        position: "bottom",
        duration: 3000
    });
};
