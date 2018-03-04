import SendBird from 'sendbird';

const APP_ID = '2403EEED-AFC2-4588-B9E8-90CABC0C4D00';

export const sbCreateOpenChannelListQuery = () => {
    const sb = SendBird.getInstance();
    return sb.OpenChannel.createOpenChannelListQuery();
}

export const sbGetOpenChannelList = (openChannelListQuery) => {
    return new Promise((resolve, reject) => {
        openChannelListQuery.next((channels, error) => {
            if (error) {
                reject(error);
            } else {
                resolve(channels);
            }
        });
    });
}