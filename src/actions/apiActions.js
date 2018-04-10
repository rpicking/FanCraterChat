import { AsyncStorage } from "react-native";

export const createApiUser = user_info => {
    return new Promise(function(resolve, reject) {
        let request = new XMLHttpRequest();
        let url = `http://5a5d22fad6221a0012962d50.mockapi.io/test/user/`;

        request.onreadystatechange = function(e) {
            if (this.readyState === 4 && this.status === 201) {
                let response = JSON.parse(this.responseText);
                resolve(response.id);
            } else {
                console.log(this.responseText);
            }
        };

        request.open("POST", url, true);
        request.setRequestHeader("Content-type", "application/json");
        let data = {
            email: user_info.email,
            image: user_info.picture,
            chat_id: user_info.sub,
            nickname: user_info.nickname
        };
        request.send(JSON.stringify(data));
    });
};

// updates user with metadata.  If no api_id is specified, updates current user
export const updateApiUser = (metadata, api_id) => {
    return new Promise(async function(resolve, reject) {
        let request = new XMLHttpRequest();
        
        await AsyncStorage.setItem("latitude", String(metadata.latitude));
        await AsyncStorage.setItem("longitude", String(metadata.longitude));
        api_id = api_id || (await AsyncStorage.getItem("api_id"));
        let url = "http://5a5d22fad6221a0012962d50.mockapi.io/test/user/" + api_id;

        request.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                let response = JSON.parse(this.responseText);
                console.log(response);
            }
        };

        request.open("PUT", url, true);
        request.setRequestHeader("Content-type", "application/json");
        request.send(JSON.stringify(metadata));
    });
};

export const getRelatedUsers = async notable => {
    return new Promise(async function(resolve, reject) {
        let request = new XMLHttpRequest();
        let url = "http://5a5d22fad6221a0012962d50.mockapi.io/test/user/";

        request.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                let response = JSON.parse(this.responseText);
                response = filterUsers(response, notable);
                return resolve(response);
            }
        };

        request.open("GET", url, true);
        request.setRequestHeader("Content-type", "application/json");
        request.send();
    });
};

export const getNotable = async () => {
    return new Promise(async function(resolve, reject) {
        let request = new XMLHttpRequest();
        let api_id = await AsyncStorage.getItem("api_id");
        let url = "http://5a5d22fad6221a0012962d50.mockapi.io/test/user/" + api_id;

        request.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                let response = JSON.parse(this.responseText);
                return resolve(response.notable);
            }
        };

        request.open("GET", url, true);
        request.setRequestHeader("Content-type", "application/json");
        request.send();
    });
};

function filterUsers(response, notable) {
    let tempArr = [];
    for (var user in response) {
        let temp = response[user];
        if (notable === temp.notable) {
            tempArr.push(temp);
        }
    }

    return tempArr;
}
