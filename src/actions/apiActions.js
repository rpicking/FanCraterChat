export const createUser = user_info => {
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
