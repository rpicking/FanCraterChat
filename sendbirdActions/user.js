import SendBird from 'sendbird';

const APP_ID = '2403EEED-AFC2-4588-B9E8-90CABC0C4D00';

export const sbConnect = (userId, password) => {
    return new Promise((resolve, reject) => {
        const sb = new SendBird({ 'appId': APP_ID });
        sb.connect(userId, (user, error) => {
            if (error) {
                reject('SendBird Login Failed.');
            } else {
                resolve(sbUpdateProfile(password));
            }
        })
    })
};

export const sbDisconnect = () => {
    return new Promise((resolve, reject) => {
        const sb = SendBird.getInstance();
        if (sb) {
            sb.disconnect(() => {
                resolve(null);
            });
        } else {
            resolve(null);
        }
    })
}

export const sbUpdateProfile = (password) => {
    return new Promise((resolve, reject) => {
        if (!password) {
            reject('Password is required.');
            return;
        }
        const sb = SendBird.getInstance();
        sb.updateCurrentUserInfo(password, null, (user, error) => {
            if (error) {
                reject('Update profile failed.')
            } else {
                resolve(user);
            }
        })
    })
}

export const sbGetCurrentInfo = () => {
    const sb = SendBird.getInstance();
    return {
        profileUrl: sb.currentUser.profileUrl,
        password: sb.currentUser.password
    }
}