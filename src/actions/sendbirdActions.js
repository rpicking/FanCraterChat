import SendBird from "sendbird";

const sb = new SendBird({ appId: "***REMOVED***" });
const channelHandler = new sb.ChannelHandler();
sb.addChannelHandler("mainHandler", channelHandler);

let user_id = ""; // current user_id
let currentChannel = null; // current channel
let messageListQuery = null; // current channel messagelistquery

export const createUser = async (user_id, nickname, profileUrl) => {
    await loginSendBird(user_id);
    await updateUser(nickname, profileUrl);
};

// login user with unique user id "user"
export const loginSendBird = user => {
    user_id = user;
    return new Promise(function(resolve, reject) {
        sb.connect(user_id, (user, error) => {
            if (error) return reject(error);
            resolve(user);
        });
    });
};

// update current users nickname and/or profileUrl
export const updateUser = (nickname, profileUrl) => {
    return new Promise(function(resolve, reject) {
        sb.updateCurrentUserInfo(nickname, profileUrl, (user, error) => {
            if (error) return reject(error);
            resolve(user);
        });
    });
};

// returns true if id matches current user
export const isCurrentUser = id => {
    return user_id === id;
};

export const getCurrentUser = () => {
    return user_id;
};

export const getOtherUserNickname = () => {
    for (let i = 0; i < currentChannel.members.length; ++i) {
        if (!isCurrentUser(currentChannel.members[i].userId)) {
            return currentChannel.members[i].nickname;
        }
    }
};

export const getOtherUserChatId = () => {
    for (let i = 0; i < currentChannel.members.length; ++i) {
        if (!isCurrentUser(currentChannel.members[i].userId)) {
            return currentChannel.members[i].userId;
        }
    }
};

export const getchannelHandler = () => {
    return channelHandler;
};

// returns private channel instance with current user and otherUser
export const getChannelByID = otherUser => {
    return new Promise(function(resolve, reject) {
        sb.GroupChannel.createChannelWithUserIds(
            [user_id, otherUser],
            true,
            user_id + " | " + otherUser,
            null,
            null,
            null,
            function(createdChannel, error) {
                if (error) {
                    console.log(error);
                    return reject(error);
                }
                currentChannel = createdChannel;

                setMessageListQuery();
                resolve(createdChannel);
            }
        );
    });
};

// returns channel instance from unique channel url
export const getChannelByURL = channelUrl => {
    return new Promise(function(resolve, reject) {
        sb.GroupChannel.getChannel(channelUrl, function(channel, error) {
            if (error) {
                console.error(error);
                return reject(error);
            }
            currentChannel = channel;

            setMessageListQuery();
            resolve(channel);
        });
    });
};

export const isCurrentChannel = channel => {
    return currentChannel.url === channel.url;
};

setMessageListQuery = () => {
    messageListQuery = currentChannel.createPreviousMessageListQuery();
};

// returns array containing group channel objects user is apart of
export const getChannelList = () => {
    var channelListQuery = sb.GroupChannel.createMyGroupChannelListQuery();
    channelListQuery.includeEmpty = true;
    channelListQuery.limit = 100; // pagination limit could be set up to 100

    if (channelListQuery.hasNext) {
        return new Promise(function(resolve, reject) {
            channelListQuery.next(function(channelList, error) {
                if (error) {
                    console.error(error);
                    return reject(error);
                }

                return resolve(channelList);
            });
        });
    }
};

// sends message from current user in current channel
export const sendMessage = message => {
    return new Promise(function(resolve, reject) {
        currentChannel.sendUserMessage(message, null, null, function(response, error) {
            if (error) {
                console.error(error);
                return reject(error);
            }

            return resolve(response);
        });
    });
};

// returns newest n messages from channel n = limit
//     n defaults to 30
export const getPreviousMessages = limit => {
    limit = limit || 100;
    return new Promise(function(resolve, reject) {
        messageListQuery.load(limit, true, function(messageList, error) {
            if (error) {
                console.error(error);
                return reject(error);
            }

            return resolve(messageList);
        });
    });
};

// returns n previous messages from timestamp
//     n defaults to 30
export const getPreviousMessagesTimeStamp = (timestamp, limit) => {
    limit = limit || 100;
    return new Promise(function(resolve, reject) {
        messageListQuery.prev(timestamp, limit, null, function(messageList, error) {
            if (error) {
                console.error(error);
                return reject(error);
            }

            return resolve(messageList);
        });
    });
};

export const logoutSendBird = async () => {
    user_id = ""; // current user_id
    currentChannel = null; // current channel
    messageListQuery = null; // current channel messagelistquery
    await new Promise(function(resolve, reject) {
        sb.disconnect(function() {
            return resolve();
        });
        return reject();
    });
};

export const startTyping = () => {
    currentChannel.startTyping();
};

export const stopTyping = () => {
    currentChannel.endTyping();
};
