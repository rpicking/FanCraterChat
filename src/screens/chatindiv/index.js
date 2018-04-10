import React, { Component } from "react";
import { View, DeviceEventEmitter, StyleSheet, Text } from "react-native";
import { NavigationActions } from "react-navigation";
import { GiftedChat } from "react-native-gifted-chat";
import { Container, Header, Left, Button, Body, Icon, Title, Right } from "native-base";

import {
    getChannelByURL,
    getPreviousMessages,
    isCurrentUser,
    getCurrentUser,
    getchannelHandler,
    getOtherUserNickname,
    sendMessage,
    isCurrentChannel,
    getChannelByID,
    getOtherUserChatId,
    startTyping,
    stopTyping
} from "../../actions/sendbirdActions";
import { getUserByChatId } from "../../actions/apiActions";

export default class ChatIndiv extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otherUser: "",
            otherChatId: "",
            typingText: null,
            messages: []
        };

        this.renderFooter = this.renderFooter.bind(this);
    }

    async componentDidMount() {
        this.props = {
            ...this.props,
            ...this.props.navigation.state.params
        };

        // coming from user page
        if (this.props.hasOwnProperty("channelUser")) {
            this.setState({
                otherUser: this.props.otherUser,
                otherChatId: this.props.channelUser
            });
            await getChannelByID(this.props.channelUser);
        } else {
            await getChannelByURL(this.props.channelId);
            this.setState({ otherChatId: await getOtherUserChatId() });
        }

        this.setState({ otherUser: getOtherUserNickname() });

        let sendBirdMessages = await getPreviousMessages();
        let messages = [];
        sendBirdMessages.forEach((msg, index) => {
            messages.push(this._convertMessage(msg, index));
        });

        this.setState({ messages: messages });

        let ChannelHandler = getchannelHandler();

        ChannelHandler.onMessageReceived = (channel, message) => {
            console.log(channel, message);
            if (isCurrentChannel(channel)) {
                let temp = this._convertMessage(message, this.state.messages.length);
                this.setState(previousState => ({
                    messages: GiftedChat.append(previousState.messages, [temp])
                }));
            }
        };

        ChannelHandler.onTypingStatusUpdated = channel => {
            if (isCurrentChannel(channel)) {
                if (channel.isTyping()) {
                    this.setState({ typingText: "User is typing..." });
                } else this.setState({ typingText: null });
            }
        };
    }

    _convertMessage = (msg, index) => {
        let temp = {};

        temp._id = index;
        temp.user = {
            _id: msg.sender.userId,
            name: msg.sender.nickname,
            avatar: msg.sender.profileUrl
        };

        temp.text = msg.message;
        temp.createdAt = msg.createdAt;
        return temp;
    };

    goToProfile = async chat_id => {
        const user_info = await getUserByChatId(chat_id);
        this.props.navigation.navigate("UserProfile", {
            nickname: user_info.nickname,
            lat: user_info.latitude,
            long: user_info.longitude,
            notables: user_info.notable,
            blurb: user_info.blurb,
            profileUrl: user_info.image,
            chat_id: user_info.chat_id
        });
    };

    onSend = messages => {
        console.log(messages);
        messages.forEach(message => {
            sendMessage(message.text);
        });
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages)
        }));
    };

    renderFooter(props) {
        if (this.state.typingText) {
            return (
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>{this.state.typingText}</Text>
                </View>
            );
        }
        return null;
    }

    render() {
        const { goBack } = this.props.navigation;
        return (
            <Container style={{ flex: 1, backgroundColor: "white" }}>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => {
                                DeviceEventEmitter.emit("refreshChannels", {});
                                this.props.navigation.goBack(null);
                            }}
                        >
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{this.state.otherUser}</Title>
                    </Body>
                    <Right>
                        <Button
                            transparent
                            onPress={() => {
                                this.props.navigation.navigate("DrawerOpen");
                            }}
                        >
                            <Icon
                                style={{
                                    fontSize: 32,
                                    width: 30
                                }}
                                name="menu"
                            />
                        </Button>
                    </Right>
                </Header>

                <GiftedChat
                    style={{ flex: 1, backgroundColor: "white" }}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: getCurrentUser()
                    }}
                    onPressAvatar={() => this.goToProfile(this.state.otherChatId)}
                    keyboardShouldPersistTaps={"handled"}
                    onInputTextChanged={text => {
                        console.log(text.length, "a");
                        if (text !== "") {
                            startTyping();
                        } else stopTyping();
                    }}
                    renderFooter={this.renderFooter}
                />
            </Container>
        );
    }
}

const styles = {
    footerContainer: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },
    footerText: {
        fontSize: 14,
        color: "#aaa"
    }
};
